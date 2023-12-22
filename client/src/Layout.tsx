import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from './services/context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSearchPage } from './domain/use-case/showSearchPageSlice'
import SearchPage from './ui/components/Navigation/searchPage'
import Footer from './ui/components/Footer'

import { fetchFavoris } from './domain/use-case/favorisSlice'
import { fetchfeatureProduct } from './domain/use-case/featureProductSlice'
import { fetchMoreLikeProduct } from './domain/use-case/moreLikeProductSlice'
import { fetchNewArriveProduct } from './domain/use-case/newArriveProductSlice'
import ContextProvider from './services/context/ContextProvider'


export type UserContextType = {
    user: string | null,
    setUser: React.Dispatch<React.SetStateAction<Object>>
}

export default function Layout() {
    const [user, setUser] = useState<string | null>(null)
    const showSearchPage = useSelector((state: Boolean): boolean => state.showSearchPage)
    const dispath = useDispatch()

    useEffect(() => {
        dispath(setShowSearchPage(false))
        dispath(fetchFavoris(user?.user?.id))
    }, [user])

    useEffect(() => {
        const newUser: string | null = JSON.parse(sessionStorage.getItem('user')) || null
        setUser(newUser)
        dispath(fetchfeatureProduct())
        dispath(fetchMoreLikeProduct())
        dispath(fetchNewArriveProduct())
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ContextProvider >
                <div className='py-0  '>
                    {showSearchPage && <SearchPage />}
                    <Outlet />
                </div>
                <Footer />
            </ContextProvider>

        </UserContext.Provider>

    )
}
