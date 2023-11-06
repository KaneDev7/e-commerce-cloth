import { useContext } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/ContextProvider'

export default function NavBarMobile() {
    const { showMenuMobile, setShowMenuMobile } = useContext(GlobalContext)

    return (

        <motion.div initial={{ x: -500, opacity: .2 }} animate={{ x: 0, opacity: 1 }} className='w-[80vw] h-screen fixed left-0 z-30  bg-white  shadow-md' >
            <AiFillCloseCircle size={25} className='absolute right-5 top-10 text-primaryColor hover:text-primaryColorActif'
                onClick={() => setShowMenuMobile(false)} />

            <div className='flex flex-col  p-10 mt-[100px] '>

                {/* LEFT */}
                <div className='flex flex-col gap-4 pb-5 border-b'>

                    {/* <div className='flex '>
                        <img src="/images/en.png" alt="" />
                        <FiChevronDown />
                    </div>

                    <div className='flex '>
                        <span>USD</span>
                        <FiChevronDown />
                    </div> */}
                    <Link to=''>Accueil</Link>
                    <Link to=''>Vetements</Link>
                    <Link to=''>Chaussures</Link>
                    <Link to=''>Sacs & Accessoires</Link>
                </div>


                {/* RIGHT */}

                <div className='flex flex-col mt-5 gap-2'>
                    <Link to=''>A propos</Link>
                    <Link to=''>Contact</Link>
                </div>

            </div>
        </motion.div>

    )
}
