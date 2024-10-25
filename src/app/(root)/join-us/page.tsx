import Header from '../../../components/Header'

const JoinUs = () => {
  return (
    <div className="bg-primary">
      <div
        id="pages"
        className="container mx-auto flex h-[100dvh] flex-col  p-[5vw] pt-3"
      >
        <Header shouldShowLogoType />
        <div className="content mx-auto mt-6 w-full grow pt-[5vw] lg:w-[40vw]">
          <div className="mb-[3vw] block">
            <h4 className="mb-4 text-2xl font-bold">Hyzmatdaşlyk</h4>
            <p className="">
              Restoran ýa kafe ýöretýän bolsaňyz, marketing üçin goşmaça kelle agyry islemeýän
              bolsaňyz, müşderilere döwrebap hyzmat hödürlemekçi bolsaňyz...
            </p>
            <p className="">PAMADOR bilen hyzmatdaş bolmagyň tüýs wagty</p>
            <br />
            <p>
              <a href="tel:+99362019290" className="">
                +99362019290
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
