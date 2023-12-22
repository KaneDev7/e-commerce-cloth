import { createSlice } from '@reduxjs/toolkit'

const initialState: Boolean = true

export const showSearchPageSlice = createSlice({
    name: 'showSearchPage',
    initialState,

    reducers: {
        setShowSearchPage : (state : Boolean, action) : boolean =>{
            return action.payload
        },

    }
})

export const {setShowSearchPage} = showSearchPageSlice.actions