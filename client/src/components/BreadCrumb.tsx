import { Link, useLocation, useParams } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { useEffect } from 'react'
import useFetch from '@/hooks/useFetch'

export default function BreadCrumb() {
    const location = useLocation()
    const { id } = useParams()

    const { data: product, isLoading, error } = useFetch(`/products?&[filters][id]=${id}`)
    const { data: categories } = useFetch(`/categories?&[filters][id]=${id}`)


    // console.log('useparam', id)
    // const productName =  products[0]?.attributes?.title
    // const categorieName =  categories[0]?.attributes?.title
    console.log(location)

    let currentPath = ''
    let pathArr = location.pathname.split('/')
    console.log(
        'Number',
    )
    console.log(pathArr)
    pathArr = pathArr.filter(item => item !== '')

    console.log(
        pathArr
    )
    const breadCrumb = pathArr.map(crumb => {

        const productId = Number(crumb)
        let matchProduct = productId && productId.toString() === id && !pathArr.includes('products')
        let matchCategory = productId && productId.toString() === id && !pathArr.includes('product')

        let prodcutTitle = `/ ${product[0]?.attributes?.title}`
        let categorytTitle = `/ ${categories[0]?.attributes?.title}s`

        currentPath += `/${crumb}`


        return <Link to={currentPath}>
            {
                matchProduct ? prodcutTitle : 
                matchCategory ? categorytTitle :
                matchProduct && crumb !== productId.toString() ? crumb : ''
                // `/ ${crumb}`
            }
        </Link>
    }
    )

    if (location.pathname !== '/') {
        return <div className='flex items-center gap-4 h-[50px] mt-10 px-5 globalWidth bg-white text-sm '>
            <div className='flex items-center gap-2 '>
                <AiFillHome />
                <Link to='/'> Accueil </Link>
            </div>
            {breadCrumb}
        </div>
    }



}
