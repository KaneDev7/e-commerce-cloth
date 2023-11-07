import React, { useEffect, useState } from 'react'
import {GoArrowLeft,GoArrowRight} from 'react-icons/go'

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () =>{
      setCurrentSlide(currentSlide > 1 ? 0 : (prev) => prev + 1)
    }

    const prevSlide = () =>{      
      setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    }
    
    useEffect(()=>{
      const timer = setInterval(()=>{
        setCurrentSlide(currentSlide > 1 ? 0 : (prev) => prev + 1)
      },5000)

      return ()=>{
        clearInterval(timer)
      }
    },[currentSlide])
    
  return (
    <div className='overflow-hidden relative w-full select-none globalWidth '>
      <div className='flex w-[300vw] duration-300' style={{transform  : `translateX(-${100 * currentSlide}vw)`}}>
        <img src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='object-cover w-[100vw] lg:h-[70vh] h-[calc(100vh-90px)]'/>
        <img src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='object-cover w-[100vw] lg:h-[70vh] h-[calc(100vh-90px)]'/>
        <img src="https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='object-cover w-[100vw] lg:h-[70vh] h-[calc(100vh-90px)]'/>
      </div>

      <div className='absolute flex gap-4 left-[50%] bottom-[50px] translate-x-[-50%] '>

        <div className='w-[55px] h-[55px] flex items-center justify-center border border-black/20' onClick={prevSlide}>
        <GoArrowLeft size={25} />
        </div>

        <div className='w-[55px] h-[55px] flex items-center justify-center border border-black/20' onClick={nextSlide}>
        <GoArrowRight size={25} />
        </div>

      </div>
    </div>
  )
}
