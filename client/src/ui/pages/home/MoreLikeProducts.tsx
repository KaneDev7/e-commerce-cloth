import Card from "../../components/Card"
import ProductLoad from "../../components/ProductLoad"


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";

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


export default function MoreLikeProducts() {

  // const { data: products, isLoading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)
  const products = useSelector(state => state.moreLikeProduct.data)
  const loading = useSelector((state) => state.moreLikeProduct.loading);

  if (loading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }

  //if (error) return <p>{error}</p>

  return (
    <div className="flex justify-center items-center my-[5rem] mx-20 globalWidth 2xl:px-0 px-5">

      <div className="w-full max-w-[1500px]  ">
        <div className=" flex justify-between items-center lg:gap-20 gap-10 flex-wrap">
          <h1 className="title text-black/75 font-bold duration-200"> Les plus aimés</h1>
        </div>

        <div className="flex ">
          {/* <div className="mt-10"> */}

          <Swiper
            breakpoints={{
              200: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: products.length > 3 ? 4 : products.length,
                spaceBetween: 50,
              },
            }}

            slidesPerView={products.length > 3 ? 4 : products.length}
            spaceBetween={30}
            navigation={true}
            // loop={true}
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

      </div>


    </div>
  )
}
