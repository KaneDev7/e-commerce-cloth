import { createSlice } from '@reduxjs/toolkit'

export type TypeItem = {
    id: number
    title: string
    desc: string,
    price: number,
    img: string,
    quantity: number,
    size: string[]
}

export type CartType = { products: Array<TypeItem> }

const initialState: CartType = { products: [] }

export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, action) => {
            const findArticleInCart = state.products.find(item => item.id === action.payload.id && 
                action.payload.username.trim() === item.username.trim())

            let articleUpdated

            if (!findArticleInCart) {
                state.products.push(action.payload)
            } else {
                const index = state.products.findIndex(item => item.id === action.payload.id && 
                    action.payload.username.trim() === item.username.trim())
               
                if (!action.payload.isNewSize) {
                    articleUpdated = {
                        ...findArticleInCart,
                        quantity: findArticleInCart.quantity + 1,
                        size: action.payload.size
                    }
                } else {
                    articleUpdated = {
                        ...findArticleInCart,
                        quantity: findArticleInCart.quantity + 1
                    }
                }
                state.products[index] = articleUpdated
            }
        },

        removeItem: (state, action) => {
            const filterState = state.products.filter(item => item.id !== action.payload)
            state.products = filterState
        },

        reset: (state, action) => {
                const filterState = state.products.filter(item => item.username.toLowerCase() !== action.payload.toLowerCase())
                state.products = filterState
        }
    }
})

export const { addItem, removeItem, reset } = cartSlice.actions