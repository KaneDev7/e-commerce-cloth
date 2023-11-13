

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
import { UserContext } from "@/context/UserContext"
import { useContext, useState } from "react"
import { baseRequest } from "@/axios/baseRequest"


type Inputs = {
  example: string
  exampleRequired: string
}

export default function Login() {
  const [message, setMessage] = useState(null)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(
      JSON.stringify({identifier : data.email, password : data.password})
    )
    try {
      const response = await baseRequest.post('http://localhost:1337/api/auth/local',

        JSON.stringify({identifier : data.email, password : data.password}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })

      setUser(response?.data)
      sessionStorage.setItem('user', JSON.stringify(response?.data))
      navigate('/')

    } catch (err: any) {
      console.log(err)
      setMessage(err.response.data.error.message)
    }
  }

  return (
    <div className='globalWidth  flex justify-center items-center '>
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
            <Link to='/' className="text-sm hover:underline text-black/60">Mot de passe oublié ?</Link>
          </div>

          <Button type="submit" className="mt-5 bg-primaryColor/95 hover:bg-primaryColor">
            se connecter
          </Button>
        </form>
        <p className="text-sm mt-5">Pas de compte ? <Link to='/register' className="text-sm hover:underline text-blue-500">S'inscrir </Link> pour en creer un  </p>
      </div>
    </div>

  )
}

