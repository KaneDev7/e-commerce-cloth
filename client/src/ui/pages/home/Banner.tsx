import { GlobalContext } from "@/ui/context/ContextProvider"
import { useContext, useEffect, useState } from "react"


export default function Banner() {
 
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const {isMobile} = useContext(GlobalContext)

  return (

    <div

      className={`overflow-hidden relative lg:w-[75vw] 
    ${isMobile ? 'h-[60vh] w-[100vw]  ' : 'h-[75vh]  w-[80vw]'}
    select-none mx-auto mt-10`} >
    
      <div
      
        className=' w-full h-full p-5'
      >
      <img 
      onLoad={() => setIsImageLoaded(true)}
      src={`${isMobile ? '/images/banner/banner2-mobil.png' : '/images/banner/banner2.png'}`} 
      className="w-full h-full absolute inset-0 z-0" alt="" />
      {
      isImageLoaded && 
        <div className={`w-full h-full lg:bg-none ${isMobile ? 'bg-[#0000008e] text-white' : 'bg-none'} absolute inset-0 flex items-center`} >
        <div className="max-w-[400px] lg:ml-[100px] mx-10 ">
          <h1 className={`${isMobile ? 'text-[15vw] leading-[15vw]' : 'text-[80px] leading-[80px]'} font-medium `} >FASHION STORE</h1>
          <p className="mt-5">
            Explorez l'art de la mode avec nos collections uniques, conçues pour vous inspirer à créer votre propre histoire de style,
            car chaque femme mérite de se sentir exceptionnelle au quotidien.
          </p>
        </div>
      </div>
      }


      </div>
    </div>
  )
}
