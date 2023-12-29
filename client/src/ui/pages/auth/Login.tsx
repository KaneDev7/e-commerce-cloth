import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/ui/components/ui/button"

import { Input } from "@/ui/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "@/services/context/UserContext"
import { useContext, useState } from "react"
import { UserContextType } from '@/Layout'
import { connectUser } from '@/domain/use-case/users/auth.useCase'


type Inputs = {
  example: string
  exampleRequired: string
}

export default function Login() {
  const [message, setMessage] = useState('')
  const { setUser }: UserContextType = useContext(UserContext)
  const navigate = useNavigate()
  const params = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { userData, error } = await connectUser({ identifier: data.email, password: data.password })
    if (error) return setMessage(error)
    setUser(userData)
    if (params.frompath) return navigate(`/${params?.frompath}/${params?.id}`)
    navigate(`/`)
  }

  return (
    <>
      <NavbarFixed />
      <Navbar />
      <div className='globalWidth  flex justify-center items-center px5'>
        <div className=' bg-white shadow-md px-7 py-10 mt-20' >
          <h1 className="font-bold">CONNECTEZ-VOUS À VOTRE COMPTE</h1>

          {
            message && <p className="bg-red-100 text-red-700 text-sm mt-5  p-3"> {message} </p>
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

            {/* include validation with required or other standard HTML validation rules */}

            <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
              <Label htmlFor="password" className="text-sm font-bold">Mot de passe</Label>
              <Input type="password" id="password" placeholder="Mot de pass"
                className={`${errors.password && 'border-red-400 border'} `}
                {...register("password", { required: true })} />
            </div>
            <div className={`text-red-400 text-sm mt-3 `} >
              {errors.password && <span className="text-sm">Verifier ce champ</span>}
            </div>

            <div>
              <Link to='/forgotpassword' className="text-sm hover:underline text-black/60">Mot de passe oublié ?</Link>
            </div>

            <Button type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
              se connecter
            </Button>
          </form>
          <p className="text-sm mt-5">Pas de compte ? <Link to='/register' className="text-sm hover:underline text-blue-500">S'inscrir </Link> pour en creer un  </p>
        </div>
      </div>
    </>


  )
}

