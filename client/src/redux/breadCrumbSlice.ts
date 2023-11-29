import { createSlice } from '@reduxjs/toolkit'


type RouteObj =  {
    name : string,
    route : string,
    page : string
} 

const initialState: RouteObj[] = []

export const breadCrumbSlice = createSlice({
    name: 'breadCrumb',
    initialState,

    reducers: {
        addRoute: (state, action) => {
            state.push(action.payload)
        },

    }
})

export const {addRoute} = breadCrumbSlice.actions