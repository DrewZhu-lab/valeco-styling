import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useLang } from '../i18n'

const BASE = import.meta.env.BASE_URL
const DEFAULT_VOLUME = 0.18

// 音乐默认关闭，仅在用户主动点击音乐按钮时播放。
export default function MusicPlayer() {
  const { t } = useLang()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = DEFAULT_VOLUME
    a.pause()
    setMuted(true)

    return () => {
      a.pause()
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      try {
        await a.play()
        setMuted(false)
      } catch {
        setMuted(true)
      }
    } else {
      a.pause()
      setMuted(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={`${BASE}hero-music.mp3`} loop preload="none" playsInline />
      <button
        data-sound-toggle
        onClick={toggle}
        aria-label={muted ? t.hero.musicOn : t.hero.musicOff}
        aria-pressed={!muted}
        className="fixed right-4 top-24 z-40 flex h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-medium text-white shadow-xl ring-1 ring-white/30 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:right-8 md:top-28"
      >
        {muted ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>{muted ? t.hero.musicOn : t.hero.musicOff}</span>
      </button>
    </>
  )
}
