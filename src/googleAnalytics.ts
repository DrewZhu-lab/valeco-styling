const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
export const analyticsOptOutKey = 'valeco-analytics-opt-out'
const pages: Record<string, string> = {
  '/': 'Home', '/services': 'Services', '/packages': 'Packages',
  '/gallery': 'Gallery', '/locations': 'Locations', '/about': 'About',
  '/contact': 'Contact', '/analytics': 'Website analytics',
}
const rooms = new Set(['living', 'dining', 'kitchen', 'bedroom', 'entry', 'bathroom', 'outdoor'])
type GoogleTag = (...args: unknown[]) => void
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: GoogleTag }
}
let started = false
let lastPage = ''

function optedOut() {
  try { return localStorage.getItem(analyticsOptOutKey) === 'true' }
  catch { return true }
}

export function trackGooglePage(pathname: string, search = '') {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId) ||
      !import.meta.env.PROD || !['valeandco.com.au', 'www.valeandco.com.au'].includes(window.location.hostname) ||
      window.location.protocol !== 'https:' || navigator.doNotTrack === '1' || optedOut()) return

  const path = Object.hasOwn(pages, pathname) ? pathname : '/'
  const room = path === '/gallery' ? new URLSearchParams(search).get('room') : null
  // Only known routes and room names reach Google; query strings and form contents do not.
  const page = path + (room && rooms.has(room) ? `?room=${room}` : '')
  if (page === lastPage) return
  if (!started) {
    started = true
    window.dataLayer ??= []
    window.gtag = function () { window.dataLayer!.push(arguments) }
    window.gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      analytics_storage: 'granted',
    })
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, page_referrer: '',
      page_location: `https://valeandco.com.au${page}`,
    })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
  }
  lastPage = page
  window.gtag!('set', { page_location: `https://valeandco.com.au${page}`, page_referrer: '' })
  window.gtag!('event', 'page_view', {
    page_title: `Vale&Co. Styling | ${pages[path]}`,
    page_location: `https://valeandco.com.au${page}`,
    page_referrer: '',
  })
}

export function setAnalyticsOptOut(disabled: boolean) {
  localStorage.setItem(analyticsOptOutKey, String(disabled))
  lastPage = ''
  if (measurementId) {
    Object.assign(window, { [`ga-disable-${measurementId}`]: disabled })
    window.gtag?.('consent', 'update', { analytics_storage: disabled ? 'denied' : 'granted' })
  }
  if (disabled) {
    // Remove first-party GA cookies for this host and its parent domain.
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0]
      if (name === '_ga' || name.startsWith('_ga_')) {
        for (const domain of ['', '; domain=valeandco.com.au', `; domain=${window.location.hostname}`]) {
          document.cookie = `${name}=; max-age=0; path=/${domain}; SameSite=Lax; Secure`
        }
      }
    }
  }
}
