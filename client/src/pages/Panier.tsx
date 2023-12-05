import { baseRequest } from '@/axios/baseRequest'
import Assurance from '@/components/Assurance'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/context/UserContext'
import { removeItem, reset } from '@/redux/cartSlice'
import { useContext, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'


type Inputs = {
    example: string
    exampleRequired: string
}

export default function Panier() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const products = useSelector(state => state.cart.products)
    const [cart, setCart] = useState([])
    const [allArticles, setAllArticle] = useState(0)
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    console.log(user)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (coordonnes) => {
        console.log(coordonnes)
        for (const item of cart) {

            const data = {
                data: {
                    name: item.title,
                    quantity: item?.quantity?.toString(),
                    price: item?.price?.toString(),
                    size: item?.size?.toString(),
                    username: item.username,
                    email: user.user.email,
                    adress: coordonnes.adress,
                    phone: coordonnes.phone,
                    img: item.img,
                    statut: 'en attente'
                }
            }
            console.log(JSON.stringify(data))
            try {
                const response = await baseRequest.post('http://localhost:1337/api/commands',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.jwt}`,
                        },
                        withCredentials: true,
                    })

                dispatch(reset())
                navigate('/commands')
                toast.success("Cmmande effectuée avec succée", {
                    hideProgressBar: true
                })

            } catch (err: any) {
                console.log(err)
                toast.success(err.response.data.error.message, {
                    hideProgressBar: true
                })
            }
        }
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
    }, [user, products])

    if (!user) {
        return navigate('/login')
    }



    return (
        <div className='globalWidth my-20 '>
            <ToastContainer />

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
                                    <img src={import.meta.env.VITE_API_UPLOAD + item?.img} alt="" className='w-[80px] h-[80px] object-cover' />

                                    <div className='flex flex-col  '>
                                        <h1 onClick={() => navigate(`/product/${item?.id}`)} className=' text-black text-[16px] hover:underline cursor-pointer'>{item.title} </h1>
                                        {/* <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p> */}
                                        <p className='text-primaryColor text-md font-bold'> $ {item?.price} </p>
                                        <div className='flex'>
                                            <p className='text-sm'> {item?.size?.toString()} </p>
                                        </div>
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
                            <Dialog>
                                {
                                    message && <p className="bg-red-100 text-red-700 text-sm mt-5  p-3"> {message} </p>
                                }
                                <DialogTrigger asChild>
                                    <Button
                                        className='w-full bg-green-700 hover:bg-green-800 text-white hover:text-white'
                                        variant="outline">
                                        COMMANDER A UN CLIC
                                    </Button>
                                </DialogTrigger>
                                
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Finaliser la commande</DialogTitle>
                                        <DialogDescription>
                                            Pour finaliser la commande , veuillez remplire les informations suivantes
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
                                            <Label htmlFor="adress" className="text-sm font-bold">Adress</Label>
                                            <Input type="text" id="adress" placeholder="Adress" required
                                                className={`${errors.adress && 'border-red-400 border'} `}
                                                {...register("adress", { required: true })} />
                                        </div>
                                        <div className={`text-red-400 text-sm mt-3 `} >
                                            {errors.adress && <span className="text-sm">Verifier ce champ</span>}
                                        </div>

                                        {/* include validation with required or other standard HTML validation rules */}

                                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                                            <Label htmlFor="phone" className="text-sm font-bold">Téléphone</Label>
                                            <Input type="number" id="phone" placeholder="Téléphone"
                                                className={`${errors.phone && 'border-red-400 border'} `}
                                                {...register("phone", { required: true })} />
                                        </div>
                                        <div className={`text-red-400 text-sm mt-3 `} >
                                            {errors.phone && <span className="text-sm">Verifier ce champ</span>}
                                        </div>

                                        <Button type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
                                            Poursuivre
                                        </Button>
                                    </form>

                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                    <Assurance />
                </div>

            </div>
        </div>
    )
}
