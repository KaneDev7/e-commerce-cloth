import React, { useEffect, useState } from 'react'
import Card from './Card'
import useFetch from '../hooks/useFetch'
import ProductLoad from './ProductLoad'

type TypeProps = { catId: number, subCat: Array<string>, maxPrice: number, sort: string }

export default function List({ catId, subCat, maxPrice, sort }: TypeProps) {

    const [url, setUrl] = useState<string>('')
    const { data: products, isLoading, error } = useFetch(url)

    useEffect(()=>{
        setUrl( `/products?populate=*&[filters][categories][id]=${catId}${subCat.map(item => item).join('')}&sort=price:${sort}`) 
    },[subCat])

    if (isLoading) {
        return <div className='flex justify-center items-center mt[100px] '>
          <ProductLoad />
        </div>
      }
    return (
        <div className="max-w-full flex items-start gap-10 flex-wrap mt-5">

            {
                products?.map(product => (
                    <Card product={product} />
                ))
            }
        </div>
    )
}
