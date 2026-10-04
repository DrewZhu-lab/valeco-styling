import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n'
import { galleryCopy, type GalleryCopy } from '../galleryCopy'
import { type ListingRoom } from '../listingPhotos'
import { galleryItemCount, galleryGroups, type GalleryItem } from '../galleryItems'
import BeforeAfter from './BeforeAfter'
import PhotoWatermark from './PhotoWatermark'

const number = (index: number) => String(index + 1).padStart(2, '0')
const photoTitle = (room: ListingRoom, index: number) => `${room.charAt(0).toUpperCase()}${room.slice(1)} ${number(index)}`
const scrollBehavior = (): ScrollBehavior => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

function RoomSection({ id, photos, copy, onOpen }: {
  id: ListingRoom
  photos: readonly GalleryItem[]
  copy: GalleryCopy
  onOpen: (index: number) => void
}) {
  return (
    <section id={`photos-${id}`} aria-labelledby={`photos-${id}-title`} className="scroll-mt-44">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-oak">
            <span>{number(galleryGroups.findIndex(group => group.id === id))}</span>
            <span className="h-px w-9 bg-oak/40" />
            <span className="tracking-normal">{photos.length} {copy.photos}</span>
          </div>
          <h2 id={`photos-${id}-title`} className="font-display text-3xl sm:text-4xl">{copy.rooms[id][0]}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60">{copy.rooms[id][1]}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <figure key={photo.id} className="min-w-0">
            {photo.before ? (
              <BeforeAfter before={photo.before} after={photo.after} label={`${copy.comparisons}: ${photoTitle(id, index)}`} loading={index < 2 ? 'eager' : 'lazy'} watermark />
            ) : (
              <div className="relative overflow-hidden rounded-2xl">
                <img src={photo.after} alt={photoTitle(id, index)} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover filter-none" />
                <PhotoWatermark />
              </div>
            )}
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm text-ink/70">
              <p className="min-w-0 tabular-nums">{photoTitle(id, index)}</p>
              <button type="button" onClick={() => onOpen(index)} aria-label={`${copy.open}: ${photoTitle(id, index)}`} className="gallery-arrow shrink-0"><ZoomIn size={18} aria-hidden="true" /></button>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default function ListingGallery() {
  const { lang } = useLang()
  const copy = galleryCopy[lang]
  const [searchParams] = useSearchParams()
  const activeGroup = galleryGroups.find(group => group.id === searchParams.get('room')) ?? galleryGroups[0]
  const activeRoom = activeGroup.id
  const roomIndex = galleryGroups.indexOf(activeGroup)
  const roomContent = useRef<HTMLDivElement>(null)
  const previousRoom = useRef(activeRoom)
  const [selection, setSelection] = useState<{ room: number; index: number } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const isOpen = selection !== null
  const selectedGroup = selection ? galleryGroups[selection.room] : null
  const selectedPhoto = selection && selectedGroup ? selectedGroup.items[selection.index] : null

  useEffect(() => {
    if (previousRoom.current === activeRoom) return
    previousRoom.current = activeRoom
    setSelection(null)
    roomContent.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  }, [activeRoom])

  useEffect(() => {
    if (!isOpen) return
    const el = dialog.current
    if (el && !el.open) el.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      el?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const movePhoto = (direction: number) => setSelection(current => {
    if (!current) return null
    const count = galleryGroups[current.room].items.length
    return { ...current, index: (current.index + direction + count) % count }
  })

  return (
    <section className="pb-16" aria-label={copy.collection}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 border-b border-oak/25 pb-8 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <p className="text-xs uppercase tracking-[0.18em] text-oak">{copy.collection} <span className="mx-2">/</span> {galleryItemCount} {copy.photos}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65 sm:mt-0">{copy.hint}</p>
        </div>
      </div>
      <nav aria-label={copy.collection} className="sticky top-[72px] z-30 mb-10 border-b border-oak/15 bg-cream/95 backdrop-blur sm:top-[88px]">
        <div className="gallery-tabs mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {galleryGroups.map(group => (
            <Link key={group.id} to={`?room=${group.id}`} aria-current={activeRoom === group.id ? 'page' : undefined} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${activeRoom === group.id ? 'border-brand bg-brand text-white' : 'border-oak/25 text-ink/70 hover:border-brand hover:text-ink'}`}>
              {copy.rooms[group.id][0]}<span className="text-[11px] opacity-65">{group.items.length}</span>
            </Link>
          ))}
        </div>
      </nav>
      <div ref={roomContent} className="mx-auto max-w-6xl scroll-mt-44 px-6">
        <RoomSection key={activeRoom} id={activeRoom} photos={activeGroup.items} copy={copy} onOpen={index => setSelection({ room: roomIndex, index })} />
      </div>
      <dialog ref={dialog} onClose={() => setSelection(null)} onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          movePhoto(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }} aria-label={selectedGroup ? copy.rooms[selectedGroup.id][0] : copy.collection} className="gallery-lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-linen backdrop:bg-ink/80">
        {selection && selectedGroup && selectedPhoto && (
          <div className="flex h-full flex-col px-4 py-4 sm:px-8 sm:py-6">
            <div className="flex items-center justify-between gap-4 pb-4">
              <div><p className="font-display text-xl sm:text-2xl">{photoTitle(selectedGroup.id, selection.index)}</p><p className="mt-1 text-xs text-linen/60">{number(selection.index)} / {selectedGroup.items.length}</p></div>
              <button type="button" onClick={() => dialog.current?.close()} aria-label={copy.close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen/30 hover:bg-linen/10"><X size={23} /></button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center [container-type:size]">
              {selectedPhoto.before ? (
                <div className="w-[min(100%,150cqh)] max-w-5xl">
                  <BeforeAfter key={selectedPhoto.id} before={selectedPhoto.before} after={selectedPhoto.after} label={`${copy.comparisons}: ${photoTitle(selectedGroup.id, selection.index)}`} loading="eager" watermark />
                </div>
              ) : (
                <div className="relative flex h-full min-h-0 max-w-full items-center justify-center">
                  <img key={selectedPhoto.id} src={selectedPhoto.after} alt={photoTitle(selectedGroup.id, selection.index)} className="h-full min-h-0 max-w-full object-contain filter-none" />
                  <PhotoWatermark />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button type="button" onClick={() => movePhoto(-1)} aria-label={copy.previous} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen/30 hover:bg-linen/10"><ArrowLeft size={22} /></button>
              <p className="text-center text-xs text-linen/70">{photoTitle(selectedGroup.id, selection.index)}</p>
              <button type="button" onClick={() => movePhoto(1)} aria-label={copy.next} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen/30 hover:bg-linen/10"><ArrowRight size={22} /></button>
            </div>
            <div className="mx-auto mt-5 h-0.5 w-40 overflow-hidden rounded-full bg-linen/20" aria-hidden="true"><div className="h-full bg-linen/80 transition-all" style={{ width: `${((selection.index + 1) / selectedGroup.items.length) * 100}%` }} /></div>
          </div>
        )}
      </dialog>
    </section>
  )
}
