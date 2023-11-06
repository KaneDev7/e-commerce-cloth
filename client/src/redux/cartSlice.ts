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
            const item = state.products.find(item => item.id === action.payload.id)

            if(item){
                item.quantity+=1
            }else{
                state.products.push(action.payload)
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