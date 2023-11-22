import { UserContext } from '@/context/UserContext'
import { UserCheck } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useFetch from '@/hooks/useFetch'

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function Admin() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { data: commands, isLoading, error } = useFetch(`/commands?populate=*`)


    console.log(commands)
    if (user?.user?.username?.toLowerCase() !== 'oumar kane') {
        return <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">403</p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Page avec accée limiter</p>
                <a href="" onClick={() => navigate('/')} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Retourner à l'accueil </span>
                </a>
            </div>
        </div>
    }

    return (
        <div className='globalWidth mt-10'>
            <div className='w-full flex gap-10'>
                {/* SIDEBAR */}
                <div className='w-[300px]  h-screen  bg-white'>
                    sidebar
                </div>

                <div className='flex-1 bg-white p-5'>
                    <h1>Commandes</h1>
                    <Table className='text-[12.5px] '>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom du produit</TableHead>
                                <TableHead>Nom d'utilisateur </TableHead>
                                <TableHead>Date / Heure</TableHead>
                                <TableHead>Taille</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Qauntité</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                commands?.map(item => (
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className=' flex gap-5 w-[200px] '>
                                                <img src={import.meta.env.VITE_API_UPLOAD + item?.attributes.img} alt="" className='w-[60px] h-[60px] object-cover' />
                                                <p>
                                                    {item?.attributes?.name}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.attributes?.username} </TableCell>
                                        <TableCell>
                                            {new Date(item?.attributes?.createdAt).toLocaleDateString() + ' - ' + 
                                            new Date(item?.attributes?.createdAt).toLocaleTimeString()
                                            
                                            }
                                        </TableCell>

                                        <TableCell > {item?.attributes?.size} </TableCell>

                                        <TableCell>{item?.attributes?.price } $</TableCell>
                                        <TableCell> {item?.attributes?.quantity} </TableCell>
                                        <TableCell>{item?.attributes?.price * item?.attributes?.quantity } $</TableCell>
                                        <TableCell >
                                            <p style={{
                                                background: item?.attributes?.statut === 'en attente' ? '#ffa600a5' :
                                                    item?.attributes?.statut === 'livré' ? '#029b02b1' : 'red'
                                            }}
                                                className='p-[2px] rounded-md text-center text-white capitalize'
                                            >{item?.attributes?.statut}</p>
                                        </TableCell>

                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}
