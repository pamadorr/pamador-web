'use server'

import { cookies } from 'next/headers'

/**
 * Helper function to set a language cookie.
 * @param {string} language - The language code to set.
 */
export async function setLanguageCookie(language: string) {
  const cookieStore = await cookies()
  cookieStore.set('languageId', language, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  })
  // await revalidatePath('/:path')
}
export async function getCurrentLanguage() {
  const cookieStore = await cookies()
  const language = cookieStore.get('languageId')

  return language ? language.value : 'ru'
}
