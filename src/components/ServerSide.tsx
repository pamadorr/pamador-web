import { graphQLClient, GET_MENU_ITEMS } from '../lib/graphql-client'
import MenuPage from './Menu'

interface ServerSideProps {
  slug: string
}

export default async function ServerSide({ slug }: ServerSideProps) {
  // Use the slug passed as a prop
  const data = await graphQLClient.request(GET_MENU_ITEMS, { slug })

  console.log('data', data)

  return (
    <div>
      {/* Pass the fetched menu items to the client-side component */}
      <MenuPage menuItemss={data} />
    </div>
  )
}
