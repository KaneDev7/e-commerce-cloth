import { useContext } from 'react'

import { MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GlobalContext } from '../context/ContextProvider'
import LongButton from './LongButton'
import { useSelector } from 'react-redux'
import { removeItem, reset } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { BiCartAdd } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '@/context/UserContext'


type ContextType = {
  setShowCart: React.Dispatch<React.SetStateAction<Boolean>>
}
export default function cart() {
  const { user } = useContext(UserContext)
  const products = useSelector(state => state.cart.products.filter(item => item.username === user.user.username))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const totalPrice = () => {
    let total = 0
    return products.reduce((acc, item) => acc += (item.price * item.quantity), 0).toFixed(2)
  }


  const image = "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600"
  return (
    <div className=''>
      {/* <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-black/70'>Products in your Cart</h1>
        <AiFillCloseCircle size={25} className='text-primaryColor hover:text-primaryColorActif' onClick={() => setShowCart(false)} />
      </div> */}

      {products?.map(item => (
        <div key={item.id}>
          <div className='flex justify-between mt-5 gap-5 relative'>
            <div className='flex gap-5'>
              <img src={import.meta.env.VITE_API_UPLOAD + item.img} alt="" className='w-[50px] h-[50px] object-cover' />

              <div className='flex flex-col gap-2 '>
                <h2 className='text-sm text-black '>{item.title} </h2>
                {/* <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p> */}
                <p className='text-primaryColor text-sm'>{item.quantity} x $ {item.price} </p>
              </div>
            </div>


            <button className=''>
              <MdDelete className='text-red-500 hover:text-red-600' size={18} onClick={() => dispatch(removeItem(item.id))} />
            </button>

          </div>
        </div>
      ))
      }


      <div className='space-y-5 mt-10'>
        <div className='flex justify-between text-black text-md font-bold' >
          <h1 className=' font-bold'>TOTAL</h1>
          <p>$ {totalPrice()} </p>
        </div>

        <Link to='/panier'>
          <DropdownMenuItem className=''>
            <Button className='w-full bg-green-700 hover:bg-green-800'>
              COMMANDER
            </Button>
          </DropdownMenuItem>
        </Link>

        <p className='text-red-400 text-sm cursor-pointer' onClick={() => dispatch(reset())}>Reset Cart</p>
      </div>
    </div>
  )
}
