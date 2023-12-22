import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

import { useSelector } from 'react-redux'

// import required modules
import { UserContextType } from '@/Layout';
import { useContext } from 'react';
import { UserContext } from '@/services/context/UserContext';
import FavorisCard from '@/ui/components/FavorisCard';
import ProductLoad from '@/ui/components/ProductLoad';
import { useNavigate } from 'react-router-dom';

type FetureType = { type: string }

export type ProductType = {
  id: number,
  img: string,
  img2?: string
  title: string,
  isNew?: boolean
  oldPrice: number,
  price: number
}

export default function Favoris() {

  const { user }: UserContextType = useContext(UserContext)
  const favoris = useSelector((state) => state.favoris.data);
  const loading = useSelector((state) => state.favoris.loading);
  const navigate = useNavigate()

 
  if (loading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <ProductLoad />
    </div>
  }
   
  if(!user){
    return navigate('/login')
  }


  if (favoris.length > 0) {
    return (
      <div>
        <Navbar />
        <NavbarFixed />
        <div className="flex flex-col items-center gap-5 mt-20 mx-20 globalWidth 2xl:px-0 px-5">
         <h2 className='text-3xl '>Mes favoris</h2>
         <p className='text-xl'>{favoris.length } article{favoris.length > 1 && 's'} </p>
          {
            favoris.map(product => (
            <FavorisCard product={product} />
            ))
          }
        </div>
      </div>
    )
  }

}
