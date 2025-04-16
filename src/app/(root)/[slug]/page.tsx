import ServerSide from '@/src/components/ServerSide'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function Home({ params }: PageProps) {
  const { slug } = params

  return (
    <main>
      {/* Pass the slug to ServerSide */}
      <ServerSide slug={slug} />
    </main>
  )
}
