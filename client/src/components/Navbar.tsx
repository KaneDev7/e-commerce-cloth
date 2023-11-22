import { FiChevronDown } from 'react-icons/fi'
import { MdAdminPanelSettings } from "react-icons/md";
import { IoIosInformationCircle } from 'react-icons/io'
import { MdLocationOn, MdDateRange } from 'react-icons/md'
import { BiSolidLogOut } from 'react-icons/bi'
import { } from 'react-icons/'
import { AiOutlineSearch } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { BsHeart } from 'react-icons/bs'
import { PiShoppingCartLight } from 'react-icons/pi'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { UserContext } from '@/context/UserContext'
import { Button } from './ui/button'

export default function Navbar() {

  const { data: categories, isLoading, error } = useFetch('/categories')
  const { data: vetementsType } = useFetch('/types')
  const { data: chaussursType } = useFetch('/nav-chaussures')
  const { data: accessoiresType } = useFetch('/nav-accessoires')



  const { showCart, setShowCart } = useContext(GlobalContext)
  const { showMenuMobile, setShowMenuMobile } = useContext(GlobalContext)
  const [subCatStatus, setSubCatStatus] = useState('hidden')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [cart, setCart] = useState([])
  const products = useSelector(state => state.cart.products)


  const handleLogOut = () => {
    setUser(null)
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  // console.log(products,user.user.username )
  useEffect(() => {
    if (user) {
      const filterCart = products.filter(item => item.username === user.user.username)
      setCart(filterCart)

    }

  }, [products, user])

  return (
    <div className='relative px-5 bg-white shadow-sm'>
      {showMenuMobile && <NavBarMobile />}

      <div className='h-[80px] flex justify-between items-center   globalWidth'>

        {/* LEFT */}

        <div className=''>
          <Link to='/' className='text-3xl font-bold text-primaryColor' >DMRFSTORE</Link>
        </div>


        {/* CENTER */}
        <div className='lg:flex items-center gap-4 hidden font-bold '>

          <NavigationMenu className='z-[50] flex justify-center'>
            <NavigationMenuList className='w-full'>
              <NavigationMenuItem>
                <Link to='/'>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>


              <NavigationMenuItem>
                <NavigationMenuTrigger>Vetements</NavigationMenuTrigger>
                <NavigationMenuContent >

                  <div className='p-5 flex gap-20 w-fit '>
                    <ul>
                      <h1 className='text-primaryColor font-bold mb-5'>VETEMENTS</h1>
                      {
                        vetementsType.map((vetement, index) => (
                          <li key={index} className='mb-1'>
                            <Link to={`/products/${vetement?.attributes?.categorieId}`}
                              className='text-sm hover:underline whitespace-nowrap capitalize'>
                              <small className="text-sm font-medium leading-none">{vetement?.attributes?.title}</small>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                    <div className='bg-gray-400 w-[200px] h-[200px] p-2 rounded-sm'>
                      <img src="/images/collection_vetement/nav_vetement.jpg" alt="nav_vetement"
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Chaussures</NavigationMenuTrigger>
                <NavigationMenuContent >

                  <div className='p-5 flex gap-20 w-fit '>
                    <ul>
                      <h1 className='text-primaryColor font-bold mb-5'>CHAUSSURES</h1>
                      {
                        chaussursType.map((chaussure, index) => (
                          <li className='mb-1'>
                            <Link to={`/products/${chaussure?.attributes?.categorieId}`}
                              className='text-sm hover:underline whitespace-nowrap capitalize'>
                              <small className="text-sm font-medium leading-none">{chaussure?.attributes?.title}</small>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                    <div className='bg-gray-400 w-[200px] h-[200px] p-2 rounded-sm'>
                      <img src="/images/collection-chaussures/sport.jpg" alt="nav_vetement"
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Sacs & Accessoires</NavigationMenuTrigger>
                <NavigationMenuContent >

                  <div className='p-5 flex gap-20 w-fit '>
                    <ul>
                      <h1 className='text-primaryColor font-bold mb-5'>CHAUSSURES</h1>
                      {
                        accessoiresType.map((accessoire, index) => (
                          <li className='mb-1'>
                            <Link to={`/products/${accessoire?.attributes?.categorieId}`}
                              className='text-sm hover:underline whitespace-nowrap capitalize'>
                              <small className="text-sm font-medium leading-none">{accessoire?.attributes?.title}</small>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                    <div className='bg-gray-400 w-[200px] h-[200px] p-2 rounded-sm'>
                      <img src="/images/collection_sac_et_accessoire/pochette.jpg" alt="nav_vetement"
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to='/'>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    A propos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>



        {/* RIGHT */}

        <div className='flex items-center gap-4'>

          <div className='flex items-center gap-4'>

            <AiOutlineSearch size={20} className='text-gray-600' />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CiUser size={20} className='text-gray-600' />
              </DropdownMenuTrigger>

              {
                user ?
                  <DropdownMenuContent>
                    <DropdownMenuLabel className='text-center'>
                      {user.user.username}
                    </DropdownMenuLabel>
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

                    {
                      user.user.username.toLowerCase() === 'oumar kane' &&
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <p className='flex justify-center items-center gap-1'>
                          <MdAdminPanelSettings size={15} className='text-gray-600' />
                          <span className='text-md'> Admin </span>
                        </p>
                      </DropdownMenuItem>
                    }

                    <DropdownMenuItem onClick={handleLogOut}>
                      <p className='flex justify-center items-center gap-1'>
                        <BiSolidLogOut size={15} className='text-gray-600' />
                        <span className='text-md'> Se decconecter </span>
                      </p>
                    </DropdownMenuItem>

                  </DropdownMenuContent> :

                  <DropdownMenuContent>
                    <Link to='/login'>
                      <DropdownMenuItem>Se connecter</DropdownMenuItem>
                    </Link>

                    <Link to='/register'>
                      <DropdownMenuItem>S'inscrire</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>

              }

            </DropdownMenu>

            {/* <CiUser size={20} className='text-gray-600' /> */}
            <BsHeart size={20} className='text-gray-600' />
            {
              !user ?
                <PiShoppingCartLight onClick={() => !user && navigate('/login')} size={20} className='text-gray-600' /> :
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
                  {(cart.length !== 0 && user) &&
                    <span className='w-[20px] h-[20px] flex justify-center items-center rounded-full absolute top-[-10px] right-[-10px] bg-primaryColor text-sm text-white '>{cart.length} </span>
                  }
                </div>
            }


          </div>
          <AiOutlineMenu onClick={() => setShowMenuMobile(true)} size={25} className='lg:hidden block' />
        </div>


      </div>

    </div>
  )
}
