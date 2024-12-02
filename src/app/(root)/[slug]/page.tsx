import ServerSide from '@/src/components/ServerSide'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Home({ params }: PageProps) {
  const { slug } = await params

  return (
    <main>
      {/* Pass the slug to ServerSide */}
      <ServerSide slug={slug} />
    </main>
  )
}
