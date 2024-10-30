import type { NextPage } from 'next'
import Head from 'next/head'
import Download from '../../components/Download'
import Slogan from '../../components/Slogan'
import Header from '../../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PAMADOR</title>
        <meta name="description" content="Onlaýn nahar sargama we eltip berme platformasy" />
        <link rel="icon" type="image/png" href="/assets/logo.png" />
      </Head>
      <div id="home" className="min-h-[100dvh] w-[100vw] bg-primary p-[5vw] pt-5">
        <Header />
        <div className="m-auto mt-10 flex w-full grow flex-col items-center justify-center md:w-2/4 lg:w-2/4">
          <Slogan />
          <Download />
        </div>
      </div>
    </>
  )
}

export default Home
