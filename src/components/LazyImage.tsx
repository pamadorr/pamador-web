import { FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import placeholderImage from '../assets/product-placeholder.png' // Ensure this path is correct

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

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
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
        <>
          {!isLoaded && (
            <div className="h-full w-full animate-pulse rounded-tl-xl rounded-tr-xl bg-gray-200">
              <Image
                src={placeholderImage}
                alt={alt}
                width={width}
                height={height}
                className="rounded-tl-xl rounded-tr-xl"
                loading="lazy"
              />
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`rounded rounded-tl-xl rounded-tr-xl transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'visible' : 'invisible'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={() => setIsLoaded(true)} // Ensure it displays if there's an error
          />
        </>
      ) : (
        <div className="h-full w-full animate-pulse rounded-tl-xl rounded-tr-xl bg-gray-200">
          <Image
            src={placeholderImage}
            alt={alt}
            width={width}
            height={height}
            className="rounded-tl-xl rounded-tr-xl"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}

export default LazyImage
