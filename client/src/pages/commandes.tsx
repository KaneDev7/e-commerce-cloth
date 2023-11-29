import React, { useContext, useEffect, useState } from 'react'

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

import { baseRequest } from '@/axios/baseRequest'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

import { UserContext } from '@/context/UserContext'
import useFetch from '@/hooks/useFetch'
import ProductLoad from '@/components/ProductLoad'

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


export default function Commands() {

    const { user } = useContext(UserContext)
    const [url, setUrl] = useState<string>('')
    const { data: commands, isLoading, error } = useFetch(url)

    useEffect(() => {
        setUrl(`/commands?populate=*&[filters][username]=${user?.user?.username}`)
    }, [user])

    if (isLoading) {
        return <div className='flex justify-center items-center h-[500px] mt[100px] '>
          <ProductLoad />
        </div>
      }
    return (
        <div className='globalWidth mt-10 bg-white'>
            <div className='flex-1 bg-white p-5 '>
                <h1 className='text-xl  mb-5'>Historique de vos commandes</h1>

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
                            commands?.map(item => (

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

                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
