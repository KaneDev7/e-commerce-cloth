import { Link, useLocation, useParams } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { useEffect } from 'react'
import useFetch from '@/hooks/useFetch'

export default function BreadCrumb() {
    const location = useLocation()
    const {id} = useParams()

    // const { data: products, isLoading, error } = useFetch(`/products?&[filters][id]=${id}`)
    // const { data: categories } = useFetch(`/categories?&[filters][id]=${id}`)


    // console.log('useparam', id)
    // const productName =  products[0]?.attributes?.title
    // const categorieName =  categories[0]?.attributes?.title


    let currentPath = ''
    let pathArr = location.pathname.split('/')

    console.log(pathArr)
    pathArr = pathArr.filter(item => item !== '')
    
    const breadCrumb = pathArr.map(crumb => {
        currentPath += `/${crumb}`
        return <Link to={currentPath}> / {crumb} </Link>
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
