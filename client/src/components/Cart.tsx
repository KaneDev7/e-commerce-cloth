import { useContext } from 'react'

import { MdOutlineDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GlobalContext } from '../context/ContextProvider'
import LongButton from './LongButton'
import { useSelector } from 'react-redux'
import { removeItem, reset } from '../redux/cartSlice'
import {useDispatch} from 'react-redux'

type ContextType = {
  setShowCart: React.Dispatch<React.SetStateAction<Boolean>>
}
export default function cart() {
  const { setShowCart } = useContext(GlobalContext)
  const products = useSelector(state => state.cart.products)
  const dispatch = useDispatch()

  const totalPrice = () =>{
    
    let total = 0
   return products.reduce((acc, item) => acc+=(item.price * item.quantity), 0).toFixed(2)
  }

  const image = "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600"
  return (
    <div className='w-[400px] absolute top-[80px]  z-10 p-5 bg-white shadow-md cart'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-black/70'>Products in your Cart</h1>
        <AiFillCloseCircle size={25} className='text-primaryColor hover:text-primaryColorActif' onClick={() => setShowCart(false)} />
      </div>

      {products?.map(item => (
        <div key={item.id}>
          <div className='flex justify-between mt-5 gap-5 relative'>
            <div className='flex gap-5'>
              <img src={import.meta.env.VITE_API_UPLOAD + item.img} alt="" className='w-[100px] h-[100px] object-cover' />

              <div className='flex flex-col gap-2 '>
                <h2 className='text-xl text-black/70 mb-5'>{item.title} </h2>
                <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p>
                <p className='text-primaryColor text-sm'>{item.quantity} x $ {item.price} </p>
              </div>
            </div>

            <button className=''>
              <MdOutlineDelete color='red' size={25} onClick={()=> dispatch(removeItem(item.id))} />
            </button>

          </div>
        </div>
      ))
      }


      <div className='space-y-5 mt-10'>
        <div className='flex justify-between text-black/80 font-bold' >
          <h1 className='text-xl '>SUBTOTAL</h1>
          <p>$ {totalPrice()} </p>
        </div>
        <LongButton text='PROCED TO CHECKOUT' />
        <p className='text-red-400 text-sm cursor-pointer' onClick={() => dispatch(reset())}>Reset Cart</p>
      </div>
    </div>
  )
}
