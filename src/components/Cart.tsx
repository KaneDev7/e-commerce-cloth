import {useContext} from 'react' 

import { MdOutlineDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GlobalContext } from '../context/ContextProvider'

type ContextType = {
  setShowCart : React.Dispatch<React.SetStateAction<Boolean>>
}
export default function cart() {
  const {setShowCart}  =  useContext(GlobalContext)

  const image = "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=1600"
  return (
    <div className='w-[600px] absolute top-[80px] right-0 z-10 p-5 bg-white shadow-md '>
     <div className='flex justify-between items-center'>
     <h1 className='text-2xl text-black/70'>Products in your Cart</h1>
     <AiFillCloseCircle size={25}  className='text-primaryColor hover:text-primaryColorActif' onClick={()=> setShowCart(false)}  />
     </div>
      <div className='flex justify-between mt-5 gap-5 relative'>
        <img src={image} alt="" className='w-[100px] h-[100px] ' />

        <div className='flex flex-col gap-2 '>
          <h2 className='text-xl text-black/70 mb-7'>Long Sleeve Graphic T-shirt</h2>
          <p className='text-sm text-black/70'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi aliquam inventore qui ipsum, cum voluptates expedita, laboriosam cumque </p>
          <p className='text-primaryColor text-sm'>1 x $ 19.9  </p>
        </div>
        
        <button className=''>
          <MdOutlineDelete color='red' size={25} />
        </button>

      </div>
    </div>
  )
}
