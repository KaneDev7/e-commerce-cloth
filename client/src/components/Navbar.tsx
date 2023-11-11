import { FiChevronDown } from 'react-icons/fi'
import {IoIosInformationCircle} from 'react-icons/io'
import {MdLocationOn, MdDateRange} from 'react-icons/md'
import {BiSolidLogOut} from 'react-icons/bi'
import {} from 'react-icons/'
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from '@/context/UserContext'

export default function Navbar() {

  const { data: categories, isLoading, error } = useFetch('/categories')
  const { showCart, setShowCart } = useContext(GlobalContext)
  const { showMenuMobile, setShowMenuMobile } = useContext(GlobalContext)
  const [subCatStatus, setSubCatStatus] = useState('hidden')
  const navigate = useNavigate()
  const products = useSelector(state => state.cart.products)
  const { user } = useContext(UserContext)

  return (
    <div className='relative px-5 bg-white shadow-sm'>
      {showMenuMobile && <NavBarMobile />}

      <div className='h-[80px] flex justify-between items-center  p-5 globalWidth'>

        {/* LEFT */}

        <div className=''>
          <Link to='/' className='text-3xl font-bold' >DMRFSTORE</Link>
        </div>


        {/* CENTER */}

        <div className='lg:flex items-center gap-4 hidden  '>

          <Link to='/' className='text-md '>Accueil</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className='text-md '>
              Produits
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              {
                categories.map(categorie => (
                  <Link className='capitalize whitespace-nowrap' to={`/products/${categorie?.id}`}>
                    <DropdownMenuItem>
                      {categorie?.attributes.title}
                    </DropdownMenuItem>
                  </Link>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>

          <Link className='text-md ' to=''>A propos</Link>
          <Link className='text-md ' to=''>Contact</Link>
        </div>

        {/* RIGHT */}

        <div className='flex items-center gap-4'>

          <div className='flex items-center gap-4'>

            <AiOutlineSearch size={20} className='text-gray-600' />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {
                  user ?
                    <p className='flex justify-center items-center gap-2'>
                      <CiUser size={20} className='text-gray-600' />
                      <span className='text-md'> {user?.user?.username} </span>
                    </p> :
                    <CiUser size={20} className='text-gray-600' />
                }
              </DropdownMenuTrigger>

              {
                user ?
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <p className='flex justify-center items-center gap-1'>
                        <IoIosInformationCircle size={15} className='text-gray-600' />
                        <span className='text-md'> Informations </span>
                      </p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                      <p className='flex justify-center items-center gap-1'>
                        <MdLocationOn size={15} className='text-gray-600' />
                        <span className='text-md'> Adress </span>
                      </p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                      <p className='flex justify-center items-center gap-1'>
                        <MdDateRange size={15} className='text-gray-600' />
                        <span className='text-md'> Commandes </span>
                      </p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                      <p className='flex justify-center items-center gap-1'>
                        <BiSolidLogOut size={15} className='text-gray-600' />
                        <span className='text-md'> Se decconecter </span>
                      </p>
                      </DropdownMenuItem>

                  </DropdownMenuContent> :

                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to='/login'>
                      <DropdownMenuItem>Se connecter</DropdownMenuItem>
                    </Link>

                  </DropdownMenuContent>

              }

            </DropdownMenu>

            {/* <CiUser size={20} className='text-gray-600' /> */}
            <BsHeart size={20} className='text-gray-600' />

            <div className='relative'>
              <DropdownMenu>
                <DropdownMenuTrigger className='text-sm'>
                  <PiShoppingCartLight size={20} className='text-gray-600' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-5'>
                  <DropdownMenuLabel className='text-xl'>Mon Panier</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Cart />
                </DropdownMenuContent>
              </DropdownMenu>
              {products.length !== 0 &&
                <span className='w-[20px] h-[20px] flex justify-center items-center rounded-full absolute top-[-10px] right-[-10px] bg-primaryColor text-sm text-white '>{products.length} </span>
              }
            </div>
          </div>
          <AiOutlineMenu onClick={() => setShowMenuMobile(true)} size={25} className='lg:hidden block' />
        </div>


      </div>

    </div>
  )
}
