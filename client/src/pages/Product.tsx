import { BiCartAdd } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaBalanceScale } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/cartSlice'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

// shaadcdn 
import { Button } from "@/components/ui/button"


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import ProductLoad from '../components/ProductLoad'
import Recommandation from '../components/Recommandation'
import Assurance from '../components/Assurance'

// Toast 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
  const { user } = useContext(UserContext)
  const [quantity, setQuantity] = useState(1)
  const [selectSize, setSelectSize] = useState(null)
  const cart = useSelector(state => state.cart.products)

  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: product, isLoading, error } = useFetch(`/products/${id}?populate=*`)

  let imgUrl, imgUrl2, images

  console.log(user)

  if (product.length !== 0) {
    imgUrl = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data?.attributes?.url
    imgUrl2 = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img2?.data?.attributes?.url
    images = product?.attributes?.img.data
  }


  const handleAddProductToCart = () => {
    if (!user) {
      return navigate('/login')
    }

    const articleInCartOfCurrentUser = cart.find(item => item.id === product.id && user.user.username.trim() === item.username.trim())

    if (!Boolean(selectSize)) {
      return toast.warn("Seletionner d'abord votre taille", {
        hideProgressBar : true
      })
    }

    if (!articleInCartOfCurrentUser) {
      dispatch(addItem({
        username: user.user.username,
        id: product.id,
        title: product?.attributes?.title,
        desc: product?.attributes?.desc,
        price: product?.attributes?.price,
        img: product?.attributes?.img?.data[0]?.attributes?.url,
        quantity: quantity,
        size: [selectSize],
        isNewSize: false
      }))

      return toast.success("Ajouter au panier avec succé", {
        hideProgressBar: true
      })

    }

    const isArticleHasSameSize = articleInCartOfCurrentUser.size.some(item => item === selectSize)

    // if(isArticleHasSameSize && articleInCartOfCurrentUser ) {
    //   return toast("Produit", {
    //     hideProgressBar : true
    //   })
    // }

    dispatch(addItem({
      id: product.id,
      username: user.user.username,
      size: [...articleInCartOfCurrentUser.size, selectSize],
      isNewSize: isArticleHasSameSize
    }))
    return toast.success("Ajouter au panier avec succé", {
      hideProgressBar: true
    })

  }

  const handleSelectSizeChange = (event) => {
    if (event.target.value === 'Seletionner une taille') {
      return setSelectSize(null)
    }
    setSelectSize(event.target.value)

  }
  const addQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const reduceQuantity = () => {
    setQuantity(quantity === 1 ? 1 : (prev) => prev - 1)
  }

  useEffect(() => {
    setSelectSize(null)
  }, [id])

  useEffect(() => {
    window.scroll(0, 0)
  }, [id])



  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }



  return (
    <div className='globalWidth mt-10'>
      <ToastContainer />
      <div className='w-full flex flex-wrap gap-[40px] bg-white p-5 shadow-sm'>

        <div className='lg:w-[45%] w-[100%] lg:min-w-[500px] gap-4'>
          <div className='md:mb-20 w-full '>
            <Swiper
              pagination={{
                clickable: true,
              }}
              zoom={true}

              navigation={true}
              modules={[Zoom, Navigation, Pagination]}
              className="mySwiper"
            >
              {
                images?.map(image => (
                  <SwiperSlide>
                    <div className='swiper-zoom-container'>
                      <img src={import.meta.env.VITE_API_UPLOAD + image?.attributes?.url} alt="" className='w-full h-auto aspect-square object-contain cursor-zoom-in ' />
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>

        <div className='flex-1 min-w-[40%] '>

          {/* BLOCK */}
          <div className='w-full  border-b border-black/10 flex flex-col gap-4 product_detaitl_text_block'>

            <h1 className='primaryTitle font-bold md:text-4xl text-3xl '>  {product?.attributes?.title} </h1>

            <p className="w-full max-w-[900px] text-black/70 font-normal text-[14px] text-justify">
              {product?.attributes?.desc}
            </p>

            <h2 className='text-primaryColor md:text-4xl text-3xl  font-bold'>$ {product?.attributes?.price} </h2>
          </div>


          {/* BLOCK */}

          <div className='flex items-center flex-wrap  gap-20 border-b border-black/10 product_detaitl_text_block'>

            {/* SIZES */}
            <div className=''>
              <h1 className='text-[14px] text-black/80 '>Tailles</h1>
              <div className="flex flex-wrap gap-5 cursor-pointer mt-3">
                <select
                  onChange={handleSelectSizeChange}
                  id="countries"
                  className="bg-gray-50 border border-black/25 text-gray-900 text-sm rounded-md px-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option className='text-sm' value={undefined} selected>Seletionner une taille</option>
                  {product?.attributes?.sizes?.data.map(item => (
                    <option value={item?.attributes?.size}  > {item?.attributes?.size} </option>
                  ))}
                </select>
              </div>
            </div>



            {/* AJOUT DE QUANTITE */}
            <div>
              <h1 className='text-[14px] text-black/80 '>Quantité</h1>
              <div className='w-fit flex gap-4 mt-3'>
                <button className='w-[35px] h-[35px] rounded-full border border-black  hover:bg-primaryColor hover:text-white' onClick={reduceQuantity}>-</button>
                <p className='flex h-[35px] justify-center items-center'>{quantity} </p>
                <button className='w-[35px] h-[35px] rounded-full border border-black  hover:bg-primaryColor hover:text-white' onClick={addQuantity}>+</button>
              </div>
            </div>

          </div>


          {/* BLOCK */}
          <div className='flex items-center flex-wrap gap-10 product_detaitl_text_block'>

            <Button onClick={handleAddProductToCart} className='bg-primaryColor/95 hover:bg-primaryColor'>
              <BiCartAdd color='white' size={20} className="mr-3" />
              Ajouter au panier
            </Button>

          </div>
          <Assurance />
        </div>
      </div>
      <Recommandation categories={product?.attributes?.categories?.data} />
    </div>
  )
}
