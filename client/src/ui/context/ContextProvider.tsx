import React, { useState, createContext, useEffect } from 'react'

export const GlobalContext = createContext<Boolean>(false)


export default function ContextProvider({ children}: {children : React.ReactNode} ) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', () => {
          if (window.matchMedia("(min-width: 800px)").matches) {
            setIsMobile(false)
          } else {
            setIsMobile(true)
          }
        })
      }, [isMobile, setIsMobile])

      useEffect(()=>{
        if (window.matchMedia("(min-width: 800px)").matches) {
          setIsMobile(false)
        } else {
          setIsMobile(true)
        }
      },[])

    return (
        <div>
            <GlobalContext.Provider value={{
                setIsMobile,
                isMobile,
            }}>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}
