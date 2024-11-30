'use client'

import { FC, useEffect, useState, useRef, useMemo } from 'react'
import ProductModal from './ProductModal'
import LazyImage from './LazyImage'
import NotFound from './NotFound'
import LanguageSelector from './LanguageSelector'
import { getCurrentLanguage } from '../lib/cookies'
import ShimmerLoading from './ShimmerLoading'

interface Product {
  id: number
  images: string[]
  translations: { title: string; description: string }[]
  price: string
  preparationTime: string
  options: any
}

interface Menu {
  translations: { title: string }[]
  products: Product[]
}

interface Restaurant {
  appTheme: {
    primary: string
    textOnPrimary: string
  }
  qr_used: boolean
  menus: Menu[]
  id: string
}

interface MenuPageProps {
  menuItemss: Restaurant
}
const sanitizeCategory = (category: string) => {
  // Step 1: Decompose accents and diacritics
  let result = category.normalize('NFD')
  // console.log('category name:', category)
  // console.log('After normalization:', result)

  // Step 2: Remove diacritical marks
  result = result.replace(/[\u0300-\u036f]/g, '')
  // console.log('After removing diacritics:', result)

  // Step 3: Replace specific Turkish and special characters
  result = result
    .replace(/[çÇ]/g, 'c')
    .replace(/[şŞ]/g, 's')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[öÖ]/g, 'o')
    .replace(/[ýÝ]/g, 'y')
    .replace(/[äÄ]/g, 'a')
  // console.log('After replacing Turkish characters:', result)

  // Step 4: Remove non-alphabetic characters (leaving only A-Z and Cyrillic if needed)
  result = result.replace(/[^A-Za-zА-Яа-я]/g, '')
  // console.log('Final sanitized result:', result)

  return result
}

