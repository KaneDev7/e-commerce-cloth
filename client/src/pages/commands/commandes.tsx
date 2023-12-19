import { useContext, useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



import { UserContext } from '@/context/UserContext'
import ProductLoad from '@/components/ProductLoad'
import { Button } from '@/components/ui/button'
import { baseRequest } from '@/axios/baseRequest'
import Navbar from '@/components/Navigation/Navbar'
import NavbarFixed from '@/components/Navigation/NavbarFixed'
import { UserContextType } from '@/Layout'
import { TypeItem } from '@/redux/cartSlice'


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

export default function Commands() {

    const { user }: UserContextType = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [filterSelected, setFilterSelected] = useState('tout')
    const [commands, setCommand] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await baseRequest.get(`http://localhost:1337/api/commands?populate=*&[filters][username]=${user?.user?.username}`)
                if (filterSelected === 'tout') {
                    setCommand(response?.data?.data)
                } else {
                    const dataFilter = response?.data?.data?.filter(item => item.attributes.statut === filterSelected.toLowerCase())
                    setCommand(dataFilter)
                }
                setIsLoading(false)

            } catch (err: any) {
                console.log(err)
            }
        }
        fetchData()
    }, [filterSelected, user]);

    if (isLoading) {
        return <div className='flex justify-center items-center h-[500px] mt[100px] '>
            <ProductLoad />
        </div>
    }

    return (
        <>
            <NavbarFixed />
            <Navbar />
            <div className='globalWidth mt-10 bg-white'>
                <div className='flex-1 bg-white p-5 '>
                    <h1 className='text-xl  mb-5'>Historique de vos commandes</h1>
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
                    <Table className='text-[12.5px] '>
                        <TableCaption>Gestionnaire de commande  </TableCaption>
                        <TableHeader className='w-full bg-gray-100 '>
                            <TableRow >
                                {
                                    commandsTopBar.map(item => (
                                        <TableHead className='font-bold'>{item} </TableHead>
                                    ))
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                commands?.map((item : TypeItem) => (

                                    <TableRow >

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

                                        <TableCell>{item?.attributes?.price} fcfa</TableCell>
                                        <TableCell> {item?.attributes?.quantity} </TableCell>
                                        <TableCell>{item?.attributes?.price * item?.attributes?.quantity} fcfa</TableCell>
                                        <TableCell >
                                            <p style={{
                                                background: item?.attributes?.statut === 'en attente' ? '#f5a207b1' :
                                                    item?.attributes?.statut === 'livré' ? '#029b02b1' : '#f12323bb'
                                            }}
                                                className='p-[2px] w-[80px]  rounded-md text-center text-white capitalize'
                                            >{item?.attributes?.statut}</p>
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </div>
            </div>
        </>

    )
}
