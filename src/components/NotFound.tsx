// components/LottiePlayer.js
import Lottie from 'lottie-react'
import animationData from '../../public/assets/animation.json'
import Header from './Header'

const NotFound = () => {
  return (
    <div className="m-auto flex overflow-hidden h-[100dvh] w-[100vw] w-full flex-col p-[5vw] pt-5">
      <Header />
      <div className=''>
        <Lottie animationData={animationData} loop={true} className="w-1/3 mx-auto " />
        <div className="text-center text-md">Restoran tapylmady</div>
      </div>
    </div>
  )
}

export default NotFound
