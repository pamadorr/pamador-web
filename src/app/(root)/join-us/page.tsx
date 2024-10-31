import Header from '../../../components/Header'

const JoinUs = () => {
  return (
    <div className="bg-primary">
      <div id="pages" className="mx-auto flex h-[100dvh] flex-col px-[5vw]">
        <Header shouldShowLogoType />
        <div className="content panefresco md:pt-5vw mx-auto w-full pt-[50px] md:w-[40vw] lg:w-[40vw] lg:pt-[5vw]">
          <div className="mb-[3vw] block">
            <h4 className="mb-[.6vw] text-[18px] font-bold md:text-[1.6vw] lg:text-[1.6vw]">
              Hyzmatdaşlyk
            </h4>
            <p className="text-[16px] font-[200] leading-[22px] md:text-[1.2vw] md:leading-[1.8vw] lg:text-[1.2vw] lg:leading-[1.8vw]">
              Restoran ýa kafe ýöretýän bolsaňyz, marketing üçin goşmaça kelle agyry islemeýän
              bolsaňyz, müşderilere döwrebap hyzmat hödürlemekçi bolsaňyz...
            </p>
            <p className="text-[16px] font-[200] leading-[22px] md:text-[1.2vw] md:leading-[1.8vw] lg:text-[1.2vw] lg:leading-[1.8vw]">
              PAMADOR bilen hyzmatdaş bolmagyň tüýs wagty
            </p>
            <br />
            <p className="text-[16px] font-[200] leading-[22px] md:text-[1.2vw] md:leading-[1.8vw] lg:text-[1.2vw] lg:leading-[1.8vw]">
              <a href="tel:+99362019290" className="">
                +993 (65) 809290
              </a>{' '}
              – telefon belgisi bilen habarlaşyp bilersiňiz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinUs
