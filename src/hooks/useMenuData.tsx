// hooks/useMenuData.ts
'use client'
import { useEffect, useState } from 'react'
import { graphQLClient, GET_MENU_ITEMS } from '../lib/graphql-client'

export function useMenuData(slug: string, languageId: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const result = await graphQLClient.request(GET_MENU_ITEMS, { slug, languageId })
        setData(result)
      } catch (error) {
        console.error('Error fetching menu data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug, languageId])

  return { data, loading }
}
