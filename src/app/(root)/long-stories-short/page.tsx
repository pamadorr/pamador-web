import Header from '../../../components/Header'

const LongStoriesShort = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto min-h-[100dvh] flex-col flex p-[5vw] pt-3">
        {/* Header with logo */}
        <Header shouldShowLogoType />

        {/* Main content area */}
        <div className="content mx-auto mt-6 lg:w-[40vw] w-full grow pt-[5vw]">
          {/* PAMADOR näme? Section */}
          <div className="mb-12 block">
            <h4 className="mb-4 text-2xl font-bold">PAMADOR näme?</h4>
            <p className="text-lg">
              Onlaýn nahar sargama we eltip berme hyzmatyny ýeňilleşdirmek üçin niýetlenen bir
              platforma
            </p>
          </div>

          {/* PAMADOR kim üçin? Section */}
          <div className="mb-12 block">
            <h4 className="mb-4 text-2xl font-bold">PAMADOR kim üçin?</h4>
            <ul className="list-inside list-disc space-y-2 text-lg">
              <li className="">
                öňki iýip içýän kafe/restoranlaryna ýa-da naharlaryna alternatiw gözleýänler;
              </li>
              <li>nahar sargamak üçin 2-3 gezek telefon jaňyna mätäç bolup ýadanlar;</li>
              <li>döwrebaplaşmagy meýil eden kafe/restoran ýöredijileri üçin.</li>
            </ul>
          </div>

          {/* PAMADOR-yň geljegi Section */}
          <div className="block">
            <h4 className="mb-4 text-2xl font-bold">PAMADOR-yň geljegi</h4>
            <p className="text-lg">Bu ýere owadan tekst pikirlenip ýörüs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LongStoriesShort
