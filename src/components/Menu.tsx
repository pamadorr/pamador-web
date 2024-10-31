'use client'

import { FC, useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import LazyImage from './LazyImage'
import NotFound from './NotFound'

interface MenuItem {
  id: number
  name: string
  time: string
  price: string
  image: string
  category: string
}

interface MenuPage {
  menuItemss: MenuItem[]
}

const MenuPage: FC<MenuPage> = ({ menuItemss }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('Tamdyr')
  const [theme, setTheme] = useState<Object>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    console.log('Client-side menuItems:', menuItemss)
    console.log('Grouped items:', groupedItems)
    console.log('hostname', window.location.hostname)
    setTheme(menuItemss?.restaurants[0]?.appTheme) // This will log in the browser's console
    console.log('theme is:', theme)
  }, [menuItemss])

  // Create refs for each category section
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Sanitize category names for valid CSS class usage
  const sanitizeCategory = (category: string) => category.replace(/[^\w-]/g, '') // Remove any non-alphanumeric or non-dash characters

  useEffect(() => {
    const activeCategoryElement = document.querySelector(
      `.category-${sanitizeCategory(activeCategory)}`,
    )
    if (activeCategoryElement) {
      activeCategoryElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeCategory])

  // Sticky menu logic
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 150)

      // Check active category based on scroll position
      const categoryPositions = Object.keys(categoryRefs.current).map((category) => {
        const ref = categoryRefs.current[sanitizeCategory(category)]
        return {
          category,
          offsetTop: ref ? ref.offsetTop : 0,
        }
      })

      const scrollPosition = window.scrollY + 200 // Offset to trigger active before reaching the section

      for (let i = 0; i < categoryPositions.length; i++) {
        const currentCategory = categoryPositions[i]
        const nextCategory = categoryPositions[i + 1]

        if (
          scrollPosition >= currentCategory.offsetTop &&
          (!nextCategory || scrollPosition < nextCategory.offsetTop)
        ) {
          setActiveCategory(sanitizeCategory(currentCategory.category)) // Sanitize here
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll to category when clicked
  const handleCategoryClick = (category: string) => {
    const sanitizedCategory = sanitizeCategory(category)
    const categoryElement = categoryRefs.current[sanitizedCategory]

    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Use setTimeout to delay setting the active category
      setTimeout(() => {
        setActiveCategory(sanitizedCategory)
      }, 500) // Adjust the delay to match the scroll duration
    }
  }

  // Group menu items by category
  const groupedItems = menuItemss?.restaurants[0]?.menus?.reduce((acc, category) => {
    const categoryName = category.translations[0]?.title || 'Unknown Category'
    if (category.products && category.products.length > 0) {
      acc[categoryName] = category.products
    }
    return acc
  }, {})

  const categories = menuItemss?.restaurants[0]?.menus
    .map((item: any) => item?.translations[0]?.title || '')
    .filter((categoryName: string) => groupedItems[categoryName])

  const imageParser = (filename: string): string => {
    const base = `${process.env.NEXT_PUBLIC_IMAGE_STORAGE_URI}`
    return `${base}/${filename}.webp`
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalVisible(true)
  }
  const productDetails = useMemo(
    () => ({
      image: selectedProduct?.images
        ? imageParser(selectedProduct.images[0]) // Parse the image as needed
        : '/assets/product-placeholder.png', // Fallback to placeholder
      title: selectedProduct?.translations[0]?.title || '',
      price: selectedProduct?.price || '',
      description: selectedProduct?.translations[0]?.description || '',
      preparationTime: selectedProduct?.preparationTime,
    }),
    [selectedProduct],
  )

  return (
    <div className="min-h-[100dvh] bg-lightGray">
      {/* Header */}
      {/* Category Menu - Sticky and Scrollable */}
      {!menuItemss || menuItemss?.restaurants[0]?.qr_used ? (
        <div className="container mx-auto block w-full lg:flex lg:w-10/12">
          <div
            className={`sticky top-0 z-50 h-full w-full bg-lightGray py-2 lg:w-1/4 ${
              isSticky ? 'sticky top-0 z-50' : ''
            }`}
          >
            <div className="no-scrollbar scrollbar-hide flex gap-3 overflow-x-auto px-4 lg:flex-col lg:gap-0">
              <div className="hidden px-4 py-2 text-xl font-bold lg:block">Menu</div>
              {categories?.map((category, index) => {
                const sanitizedCategory = sanitizeCategory(category)
                return (
                  <div
                    key={index}
                    className={`cursor-pointer whitespace-nowrap rounded-full bg-white px-4 py-2 text-center lg:rounded-lg lg:bg-transparent lg:text-left category-${sanitizedCategory} `}
                    style={
                      activeCategory === sanitizedCategory
                        ? {
                            backgroundColor: theme.primary ? theme.primary : '#F7D148',
                            color: theme.textOnPrimary ? theme.textOnPrimary : '#241606',
                          }
                        : {}
                    }
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Menu Section - Grouped by Category */}
          <section className="w-full p-4 lg:w-3/4">
            {groupedItems &&
              Object?.keys(groupedItems)?.map((category) => {
                const sanitizedCategory = sanitizeCategory(category)
                return (
                  <div
                    key={category}
                    ref={(el) => (categoryRefs.current[sanitizedCategory] = el)}
                    className="container mb-8"
                  >
                    <h2 className="mb-4 text-3xl font-bold">{category}</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                      {groupedItems[category].map((item: any) => (
                        <div
                          key={item.id}
                          className="gap-2 overflow-hidden rounded-xl border"
                          onClick={() => handleProductClick(item)}
                        >
                          <LazyImage
                            src={
                              item.images
                                ? imageParser(item.images && item.images[0])
                                : '/assets/product-placeholder.png'
                            } // Fallback image if none
                            alt={item.translations[0].title}
                            width={300}
                            height={200}
                            className="rounded-tl-xl rounded-tr-xl"
                          />
                          <div className="p-3">
                            <p className="flex items-center gap-1 text-xs text-primaryText">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
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
                              {item.preparationTime} min
                            </p>
                            <h3 className="text-md leading-1 mt-1 line-clamp-1 font-semibold">
                              {item.translations[0].title}
                            </h3>
                            <p
                              className="text-md font-bold"
                              style={{
                                color: theme.primary ? theme.primary : '#241606',
                              }}
                            >
                              {item.price} TMT
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </section>
          {selectedProduct && (
            <ProductModal
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              {...productDetails}
              theme={theme}
            />
          )}
        </div>
      ) : (
        <NotFound width={100} height={200} color={theme?.primary || '#F7D148'} />
      )}
    </div>
  )
}

export default MenuPage
