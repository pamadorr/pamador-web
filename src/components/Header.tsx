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
    <div id="header" className="flex items-center justify-between">
      <Link
        href="/"
        className="duration-120 ease font-montserrat-alternates flex items-center font-bold transition-opacity hover:opacity-80"
      >
        <img src="/assets/logo.png" alt="" className="h-14" />
        {shouldShowLogoType && (
          <span className="hidden md:block lg:block lg:text-2xl">PAMADOR</span>
        )}
      </Link>
      <div className="menu flex gap-5 lg:gap-10">
        <Link
          href="/long-stories-short"
          className={`relative lg:text-xl ${
            pathname === '/long-stories-short' ? 'active' : ''
          } before:duration-120 before:absolute before:bottom-[-0.8vw] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] ${
            pathname === '/long-stories-short' ? 'before:w-[75%]' : ''
          }`}
        >
          Gysgaça
        </Link>
        <Link
          href="/join-us"
          className={`relative lg:text-xl ${
            pathname === '/join-us' ? 'active' : ''
          } before:duration-120 before:absolute before:bottom-[-0.8vw] before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-[width] before:ease-in-out before:content-[''] hover:before:w-[75%] ${
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
