import { Link } from 'react-router-dom'
import { featuredGalleryPhotos } from '../galleryItems'
import ListingGallery from './ListingGallery'
import PhotoWatermark from './PhotoWatermark'

export default function StyleGallery({ preview = false }: { preview?: boolean }) {
  if (!preview) return <ListingGallery />

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {featuredGalleryPhotos.map(photo => (
        <Link
          key={photo.id}
          to={`/gallery?room=${photo.room}`}
          aria-label={photo.title}
          className="group relative overflow-hidden rounded-xl"
        >
          <img
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-1 font-display text-sm text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            {photo.title}
          </span>
          <PhotoWatermark />
        </Link>
      ))}
    </div>
  )
}
