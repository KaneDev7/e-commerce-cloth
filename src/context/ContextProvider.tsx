import React, { useState, createContext } from 'react'

export const GlobalContext = createContext({})


export default function ContextProvider({ children } ) {
    const [showCart, setShowCart] = useState<Boolean>(false)
    return (
        <div>
            <GlobalContext.Provider value={{
                showCart, setShowCart 
            }}>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}
