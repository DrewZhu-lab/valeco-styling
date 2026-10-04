import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Sparkles } from 'lucide-react'
import { addressSuggestions } from '../data'
import { featuredGalleryPhotos } from '../galleryItems'
import PhotoWatermark from './PhotoWatermark'
import { useLang } from '../i18n'

type Phase = 'idle' | 'thinking' | 'done' | 'limit'

const FREE_PREVIEWS = 3
const USES_KEY = 'valeco-ai-preview-uses'
const STEP_MS = 800

// Deterministic pseudo-random "projects styled nearby" count per address (demo).
function nearbyCount(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return 8 + (Math.abs(h) % 17)
}

export default function AIStudio() {
  const { t } = useLang()
  const [address, setAddress] = useState('')
  const [focused, setFocused] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const [uses, setUses] = useState(() => Number(localStorage.getItem(USES_KEY)) || 0)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const usesLeft = Math.max(0, FREE_PREVIEWS - uses)

  const suggestions = useMemo(() => {
    const q = address.trim().toLowerCase()
    if (q.length < 2 || phase !== 'idle') return []
    return addressSuggestions.filter((a) => a.toLowerCase().includes(q)).slice(0, 5)
  }, [address, phase])

  const generate = () => {
    if (!address.trim() || phase === 'thinking') return
    if (uses >= FREE_PREVIEWS) {
      setPhase('limit')
      return
    }
    const next = uses + 1
    setUses(next)
    localStorage.setItem(USES_KEY, String(next))
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('thinking')
    setStep(0)
    t.ai.steps.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i), i * STEP_MS))
    })
    timers.current.push(
      window.setTimeout(() => setPhase('done'), t.ai.steps.length * STEP_MS + 400),
    )
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    setPhase('idle')
    setAddress('')
  }

  return (
    <section id="ai-studio" className="bg-sand/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-brand">
            <Sparkles size={14} /> {t.ai.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl">{t.ai.title}</h2>
          <p className="mt-4 text-ink/70">{t.ai.intro}</p>
        </div>

        <div className="relative mx-auto mt-10 max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-linen p-2 pl-5 shadow-sm">
            <MapPin size={18} className="shrink-0 text-brand" />
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                if (phase === 'done') setPhase('idle')
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && generate()}
              placeholder={t.ai.placeholder}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
            <button
              onClick={generate}
              disabled={!address.trim() || phase === 'thinking'}
              className="shrink-0 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {phase === 'thinking' ? t.ai.styling : t.ai.preview}
            </button>
          </div>

          {focused && suggestions.length > 0 && (
            <ul className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-linen shadow-lg">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    onMouseDown={() => setAddress(s)}
                    className="flex w-full items-center gap-2 px-5 py-3 text-left text-sm text-ink/80 hover:bg-sand/60"
                  >
                    <MapPin size={14} className="shrink-0 text-ink/40" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-3 text-center text-xs text-ink/45">
            {usesLeft > 0 ? t.ai.usesLeft(usesLeft) : t.ai.usedAll}
          </p>
        </div>

        {phase === 'limit' && (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl bg-linen p-8 text-center shadow-sm">
            <Sparkles size={22} className="mx-auto text-brand" />
            <h3 className="font-display mt-3 text-2xl">{t.ai.limitTitle}</h3>
            <p className="mt-2 text-sm text-ink/65">{t.ai.limitBody}</p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-brand px-8 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {t.cta.button}
            </Link>
          </div>
        )}

        {phase === 'thinking' && (
          <div className="mx-auto mt-12 max-w-md text-center">
            <div className="mx-auto mb-5 h-1 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-brand transition-all duration-700"
                style={{ width: `${((step + 1) / t.ai.steps.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-ink/60">{t.ai.steps[step]}</p>
          </div>
        )}

        {phase === 'done' && (
          <div className="mt-14">
            <div className="mb-8 text-center">
              <p className="text-sm text-ink/70">{t.ai.nearby(nearbyCount(address), address)}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredGalleryPhotos.map((photo, displayIndex) => {
                return (
                  <article
                    key={photo.id}
                    className="animate-fade-up overflow-hidden rounded-t-[9rem] rounded-b-2xl bg-linen shadow-sm transition-shadow hover:shadow-md"
                    style={{ animationDelay: `${displayIndex * 0.08}s` }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <PhotoWatermark />
                      {displayIndex === 0 && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                          {t.ai.topPick}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl">{photo.title}</h3>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-brand px-8 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
              >
                {t.ai.bookFor(address.split(',')[0])}
              </Link>
              <button onClick={reset} className="text-sm text-ink/50 underline-offset-2 hover:underline">
                {t.ai.tryAnother}
              </button>
            </div>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-ink/40">{t.ai.demoNote}</p>
      </div>
    </section>
  )
}
