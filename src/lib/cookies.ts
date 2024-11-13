'use server'
import { revalidatePath } from 'next/cache'
// utils/cookies.js

import { cookies } from 'next/headers'

/**
 * Helper function to set a language cookie.
 * @param {string} language - The language code to set.
 */
export async function setLanguageCookie(language: string) {
  const cookieStore = cookies()
  cookieStore.set('languageId', language, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  })
  // await revalidatePath('/:path')
}
export async function getCurrentLanguage() {
  const cookieStore = cookies()
  const language = cookieStore.get('languageId')

  return language ? language.value : 'tm'
}
