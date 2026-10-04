import { useState } from 'react'
import PhotoWatermark from './PhotoWatermark'

// 同一房间的空房（before）与布置完成（after）对比滑块。
export default function BeforeAfter({ before, after, className = '', label = 'Compare before and after styling', loading = 'lazy', watermark = false }: {
  before: string
  after: string
  className?: string
  label?: string
  loading?: 'eager' | 'lazy'
  watermark?: boolean
}) {
  const [pos, setPos] = useState(50)

  return (
    <div className={`relative aspect-[3/2] select-none overflow-hidden rounded-2xl shadow-md focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 ${className}`}>
      <img
        src={after}
        alt="After styling"
        loading={loading}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover filter-none"
      />
      <img
        src={before}
        alt="Before styling"
        loading={loading}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover filter-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
        After
      </span>

      {watermark && <PhotoWatermark />}

      <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-semibold text-ink shadow-md">
          ⇔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        onKeyDown={event => event.stopPropagation()}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
