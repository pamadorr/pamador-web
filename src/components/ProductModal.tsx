import { FC, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LazyImage from './LazyImage'

interface ProductModalProps {
  isVisible: boolean
  onClose: () => void
  image: string
  title: string
  options: any
  price: string
  description: string
  theme: any
  preparationTime: any
}

const ProductModal: FC<ProductModalProps> = ({
  isVisible,
  onClose,
  image,
  title,
  price,
  description,
  theme,
  options,
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
    console.log('options', options)
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
          //eslint-disable-next-line
          // @ts-ignore
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
            //eslint-disable-next-line
            // @ts-ignore
            className={`${
              isDesktop ? 'm-auto h-auto w-[500px] rounded-2xl' : 'h-max w-full rounded-t-2xl'
            } relative overflow-hidden bg-white shadow-lg`}
            //eslint-disable-next-line
            // @ts-ignore
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
              className="h-auto min-h-[250px] w-full  object-cover"
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
              <h2 className="mt-3 text-2xl font-semibold text-primaryText">{title}</h2>
              <p className="mt-2 text-xl font-bold" style={{ color: theme.primary || '#241606' }}>
                {price} TMT
              </p>
              <p className="mt-3 text-lg text-primaryText">{description}</p>
              <div className="">
                {options?.length > 0 && (
                  <div>
                    {options.map((option: any, index: number) => (
                      <div key={index} className="">
                        {/* Option Title */}
                        <h3 className="text-lg font-semibold text-primaryText">
                          {option.translations[0]?.title}
                        </h3>

                        {/* Option Metas */}
                        <ul className=" ">
                          {option.metas?.map((meta: any, metaIndex: number) => (
                            <li
                              key={meta.id || metaIndex}
                              className="flex justify-between "
                            >
                              <span>{meta.translations[0]?.title}</span>
                              {meta.price > 0 && (
                                <span className="text-sm text-gray-600">+{meta.price} TMT</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
