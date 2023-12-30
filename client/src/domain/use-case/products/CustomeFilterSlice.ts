import { createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

export const customeFilterSlice = createSlice({
    name: 'customFilters',
    initialState,

    reducers: {

        addCustomeFilter: (state, action) => {
           return state = [...state, action.payload]
        },

        deletCustomeFilter: (state, action) => {
            return state.filter(item => item.id !== action.payload)
         },

        resetCustomeFilter: (state) => {
         return state = []
        },

    }
})

export const {addCustomeFilter,deletCustomeFilter, resetCustomeFilter} = customeFilterSlice.actions