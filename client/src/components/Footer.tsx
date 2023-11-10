import { Link } from 'react-router-dom'
import { FaFacebookSquare } from 'react-icons/fa'
import { BsInstagram, BsPinterest } from 'react-icons/bs'
import { AiOutlineTwitter, AiOutlineGoogle } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='mt-20'>
      <div className='flex flex-col bg-grayA '>

        {/* TOP */}
        {/* <div className='bg-primaryColor flex justify-center items-center ' >
          <div className='max-w-[1100px] w-full flex justify-between items-center flex-wrap p-4'>
            <h2 className='text-white text-[16px] font-semibold '>BE IN TOUCH WIDTH US:</h2>
            <div className='h-[40px] flex rounded-md'>
              <input type="text" placeholder='Enter your email' className='outline-none rounded-l-md px-4' />
              <button className='bg-[#353439]  rounded-r-md py-2 px-3 text-white text-sm'>JOIN US</button>
            </div>
            <div className='flex items-center gap-4'>
              <FaFacebookSquare size={20} color='white' />
              <BsInstagram size={20} color='white' />
              <AiOutlineTwitter size={20} color='white' />
              <AiOutlineGoogle size={20} color='white' />
              <BsPinterest size={20} color='white' />
            </div>
          </div>
        </div> */}

        {/* CENTER */}

        <div className='items-center flex flex-col'>

          <div className='max-w-[1500px] mt-[50px] w-full flex justify-between gap-10 flex-wrap items-start p-8'>

            <div className='flex flex-col  leading-8 footerLink'>
              <h3 className='text-xl font-bold '>Categories</h3>
              <Link to=''>Men</Link>
              <Link to=''>Women</Link>
              <Link to=''>Children</Link>
              <Link to=''>Accessoires</Link>
              <Link to=''>New Arrivals</Link>
            </div>

            <div className='flex flex-col  leading-8 footerLink'>
              <h3 className='text-xl font-bold '>Links</h3>
              <Link to=''>FAQ</Link>
              <Link to=''>Pages</Link>
              <Link to=''>Storeq</Link>
              <Link to=''>Compare</Link>
              <Link to=''>Cookies</Link>
            </div>

            <div className='flex flex-col leading-8 min-w-[250px] footerLink'>
              <h3 className='text-xl font-bold '>About</h3>
              <p className='leading-6'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga delectus deserunt iste incidunt
                dolore iusto rerum blanditiis vel accusantium necessitatibus,
                veritatis debitis natus. Cupiditate similique, exercitationem iste facilis ut nobis.
              </p>
            </div>

            <div className='flex flex-col leading-8 min-w-[250px] footerLink'>
              <h3 className='text-xl font-bold '>Contact</h3>
              <p className='leading-6'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga delectus deserunt iste incidunt
                dolore iusto rerum blanditiis vel accusantium necessitatibus,
                veritatis debitis natus. Cupiditate similique, exercitationem iste facilis ut nobis.xercitationem iste facilis ut nobis.
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
            <div className='max-w-[1500px] w-full p-8 flex justify-between items-center flex-wrap'>
              <div className='flex items-center gap-4'>
                <h1 className='text-primaryColor font-bold text-2xl'>LAMASTORE</h1>
                <p className='text-sm'>Copyright 2023, All Right Reserved</p>
              </div>

              <img src="/images/payment.png" alt="" className='w-[500px] h-[50px] ' />
            </div>

          </div>
      </div>
    </div>
  )
}
