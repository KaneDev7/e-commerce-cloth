import { createSlice } from '@reduxjs/toolkit'


const initialState: string[] = []

export const selectedFilterSlice = createSlice({
    name: 'selectedFilter',
    initialState,

    reducers: {

        addSelectedFilter: (state, action) => {
           return state = [...state, action.payload]
        },

        deleteSelectedilter: (state, action) => {
            return state.filter(item => item !== action.payload)  
         },

        resetSelectedFilter: (state) => {
         return state = []
        },

    }
})

export const {addSelectedFilter,deleteSelectedilter, resetSelectedFilter} = selectedFilterSlice.actions