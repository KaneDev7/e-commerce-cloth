import { createSlice } from '@reduxjs/toolkit'



const initialState: string[] = []

export const filterSlice = createSlice({
    name: 'filter',
    initialState,

    reducers: {

        addFilter: (state, action) => {
           return state = [...action.payload]
        },

        resetFilter: (state) => {
         return state = []
        },

    }
})

export const {addFilter,resetFilter} = filterSlice.actions