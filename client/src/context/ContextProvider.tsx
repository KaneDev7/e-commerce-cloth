import React, { useState, createContext } from 'react'

export const GlobalContext = createContext({})


export default function ContextProvider({ children } ) {
    const [showCart, setShowCart] = useState<Boolean>(false)
    const [showMenuMobile, setShowMenuMobile] = useState<Boolean>(false)
    const [showFilter, setShowFilter] = useState<Boolean>(true)

    return (
        <div>
            <GlobalContext.Provider value={{
                showCart, 
                showMenuMobile,
                showFilter,
                setShowCart,
                setShowMenuMobile,
                setShowFilter
            }}>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}
