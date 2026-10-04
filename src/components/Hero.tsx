import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { heroPhoto } from '../galleryItems'
import PhotoWatermark from './PhotoWatermark'

const SLOGAN_LINES = ['Style Spaces.', 'Inspire Living.', 'Elevate Value.']

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative h-screen min-h-[560px] overflow-hidden bg-ink">
      <img
        src={heroPhoto}
        alt="Vale&Co styled living room"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <PhotoWatermark />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-ink/5" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* 移动端首屏不显示大片文字：眉题/标语/副文案仅 md 以上展示 */}
        <p
          className="mb-5 hidden animate-fade-in-slow text-xs font-medium uppercase tracking-[0.35em] text-white/80 md:block"
          style={{ animationDelay: '0.1s' }}
        >
          {t.hero.eyebrow}
        </p>
        <h1 className="font-display hidden max-w-4xl text-[3.125rem] leading-[1.08] md:block md:text-[4.875rem]">
          {SLOGAN_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.06em]">
              <span
                className="block animate-rise"
                style={{ animationDelay: `${0.15 + i * 0.18}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-6 hidden max-w-xl animate-fade-in-slow text-white/85 md:block"
          style={{ animationDelay: '1s' }}
        >
          {t.hero.sub}
        </p>
        <div
          className="mt-9 flex animate-fade-in-slow flex-wrap justify-center gap-4"
          style={{ animationDelay: '1.25s' }}
        >
          <Link
            to="/contact"
            className="rounded-full bg-brand px-7 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {t.cta.button}
          </Link>
          <Link
            to="/gallery"
            className="rounded-full border border-white/60 px-7 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            {t.hero.ctaWork}
          </Link>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-8 z-10 hidden flex-col items-center gap-2 text-white/70 md:flex">
        <span className="text-[9px] font-medium uppercase tracking-[0.35em]">{t.hero.scroll}</span>
        <span className="animate-scroll-cue block h-8 w-px bg-white/60" />
      </div>
    </section>
  )
}
