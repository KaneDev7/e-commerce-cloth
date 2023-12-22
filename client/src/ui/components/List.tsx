import { useEffect, useState } from 'react'
import Card from './Card'
import useFetch from '../../services/hooks/useFetch'
import ProductLoad from './ProductLoad'

type TypeProps = { catId: number, subCat: Array<string>, sort: string }

export default function List({ catId, subCat, sort }: TypeProps) {

    const [url, setUrl] = useState<string>(`/products?populate=*&[filters][categories][id]=${catId}${subCat.map(item => item).join('')}&sort=price:${sort}`)

    const { data: products, isLoading, error } = useFetch(url)  

    useEffect(()=>{
        setUrl( `/products?populate=*&[filters][categories][id]=${catId}${subCat.map(item => item).join('')}&sort=price:${sort}`) 
    },[subCat, catId])


    if (isLoading) {
        return <div className='flex justify-center items-center h-[500px] mt[100px] '>
          <ProductLoad />
        </div>
      }
    return (
      <div>
        <p className='mt-4'> {products.length} article{products.length > 1 && 's'}  trouvé{products.length > 1 && 's'}</p>
          <div className="max-w-full  flex items-start gap-10 flex-wrap mt-5 list">
           
           {
               products?.map((product) => (
                   <Card key={product.id} product={product}/>
               ))
           }
       </div>
      </div>
    )
}
