import Assurance from '@/components/Assurance'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/context/UserContext'
import { getCommandFromClient } from '@/lib/nodeMailer/getCommand'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Panier() {
    const { user } = useContext(UserContext)

    const products = useSelector(state => state.cart.products)
    const [allArticles, setAllArticle] = useState(0)
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()

    console.log('allArticles', allArticles)
    console.log('total', total)

    const commande = () => {
        const commandesDetail = {
            user: {
                name: user.user.username,
                email: user.user.email,
            },
            commande: [...cart]
        }
        getCommandFromClient(commandesDetail)
    
    }

    useEffect(() => {
        const totalQuantity = cart.reduce((acc, item) => {
            return acc += item.quantity
        }, 0)

        setAllArticle(totalQuantity)
    }, [cart])

    useEffect(() => {
        const totalPrice = cart.reduce((acc, item) => {
            return acc += item.price
        }, 0)

        setTotal(totalPrice)
    }, [cart])


    useEffect(() => {
        if (user) {
            const filterCart = products.filter(item => item.username === user.user.username)
            setCart(filterCart)
        }

    }, [products, user])

    return (
        <div className='globalWidth my-20 '>
            <h1 className='title'>PANIER</h1>

            <div className='w-full flex gap-4 justify-between flex-wrap mt-5   '>
                <div className='w-full flex-1 '>

                    <div className='w-full h-[30px] flex justify-between '>
                        <p className='w-[300px] '>Articles</p>
                        <p className='w-[100px]'>Quantité</p>
                        <p className=' text-right'></p>
                    </div>

                    {cart?.map(item => (
                        <div key={item.id} className='bg-white p-4 mb-3 shadow-sm'>
                            <div className='flex justify-between  gap-5  '>
                                <div className='w-[300px]  flex gap-5 '>
                                    <img src={import.meta.env.VITE_API_UPLOAD + item.img} alt="" className='w-[80px] h-[80px] object-cover' />

                                    <div className='flex flex-col gap-2 '>
                                        <h1 onClick={() => navigate(`/product/${item.id}`)} className=' text-black text-[16px] hover:underline cursor-pointer'>{item.title} </h1>
                                        {/* <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p> */}
                                        <p className='text-primaryColor text-md font-bold'> $ {item.price} </p>
                                    </div>
                                </div>

                                {/* AJOUT DE QUANTITE */}
                                <div className='w-[100px] flex justify-center items-center '>
                                    <h2 className='text-md text-black/80'>{item.quantity} article{item.quantity > 1 && "s"} </h2>
                                </div>

                                <button className=''>
                                    <MdDelete className='text-red-500 hover:text-red-600' size={25} onClick={() => dispatch(removeItem(item.id))} />
                                </button>

                            </div>
                        </div>
                    ))
                    }
                </div>

                <div className=' w-[400px] shadow-sm mt-[30px]  '>
                    <div className='bg-white mb-5'>
                        <div className='flex flex-col gap-3  p-5 border-b font-bold text-black/70  '>
                            <p className='flex justify-between text-sm'>
                                <span> {allArticles} article{allArticles > 1 && "s"}  </span>
                                <span className='text-[16px]  '> {total}  $</span>
                            </p>

                            <p className='flex justify-between text-sm'>
                                <span> Livraison  </span>
                                <span className='font-bold'> 2000 CFA </span>
                            </p>
                        </div>

                        <div className='bg-white p-5 border-b'>

                            <div className='flex flex-col gap-3  font-bold text-black/70  '>
                                <p className='flex justify-between text-sm'>
                                    <span> Total TTC </span>
                                    <span className='text-[16px] text-red-400 '> {total + 2000}  $</span>
                                </p>
                            </div>
                        </div>

                        <div className='bg-white p-7 '>
                            <Button onClick={() => commande()} className='w-full bg-green-700 hover:bg-green-800'>
                                COMMANDER A UN CLIC
                            </Button>
                        </div>
                    </div>
                    <Assurance />
                </div>

            </div>
        </div>
    )
}
