import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from './ui/context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSearchPage } from './domain/use-case/products/search/showSearchPageSlice'
import SearchPage from './ui/components/Navigation/searchPage'
import Footer from './ui/components/Footer'

import { fetchFavoris } from './domain/use-case/products/favorisSlice'
import { fetchfeatureProduct } from './domain/use-case/products/featureProductSlice'
import { fetchMoreLikeProduct } from './domain/use-case/products/likes/moreLikeProductSlice'
import { fetchNewArriveProduct } from './domain/use-case/products/newArriveProductSlice'
import ContextProvider from './ui/context/ContextProvider'
import { UserDataResponse } from './domain/entities/User'
import { UsersService } from './infrastructure/services/UsersService'


// export type UserContextType = {
//     user: string | null,
//     setUser: React.Dispatch<React.SetStateAction<UserDataResponse>>
// }

export default function Layout() {
    const [user, setUser] = useState<UserDataResponse | null>(null)
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
    }, [fetchNewArriveProduct,fetchMoreLikeProduct,fetchfeatureProduct])

   useEffect(()=>{
    (async function (){
    const newUser: string | null = JSON.parse(sessionStorage.getItem('user')) || null
    if(newUser){
            await new UsersService().toggleUserStatut(newUser?.user.id, true)
        }
    }())
   },[user])

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
