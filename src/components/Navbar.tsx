import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineSearch } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { BsHeart } from 'react-icons/bs'
import { PiShoppingCartLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import {useContext} from 'react' 
import Cart from './Cart'
import { GlobalContext } from '../context/ContextProvider'

export default function Navbar() {

  const {showCart, setShowCart} =  useContext(GlobalContext)

  return (
    <div className='relative'>
      <div className='h-[80px]  flex justify-between items-center pb-5 pt-3 px-5'>

        {/* LEFT */}
        <div className='flex items-center gap-4'>

          <div className='flex items-center'>
            <img src="/images/en.png" alt="" />
            <FiChevronDown />
          </div>

          <div className='flex items-center'>
            <span>USD</span>
            <FiChevronDown />
          </div>
          <Link to=''>Men</Link>
          <Link to=''>Women</Link>
          <Link to=''>Children</Link>
          <Link to=''>Accessoires</Link>
        </div>

        {/* CENTER */}

        <div className=''>
        <Link to='/' className='text-3xl font-normal' >LAMASTORE</Link>
        </div>

        {/* RIGHT */}

        <div className='flex items-center gap-4'>
          <Link to=''>Homepage</Link>
          <Link to=''>About</Link>
          <Link to=''>Contact</Link>
          <Link to=''>Stores</Link>

          <div className='flex items-center gap-4'>
            <AiOutlineSearch size={20} className='text-gray-600' />
            <CiUser size={20} className='text-gray-600' />
            <BsHeart size={20} className='text-gray-600' />

            <div className='relative'>
              <PiShoppingCartLight size={20} className='text-gray-600' onClick={() => setShowCart(true) } />
              <span className='w-[20px] h-[20px] flex justify-center items-center rounded-full absolute top-[-10px] right-[-10px] bg-primaryColor text-sm text-white '>1</span>
            </div>
          </div>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  )
}
