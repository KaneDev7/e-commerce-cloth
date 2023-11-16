import { useEffect, useRef } from "react";
import { ProductType } from "../pages/home/container/FeatureProducts";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductLoad from "./ProductLoad";
import { getDayBetweenTwoDay } from "@/helpers/date";


type TypeProps = { product: ProductType }

const DAY_MINIMIUM_FOR_NEW = 6

export default function Card({ product }: TypeProps) {

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
            {
                isNew  &&
                <p className=" px-2 text-xs bg-primaryColor text-white absolute top-2 left-2 z-10">Nouveau</p>
            }
        </motion.div>
    )
}
