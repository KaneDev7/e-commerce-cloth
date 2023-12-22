import { useNavigate } from 'react-router-dom'
import useFetch from '../../../services/hooks/useFetch'

export default function Category() {

    const { data: categories } = useFetch('/categories?populate=*&')

    const navigate = useNavigate()

    return (
        <section className='my-40 p-2 globalWidth bg-white'>
            <div className='w-full grid category'>
                {
                    categories.map((categorie, index) => (
                        <div key={categorie?.id} className={`relative category-card  bg-gray-100 ${index === 5 && 'lg:col-span-2 row-row-2 '}
                        ${index === 1 && 'lg:row-span-2 row-col-2'}
                        `}>
                            <img src={import.meta.env.VITE_API_UPLOAD + categorie?.attributes?.img?.data?.attributes?.url} alt="" />
                            <button
                                onClick={() => navigate(`/products/${categorie.id}`)}
                                className='min-w-[100px] w-fit h-[40px]  px-2 text-primaryColor font-bold bg-white shadow-md  hover:bg-primaryColor hover:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm '>
                                {categorie?.attributes.title}
                            </button>
                        </div>
                    ))
                }

            </div >
        </section >

    )
}


