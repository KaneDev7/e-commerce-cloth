import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Card from './Card';
import { UserContext } from '../../services/context/UserContext';
import { UserContextType } from '@/Layout';
import { fetchRececntlyViews } from '@/domain/use-case/recentlyReview/RececntlyViewsSlice';


export default function RecentlyViews() {
  const { user }: UserContextType = useContext(UserContext)
  const products = useSelector(state => state.rececntlyViews.data)
  const loading = useSelector((state) => state.rececntlyViews.loading);
  const dispath = useDispatch()

  useEffect(() => {
    dispath(fetchRececntlyViews(user?.user?.id))
}, [user])

  if (user && products?.length > 0) {
    return (

      <div className="flex justify-center items-center my-[5rem] mx-20 globalWidth 2xl:px-0 px-5">
        <div className="w-full max-w-[1500px]  ">

          <div className=" flex justify-between items-center lg:gap-20 gap-10 flex-wrap">
            <h1 className="title text-black/75 font-bold duration-200"> Vus récemment  </h1>
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
              loop={true}
              modules={[Navigation, Pagination]}
              className="mySwiper mt-10"
            >
              {
                products?.map(product => (
                  <SwiperSlide key={product.id} >
                    <Card product={product} />
                  </SwiperSlide>
                ))
              }

            </Swiper>

          </div>

        </div>


      </div>
    )
  }

}
