import React, { useEffect, useState } from 'react'
import {GoArrowLeft,GoArrowRight} from 'react-icons/go'

export default function Banner() {
    // const [currentSlide, setCurrentSlide] = useState(0)

    // const nextSlide = () =>{
    //   setCurrentSlide(currentSlide > 1 ? 0 : (prev) => prev + 1)
    // }

    // const prevSlide = () =>{      
    //   setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    // }
    
    // useEffect(()=>{
    //   const timer = setInterval(()=>{
    //     setCurrentSlide(currentSlide > 1 ? 0 : (prev) => prev + 1)
    //   },5000)

    //   return ()=>{
    //     clearInterval(timer)
    //   }
    // },[currentSlide])
    
  return (
    <div className=' overflow-hidden relative w-[95vw] select-none mx-auto mt-10 '>
      <div className='flex justify-center '>
        <img src="/images/banner/banner.jpg" alt="" className=' w-[80vw] h-auto max-h-[70vh]  aspect-square '/>
      </div>
    </div>
  )
}
