

import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { baseRequest } from "@/axios/baseRequest"
import { UserContext } from "@/context/UserContext"
import useFetch from "@/hooks/useFetch"


type Inputs = {
    example: string
    exampleRequired: string
}

export default function Informations() {
    const { user} = useContext(UserContext)
    const navigate = useNavigate()


    return (
        <div className='globalWidth flex justify-center items-center '>
            <div className=' bg-white shadow-md px-7 py-10 mt-20' >
                <h1 className="font-bold">VOS INFORMATIONS PERSONNELLES</h1>

                <div className="mt-5 text-sm">
                    <p className="font-bold">Prénom & nom <span className="font-normal"> {user?.user?.username} </span>  </p>
                    <p className="font-bold">Adress-email <span className="font-normal">{user?.user?.email} </span>  </p>

                    <div className="flex flex-col mt-4">

                        <Button onClick={() => navigate('/forgotpassword')} className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
                            Changer de mot de passe
                        </Button>
                    </div>
                </div>

            </div>
        </div>

    )
}

