import { Input } from '@/ui/components/ui/input'
import { setShowSearchPage } from '@/domain/use-case/products/search/showSearchPageSlice';
import { useState } from 'react';

import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search } from '@/domain/use-case/products/search/search.useCase';
import { DELAY_BEFORE_FETCH_DATA } from '@/infrastructure/services/constants';



export default function SearchPage() {
    const [products, setProducts] = useState([])
    const dispath = useDispatch()
    const navigate = useNavigate()

    let timer: null | number | NodeJS.Timeout | undefined = null

    products.map(item => {
        item?.attributes?.size?.data.map(size => {
            <p className='text-sm'> </p>
        })
    })

    const handleClick = (id: number) => {
        navigate(`/product/${id}`)
        dispath(setShowSearchPage(false))
    }

    const handleChange = async ({ target }: { target: HTMLInputElement }) => {
        timer = setTimeout(async () => {
            clearTimeout(timer)
            const result = await new Search().searchProduct(target.value)
            setProducts(result)
        },DELAY_BEFORE_FETCH_DATA )
    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-[100] backdrop-blur-md'>
            <div className='globalWidth flex justify-center h-full p-10'>
                <div className='w-4/5  flex flex-col items-center'>

                    <div className="flex items-center w-full space-x-2">
                        <Input type="text" onChange={handleChange} placeholder="Recherche" className='h-[50px] bg-white ' />
                    </div>
                    {
                        products.length > 1 &&
                        <div className='w-full max-h-[80vh] bg-white shadow-sm mt-10 border overflow-y-auto p-10'>
                            <div>
                                {products?.map(item => (
                                    <div key={item.id} className='bg-white p-4 mb-3 shadow-sm'>
                                        <div className='flex justify-between  gap-5  '>
                                            <div className=' flex gap-5 '>
                                                <img src={import.meta.env.VITE_API_UPLOAD + item?.attributes?.img?.data[0]?.attributes?.url} alt="" className='w-[80px] h-[80px] object-cover' />

                                                <div className='flex flex-col  '>
                                                    <h1 onClick={() => handleClick(item?.id)}
                                                        className=' text-black text-[16px] hover:underline cursor-pointer'>{item?.attributes?.title} </h1>
                                                    {/* <p className='text-sm text-black/60'>{item?.attributes?.desc.substring(0,50)}...  </p> */}
                                                    <p className='text-primaryColor text-md font-bold'> $ {item?.attributes?.price} </p>
                                                    <div className='flex'>
                                                        {
                                                            item?.attributes?.size?.data.map(size => (
                                                                <p className='text-sm'> {size?.attributes?.size} </p>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    }

                </div>
            </div>

            <IoMdClose
                size={30}
                className='text-primaryColor absolute right-10 top-5'
                onClick={() => dispath(setShowSearchPage(false))}
            />
        </div>
    )
}
