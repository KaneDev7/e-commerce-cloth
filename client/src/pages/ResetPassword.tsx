

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
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { baseRequest } from "@/axios/baseRequest"
import { UserContext } from "@/context/UserContext"


type Inputs = {
    example: string
    exampleRequired: string
}

export default function ResetPassword() {
    const [isPasswordReset, setIsPasswordreset] = useState(false)
    const [message, setMessage] = useState(null)
    const { setUser } = useContext(UserContext)
    const { code } = useParams()
    const navigate = useNavigate()

    // console.log({ code })
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            return setMessage('les mots de passes ne se correspondent pas')
        }
        setMessage(null)
        console.log(

        )
        try {
            const response = await baseRequest.post('http://localhost:1337/api/auth/reset-password',
                JSON.stringify({
                    code,
                    password: data.password,
                    passwordConfirmation: data.confirmPassword
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })

            console.log(response?.data)
            setIsPasswordreset(true)

        } catch (err: any) {
            console.log(err)
            setMessage(err.response.data.error.message)
        }
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

    )
}




//