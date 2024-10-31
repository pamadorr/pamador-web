import Header from '../../../components/Header'

const LongStoriesShort = () => {
  return (
    <div className="bg-primary">
      <div className="mx-auto flex min-h-[100dvh] flex-col px-[5vw]">
        {/* Header with logo */}
        <Header shouldShowLogoType />

        {/* Main content area */}
        <div className="content panefresco md:pt-5vw mx-auto w-full pt-[50px] md:w-[40vw] lg:w-[40vw] lg:pt-[5vw]">
          {/* PAMADOR näme? Section */}
          <div className="mb-[20px] block md:mb-[3vw] lg:mb-[3vw]">
            <h4 className=" mb-[.6vw] lg:text-[1.6vw] md:text-[1.6vw] text-[18px] font-bold">PAMADOR näme?</h4>
            <p className="lg:text-[1.2vw] md:text-[1.2vw] text-[16px] font-[200] lg:leading-[1.8vw] md:leading-[1.8vw] leading-[22px]">
              Onlaýn nahar sargama we eltip berme hyzmatyny ýeňilleşdirmek üçin niýetlenen bir
              platforma
            </p>
          </div>

          {/* PAMADOR kim üçin? Section */}
          <div className="list mb-[20px] block md:mb-[3vw] lg:mb-[3vw]">
            <h4 className=" mb-[.6vw] lg:text-[1.6vw] md:text-[1.6vw] text-[18px] font-bold">PAMADOR kim üçin?</h4>
            <ul className="lg:text-[1.2vw] md:text-[1.2vw] text-[16px] font-[200] lg:leading-[1.8vw] md:leading-[1.8vw] leading-[22px]">
              <li className="">
                öňki iýip içýän kafe/restoranlaryna ýa-da naharlaryna alternatiw gözleýänler;
              </li>
              <li>nahar sargamak üçin 2-3 gezek telefon jaňyna mätäç bolup ýadanlar;</li>
              <li>döwrebaplaşmagy meýil eden kafe/restoran ýöredijileri üçin.</li>
            </ul>
          </div>

          {/* PAMADOR-yň geljegi Section */}
          <div className="mb-[20px] block md:mb-[3vw] lg:mb-[3vw]">
            <h4 className=" mb-[.6vw] lg:text-[1.6vw] md:text-[1.6vw] text-[18px] font-bold">PAMADOR-yň geljegi</h4>
            <p className="lg:text-[1.2vw] md:text-[1.2vw] text-[16px] font-[200] lg:leading-[1.8vw] md:leading-[1.8vw] leading-[22px]">
              Bu ýere owadan tekst pikirlenip ýörüs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LongStoriesShort
