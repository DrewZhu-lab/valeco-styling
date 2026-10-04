import PageHeader from '../components/PageHeader'
import ListingGallery from '../components/ListingGallery'
import CTABand from '../components/CTABand'
import { useLang } from '../i18n'

export default function GalleryPage() {
  const { t } = useLang()
  return (
    <main className="pt-2">
      <PageHeader eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />
      <ListingGallery />
      <CTABand />
    </main>
  )
}
