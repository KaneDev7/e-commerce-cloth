import { BiCartAdd } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaBalanceScale } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import LongButton from '../components/LongButton'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/cartSlice'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import ProductLoad from '../components/ProductLoad'

// const images = [
//   "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   "https://images.pexels.com/photos/6311252/pexels-photo-6311252.jpeg?auto=compress&cs=tinysrgb&w=1600"
// ]

export default function Product() {
  const [selectedImg, setSelectedImg] = useState('img')
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: product, isLoading, error } = useFetch(`/products/${id}?populate=*`)

  let imgUrl, imgUrl2, images

  if (product.length !== 0) {
    console.log(product)
    imgUrl = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data?.attributes?.url
    imgUrl2 = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img2?.data?.attributes?.url
    images = product?.attributes?.img.data
    // console.log(product?.attributes?.img.data)
  }


  const addQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const reduceQuantity = () => {
    setQuantity(quantity === 1 ? 1 : (prev) => prev - 1)
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }



  return (
    <div className='p-10 globalWidth'>
      <div className='w-full flex flex-wrap gap-[40px] '>

        <div className='lg:w-[50%] w-[100%] lg:min-w-[500px]  gap-4'>
          <div className='md:mb-20 w-full '>
            <Swiper

              pagination={{
                type: 'fraction',
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {
                images?.map(image => (
                  <SwiperSlide>
                    <img src={import.meta.env.VITE_API_UPLOAD + image?.attributes?.url} alt="" className='w-full aspect-square object-cover' />
                  </SwiperSlide>
                ))

              }

            </Swiper>
          </div>
        </div>

        <div className='flex-1 min-w-[40%] flex flex-col gap-7'>
          <h1 className='text-black/80 font-bold md:text-4xl text-3xl '>  {product?.attributes?.title} </h1>
          <h2 className='text-primaryColor md:text-4xl text-3xl  font-bold'>$ {product?.attributes?.price} </h2>

          <p className="w-full max-w-[900px] text-gray-500 md:text-[17px] text-[15px] text-justify">
            {product?.attributes?.desc}
          </p>

          {/* AJOUT DE QUANTITE */}
          <div className='w-fit flex gap-4'>
            <button className='w-[40px] h-[40px] bg-black/10 hover:bg-primaryColor hover:text-white' onClick={reduceQuantity}>-</button>
            <p className='flex h-[40px] justify-center items-center'>{quantity} </p>
            <button className='w-[40px] h-[40px] bg-black/10 hover:bg-primaryColor hover:text-white' onClick={addQuantity}>+</button>
          </div>


          <button
            className=' w-fit flex justify-center items-center gap-4 py-2 px-10 bg-primaryColor hover:bg-primaryColorActif'
            onClick={() => dispatch(addItem({
              id: product.id,
              title: product?.attributes?.title,
              desc: product?.attributes?.desc,
              price: product?.attributes?.price,
              img: product?.attributes?.img?.data[0]?.attributes?.url,
              quantity: quantity
            }))}
          >
            <BiCartAdd color='white' size={25} />
            <span className='text-white ml-2 text-sm'>ADD TO CART </span>
          </button>

          <div className='w-fit flex gap-4'>

            <div className='w-fit flex justify-center items-center gap-2'>
              <AiOutlineHeart color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO WISH LIST</span>
            </div>

            <div className='w-fit flex justify-center items-center gap-2'>
              <FaBalanceScale color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO COMPARE</span>
            </div>

          </div>

          <div className='w-full'>
            <div className='pb-5 border-b border-black/25'>
              <p className='text-black/50 mb-2'> Vendor : Polo </p>
              <p className='text-black/50 mb-2'> Product Tyoe : T-shirt </p>
              <p className='text-black/50 mb-2'> Tag : T-shirt,  Men, Top  </p>
            </div>

            <div className='w-fit flex flex-col border-black/25 mt-5'>
              <div className='py-2 border-b  border-black/25 '>
                <p className='text-black/50 '>DESCRIPTION</p>
              </div>
              <div className='py-2 border-b  border-black/25 '>
                <p className='text-black/50 '>ADDITIONNAL INFORMATION</p>
              </div>
              <div className='py-2  '>
                <p className='text-black/50 '>FAG</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
