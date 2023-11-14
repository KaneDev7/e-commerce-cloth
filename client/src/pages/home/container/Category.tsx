import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

export default function Category() {

    const { data: categories, isLoading, error } = useFetch('/categories?populate=*&')
    
    const navigate = useNavigate()

    return (
        <section className='my-30 globalWidth bg-primaryColor'>
            <div className='w-full  grid category'>
                {
                    categories.map((categorie, index) => (
                        <div className={`relative category-card  bg-gray-100 ${index === 5 && 'lg:col-span-2 row-row-2'}
                        ${index === 1 && 'lg:row-span-2 row-col-2'}
                        `}>
                            <img src={import.meta.env.VITE_API_UPLOAD + categorie?.attributes?.img?.data?.attributes?.url} alt="" />
                            {/* <Link to={`/products/${categorie.id}`}> */}
                                <button
                                onClick={()=> navigate(`/products/${categorie.id}`) }
                                 className='min-w-[100px] w-fit h-[40px]  px-2 text-primaryColor font-bold bg-white shadow-md  hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                                    {categorie?.attributes.title}
                                </button>
                            {/* </Link> */}
                        </div>
                    ))
                }


                {/* <div className='relative category-card bg-orange-400'>
                    <img src="/images/collection_vetement/robe-noemie.webp" alt="" />
                    <Link to={`/products/1`}> <button className='min-w-[100px] w-fit h-[40px]  px-2 text-white font-normal bg-primaryColor hover:bg-primaryColorActif hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        Robe
                    </button>
                    </Link>
                </div>

                <div className='relative category-card bg-orange-400'>
                    <img src="/images/collection_vetement/traditionel.jpg" alt="" />
                    <Link to={`/products/1`}> <button className='min-w-[100px] w-fit h-[40px]  px-2 text-white font-normal bg-primaryColor hover:bg-primaryColorActif hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                        Traditionel
                    </button>
                    </Link>
                </div>

                <div className='relative category-card bg-orange-400'>
                    <img src="/images/collection_vetement/combinaison.webp" alt="" />
                    <Link to={``}> <button className='min-w-[100px] w-fit h-[40px]  px-2 text-white font-normal bg-primaryColor hover:bg-primaryColorActif hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                         Combinaison
                    </button>
                    </Link>
                </div>

                <div className='relative category-card lg:row-span-2 row-span-1' bg-orange-400 >
                    <img src="/images/collection_sac_et_accessoire/sac_a_dos.jpg" alt="" />
                    <Link to={`/products/1`}>
                        <button className='min-w-[100px] w-fit h-[40px] px-2 text-white font-normal bg-primaryColor hover:bg-primaryColorActif hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                            Sacs
                        </button>
                    </Link>
                </div>

                <div className='relative category-card lg:col-span-2 col-span-1 bg-orange-400'>

                    <img src="/images/collection_sac_et_accessoire/accessoires.jpg" alt="" />
                    <Link to={`/products/1`}>
                        <button className='min-w-[100px] w-fit h-[40px]  px-2 text-white font-normal bg-primaryColor hover:bg-primaryColorActif hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                            Accessoires
                        </button>
                    </Link>
                </div> */}





            </div >
        </section >

    )
}


// 818992 115970 2036646 1813947 1192609 2703202