import {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BreadCrumb from './components/BreadCrumb'
import { UserContext } from './context/UserContext'
import { useDispatch } from 'react-redux'
import { reset } from './redux/cartSlice'

export default function Layout() {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=> {
    const newUser = JSON.parse(sessionStorage.getItem('user')) || null
    setUser(newUser)
    },[])

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
