import {createSlice} from '@reduxjs/toolkit'

interface TypeItem {
    id : number
    title : string
    desc: string,
    price : number,
    img : string,
    quantity : number
}
type CartType = {products : Array<TypeItem>}

const initialState : CartType = {products : []}

export const cartSlice = createSlice({
    name : 'cart',
    initialState ,

    reducers : {

        addItem : (state, action) =>{
           const findArticleInCart = state.products.find(item => item.id === action.payload.id && action.payload.username.trim() === item.username.trim())
    

           if(!findArticleInCart){
            
                 state.products.push(action.payload)
            }else{
                const index = state.products.findIndex(item => item.id === action.payload.id && action.payload.username.trim() === item.username.trim())
                const articleUpdated = {...findArticleInCart, quantity : findArticleInCart.quantity + 1}
                state.products[index] = articleUpdated
            }
        },

        removeItem : (state, action)  =>{
          state.products = state.products.filter(item => item.id !== action.payload)
        },
        
        reset: (state) => {
            state.products = []
        } 
    }
})

export const {addItem,removeItem,reset  } = cartSlice.actions