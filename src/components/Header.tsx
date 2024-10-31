'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import logo from '../assets/logo.png'

interface Props {
  shouldShowLogoType?: boolean
}

const Header = ({ shouldShowLogoType }: Props) => {
  const pathname = usePathname()

  return (
    <div id="header" className="flex lg:py-0 md-py-0 py-[12px] justify-between items-center w-full lg:h-[6vw] md:h-[6vw] h-auto">
      <Link
        href="/"
        className="flex items-center h-full font-[montserrat-alternates] text-[1.4vw] md:text-[1.4vw] text-[18px] font-bold transition-opacity duration-150 ease-in-out hover:opacity-80"
      >
        <img src="/assets/logo.png" alt="" className="mr-[.6vw]  object-contain lg:h-[60%] md:h-[60%] h-[50px]" />
        {shouldShowLogoType && (
          <span className="middle-slogan hidden lg:text-[1.4vw] md:text-[1.4vw] text-[18px] md:block">PAMADOR</span>
        )}
      </Link>
      <div className="menu panefresco flex justify-end">
        <Link
          href="/long-stories-short"
          className={`relative lg:text-[1.4vw] md:text-[1.4vw] text-[18px] ${
            pathname === '/long-stories-short' ? 'before:h-[2px] before:w-[75%]' : ''
          } lg:ml-[2vw] md:ml-[2vw] ml-[20px] before:duration-120 before:absolute lg:before:bottom-[-.8vw] md:before:bottom-[-.8vw] before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] ${
            pathname === '/long-stories-short' ? 'before:w-[75%]' : ''
          }`}
        >
          Gysgaça
        </Link>
        <Link
          href="/join-us"
          className={`relative lg:text-[1.4vw] md:text-[1.4vw] text-[18px] ${
            pathname === '/join-us' ? 'before:h-[2px] before:w-[75%]' : ''
          } lg:ml-[2vw] md:ml-[2vw] ml-[20px] before:duration-120  before:absolute lg:before:bottom-[-.8vw] md:before:bottom-[-.8vw] before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] ${
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
