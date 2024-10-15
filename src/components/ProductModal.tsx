import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import LazyImage from './LazyImage'

interface ProductModalProps {
  isVisible: boolean
  onClose: () => void
  image: string
  title: string
  price: string
  description: string
  theme: object
  preparationTime: number
}

const ProductModal: FC<ProductModalProps> = ({
  isVisible,
  onClose,
  image,
  title,
  price,
  description,
  theme,
  preparationTime,
}) => {
  const [showModal, setShowModal] = useState(isVisible)

  // Handle animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      setShowModal(true)
    } else {
      // Delay unmounting for animation to complete
      setTimeout(() => setShowModal(false), 300)
    }
  }, [isVisible])

  // Prevent body scroll when modal is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  if (!showModal) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          onClick={onClose} // Close when clicked outside the modal content
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            drag="y" // Enable vertical dragging
            dragConstraints={{ top: 0, bottom: 0 }} // Only allow dragging downwards
            onDragEnd={(e, info) => {
              // Close if dragged down far enough
              if (info.point.y > 300) {
                onClose()
              }
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="h-[70dvh] w-full rounded-t-2xl bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            {/* Close button positioned on top of the image */}
            {/* <div className="relative"> */}
            <LazyImage
              src={image}
              alt={title}
              width={500}
              height={250}
              className="h-auto w-full rounded-t-2xl object-cover"
            />
            {/* </div> */}

            {/* Product details */}
            <div className="mt-2 flex flex-col p-4">
              <p className="flex items-center gap-1 text-sm text-primaryText">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z"
                    stroke="#241606"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M12 12L15.7125 8.28751"
                    stroke="#241606"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.75 0.75H14.25"
                    stroke="#241606"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {preparationTime} min
              </p>
              <h2 className="mt-2 text-2xl font-bold text-primaryText">{title}</h2>
              <p
                className="mt-2 text-xl font-bold"
                style={{
                  color: theme.primary ? theme.primary : '#241606',
                }}
              >
                {price} TMT
              </p>
              <p className="mt-4 text-lg text-primaryText">{description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
