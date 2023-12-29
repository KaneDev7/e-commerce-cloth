// configureStore.js

import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from '@/domain/use-case/cart/cartSlice'
import { filterSlice } from '@/domain/use-case/filterSlice'
import { customeFilterSlice } from '@/domain/use-case/CustomeFilterSlice'
import { selectedFilterSlice } from '@/domain/use-case/SelectedFilterSlice'
import { showSearchPageSlice } from '@/domain/use-case/showSearchPageSlice'
import { breadCrumbSlice } from '@/domain/use-case/breadCrumbSlice'
import { favorisSlice } from '@/domain/use-case/favorisSlice'
import { rececntlyViewsSlice } from '@/domain/use-case/recentlyReview/RececntlyViewsSlice'
import { featureProductSlice } from '@/domain/use-case/featureProductSlice'
import { moreLikeProductSlice } from '@/domain/use-case/moreLikeProductSlice'
import { newArriveProductSlice } from '@/domain/use-case/newArriveProductSlice'
import { strapiServie } from '@/services/apis/strapiService'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  filter: filterSlice.reducer,
  customFilters: customeFilterSlice.reducer,
  selectedFilter: selectedFilterSlice.reducer,
  showSearchPage: showSearchPageSlice.reducer,
  addRoute: breadCrumbSlice.reducer,
  favoris: favorisSlice.reducer,
  rececntlyViews: rececntlyViewsSlice.reducer,
  featureProduct: featureProductSlice.reducer,
  moreLikeProduct: moreLikeProductSlice.reducer,
  newArriveProduct: newArriveProductSlice.reducer,
  [strapiServie.reducerPath]: strapiServie.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>{
      return  getDefaultMiddleware().concat(strapiServie.middleware)
      }
  })

  let persistor = persistStore(store)
  return { store, persistor }
}