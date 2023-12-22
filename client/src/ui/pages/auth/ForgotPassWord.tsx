import { baseRequest } from '@/services/axios/baseRequest'
import { Button } from '@/ui/components/ui/button'
import { Input } from '@/ui/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'

import  { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

type Inputs = {
    example: string
    exampleRequired: string
}

export default function ForgotPassWord() {
    const [message, setMessage] = useState<string | null> (null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email } = data

        try {
            const response = await baseRequest.post('http://localhost:1337/api/auth/forgot-password',

                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            if (response.data.ok) {
                setMessage('Veuillez consulter votre e-mail pour les instructions permettant de réinitialiser votre mot de passe')
            }

        } catch (err: any) {
            console.log(err)
        }
    }
    return (
        <>
            <NavbarFixed />
            <Navbar />
            <div className='globalWidth flex justify-center items-center '>
                <div className='max-w-[600px] bg-white shadow-md px-7 py-10 mt-20' >
                    <h1 className="font-bold">MOT DE PASSE OUBLIÉ ?</h1>
                    {message ?
                        message && <p className="bg-green-100 text-green-900  text-sm mt-5  p-3"> {message} </p> :

                        <p className='text-sm mt-3'>
                            Veuillez renseigner l'adresse e-mail que vous avez utilisée à la création de votre compte.
                            Vous recevrez un lien temporaire pour réinitialiser votre mot de passe.
                        </p>

                    }

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label htmlFor="email" className="text-sm font-bold">Email</Label>
                            <Input type="email" id="email" placeholder="Email" required
                                className={`${errors.email && 'border-red-400 border'} `}
                                {...register("email", { required: true })} />
                        </div>
                        <div className={`text-red-400 text-sm mt-3 `} >
                            {errors.email && <span className="text-sm">Verifier ce champ</span>}
                        </div>

                        <Button type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
                            {message ? "Réessayer" : "Lien de remise d'envoie"}
                        </Button>
                    </form>
                </div>
            </div>
        </>

    )
}
