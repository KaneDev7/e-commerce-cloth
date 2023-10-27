import { useEffect, useRef } from "react";
import { ProductType } from "../pages/home/container/FeatureProducts";
import { Link } from "react-router-dom";

type TypeProps = { product: ProductType }

export default function Card({ product }: TypeProps) {


    const img2Ref = useRef<HTMLImageElement | null> (null) 

    const handleMouseEnter = ()=>{
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
        <div className="w-[280px] relative flex-auto"
        onMouseEnter={handleMouseEnter}   
        onMouseLeave={handleMouseLeave}   
        >
            <Link to='/product/1'>
            <img src={product.img} alt="" className="w-full h-[430px] object-cover"/>
            </Link>
            {
                product.img2 &&
            <Link to='/product/1'>
            
            <img src={product.img2} alt=""
                ref={img2Ref}
                    className="w-full h-[430px] object-cover absolute inset-0 z-[-1] "
                  />
            </Link>

            }
            <div className="mt-2">
                <h2 className="text-[1.1rem] text-black/80 font-medium "> {product.title}</h2>
                <span className="text-black/40 text-[1.2rem] font-medium  line-through mr-4 "> $ {product.oldPrice} </span>
                <span className="text-[1.2rem] font-medium text-black/80 "> $ {product.price} </span>
            </div>
            {
                product.isNew &&
                <p className=" px-2 bg-white text-sm text-blue-700 absolute top-2 left-2 z-10">New Season</p>
            }
        </div>
    )
}
