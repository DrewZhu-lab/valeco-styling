import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import Nav from './components/Nav'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import PackagesPage from './pages/PackagesPage'
import GalleryPage from './pages/GalleryPage'
import LocationsPage from './pages/LocationsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AnalyticsPage from './pages/AnalyticsPage'
import { trackGooglePage } from './googleAnalytics'

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => { trackGooglePage(pathname, search) }, [pathname, search])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Nav />
        <MusicPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </HashRouter>
    </LanguageProvider>
  )
}
