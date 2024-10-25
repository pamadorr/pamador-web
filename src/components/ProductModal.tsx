import { FC, useEffect, useState } from 'react'
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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  // Update modal behavior based on screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isVisible) {
      setShowModal(true)
    } else {
      setTimeout(() => setShowModal(false), 100)
    }
  }, [isVisible])

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  const handleDragEnd = (event: any, info: any) => {
    // If the dragged distance is significant, close the modal
    if (info.offset.y > 100) {
      onClose()
    }
  }

  if (!showModal) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            drag={isDesktop ? false : 'y'} // Enable drag only on mobile
            dragConstraints={{ top: 0, bottom: 0 }} // Constrain dragging within the modal
            dragElastic={0.2} // Control the elasticity of the drag
            onDragEnd={handleDragEnd} // Handle drag end to potentially close the modal
            initial={isDesktop ? { scale: 0.5, opacity: 0.8 } : { y: 100, opacity: 0 }}
            animate={isDesktop ? { scale: 1, opacity: 1 } : { y: 0, opacity: 1 }}
            exit={isDesktop ? { scale: 0.1, opacity: 0 } : { y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`${
              isDesktop ? 'h-auto w-[500px] m-auto rounded-2xl' : 'h-max w-full rounded-t-2xl'
            } relative overflow-hidden  bg-white shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-1 transition hover:bg-gray-100"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <LazyImage
              src={image}
              alt={title}
              width={500}
              height={250}
              className="h-auto min-h-[250px] w-full object-cover"
            />

            <div className="mt-2 flex flex-col p-4 pt-0">
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
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12 12L15.7125 8.28751"
                    stroke="#241606"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.75 0.75H14.25"
                    stroke="#241606"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {preparationTime} min
              </p>
              <h2 className="mt-3 text-2xl font-bold text-primaryText">{title}</h2>
              <p className="mt-2 text-xl font-bold" style={{ color: theme.primary || '#241606' }}>
                {price} TMT
              </p>
              <p className="mt-3 text-lg text-primaryText">{description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
