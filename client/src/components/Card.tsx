import { useEffect, useRef } from "react";
import { ProductType } from "../pages/home/container/FeatureProducts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type TypeProps = { product: ProductType }

export default function Card({ product }: TypeProps) {

    const img2Ref = useRef<HTMLImageElement | null> (null) 
    const imgUrl = import.meta.env.VITE_API_UPLOAD+product?.attributes?.img?.data[0]?.attributes?.url
    const imgUrl2 = import.meta.env.VITE_API_UPLOAD+product?.attributes?.img2?.data?.attributes?.url

    const handleMouseEnter = ()=>{
        if(!imgUrl2) return 
        if(img2Ref.current){
            img2Ref.current.style.zIndex = '1'
        }
    }

    const handleMouseLeave = ()=>{
        if(img2Ref.current){
            img2Ref.current.style.zIndex = '-1'
        }
    }

   
    return (
        <motion.div className="w-[280px] relative flex-auto duration-500"
        onMouseEnter={handleMouseEnter}   
        onMouseLeave={handleMouseLeave}   
        >
            <Link to={`/product/${product.id}`}>
            <img src={imgUrl} alt="" className="w-full h-[430px] object-cover"/>
            </Link>
            {
              product?.attributes?.img2?.data?.attributes?.url &&
            <Link to={`/product/${product.id}`} >
            
            <img src={imgUrl2} alt=""
                ref={img2Ref}
                    className="w-full h-[430px] object-cover absolute inset-0 z-[-1] "
                  />
            </Link>

            }
            <div className="mt-2">
                <h2 className="text-[1.1rem] text-black/80 font-medium "> {product?.attributes.title}</h2>
                <span className="text-black/40 text-[1.2rem] font-medium  line-through mr-4 "> $ {product?.attributes.oldPrice || product?.attributes.price + 20} </span>
                <span className="text-[1.2rem] font-medium text-black/80 "> $ {product?.attributes.price} </span>
            </div>
            {
                product?.attributes.isNew &&
                <p className=" px-2 bg-white text-sm text-blue-700 absolute top-2 left-2 z-10">New Season</p>
            }
        </motion.div>
    )
}
