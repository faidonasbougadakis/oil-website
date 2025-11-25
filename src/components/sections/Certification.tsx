import React, { useEffect, useRef, useState } from 'react'

const Certification: React.FC<{ language?: 'gr' | 'en' }> = ({ language = 'en' }) => {
  const images = ['/certifications/cert1.png', '/certifications/cert2.png', '/certifications/cert3.png']
  const [current, setCurrent] = useState(0)
  const [locked, setLocked] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!locked) {
      intervalRef.current = window.setInterval(() => {
        setCurrent((c) => (c + 1) % images.length)
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [locked, images.length])

  function handleMouseEnter(index: number) {
    setLocked(true)
    setCurrent(index)
  }

  function handleMouseLeave() {
    setLocked(false)
  }

  return (
    <section id="certifications" className="py-16 w-full">
      {/* Constrained header + underline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-center mb-4 text-black">
          {language === 'gr' ? 'Πιστοποιήσεις' : 'Certifications'}
        </h2>
        <div className="mx-auto mb-8" style={{ width: 'calc(200px + 15%)' }}>
          <div style={{ height: 6, backgroundColor: 'rgb(143, 144, 121)', borderRadius: 4 }} />
        </div>
      </div>

      {/* Full-bleed carousel wrapper */}
      <div className="w-full overflow-hidden">
        <div className="hidden lg:flex w-full">
          {images.map((src, i) => {
            const isActive = i === current
            return (
              <div
                key={src}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                className={`flex-shrink-0 transition-transform duration-500 ease-in-out cursor-pointer w-1/3 ${
                  isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-50'
                }`}
              >
                <img src={src} alt={`cert-${i + 1}`} className="w-full h-auto max-h-[560px] object-contain mx-auto" />
              </div>
            )
          })}
        </div>

        {/* Mobile: single-image full viewport */}
        <div className="block lg:hidden">
          <div
            className="relative w-full flex items-center justify-center"
            onTouchStart={() => setLocked(true)}
            onTouchEnd={() => setLocked(false)}
            onMouseEnter={() => setLocked(true)}
            onMouseLeave={() => setLocked(false)}
          >
            <img
              src={images[current]}
              alt={`cert-${current + 1}`}
              className="w-screen h-auto max-h-screen object-contain cursor-pointer"
              onClick={() => setOverlayOpen(true)}
            />
          </div>

          {overlayOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
              <button
                onClick={() => setOverlayOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-60 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
              >
                ×
              </button>
              <div className="p-4 max-w-full h-full flex items-center justify-center">
                <img src={images[current]} alt={`cert-full-${current + 1}`} className="max-w-full max-h-full object-contain rounded" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Indicators (constrained) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex items-center justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to ${i + 1}`}
            onClick={() => {
              setCurrent(i)
              setLocked(true)
            }}
            onMouseLeave={() => setLocked(false)}
            className={`w-4 h-4 rounded-full transition-colors ${i === current ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Certification
