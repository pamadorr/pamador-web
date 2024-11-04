import { FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, width, height, className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect() // Stop observing once the image is visible
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
        <div className="relative m-0 p-0">
          {!isLoaded && (
            <Image
              src="/assets/product-placeholder.png"
              alt={alt}
              width={width}
              height={height}
              className="absolute inset-0 animate-pulse bg-gray-200"
              loading="lazy"
            />
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={() => setIsLoaded(true)} // Ensure it displays if there's an error
          />
        </div>
      ) : (
        <Image
          src="/assets/product-placeholder.png"
          alt={alt}
          width={width}
          height={height}
          className="animate-pulse bg-gray-200"
          loading="lazy"
        />
      )}
    </div>
  )
}

export default LazyImage
