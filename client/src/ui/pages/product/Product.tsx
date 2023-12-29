import { BiCartAdd } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../../domain/use-case/cart/cartSlice'
import { useContext } from 'react'
import { UserContext } from '../../../services/context/UserContext'
import useFetch from '../../../infrastructure/hooks/useFetch'

import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'
import RecentlyViews from '@/ui/components/RecentlyViews'

// shaadcdn 
import { Button } from "@/ui/components/ui/button"


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import ProductLoad from '../../components/ProductLoad'
import Recommandation from '../../components/Recommandation'
import Assurance from '../../components/Assurance'

// Toast 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextType } from '@/Layout'
import { updateRecentlyViewsData } from '@/domain/use-case/recentlyReview/updateRecentlyViews'
import { fetchRececntlyViews } from '@/domain/use-case/recentlyReview/RececntlyViewsSlice'
import { checkIsArticleHasSameSize, getArticleInCartOfCurrentUser } from '@/domain/use-case/cart/cartItem'

const USER_VISIT_TIME = 5000

export default function Product() {
  const { user }: UserContextType = useContext(UserContext)
  const [quantity, setQuantity] = useState(1)
  const [selectSize, setSelectSize] = useState(null)
  const [isZommIn, setIsZommIn] = useState(false)
  const cart = useSelector(state => state.cart.products)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: product, isLoading, error } = useFetch(`/products/${id}?populate=*`)

  let imgUrl, imgUrl2, images

  if (product.length !== 0) {
    imgUrl = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data?.attributes?.url
    imgUrl2 = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img2?.data?.attributes?.url
    images = product?.attributes?.img.data
  }

  const handleAddProductToCart = () => {
    if (!user) return navigate(`/login${location.pathname}`)
    if (!Boolean(selectSize)) return toast.warn("Seletionner d'abord votre taille", { hideProgressBar: true })

    const articleInCartOfCurrentUser = getArticleInCartOfCurrentUser(
      cart,
      {
        username: user?.user.username,
        productId: product.id
      }
    )

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

      return toast.success("Ajouter au panier avec succé", { hideProgressBar: true })

    }

    dispatch(addItem({
      id: product.id,
      username: user.user.username,
      size: [...articleInCartOfCurrentUser.size, selectSize],
      isNewSize: checkIsArticleHasSameSize(articleInCartOfCurrentUser, selectSize)
    }))

    return toast.success("Ajouter au panier avec succé", { hideProgressBar: true })

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
    setQuantity(1)
    setIsZommIn(false)
  }, [id])

  useEffect(() => {
    window.scroll(0, 0)
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) return

      const recentlyViewDataParse = product?.attributes?.recentlyViewed ?
        JSON.parse(product?.attributes?.recentlyViewed) : []

      const findProductIndexOfRecentlyUser = recentlyViewDataParse.findIndex(item => item?.userId === user?.user?.id)

      if (findProductIndexOfRecentlyUser !== -1) {
        const updatexistingRecentlyView = [...recentlyViewDataParse].map((item) => {
          if (item?.userId === user?.user?.id) {
            return item = {
              userId: user?.user?.id,
              date: new Date().getTime()
            }
          } else {
            return item
          }
        })

        const data = {
          data: {
            recentlyViewed: JSON.stringify([...updatexistingRecentlyView])
          }
        }
        return updateRecentlyViewsData(data, product.id).then(_ => {
          dispatch(fetchRececntlyViews(user?.user?.id))
        })
      }

      const data = {
        data: {
          recentlyViewed: JSON.stringify([
            ...recentlyViewDataParse,
            {
              userId: user?.user?.id,
              date: new Date().getTime()
            }
          ])
        }
      }

      updateRecentlyViewsData(data, product.id).then(_ => {
        dispatch(fetchRececntlyViews(user?.user?.id))
      })
    }, USER_VISIT_TIME)

    return () => {
      clearTimeout(timer)
    }
  }, [user, id, product])




  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }


  return (
    <>
      <NavbarFixed />
      <Navbar />
      <div className='globalWidth w-full  mt-10 mx:px-5 px-0'>
        <ToastContainer />
        <div className='w-full flex flex-wrap gap-[40px] bg-white p-5 shadow-sm'>

          <div className='lg:w-[45%] w-[100%] lg:min-w-[500px] gap-4'>
            <div className='md:mb-20 w-full '>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                zoom={true}
                onDoubleClick={() => setIsZommIn(!isZommIn)}
                navigation={true}
                modules={[Zoom, Navigation, Pagination]}
                className="mySwiper"
              >
                {
                  images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className='swiper-zoom-container'>
                        <img src={import.meta.env.VITE_API_UPLOAD + image?.attributes?.url} alt=""
                          className={`w-full h-auto sm:aspect-square aspect-auto object-contain ${isZommIn ? 'cursor-zoom-out' : 'cursor-zoom-in'} select-none`} />
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

              <h2 className='text-primaryColor md:text-4xl text-3xl  font-bold'> {product?.attributes?.price} fcfa</h2>
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
                    <option className='text-sm' defaultValue={null} >Seletionner une taille</option>
                    {product?.attributes?.sizes?.data.map((item, index) => (
                      <option key={index} value={item?.attributes?.size}  > {item?.attributes?.size} </option>
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
        {user && <RecentlyViews />}
      </div>
    </>
  )
}
