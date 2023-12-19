import { BiCartAdd } from 'react-icons/bi';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/cartSlice'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextType } from '@/Layout'

export default function FavorisCard({ product }) {
    const { user }: UserContextType = useContext(UserContext)

    const cart = useSelector(state => state.cart.products)
    const [selectSize, setSelectSize] = useState(null)
    const [isAddToCartClicked, setIsAddToCartClicked] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleAddProductToCart = () => {

        setIsAddToCartClicked(true)
        const articleInCartOfCurrentUser = cart.find(item => item.id === product.id && user.user.username.trim() === item.username.trim())

        if (!Boolean(selectSize)) {
            return toast.warn("Seletionner d'abord votre taille", {
                hideProgressBar: true,
                autoClose: false
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
                quantity: 1,
                size: [selectSize],
                isNewSize: false
            }))

            return toast.success("Ajouter au panier avec succé", {
                hideProgressBar: true,
            })

        }

        const isArticleHasSameSize = articleInCartOfCurrentUser.size.some(item => item === selectSize)

        dispatch(addItem({
            id: product.id,
            username: user.user.username,
            size: [...articleInCartOfCurrentUser.size, selectSize],
            isNewSize: isArticleHasSameSize
        }))

        return toast.success("Ajouter au panier avec succé", {
            hideProgressBar: true,
        })

    }

    const handleSelectSizeChange = (event) => {
        if (event.target.value === 'Seletionner une taille') {
            return setSelectSize(null)
        }
        setSelectSize(event.target.value)
    }

    useEffect(() => {
        setSelectSize(null)
    }, [])


    return (
        <>
            <p>
                {isAddToCartClicked && <ToastContainer />}
            </p>

            <div className={`max-w-[700px] w-full relative flex sm:flex-row flex-col  duration-500 card bg-white  shadow-sm`}>
                <img
                    onClick={() => navigate(`/product/${product.id}`)}
                    src={import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data[0]?.attributes?.url}
                    alt=""
                    className="w-[150px]  h-[150px] object-cover" />

                <div className="flex flex-col  items-star gap-3  p-3 ">

                    <h2
                        onClick={() => navigate(`/product/${product.id}`)}
                        title={product?.attributes.title}
                        className=" text-black/80 font-medium capitalize hover:underline cursor-pointer">
                        {product?.attributes.title}
                    </h2>

                        <p className="font-medium text-primaryColor ">  {product?.attributes.price} fcfa </p>

                    <div className=''>

                        {/* SIZES */}
                        <div className=''>
                            <div className="flex flex-wrap gap-5 cursor-pointer ">
                                <select
                                    onChange={handleSelectSizeChange}
                                    id="countries"
                                    className="bg-gray-50 border border-black/25 text-gray-900 text-sm rounded-md px-3
                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option className='text-sm' defaultValue={null} >Seletionner une taille</option>
                                    {product?.attributes?.sizes?.data.map((item, index) => (
                                        <option key={index} value={item?.attributes?.size}  > {item?.attributes?.size} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>




                <div
                    onClick={handleAddProductToCart}
                    title='Ajouter au panier' className='p-3 bg-primaryColor/95 hover:bg-primaryColor cursor-pointer rounded-full absolute right-2 top-2 '>
                    <BiCartAdd color='white' size={20} className="" />
                </div>

            </div>
        </>

    )
}
