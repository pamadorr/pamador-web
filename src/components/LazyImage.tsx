import { FC, useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect() // Stop observing once the img is visible
          }
        })
      },
      {
        rootMargin: '100px', // Start loading image 100px before it enters the viewport
      },
    )

    const currentRef = imageRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  const handleImageLoad = () => {
    setIsLoaded(true) // Mark the image as loaded
  }

  return (
    <div ref={imageRef} className={className}>
      {isVisible ? (
        <div className="m-0 p-0">
          {!isLoaded && (
            <img
              src="/assets/product-placeholder.png"
              alt={alt}
              className="w-full h-full animate-pulse bg-gray-200"
              loading="lazy"
            />
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={() => setIsLoaded(true)} // Ensure it displays if there's an error
          />
        </div>
      ) : (
        <img
          src="/assets/product-placeholder.png"
          alt={alt}
          className="animate-pulse w-full h-full bg-gray-200"
          loading="lazy"
        />
      )}
    </div>
  )
}

export default LazyImage
