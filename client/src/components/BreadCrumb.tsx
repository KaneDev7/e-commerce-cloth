import { Link, useLocation } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'

export default function BreadCrumb({ product }) {
    const location = useLocation()


    console.log(location.pathname)
    let currentPath = ''
    let pathArr = location.pathname.split('/')
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
