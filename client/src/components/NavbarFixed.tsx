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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Cart from './Cart'
import { GlobalContext } from '../context/ContextProvider'
import { useDispatch, useSelector } from 'react-redux'
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


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { UserContext } from '@/context/UserContext'
import { Button } from './ui/button'
import { setShowSearchPage } from '@/redux/showSearchPageSlice';
import { UserContextType } from '@/Layout';

const SCROLL_LIMIT = 400


export default function Navbar() {

  // const { data: categories, isLoading, error } = useFetch('/categories')
  const { data: vetementsType } = useFetch('/types')
  const { data: chaussursType } = useFetch('/nav-chaussures')
  const { data: accessoiresType } = useFetch('/nav-accessoires')

  const { user, setUser }: UserContextType = useContext(UserContext)

  const products = useSelector(state => state.cart.products)
  const [cart, setCart] = useState([])
  const [showNavFixed, setShowNavFixed] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    setUser(null)
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    if (user) {
      const filterCart = products.filter(item => item.username === user.user.username)
      setCart(filterCart)
    }
  }, [products, user])



  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > SCROLL_LIMIT) {
        setShowNavFixed(true)
      } else {
        setShowNavFixed(false)
      }
    })
  }, [showNavFixed])

  return (
    <div className={`fixed top-0 w-full z-50  bg-white shadow-sm duration-300 ${!showNavFixed && 'opacity-0'} `} >

      <div className='h-[80px] flex justify-between items-center globalWidth px-5 xs:px-0 '>

        {/* LEFT */}

        <div className=''>
          <Link to='/' className='sm:text-3xl text-xl  font-bold text-primaryColor' >DMRFSTORE</Link>
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
                          <li key={vetement?.id} className='mb-1'>
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
                        chaussursType.map((chaussure) => (
                          <li key={chaussure?.id} className='mb-1'>

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
                          <li key={accessoire?.id} className='mb-1'>
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

              {/* <NavigationMenuItem>
        <Link to='/'>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            A propos
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem> */}

            </NavigationMenuList>
          </NavigationMenu>
        </div>


        {/* RIGHT */}

        <div className='flex items-center gap-4'>

          <div className='flex items-center gap-4'>

            <AiOutlineSearch onClick={() => dispatch(setShowSearchPage(true))} size={20} className='text-gray-600' />

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex justify-center items-center gap-2 ${user && 'border p-2'} `} >
                <CiUser size={20} className='text-gray-600' />
                {
                  user &&
                  <p className='text-xs md:text-sm'>
                    {user.user.username}
                  </p>
                }
              </DropdownMenuTrigger>

              <BsHeart onClick={() => !user ? navigate('/login') : navigate('/favoris')} size={15} className='text-gray-600' />

              {
                user ?

                  <DropdownMenuContent>
                    <DropdownMenuLabel className='text-center'>
                      Mon Compte
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate('/infos')}>
                      <p className='flex justify-center items-center gap-1'>
                        <IoIosInformationCircle size={15} className='text-gray-600' />
                        <span className='text-md'> Informations </span>
                      </p>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link to='/commands'>
                        <p className='flex justify-center items-center gap-1'>
                          <MdDateRange size={15} className='text-gray-600' />
                          <span className='text-md'> Commandes </span>
                        </p>
                      </Link>
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

                  </DropdownMenuContent>
                  :

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

          <Sheet  >
            <SheetTrigger asChild>
              <AiOutlineMenu size={25} className='lg:hidden block' />
            </SheetTrigger>
            <SheetContent side='left' >
              <SheetHeader>
                <SheetTitle>MENU</SheetTitle>
              </SheetHeader>
              <div className='mt-10'>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Vetements</AccordionTrigger>
                    <AccordionContent>
                      {
                        vetementsType.map((vetement, index) => (
                          <li key={vetement?.id} className='mb-1'>
                            <Link to={`/products/${vetement?.attributes?.categorieId}`}
                              className='text-sm hover:underline whitespace-nowrap capitalize'>
                              <small className="text-sm font-medium leading-none">{vetement?.attributes?.title}</small>
                            </Link>
                          </li>
                        ))
                      }
                    </AccordionContent>

                  </AccordionItem>
                  {
                    <>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Chaussures</AccordionTrigger>
                        <AccordionContent>
                          {
                            chaussursType.map((chaussure) => (
                              <li key={chaussure?.id} className='mb-1'>

                                <Link to={`/products/${chaussure?.attributes?.categorieId}`}
                                  className='text-sm hover:underline whitespace-nowrap capitalize'>
                                  <small className="text-sm font-medium leading-none">{chaussure?.attributes?.title}</small>
                                </Link>
                              </li>
                            ))
                          }
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>Sacs & Accessoires</AccordionTrigger>
                        <AccordionContent>
                          {
                            accessoiresType.map((accessoire, index) => (
                              <li key={accessoire?.id} className='mb-1'>
                                <Link to={`/products/${accessoire?.attributes?.categorieId}`}
                                  className='text-sm hover:underline whitespace-nowrap capitalize'>
                                  <small className="text-sm font-medium leading-none">{accessoire?.attributes?.title}</small>
                                </Link>
                              </li>
                            ))
                          }
                        </AccordionContent>
                      </AccordionItem>
                    </>
                  }
                </Accordion>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          {/* <AiOutlineMenu onClick={() => setShowMenuMobile(true)} size={25} className='lg:hidden block' /> */}
        </div>


      </div>

    </div>
  )
}
