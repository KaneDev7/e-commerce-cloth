
import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/ui/components/ui/button"

import { Input } from "@/ui/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { baseRequest } from "@/infrastructure/axios/baseRequest"
import { AuthService } from '@/infrastructure/services/authService'


type Inputs = {
    example: string
    exampleRequired: string
}

export default function ResetPassword() {
    const [isPasswordReset, setIsPasswordreset] = useState(false)
    const [message, setMessage] = useState(null)
    const { code } = useParams()
    const navigate = useNavigate()

    // console.log({ code })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            return setMessage('les mots de passes ne se correspondent pas')
        }
        setMessage(null)
        const auth = new AuthService()
        await auth.resetPassword(code, {
            password: data.password,
            passwordConfirmation: data.confirmPassword
        })
        setIsPasswordreset(true)
    }

    if (isPasswordReset) {
        return <div className='globalWidth flex justify-center items-center '>
            <div className=' bg-white shadow-md px-7 py-10 mt-20' >
                <h1 className="text-green-600">Mot de pass initialiser avec succée</h1>
                <Button onClick={() => navigate('/login')} type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
                    Se connecter
                </Button>
            </div>
        </div>
    }
    return (
        <>
            <NavbarFixed />
            <Navbar />

            <div className='globalWidth flex justify-center items-center '>

                <div className=' bg-white shadow-md px-7 py-10 mt-20' >
                    <h1 className="font-bold">INITIALISER VOTRE MOT DE PASS</h1>
                    {
                        message && <p className="bg-red-100 text-red-700 text-sm mt-5  p-3"> {message} </p>
                    }


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label htmlFor="password" className="text-sm font-bold">Mot de passe</Label>
                            <Input type="password" id="password" placeholder="Mot de pass"
                                className={`${errors.password && 'border-red-400 border'} `}
                                {...register("password", { required: true })} />
                        </div>
                        <div className={`text-red-400 text-sm mt-3 `} >
                            {errors.password && <span className="text-sm">Verifier ce champ</span>}
                        </div>


                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label htmlFor="confirmPassword" className="text-sm font-bold">Comfirmer le mot de passe</Label>
                            <Input type="password" id="confirmPassword" placeholder="Comfirmer le mot de pass"
                                className={`${errors.confirmPassword && 'border-red-400 border'} `}
                                {...register("confirmPassword", { required: true })} />
                        </div>
                        <div className={`text-red-400 text-sm mt-3 `} >
                            {errors.confirmPassword && <span className="text-sm">Verifier ce champ</span>}
                        </div>


                        <Button type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
                            Enregistrer
                        </Button>
                    </form>
                </div>
            </div>
        </>


    )
}




//