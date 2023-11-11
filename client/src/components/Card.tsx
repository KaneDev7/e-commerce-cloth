import { useEffect, useRef } from "react";
import { ProductType } from "../pages/home/container/FeatureProducts";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type TypeProps = { product: ProductType }

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


    return (
        <motion.div className={`relative  duration-500 card bg-white  shadow-md`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* <Link to={`/product/${product.id}`}> */}
            <img onClick={() => navigate(`/product/${product.id}`)} src={imgUrl} alt="" className="w-full h-[350px] object-cover" />
            {/* </Link> */}
            {
                product?.attributes?.img2?.data?.attributes?.url &&
                // <Link to={`/product/${product.id}`} >

                <img onClick={() => navigate(`/product/${product.id}`)} src={imgUrl2} alt=""
                    ref={img2Ref}
                    className="w-full h-[350px] object-cover absolute inset-0 z-[-1] "
                />
                // </Link>

            }
            <div className="flex justify-between items-center  p-4">
                <h2 title={product?.attributes.title} className="text-sm text-black/80 font-bold capitalize"> 
                {product?.attributes.title.length > 20 ?
                product?.attributes.title.substring(0,20) + '...' :
                product?.attributes.title
                }
                </h2>
                <div>
                    <span className="text-black/70 text-md  line-through mr-2 "> $ {product?.attributes.oldPrice || product?.attributes.price + 20} </span>
                    <span className="text-md font-bold text-black/90 "> $ {product?.attributes.price} </span>
                </div>
            </div>
            {
                product?.attributes.isNew &&
                <p className=" px-2 text-sm bg-primaryColor text-white absolute top-2 left-2 z-10">New Season</p>
            }
        </motion.div>
    )
}
