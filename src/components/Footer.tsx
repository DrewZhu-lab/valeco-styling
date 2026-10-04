import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

export default function Footer() {
  const { t, lang } = useLang()
  const links = [
    { to: '/services', label: t.nav.services },
    { to: '/packages', label: t.nav.packages },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/locations', label: t.nav.locations },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.consult },
    { to: '/analytics', label: lang === 'zh' || lang === 'zhHant' ? '访问统计与隐私' : 'Analytics & privacy' },
  ]
  return (
    <footer className="bg-ink text-cream/60">
      <div className="border-b border-cream/10 py-6 text-center">
        <p className="px-6 text-xs font-medium tracking-[0.35em] text-cream/80">
          STYLE SPACES. INSPIRE LIVING. ELEVATE VALUE.
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center text-sm">
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-cream">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-cream/40">
          © 2026 Vale&amp;Co. Styling · A brand of Ausred International Investment Group
          Pty Ltd · ABN 97 608 594 592
        </p>
      </div>
    </footer>
  )
}
