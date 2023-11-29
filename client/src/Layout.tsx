import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BreadCrumb from './components/BreadCrumb'
import { UserContext } from './context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from './redux/cartSlice'
import { setShowSearchPage } from './redux/showSearchPageSlice'
import SearchPage from './pages/searchPage'

export default function Layout() {
    const [user, setUser] = useState(null)
    const showSearchPage = useSelector(state => state.showSearchPage)
    const dispath = useDispatch()

    console.log('showSearchPage', showSearchPage)

    useEffect(() => {
        dispath(setShowSearchPage(false))
    }, [])

    useEffect(() => {
        const newUser = JSON.parse(sessionStorage.getItem('user')) || null
        setUser(newUser)
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Navbar />
            <BreadCrumb />
            <div className='py-0 px-5 '>
                {showSearchPage && <SearchPage />}
                <Outlet />
            </div>
            <Footer />
        </UserContext.Provider>

    )
}
