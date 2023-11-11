

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
import { Link } from "react-router-dom"


type Inputs = {
  example: string
  exampleRequired: string
}

export default function Login() {
  // ...

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className='globalWidth  flex justify-center items-center '>
      <div className='w-[300px]  bg-white shadow-md px-7 py-10 mt-20' >
        <h1 className="font-bold">CONNECTEZ-VOUS À VOTRE COMPTE</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input type="email" id="email" placeholder="Email"  {...register("example", { required: true })} />
          </div>
          <div className="text-red-400 text-sm mt-3">
            {errors.example && <span>This field is required</span>}
          </div>
          {/* include validation with required or other standard HTML validation rules */}

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="email" className="text-sm">Password</Label>
            <Input type="password" id="password" placeholder="password" {...register("exampleRequired", { required: true })} />
          </div>

          {/* errors will return when field validation fails  */}
          <div className="text-red-400 text-sm mt-3">
            {errors.exampleRequired && <span>This field is required</span>}
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

