import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'


import { Button } from "@/ui/components/ui/button"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "@/services/context/UserContext"
import { UserContextType } from '@/Layout'


type Inputs = {
    example: string
    exampleRequired: string
}

export default function Informations() {
    const { user } : UserContextType = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
            <NavbarFixed />
            <Navbar />
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
        </>

    )
}

