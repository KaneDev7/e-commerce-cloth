import { useContext, useEffect, useRef, useState } from "react";
import { ProductType } from "../pages/home/container/FeatureProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductLoad from "./ProductLoad";
import { getDayBetweenTwoDay } from "@/helpers/date";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { baseRequest } from "@/axios/baseRequest";
import { UserContext } from "@/context/UserContext";


type TypeProps = { product: ProductType }
const DAY_MINIMIUM_FOR_NEW = 6

const updateLikeData = async (data, productId) => {
    try {
        const response = await baseRequest.put(`http://localhost:1337/api/products/${productId}`,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )

    } catch (err: any) {
        console.log(err)
    }
}

export default function Card({ product }: TypeProps) {
    const [likeData, setLikeData] = useState([])
    const [islike, setIsLike] = useState(false)
    const [likeDataId, setLikeDataId] = useState(null)
    const { user } = useContext(UserContext)

    const navigate = useNavigate()
    const img2Ref = useRef<HTMLImageElement | null>(null)
    const imgUrl = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data[0]?.attributes?.url
    const imgUrl2 = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img2?.data?.attributes?.url

    // console.log(product)

    const handleMouseEnter = () => {
        if (!imgUrl2) return
        if (img2Ref.current) {
            img2Ref.current.style.zIndex = '1'
        }
    }

    const handleMouseLeave = () => {
        if (img2Ref.current) {
            img2Ref.current.style.zIndex = '-1'
        }
    }

    const handleLike = () => {
        if (!user) return
        setLikeData(prev => [...prev, product.id])
        setIsLike(true)

        const data = {
            data: {
                like: JSON.stringify([...likeData, user?.user?.id])
            }
        }
        updateLikeData(data, product.id)
    }


    const handleUnLike = () => {
        if (!user) return

        const filterLikeData = likeData.filter(item => item !== user.user.id)
        console.log('filterLikeData', filterLikeData)

        setLikeData(filterLikeData)
        setIsLike(false)

        const data = {
            data: {
                like: JSON.stringify(filterLikeData)
            }
        }

        updateLikeData(data, product.id)
    }

    // console.log(likeData)
    // console.log(user?.user?.id)


    useEffect(() => {

        const likeDataParse = JSON.parse(product?.attributes.like) || []

        if (likeDataParse.includes(user?.user?.id)) {
            setIsLike(true)
        }

        setLikeData(likeDataParse)

    }, [])



    const isNew = getDayBetweenTwoDay(product?.attributes?.publishedAt) < DAY_MINIMIUM_FOR_NEW

    return (
        <motion.div className={`relative  duration-500 card bg-white  shadow-md`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img onClick={() => navigate(`/product/${product.id}`)} src={imgUrl} alt="" className="w-full h-[350px] object-cover" />
            {
                product?.attributes?.img2?.data?.attributes?.url &&

                <img onClick={() => navigate(`/product/${product.id}`)} src={imgUrl2} alt=""
                    ref={img2Ref}
                    className="w-full h-[350px] object-cover absolute inset-0 z-[-1] "
                />

            }
            <div className="flex flex-col justify-between items-start gap-1 p-3 ">
                <h2
                    onClick={() => navigate(`/product/${product.id}`)}
                    title={product?.attributes.title} className="text-sm text-black/80 font-bold capitalize hover:underline cursor-pointer">
                    {product?.attributes.title}
                </h2>
                <div>
                    <span className="text-black/70 text-md  line-through mr-2 "> $ {product?.attributes.oldPrice || product?.attributes.price + 20} </span>
                    <span className="text-md font-bold text-primaryColor "> $ {product?.attributes.price} </span>
                </div>
            </div>
            <p className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white">

                {

                    !islike ?
                        <BsHeart size={20} className='text-gray-600  hover:text-pink-400' onClick={handleLike} />
                        :
                        <BsHeartFill size={20} className='text-pink-400 ' onClick={handleUnLike} />

                }
            </p>

            {
                isNew &&
                <p className=" px-2 text-xs bg-primaryColor text-white absolute top-2 left-2 z-10">Nouveau</p>
            }
        </motion.div>
    )
}
