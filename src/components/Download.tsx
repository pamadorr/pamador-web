const Download = () => {
  return (
  <div id="download" className="grid mt-2 lg:w-2/3 w-full grid-cols-2 mx-auto items-center gap-8">
      <a href="https://apps.apple.com/ru/app/pamador/id1598061541"  target="_blank" rel="noreferrer">
        <img className="w-full h-full" src="/assets/appstore.svg" alt="" />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.pamador.app"
        target="_blank"
        rel="noreferrer"
      >
        <img className="w-full h-full" src="/assets/googleplay.svg" alt="" />
      </a>
    </div>
  )
}

export default Download
