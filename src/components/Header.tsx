'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  shouldShowLogoType?: boolean
}

const Header = ({ shouldShowLogoType }: Props) => {
  const pathname = usePathname()

  return (
    <div
      id="header"
      className="md-py-0 flex h-auto w-full items-center justify-between py-[12px] md:h-[6vw] lg:h-[6vw] lg:py-0"
    >
      <Link
        href="/"
        className="flex h-full items-center font-[montserrat-alternates] text-[1.4vw] text-[18px] font-bold transition-opacity duration-150 ease-in-out hover:opacity-80 md:text-[1.4vw]"
      >
        <img
          src="/assets/logo.png"
          alt="logo"
          className="mr-[.6vw] h-[50px] object-contain md:h-[60%] lg:h-[60%]"
        />
        {shouldShowLogoType && (
          <span className="middle-slogan hidden text-[18px] md:block md:text-[1.4vw] lg:text-[1.4vw]">
            PAMADOR
          </span>
        )}
      </Link>
      <div className="menu panefresco flex justify-end">
        <Link
          href="/long-stories-short"
          className={`relative text-[18px] md:text-[1.4vw] lg:text-[1.4vw] ${
            pathname === '/long-stories-short' ? 'before:h-[2px] before:w-[75%]' : ''
          } before:duration-120 ml-[20px] before:absolute before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] md:ml-[2vw] md:before:bottom-[-.8vw] lg:ml-[2vw] lg:before:bottom-[-.8vw] ${
            pathname === '/long-stories-short' ? 'before:w-[75%]' : ''
          }`}
        >
          Gysgaça
        </Link>
        <Link
          href="/join-us"
          className={`relative text-[18px] md:text-[1.4vw] lg:text-[1.4vw] ${
            pathname === '/join-us' ? 'before:h-[2px] before:w-[75%]' : ''
          } before:duration-120 ml-[20px] before:absolute before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] md:ml-[2vw] md:before:bottom-[-.8vw] lg:ml-[2vw] lg:before:bottom-[-.8vw] ${
            pathname === '/join-us' ? 'before:w-[75%]' : ''
          }`}
        >
          Hyzmatdaşlyk
        </Link>
      </div>
    </div>
  )
}

export default Header
