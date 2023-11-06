import React from 'react'
import Card from './Card'
import useFetch from '../hooks/useFetch'

type TypeProps = { catId: number, subCat: Array<string>, maxPrice: number, sort: string }

export default function List({ catId, subCat, maxPrice, sort }: TypeProps) {
    const { data: products, isLoading, error } = useFetch(
        `/products?populate=*&[filters][categories][id]=${catId}${subCat.map(item => item).join('')}`
    )

     console.log('url', `/products?populate=*&[filters][categories][id]=${catId}${subCat.map(item => item).join('')}`)

    return (
        <div className="max-w-full flex justify-between items-start gap-10 flex-wrap mt-5">

            {
                products?.map(product => (
                    <Card product={product} />
                ))
            }
        </div>
    )
}
