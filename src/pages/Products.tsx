import { useState, useEffect } from "react";
import Card from "../components/Card";
import { products } from "./home/container/FeatureProducts";

export default function Products() {
  const [maxPrice, setMaxPrice] = useState(1000)

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(Number(e.target.value))
  }

  useEffect(()=>{
    window.scroll(0,0)
},[])

  return (
    <div className="w-full">
      <div className="w-full flex ">
        {/* SIDEBAR CATEGORY */}

        <div className="w-[25%] h-full p-10 sticky top-[0] ">

          <div className="mb-10">
            <h1 className="text-black/80 text-2xl mb-4">Produit Category</h1>
            <div className="">
              <input type="checkbox" id="hut" />
              <label htmlFor="hut" className="ml-2">Hut</label>
            </div>

            <div className="">
              <input type="checkbox" id="tshirt" />
              <label htmlFor="tshirt" className="ml-2">T-shirt</label>
            </div>

          </div>

          <div className="mb-10">
            <h1 className="text-black/80 text-2xl mb-4">Filter By Price</h1>
            <div className="">
              <span>0</span>
              <input type="range" max={1000} onChange={handleChangeMaxPrice} />
              <span>{maxPrice} </span>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-black/80 text-2xl mb-4">Sort By</h1>
            <div className="">
              <input type="radio" name="price" id="lowPrice" />
              <label htmlFor="lowPrice" className="ml-2">Price( Lower first)</label>
            </div>

            <div className="">
              <input type="radio" name="price" id="highestPrice" />
              <label htmlFor="highestPrice" className="ml-2">Price( Highest first)</label>
            </div>

          </div>

        </div>

        {/* PRODUCT CATEGORY */}
        <div className="w-[75%]   p-10">
          <div className="w-full h-[300px] bg-gray-600 ">
            <img src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="w-full h-full object-cover" alt="" />
          </div>

          <div className="max-w-full flex justify-between items-start gap-10 flex-wrap mt-20">

            {
              products.map(product => (
                <Card product={product} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
