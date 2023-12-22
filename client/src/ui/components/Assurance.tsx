 import {MdOutlineSecurity} from 'react-icons/md'
 import {FaTruck} from 'react-icons/fa'
 import {PiArrowsLeftRightLight,PiPhoneCallFill} from 'react-icons/pi'

export default function Assurance() {
  return (
    <div className='w-full backgroundBody'>
      <div className='flex gap-4 items-center p-4 border-b border-black/20 border-dashed'>
        <MdOutlineSecurity size={25} className='text-black/80' />
        <p className='text-black/70 text-sm'> Produit de qualité et authentique</p>
      </div>

      <div className='flex gap-4 items-center p-4 border-b border-black/20 border-dashed'>
        <FaTruck size={25} className='text-black/80' />
        <p className='text-black/70 text-sm'> Paiement à la livraison partout au Sénégal (Livraison en 24h)</p>
      </div>

      <div className='flex gap-4 items-center p-4 border-b border-black/20 border-dashed'>
        <PiArrowsLeftRightLight size={25} className='text-black/80' />
        <p className='text-black/70 text-sm'> Retours et échanges gratuis</p>
      </div>

      <div className='flex gap-4 items-center p-4 assurance_last_item'>
        <PiPhoneCallFill size={25} className='text-black/80' />
        <p className='text-black/70 text-sm'>  Service client: (+221)78 137 37 37 du Lundi au Samedi (de 9h à 20h)</p>
      </div>


    </div>
  )
}
