import { BiCartAdd } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaBalanceScale } from 'react-icons/fa'
import { useState, useEffect } from 'react'


const images = [
  "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/6311252/pexels-photo-6311252.jpeg?auto=compress&cs=tinysrgb&w=1600"
]

export default function Product() {
  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)


  const addQuantity = () =>{
    setQuantity((prev) => prev + 1 )
  }

  const reduceQuantity = () =>{      
    setQuantity(quantity === 1 ? 1 : (prev) => prev - 1)
  }

  useEffect(()=>{
    window.scroll(0,0)
},[])

  return (
    <div className='p-10'>
      <div className='w-full flex flex-wrap gap-[40px] '>

        <div className='flex-1 max-w-[50%] min-w-[600px]  flex gap-4'>
          <div className='flex-1  flex flex-col gap-5 '>
            <div className='w-full'>
              <img src={images[0]} alt="" className='w-full aspect-square object-cover'
                onClick={() => setSelectedImg(0)}
              />
            </div>
            <div className='w-full'>
              <img src={images[1]} alt="" className='w-full aspect-square object-cover'
                onClick={() => setSelectedImg(1)}
              />
            </div>

          </div>
          <div className='flex-[5] mb-20'>
            <img src={images[selectedImg]}  alt="" className='w-full aspect-square object-cover' />
          </div>
        </div>

        <div className='flex-1 min-w-[40%] flex flex-col gap-7'>
          <h1 className='text-black font-bold text-4xl'>Long Sleeve Graphic T-shirt</h1>
          <h2 className='text-primaryColor text-4xl font-bold'>$ 19.9</h2>

          <p className="w-full max-w-[900px] text-gray-500 text-[17px] text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque neque error numquam?
            Suscipit iusto quasi consequuntur repudiandae dicta, minima nesciunt veritatis
            natus cupiditate cum quisquam laboriosam non accusantium temporibus
          </p>

          {/* AJOUT DE QUANTITE */}
          <div className='w-fit flex gap-4'>
            <button className='w-[40px] h-[40px] bg-black/10 hover:bg-primaryColor hover:text-white' onClick={reduceQuantity}>-</button>
            <p className='flex h-[40px] justify-center items-center'>{quantity} </p>
            <button className='w-[40px] h-[40px] bg-black/10 hover:bg-primaryColor hover:text-white' onClick={addQuantity}>+</button>
          </div>

          <button className='h-[45px] w-fit flex justify-center items-center gap-4 px-10 bg-primaryColor hover:bg-primaryColorActif '>
            <BiCartAdd color='white' size={25} />
            <span className='text-white ml-2 text-sm'>ADD TO CART</span>
          </button>

          <div className='w-fit flex gap-4'>

            <div className='w-fit flex justify-center items-center gap-2'>
              <AiOutlineHeart color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO WISH LIST</span>
            </div>

            <div className='w-fit flex justify-center items-center gap-2'>
              <FaBalanceScale color='#3378f0' size={25} />
              <span className='text-primaryColor text-sm'>ADD TO COMPARE</span>
            </div>

          </div>

          <div className='w-full'>
            <div className='pb-5 border-b border-black/25'>
              <p className='text-black/50 mb-2'> Vendor : Polo </p>
              <p className='text-black/50 mb-2'> Product Tyoe : T-shirt </p>
              <p className='text-black/50 mb-2'> Tag : T-shirt,  Men, Top  </p>
            </div>

            <div className='w-fit flex flex-col border-black/25 mt-5'>
              <div className='py-2 border-b  border-black/25 '>
                <p className='text-black/50 '>DESCRIPTION</p>
              </div>
              <div className='py-2 border-b  border-black/25 '>
                <p className='text-black/50 '>ADDITIONNAL INFORMATION</p>
              </div>
              <div className='py-2  '>
                <p className='text-black/50 '>FAG</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
