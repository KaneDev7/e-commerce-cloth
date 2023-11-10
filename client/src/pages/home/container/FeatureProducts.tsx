import { useEffect, useRef, useState } from "react"
import Card from "../../../components/Card"
import useFetch from "../../../hooks/useFetch"
import { motion, useInView } from 'framer-motion'
import ProductLoad from "../../../components/ProductLoad"


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

type FetureType = { type: string }

export type ProductType = {
  id: number,
  img: string,
  img2?: string
  title: string,
  isNew?: boolean
  oldPrice: number,
  price: number
}

// export const products: ProductType[] = [
//   {
//     id: 1,
//     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: 'Long Sleeve Graphic T-shirt',
//     isNew: true,
//     oldPrice: 19,
//     price: 12
//   },
//   {
//     id: 2,
//     img: "https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: 'Coat',
//     isNew: true,
//     oldPrice: 19,
//     price: 12
//   },
//   {
//     id: 3,
//     img: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: 'Strick',
//     oldPrice: 19,
//     price: 12
//   },
//   {
//     id: 4,
//     img: "https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: 'Hat',
//     oldPrice: 19,
//     price: 12
//   },
// ]
export default function FeatureProducts({ type }: FetureType) {

  const { data: products, isLoading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)


  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }
  if (error) return <p>{error} </p>

  return (
    <div className="flex justify-center items-center my-[5rem] mx-20 globalWidth">

      <div className="w-full max-w-[1500px] p-10 ">
        <div className=" flex justify-between items-center lg:gap-20 gap-10 flex-wrap">
          <motion.h1 initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
            className="md:text-4xl text-3xl   text-black/90 font-bold duration-200"> {`${type === 'featured' ? 'Produits populaires' : 'Produits tendance'}`} </motion.h1>
          <motion.p initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
            className="w-full max-w-[900px] text-gray-500 md:text-[17px] text-[15px] text-justify duration-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque neque error numquam?
            Suscipit iusto quasi consequuntur repudiandae dicta, minima nesciunt veritatis
            natus cupiditate cum quisquam laboriosam non accusantium temporibus quod?
            Suscipit iusto quasi consequuntur repudiandae dicta, minima nesciunt veritatis
          </motion.p>
        </div>


          <div className="flex ">
            {/* <div className="mt-10"> */}

            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              // slidesPerView={4}
              spaceBetween={30}
              navigation={true}
              loop={true}
              modules={[Navigation, Pagination]}
              className="mySwiper mt-10"
            >
              {
                products.map(product => (
                  <SwiperSlide key={product.id} >
                    <Card product={product} />
                  </SwiperSlide>
                ))
              }

            </Swiper>

            {/* </div> */}
          </div>

          {/* 
            {
              products.map(product => (
                <Card key={product.id} product={product} />
              ))
            } */}
        </div>


    </div>
  )
}
