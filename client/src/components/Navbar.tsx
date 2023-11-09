import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineSearch } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { BsHeart } from 'react-icons/bs'
import { PiShoppingCartLight } from 'react-icons/pi'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Cart from './Cart'
import { GlobalContext } from '../context/ContextProvider'
import { useSelector } from 'react-redux'
import NavBarMobile from './NavBarMobile'
import useFetch from '../hooks/useFetch'

export default function Navbar() {

  const { data: categories, isLoading, error } = useFetch('/categories')
  const { showCart, setShowCart } = useContext(GlobalContext)
  const { showMenuMobile, setShowMenuMobile } = useContext(GlobalContext)
  const [subCatStatus, setSubCatStatus] = useState('hidden')
  const navigate = useNavigate()
  const products = useSelector(state => state.cart.products)

  return (
    <div className='relative '>
      {showMenuMobile && <NavBarMobile />}

      <div className='h-[80px] flex justify-between items-center pb-5 pt-3  globalWidth'>

        {/* LEFT */}
        <div className='lg:flex items-center gap-4 hidden '>

          {/* <div className='flex items-center'>
            <img src="/images/en.png" alt="" />
            <FiChevronDown />
          </div>

          <div className='flex items-center'>
            <span>USD</span>
            <FiChevronDown />
          </div> */}
          <Link onMouseEnter={() => setSubCatStatus('hidden')} to='/'>Accueil</Link>
          <div
            onMouseEnter={() => setSubCatStatus('flex')}

            className='relative z-40'>
            <p
              // onMouseEnter={() => setSubCatStatus('flex')}
              className='cursor-pointer'>Produits</p>

            <div
              onMouseLeave={() => setSubCatStatus('hidden')}

              className={`absolute ${subCatStatus} flex-col space-y-4 mt-2 p-3 z-30 bg-white shadow-sm shadow-black/5 `}>
              {
                categories.map(categorie => (
                  <Link  className='capitalize whitespace-nowrap' onClick={() => setSubCatStatus('hidden')} to={`/products/${categorie?.id}`}>
                  {categorie?.attributes.title} 
                  </Link>
                ))
              }
              {/* <Link  className='whitespace-nowrap' to='/'>Chaussures</Link>
              <Link  className='whitespace-nowrap' to='/'>Sacs & Accessoires</Link> */}
            </div>
          </div>

          <Link onMouseEnter={() => setSubCatStatus('hidden')} to=''>A propos</Link>
          <Link onMouseEnter={() => setSubCatStatus('hidden')} to=''>Contact</Link>
        </div>

        {/* CENTER */}

        <div className=''>
          <Link to='/' className='text-4xl font-bold' >DMRSTORE</Link>
        </div>

        {/* RIGHT */}

        <div className='flex items-center gap-4'>

          <div className='flex items-center gap-4'>
            <AiOutlineSearch size={20} className='text-gray-600' />
            <CiUser size={20} className='text-gray-600' />
            <BsHeart size={20} className='text-gray-600' />

            <div className='relative'>
              <PiShoppingCartLight size={20} className='text-gray-600' onClick={() => setShowCart(true)} />
              {products.length !== 0 &&
                <span className='w-[20px] h-[20px] flex justify-center items-center rounded-full absolute top-[-10px] right-[-10px] bg-primaryColor text-sm text-white '>{products.length} </span>
              }
            </div>
          </div>
          <AiOutlineMenu onClick={() => setShowMenuMobile(true)} size={25} className='lg:hidden block' />
        </div>


      </div>
      {showCart && <Cart />}
    </div>
  )
}
