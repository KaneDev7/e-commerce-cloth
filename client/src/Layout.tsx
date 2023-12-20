import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import { UserContext } from './context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSearchPage } from './redux/showSearchPageSlice'
import SearchPage from './components/Navigation/searchPage'
import { fetchFavoris } from './redux/favorisSlice'
import { fetchfeatureProduct } from './redux/featureProductSlice'
import { fetchMoreLikeProduct } from './redux/moreLikeProductSlice'
import { fetchNewArriveProduct } from './redux/newArriveProductSlice'


export type UserContextType =  {
    user : string | null, 
    setUser:  React.Dispatch<React.SetStateAction<Object>>
  }

export default function Layout() {
    const [user, setUser]  = useState<string | null>(null)
    const showSearchPage = useSelector((state : Boolean): boolean => state.showSearchPage)
    const dispath = useDispatch()
   
    useEffect(() => {
        dispath(setShowSearchPage(false))
        dispath(fetchFavoris(user?.user?.id))
    }, [user])

    useEffect(() => {
        const newUser : string | null = JSON.parse(sessionStorage.getItem('user')) || null
        setUser(newUser)
        dispath(fetchfeatureProduct())
        dispath(fetchMoreLikeProduct())
        dispath(fetchNewArriveProduct())
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {/* <BreadCrumb /> */}
            <div className='py-0  '>
                {showSearchPage && <SearchPage />}
                <Outlet />
            </div>
            <Footer />
        </UserContext.Provider>

    )
}
