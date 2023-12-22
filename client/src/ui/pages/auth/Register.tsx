
import { useForm, SubmitHandler } from "react-hook-form"
import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'
import { Button } from "@/ui/components/ui/button"

import { Input } from "@/ui/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { baseRequest } from "@/services/axios/baseRequest"
import { UserContext } from "@/services/context/UserContext"
import { UserContextType } from "@/Layout"


type Inputs = {
    example: string
    exampleRequired: string
}

export default function Register() {
    const [message, setMessage] = useState(null)
    const { setUser }: UserContextType = useContext(UserContext)
    const navigate = useNavigate()

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
        try {
            const response = await baseRequest.post('http://localhost:1337/api/auth/local/register',
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })

            console.log(response?.data)

            setUser(response?.data)
            sessionStorage.setItem('user', JSON.stringify(response?.data))
            navigate('/')

        } catch (err: any) {
            console.log(err)
            setMessage(err.response.data.error.message)
        }
    }

    return (
        <>
            <NavbarFixed />
            <Navbar />
            <div className='globalWidth flex justify-center items-center '>
                <div className=' bg-white shadow-md px-7 py-10 mt-20' >
                    <h1 className="font-bold">VEUILLEZ VOUS INSCRIR</h1>
                    {
                        message && <p className="bg-red-100 text-red-700 text-sm mt-5  p-3"> {message} </p>
                    }


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label htmlFor="name" className="text-sm font-bold">Nom d'utilisateur</Label>

                            <Input type="text" id="name" placeholder="Nom d'utilisateur"
                                className={`${errors.username && 'border-red-400 border'} `}
                                {...register("username", { required: true, minLength: 7, maxLength: 25 })} />
                        </div>
                        <div className="text-red-400 text-sm mt-3">
                            {errors.username && <span className="text-sm">Le nom d'utilisateur doit etre enter 7 et 25 caractères</span>}
                        </div>


                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                            <Label htmlFor="email" className="text-sm font-bold">Email</Label>
                            <Input type="email" id="email" placeholder="Email" required
                                className={`${errors.email && 'border-red-400 border'} `}
                                {...register("email", { required: true })} />
                        </div>
                        <div className={`text-red-400 text-sm mt-3 `} >
                            {errors.email && <span className="text-sm">Verifier ce champ</span>}
                        </div>


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
                            S'inscrire
                        </Button>
                    </form>
                    <p className="text-sm mt-5">Vous avez deja un compte ? <Link to='/login' className="text-sm hover:underline text-blue-500">connectez-vous </Link>  </p>
                </div>
            </div>
        </>


    )
}