const MenuPage: FC<MenuPageProps> = ({ menuItemss }) => {
  const groupedItems = useMemo(() => {
    return menuItemss?.menus?.reduce(
      (acc: { [key: string]: Product[] }, category) => {
        const categoryName = category?.translations[0]?.title || 'Unknown Category'
        if (category.products && category.products.length > 0) {
          acc[categoryName] = category.products
        }
        return acc
      },
      {} as { [key: string]: Product[] },
    )
  }, [menuItemss])

  const categories = useMemo(() => {
    return menuItemss?.menus
      .map((item) => item?.translations[0]?.title || '')
      .filter((categoryName) => groupedItems && groupedItems[categoryName])
  }, [menuItemss, groupedItems])

  const [isSticky, setIsSticky] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [theme, setTheme] = useState<Restaurant['appTheme']>({ primary: '', textOnPrimary: '' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('')

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveCategory(sanitizeCategory(categories[0]))
    }
  }, [])

  useEffect(() => {
    setTheme(menuItemss?.appTheme || {})
    setLoading(true)
    if (menuItemss) {
      setLoading(false)
    }
    console.log(menuItemss)
  }, [menuItemss])

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

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

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 150)

      // let categoryPositions = []
      const categoryPositions = Object.keys(categoryRefs.current).map((category) => {
        const ref = categoryRefs.current[sanitizeCategory(category)]
        return {
          category,
          offsetTop: ref ? ref.offsetTop : 0,
        }
      })

      const scrollPosition = window.scrollY + 200

      for (let i = 0; i < categoryPositions.length; i++) {
        const currentCategory = categoryPositions[i]
        const nextCategory = categoryPositions[i + 1]

        if (
          scrollPosition >= currentCategory.offsetTop &&
          (!nextCategory || scrollPosition < nextCategory.offsetTop)
        ) {
          setActiveCategory(sanitizeCategory(currentCategory.category))
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [categories, language])

  const handleCategoryClick = (category: string) => {
    const sanitizedCategory = sanitizeCategory(category)
    const categoryElement = categoryRefs.current[sanitizedCategory]

    if (categoryElement) {
      // Calculate scroll position to stop at the category title
      const offsetTop = categoryElement.offsetTop
      const stickyHeaderHeight = 60 // Adjust this value based on the height of your sticky header (if any)

      // Scroll to the calculated position with smooth behavior
      window.scrollTo({
        top: offsetTop - stickyHeaderHeight,
        behavior: 'smooth',
      })

      // Update active category after scrolling
      setTimeout(() => {
        setActiveCategory(sanitizedCategory)
      }, 500)
    }
  }

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage() // Set the language in the state
      setLanguage(lang)
    }
    categoryRefs.current = {}

    fetchLanguage()
  }, [categories])

  const imageParser = (filename: string): string => {
    const base = `${process.env.NEXT_PUBLIC_IMAGE_STORAGE_URI}`
    return `${base}/restaurants/${filename}.webp`
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalVisible(true)
  }

  const productDetails = useMemo(
    () => ({
      image: selectedProduct?.images
        ? imageParser(selectedProduct.images[0])
        : '/assets/product-placeholder.png',
      title: selectedProduct?.translations[0]?.title || '',
      price: selectedProduct?.price || '',
      description: selectedProduct?.translations[0]?.description || '',
      preparationTime: selectedProduct?.preparationTime,
      options: selectedProduct?.options,
    }),
    [selectedProduct],
  )

  return (
    <div className="min-h-[100dvh] bg-lightGray">
      {loading ? (
        <div className="mx-auto w-full lg:w-10/12">
          <ShimmerLoading />
        </div>
      ) : (
        <div>
          {!menuItemss || menuItemss?.qr_used ? (
            <div className="container mx-auto block w-full lg:flex lg:w-10/12">
              <div
                className={`no-scrollbar scrollbar-hide sticky top-0 z-50 flex h-full max-h-[100dvh] w-full bg-lightGray py-2 lg:w-1/4 lg:flex-col lg:overflow-y-scroll ${isSticky ? 'sticky top-0' : ''}`}
              >
                <div
                  style={{
                    borderRightColor: `${theme.primary.replace(/rgba?\(([^)]+)\)/, 'rgba($1, 0.7)')}`,
                  }}
                  className="flex items-center justify-between border-r border-r-2 bg-opacity-70 px-4 lg:flex lg:border-none"
                >
                  <div className="hidden text-xl font-bold lg:flex">Menu</div>
                  <LanguageSelector size={'20'} color={theme.primary || '#F7D148'} />
                </div>
                <div className="no-scrollbar scrollbar-hide flex h-full max-h-full grow gap-3 overflow-x-auto overflow-y-scroll px-4 lg:flex-col lg:gap-0">
                  {categories?.map((category, index) => {
                    const sanitizedCategory = sanitizeCategory(category)
                    return (
                      <div
                        key={index}
                        className={`cursor-pointer whitespace-nowrap rounded-full bg-white px-4 py-2 text-center lg:rounded-lg lg:bg-transparent lg:text-left category-${sanitizedCategory} `}
                        style={
                          activeCategory === sanitizedCategory
                            ? {
                                backgroundColor: theme.primary || '#F7D148',
                                color: theme.textOnPrimary || '#241606',
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

              <section className="w-full p-4 lg:w-3/4">
                {groupedItems &&
                  Object.keys(groupedItems).map((category) => {
                    const sanitizedCategory = sanitizeCategory(category)
                    return (
                      <div
                        key={category}
                        ref={(el) => {
                          categoryRefs.current[sanitizedCategory] = el
                        }}
                        className="container mb-8"
                      >
                        <h2 className="mb-4 text-3xl font-bold">{category}</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                          {groupedItems[category].map((item) => (
                            <div
                              key={item.id}
                              className="gap-2 overflow-hidden rounded-xl border"
                              onClick={() => handleProductClick(item)}
                            >
                              <LazyImage
                                src={
                                  item.images
                                    ? imageParser(item.images[0])
                                    : '/assets/product-placeholder.png'
                                }
                                alt={item.translations[0].title}
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
                                  style={{ color: theme.primary }}
                                  className="mt-1 font-bold text-primaryText"
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
            </div>
          ) : (
            <NotFound />
          )}
          {selectedProduct && (
            <ProductModal
              theme={theme}
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              image={productDetails.image}
              title={productDetails.title}
              price={productDetails.price}
              options={productDetails.options}
              description={productDetails.description}
              preparationTime={productDetails.preparationTime}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MenuPage
