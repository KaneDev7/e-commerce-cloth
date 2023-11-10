import {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BreadCrumb from './components/BreadCrumb'
import { UserContext } from './context/UserContext'

export default function Layout() {
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider value={{user , setUser}}>
            <Navbar />
            <div className='py-0 px-5 '>
                <Outlet />
            </div>
            <Footer />
        </UserContext.Provider>

    )
}
