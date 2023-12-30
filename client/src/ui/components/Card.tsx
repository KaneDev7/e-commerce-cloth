import { useContext, useEffect, useRef, useState } from "react";
import { ProductType } from "../pages/home/MoreLikeProducts";
import {useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {getDayBetweenTwoDate } from "@/helpers/date";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { UserContext } from "@/ui/context/UserContext";
import { UserContextType } from "@/Layout";
import { useDispatch } from "react-redux";
import { fetchFavoris } from "@/domain/use-case/products/favorisSlice";
import { updateLikeData } from "@/domain/use-case/products/likes/updateLike";
import { getRating } from "@/helpers/rating";


type TypeProps = { product: ProductType }

export default function Card({ product }: TypeProps) {
    const [likeData, setLikeData] = useState([])
    const [islike, setIsLike] = useState(false)
    const { user }: UserContextType = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const img2Ref = useRef<HTMLImageElement | null>(null)
    const imgUrl = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img?.data[0]?.attributes?.url
    const imgUrl2 = import.meta.env.VITE_API_UPLOAD + product?.attributes?.img2?.data?.attributes?.url


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

        const data = {
            data: {
                like: JSON.stringify([...likeData, user?.user?.id])
            }
        }

        updateLikeData(data, product.id).then(_ => {
            setIsLike(true)
            dispatch(fetchFavoris(user?.user?.id))
        })
    }


    const handleUnLike = () => {
        if (!user) return
        const filterLikeData = likeData.filter(item => item !== user.user.id)
        setLikeData(filterLikeData)

        const data = {
            data: {
                like: JSON.stringify(filterLikeData)
            }
        }
        updateLikeData(data, product.id).then(_ => {
            setIsLike(false)
            dispatch(fetchFavoris(user?.user?.id))
        })
    }


    useEffect(() => {
        const likeDataParse = JSON.parse(product?.attributes.like) || []
        if (likeDataParse.includes(user?.user?.id)) {
            setIsLike(true)
        }
        setLikeData(likeDataParse)
    }, [])

    const isNew = getDayBetweenTwoDate(product?.attributes?.publishedAt) 

    return (
        <motion.div className={`relative  duration-500 card bg-white shadow-sm`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img onClick={() => navigate(`/product/${product.id}`)} src={imgUrl} alt="" className="w-full h-[350px] object-cover " />
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

                <div className="w-full  flex justify-between items-center mt-3">
                    <p className="text-sm font-bold text-primaryColor ">  {product?.attributes.price} fcfa </p>
                    <div className="flex items-center gap-3 ">
                        <img src="/images/star-rating.png" className="w-[90px] " alt="" />
                        <span className="text-sm"> {getRating(product?.attributes?.like)} </span>
                    </div>
                </div>
            </div>

            <p title="favoris" className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white">
                {
                    !islike ?
                        <BsHeart  size={20} className='text-gray-600  hover:text-pink-400 cursor-pointer' onClick={!user ? () => navigate('/login') : handleLike} />
                        :
                        <BsHeartFill size={20} className='text-pink-400  cursor-pointer' onClick={handleUnLike} />
                }
            </p>

            {
                isNew &&
                <p className=" px-2 text-xs bg-primaryColor text-white absolute top-2 left-2 z-10">Nouveau</p>
            }
        </motion.div>
    )
}
