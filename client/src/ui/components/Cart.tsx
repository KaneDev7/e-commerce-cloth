import { useContext, useEffect, useState } from 'react'

import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { removeItem, reset } from '../../domain/use-case/cartSlice'
import { useDispatch } from 'react-redux'

import {
  DropdownMenuItem,
} from "@/ui/components/ui/dropdown-menu"

import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { UserContext } from '@/services/context/UserContext'
import { UserContextType } from '@/Layout'



export default function cart() {
  const { user } : UserContextType = useContext(UserContext)
  const products = useSelector(state => state.cart.products)
  const [cart, setCart] = useState([])

  const dispatch = useDispatch()


  const totalPrice = () => {
    return cart.reduce((acc, item) => acc += (item.price * item.quantity), 0).toFixed(2)
  }

  useEffect(() => {
    const filterCart = products.filter(item => item.username.trim() === user.user.username.trim())
    setCart(filterCart)

  }, [products])

  if (cart.length === 0) {
    return <p className='mt-5 text-sm'>Il n'y a plus d'articles dans votre panier</p>
  }
  return (
    <div className='min-w-[300px] '>

      {cart?.map(item => (
        <div key={item.id}>
          <div className='flex justify-between mt-5 gap-5 relative'>
            <div className='flex gap-5'>
              <img src={import.meta.env.VITE_API_UPLOAD + item.img} alt="" className='w-[50px] h-[50px] object-cover' />

              <div className='flex flex-col gap-2 '>
                <h2 className='text-sm text-black '>{item.title} </h2>
                {/* <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p> */}
                <p className='text-primaryColor text-sm'>{item.quantity} x {item.price} fcfa </p>
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
          <p>{totalPrice()} fcfa </p>
        </div>

        <Link to='/panier'>
          <DropdownMenuItem className=''>
            <Button className='w-full bg-green-700 hover:bg-green-800'>
              COMMANDER
            </Button>
          </DropdownMenuItem>
        </Link>

        <p className='text-red-400 text-sm cursor-pointer hover:underline' onClick={() => dispatch(reset(user?.user?.username))}>Tout supprimeé</p>
      </div>
    </div>
  )
}
