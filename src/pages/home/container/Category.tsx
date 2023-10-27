import { Link } from 'react-router-dom'

export default function Category() {

    return (
        <section className='px-10 my-40'>
            <div className='w-full h-[800px] category'>
                <div className='relative category-card '>
                    <img src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/products/1'> SALE </Link>
                    </button>
                </div>

                <div className='relative category-card row-span-2'>
                    <img src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/products/1'> NEW SEASON </Link>
                    </button>
                </div>

                <div className='relative category-card'>
                    <img src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/products/1'> MEN </Link>
                    </button>
                </div>

                <div className='relative category-card'>
                    <img src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/products/1'> ACCESSOIRES </Link>
                    </button>
                </div>

                <div className='relative category-card '>
                    <img src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/products/1'> WOMEN </Link>
                    </button>
                </div>

                <div className='relative category-card col-span-2'>
                    <img src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <button className='min-w-[100px] w-fit h-[40px]  px-2 bg-white hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        <Link to='/'> SHOES </Link>
                    </button>
                </div>

            </div>
        </section>

    )
}


// 818992 115970 2036646 1813947 1192609 2703202