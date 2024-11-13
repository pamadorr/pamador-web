import { graphQLClient, GET_MENU_ITEMS } from '../lib/graphql-client'
import LanguageSelector from './LanguageSelector'
import MenuPage from './Menu'
import { cookies } from 'next/headers'

interface ServerSideProps {
  slug: string
}

export default async function ServerSide({ slug }: ServerSideProps) {
  // Use the slug passed as a prop
  const cookiesStore = cookies()
  const languageId = cookiesStore.get('languageId')?.value || 'tm'
  const data = (await graphQLClient.request(GET_MENU_ITEMS, { slug, languageId })) as any

  console.log('fetching')
  return (
    <div>
      {/* Pass the fetched menu items to the client-side component */}
      {/* <LanguageSelector/> */}
      <MenuPage menuItemss={data.restaurants[0]} />
    </div>
  )
}
