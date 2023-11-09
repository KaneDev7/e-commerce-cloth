import { useEffect, useState, useCallback } from 'react'
import useFetch from '../hooks/useFetch'
import Card from './Card'
import { useParams } from 'react-router-dom'

export default function Recommandation({ categories }) {
    const { id } = useParams()
    const [url, setUrl] = useState<string>('')
    const [products, setProducts] = useState([])

    const { data, isLoading, error } = useFetch(url)

    useEffect(() => {
        setUrl(`/products?populate=*${categories.map(categorie => `&[filters][categories][id]=${categorie?.id}`)}`)
    }, [categories])

    useEffect(() => {
        const newProducts = data.filter(product => product.id !== Number(id))
        setProducts(newProducts)
    }, [data])

    return (
        <div className="flex  my-[5rem] globalWidth">

            <div className="w-full max-w-[1500px] ">

                {
                    products.length > 0 &&
                    <h1 className="md:text-3xl text-2xl   text-black/90 font-bold duration-200"> NOS RECOMANDATIONS </h1>

                }

                <div className="flex justify-cen">
                    <div className="list feature  mt-10">

                        {
                            products.map(product => (
                                <Card key={product.id} product={product} />
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
