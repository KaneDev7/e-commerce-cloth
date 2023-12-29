import { UserContext } from '@/services/context/UserContext'
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/components/ui/table"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/ui/components/ui/hover-card"

import { baseRequest } from '@/infrastructure/axios/baseRequest'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '@/ui/components/ui/button'
import { UserContextType } from '@/Layout'

const commandsTopBar = [
    'Nom du produit',
    'Date / Heure',
    'Taille',
    'Prix',
    'Qauntité',
    'Total',
    'Status',
    ''
]

const filterOptions = [
    'Tout',
    'Livré',
    'En attente',
    'Annulé'
]

export default function Admin() {

    const { user }: UserContextType  = useContext(UserContext)
    const [commands, setCommand] = useState([])
    const [itemsId, setItemsId] = useState([])
    const [filterSelected, setFilterSelected] = useState('tout')
    const [total, setTotal] = useState()
    const navigate = useNavigate()


    const individualIltemsChecked = (id, event) => {
        if (event.target.checked) {
            setItemsId(ids => [...ids, id])
        } else {
            setItemsId(itemsId.filter(ids => ids !== id))
        }
    }

    const allItemsChecked = (e) => {
        if (e.target.checked) {
            const allItemsId = commands.map(item => item.id)
            setItemsId(allItemsId)
        } else {
            setItemsId([])
        }
    }

    const deleteCommandes = async () => {
        for (const id of itemsId) {
            try {
                const response = await baseRequest.delete(`http://localhost:1337/api/commands/${id}`)
                toast.success(`commande ${id} supprimé avec succée `, {
                    hideProgressBar: true
                })
                setItemsId([])

            } catch (err: any) {
                console.log(err)
                toast.success(err.response.data.error.message, {
                    hideProgressBar: true
                })
            }
        }
    }


    const handleSetCommand = async (item, event) => {
        const updateItem = { ...item.attributes, statut: event.target.innerText.toLowerCase() }

        try {
            const response = await baseRequest.put(`http://localhost:1337/api/commands/${item.id}`,
                JSON.stringify({ data: updateItem }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.jwt}`,
                    },
                    withCredentials: true,
                })

            const newCommandeState = commands.map(command => {
                if (command.id === item.id) {
                    return {
                        id: item.id,
                        attributes: { ...updateItem }
                    }
                } else {
                    return command
                }

            })
            setCommand(newCommandeState)
            toast.success(`Opération réuissit`, {
                hideProgressBar: true
            })

        } catch (err: any) {
            console.log(err)
            toast.error(err.response.data.error.message, {
                hideProgressBar: true
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await baseRequest.get(`http://localhost:1337/api/commands?populate=*}`)
                if (filterSelected === 'tout') {
                    setCommand(response.data.data)
                } else {
                    const dataFilter = response.data.data.filter(item => item.attributes.statut === filterSelected.toLowerCase())
                    setCommand(dataFilter)
                }


            } catch (err: any) {
                console.log(err)
            }
        }
        fetchData()
    }, [itemsId, filterSelected]);

    useEffect(() => {
        const totalPrice = commands
            .filter(item => item.attributes.statut === 'livré')
            .reduce((acc, item) => {
                return acc += (parseFloat(item?.attributes?.price) * parseFloat(item?.attributes?.quantity))
            }, 0)
        setTotal(totalPrice)
    }, [commands])

    if (user?.user?.username?.toLowerCase() !== 'oumar kane') {
        return <>
            <NavbarFixed />
            <Navbar />
            <div className="w-full px-16 md:px-0 h-[calc(100vh-300px)] flex items-center justify-center">
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-sm ">
                    <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">403</p>
                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Non autorisé</p>
                    <a href="" onClick={() => navigate('/')} className="flex items-center space-x-2 bg-primaryColor opacity-95 hover:opacity-100 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Retourner à l'accueil </span>
                    </a>
                </div>
            </div>
        </>

    }

    return (
        <>
            <NavbarFixed />
            <Navbar />
            <div className='globalWidth mt-10'>
                <ToastContainer />
                <div className='w-full flex gap-10'>
                    {/* SIDEBAR */}
                    <div className='w-[300px]  h-screen lg:block hidden  bg-white sticky top-[100px] left-0 '>
                        sidebar
                    </div>

                    {/* BODY */}

                    <div className='flex-1 bg-white p-5 '>
                        <h1 className='text-xl  mb-5'>Gestion des commandes</h1>
                        <nav className='flex gap-3  my-5'>
                            {
                                filterOptions.map(item => (
                                    <Button
                                        style={{

                                        }}
                                        onClick={(e) => setFilterSelected(e.target.innerText.toLowerCase())}
                                        className={`text-black/60 hover:bg-gray-100 font-bold ${filterSelected.toLowerCase() === item.toLowerCase() && 'bg-gray-100 border'} `} >
                                        {item}
                                    </Button>
                                ))
                            }

                        </nav>
                        {
                            itemsId.length !== 0 &&
                            <div className='flex items-center gap-4 my-2'>
                                <p className='text-sm'> {itemsId.length} item{itemsId.length > 1 && 's'} selectionné{itemsId.length > 1 && 's'}</p>
                                <button
                                    onClick={deleteCommandes}
                                    className='bg-red-100 hover:bg-white border border-red-200
                                 text-red-700 font-medium py-1 px-2 text-xs rounded-sm' >
                                    Supprimer
                                </button>
                            </div>

                        }

                        <Table className='text-[12.5px] '>
                            <TableCaption>Gestionnaire de commande  </TableCaption>
                            <TableHeader className='w-full bg-gray-100 '>
                                <TableRow >
                                    <TableHead className='w-fit'>
                                        <input type="checkbox" onChange={allItemsChecked} className='w-fit' />
                                    </TableHead>
                                    {
                                        commandsTopBar.map(item => (
                                            <TableHead className='font-bold'>{item} </TableHead>
                                        ))
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    commands?.map(item => (

                                        <HoverCard>
                                            <HoverCardTrigger
                                                asChild
                                                style={{
                                                    background: itemsId.includes(item.id) && '#dddddd3f'
                                                }}
                                            >
                                                <TableRow >

                                                    <TableCell className='w-fit'>
                                                        <input type="checkbox" checked={itemsId.includes(item.id)} onChange={() => individualIltemsChecked(item.id, event)} className='w-fit ' />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <div className=' flex gap-5 w-[200px] '>
                                                            <img src={import.meta.env.VITE_API_UPLOAD + item?.attributes.img} alt="" className='w-[35px] h-[35px] object-cover' />
                                                            <p>
                                                                {item?.attributes?.name}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(item?.attributes?.createdAt).toLocaleDateString() + ' - ' +
                                                            new Date(item?.attributes?.createdAt).toLocaleTimeString()
                                                        }
                                                    </TableCell>

                                                    <TableCell > {item?.attributes?.size} </TableCell>

                                                    <TableCell>{item?.attributes?.price} $</TableCell>
                                                    <TableCell> {item?.attributes?.quantity} </TableCell>
                                                    <TableCell>{item?.attributes?.price * item?.attributes?.quantity} $</TableCell>
                                                    <TableCell >
                                                        <p style={{
                                                            background: item?.attributes?.statut === 'en attente' ? '#f5a207b1' :
                                                                item?.attributes?.statut === 'livré' ? '#029b02b1' : '#f12323bb'
                                                        }}
                                                            className='p-[2px] w-[80px]  rounded-md text-center text-white capitalize'
                                                        >{item?.attributes?.statut}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <HiOutlineDotsHorizontal />
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent >
                                                                <DropdownMenuItem onClick={() => handleSetCommand(item, event)}>En attente</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleSetCommand(item, event)}>Livré</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleSetCommand(item, event)}>Annulé</DropdownMenuItem>
                                                            </DropdownMenuContent>

                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            </HoverCardTrigger>


                                            <HoverCardContent className="w-100">
                                                <div className="flex gap-5">
                                                    <FaUserCircle size={50} className='text-black/25' />

                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-semibold">
                                                            {item?.attributes?.username}
                                                        </h4>
                                                        <p className="text-sm text-[12.4px] ">
                                                            <span className='mr-3'>  Email : </span>
                                                            {item?.attributes?.email}
                                                        </p>
                                                        <p className="text-sm text-[12.4px] ">
                                                            <span className='mr-3'>  Adress : </span>
                                                            {item?.attributes?.adress}
                                                        </p>

                                                        <p className="text-sm text-[12.4px] ">
                                                            <span className='mr-3'>  Téléphone : </span>
                                                            {item?.attributes?.phone}
                                                        </p>

                                                        <p className="text-sm text-[12.4px] ">
                                                            <span className='mr-3'>  Date/heure : </span>
                                                            {
                                                                new Date(item?.attributes?.createdAt).toLocaleDateString() + ' - ' +
                                                                new Date(item?.attributes?.createdAt).toLocaleTimeString()
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>

                                    ))
                                }
                                {
                                    filterSelected === 'tout' &&
                                    <TableRow >
                                        <TableCell  >
                                            <p className='absolute right-0 text-sm font-bold'> Total : {total} $ </p>
                                        </TableCell>
                                    </TableRow>
                                }


                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        </>

    )
}
