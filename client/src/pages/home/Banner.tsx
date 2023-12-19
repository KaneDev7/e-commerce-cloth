import { useEffect, useState } from "react"


export default function Banner() {
  const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
      window.addEventListener('resize', ()=>{
        if(window.matchMedia("(min-width: 700px)").matches){
          setIsMobile(false)
        }else{
          setIsMobile(true)
        }
      })
    },[isMobile])

  return (
    <div className=' overflow-hidden relative lg:w-[80vw] w-[95vw] select-none mx-auto mt-10 '>
      <div className='flex justify-center w-full'>
        <img src={`${isMobile ? '/images/banner/banner-mobile.jpg' : '/images/banner/banner.jpg'}`}  
        alt="" className=' w-full h-auto max-h-[80vh]  aspect-square '/>
      </div>
    </div>
  )
}
