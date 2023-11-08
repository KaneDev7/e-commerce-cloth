// configureStore.js

import {combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {cartSlice} from './cartSlice'
import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './filterSlice'
import {selectedFilterSlice } from './SelectedFilterSlice'
import { customeFilterSlice } from './CustomeFilterSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  filter : filterSlice.reducer,
  customFilters: customeFilterSlice.reducer,
  selectedFilter : selectedFilterSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = configureStore({ 
    reducer : persistedReducer

  })
  let persistor = persistStore(store)
  return { store, persistor }
}