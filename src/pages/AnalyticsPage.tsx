import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { analyticsOptOutKey, setAnalyticsOptOut, trackGooglePage } from '../googleAnalytics'
import { useLang } from '../i18n'

export default function AnalyticsPage() {
  const { lang } = useLang()
  const chinese = lang === 'zh' || lang === 'zhHant'
  const { pathname, search } = useLocation()
  const [saveFailed, setSaveFailed] = useState(false)
  const [disabled, setDisabled] = useState(() => {
    try { return localStorage.getItem(analyticsOptOutKey) === 'true' }
    catch { return true }
  })
  return (
    <main className="pt-2">
      <PageHeader eyebrow="Vale&Co. Styling" title={chinese ? '网站访问统计' : 'Website analytics'}
        intro={chinese ? '了解网站如何统计访问，以及如何退出统计。' : 'How we measure visits and how you can opt out.'} />
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-16 text-ink/80">
        <p>{chinese ? '我们使用 Google Analytics 了解访客数量和浏览的页面。Google 通过 Cookie 和设备及浏览器信息统计访问，可能在澳大利亚以外处理这些数据。' : 'We use Google Analytics to understand visitor numbers and page views. Google uses cookies and device and browser information to measure visits and may process this data outside Australia.'}</p>
        <p>{chinese ? '我们只发送页面和 Gallery 区域名称，不发送咨询表单内容、姓名、电子邮件、电话号码或物业地址。广告个性化已关闭。我们尊重浏览器的 Do Not Track 设置。' : 'We send page and gallery room names, without enquiry form contents, names, emails, phone numbers or property addresses. Advertising personalisation is disabled. We respect your browser’s Do Not Track setting.'}</p>
        <p>{chinese ? '你可以在此浏览器中退出访问统计。该选择会保存在此设备上；清除浏览器存储后需要重新设置。' : 'You can opt out of analytics in this browser. Your choice is saved on this device; clearing browser storage resets it.'}</p>
        <button type="button" className="rounded-full bg-brand px-6 py-3 text-white" onClick={() => {
          try {
            setAnalyticsOptOut(!disabled)
            setDisabled(!disabled)
            setSaveFailed(false)
            if (disabled) trackGooglePage(pathname, search)
          } catch { setSaveFailed(true) }
        }}>{chinese ? (disabled ? '重新启用访问统计' : '退出访问统计') : (disabled ? 'Enable analytics' : 'Opt out of analytics')}</button>
        <p role="status">{chinese ? (disabled ? '此浏览器已退出统计。' : '访问统计已启用（浏览器设置可能会阻止统计）。') : (disabled ? 'Analytics is disabled in this browser.' : 'Analytics is enabled, subject to your browser settings.')}</p>
        {saveFailed && <p role="alert">{chinese ? '浏览器阻止了存储，无法保存此选择。' : 'Your browser blocked storage, so this preference could not be saved.'}</p>}
        <p><a className="underline" href="https://policies.google.com/privacy">{chinese ? 'Google 隐私政策' : 'Google Privacy Policy'}</a> · <a className="underline" href="mailto:admin@valeandco.com.au">admin@valeandco.com.au</a></p>
      </section>
    </main>
  )
}
