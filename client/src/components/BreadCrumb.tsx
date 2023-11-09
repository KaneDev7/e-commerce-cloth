import { Link, useLocation } from 'react-router-dom'

export default function BreadCrumb() {
    const location = useLocation()
    

    console.log(location.pathname)
    let currentPath = ''
    const  breadCrumb =  location.pathname.split('/')
            .filter(item => item !== '')
            .map(crumb => {
                currentPath += `/${crumb}`
                 return <Link to={currentPath}>  {crumb}   </Link>
            }
            )

    // if (location.pathname !== '/') {
        return <div className='mb-2 mx-5 globalWidth'>
            {breadCrumb}
        </div>
    // }

    

}
