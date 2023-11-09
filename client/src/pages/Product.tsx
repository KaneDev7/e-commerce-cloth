import { BiCartAdd } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaBalanceScale } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import LongButton from '../components/LongButton'
import useFetch from '../hooks/useFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import Recommandation from '../components/Recommandation'

// const images = [
//   "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   "https://images.pexels.com/photos/6311252/pexels-photo-6311252.jpeg?auto=compress&cs=tinysrgb&w=1600"
// ]

export default function Product() {
  const [selectedImg, setSelectedImg] = useState('img')
  const selectedFilter = useSelector(state => state.selectedFilter)
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: product, isLoading, error } = useFetch(`/products/${id}?populate=*`)

  // const isTailleExist = product?.attributes?.categories?.data?.some(item => item?.attributes?.title === 'sacs & accessoires')
  let imgUrl, imgUrl2, images

  console.log()

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
    <div className='globalWidth mt-20'>
      <div className='w-full flex flex-wrap gap-[40px] '>

        <div className='lg:w-[45%] w-[100%] lg:min-w-[500px] gap-4'>
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
                    <img src={import.meta.env.VITE_API_UPLOAD + image?.attributes?.url} alt="" className='w-full h-auto aspect-square object-cover ' />
                  </SwiperSlide>
                ))

              }

            </Swiper>
          </div>
        </div>

        <div className='flex-1 min-w-[40%] '>

          {/* BLOCK */}
          <div className='w-full  border-b border-black/10 flex flex-col gap-4 product_detaitl_text_block'>

            <h1 className='text-black/80 font-bold md:text-4xl text-3xl '>  {product?.attributes?.title} </h1>

            <p className="w-full max-w-[900px] text-black/90 md:text-[16px] text-[15px] text-justify">
              {product?.attributes?.desc}
            </p>

            <h2 className='text-primaryColor md:text-4xl text-3xl  font-bold'>$ {product?.attributes?.price} </h2>
          </div>


          {/* BLOCK */}
 
          <div className='flex items-center flex-wrap  gap-10 border-b border-black/10 product_detaitl_text_block'>

            {/* SIZES */}
            {product?.attributes?.sizes?.data.length > 0 &&
              <div className=''>
                <h1 className='text-[17px] text-black/70 '>Tailles disponibles</h1>
                <div className="flex flex-wrap gap-5 cursor-pointer mt-3">
                  {product?.attributes?.sizes?.data.map(item => (
                    <div
                      className="w-[35px] h-[35px] flex items-center justify-center border  border-black/10 ">
                      {item?.attributes?.size}
                    </div>
                  ))}
                </div>
              </div>
            }

            {/* COLORS */}
            <div>
              <h1 className='text-[17px] text-black/70 '>Couleur disponibles</h1>
              <div className="flex flex-wrap gap-5 cursor-pointer mt-3">
                {product?.attributes?.colors?.data.map(item => (
                  <div
                    style={{
                      background: item?.attributes?.color
                    }}
                    className={`w-[35px] h-[35px] flex items-center justify-center border border-black/10 rounded-full`} >
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* BLOCK */}
          <div className='flex items-center flex-wrap gap-10 product_detaitl_text_block'>
            {/* AJOUT DE QUANTITE */}
            <div className='w-fit flex gap-4'>
              <button className='w-[30px] h-[30px] rounded-full border border-black  hover:bg-primaryColor hover:text-white' onClick={reduceQuantity}>-</button>
              <p className='flex h-[30px] justify-center items-center'>{quantity} </p>
              <button className='w-[30px] h-[30px] rounded-full border border-black  hover:bg-primaryColor hover:text-white' onClick={addQuantity}>+</button>
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
              <span className='text-white ml-2 text-sm'>AJOUTER AU PANIER </span>
            </button>
          </div>

          <div className='w-fit flex gap-4 mt-10'>
            <div className='w-fit flex justify-center items-center gap-2'>
              <AiOutlineHeart color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO WISH LIST</span>
            </div>

            <div className='w-fit flex justify-center items-center gap-2'>
              <FaBalanceScale color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO COMPARE</span>
            </div>

          </div>

        </div>
      </div>
      <Recommandation categories={product?.attributes?.categories?.data}/>
    </div>
  )
}
