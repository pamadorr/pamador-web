'use client'

import { useEffect, useState, useRef } from 'react'
import { getCurrentLanguage, setLanguageCookie } from '../lib/cookies'
import { useRouter } from 'next/navigation'

const LanguageSelector = ({ color, size, direction }: any) => {
  const router = useRouter();
  const [language, setLanguage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null) // Ref to check for outside clicks

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage()
      setLanguage(lang)
    }

    fetchLanguage()
  }, [])

  const handleLanguageChange = async (selectedLanguage: string) => {
    setIsOpen(false) // Close the dropdown after selection
    setLanguage(selectedLanguage)
    await setLanguageCookie(selectedLanguage)
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    // router.refresh();
    // window.location.reload()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div ref={dropdownRef} className="relative z-50 inline-block flex text-left">
      <button className="flex items-center justify-center gap-1" onClick={() => setIsOpen(!isOpen)}>
        {/* Inline SVG for the globe icon */}
        <div className="m-0 flex text-[#000] items-center justify-center p-0 text-lg">
          {language.toLocaleUpperCase()}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#000"
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 ${direction === 'up' ? 'bottom-12' : 'top-5'} z-30 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <ul className="py-1">
            {['en', 'tm', 'ru', 'tr'].map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleLanguageChange(lang)}
                  className={`${
                    language === lang ? 'bg-gray-200' : ''
                  } w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100`}
                >
                  {lang.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
