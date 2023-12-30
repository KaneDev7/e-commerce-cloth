// configureStore.js

import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from '@/domain/use-case/cart/cartSlice'
import { filterSlice } from '@/domain/use-case/products/filterSlice'
import { customeFilterSlice } from '@/domain/use-case/products/CustomeFilterSlice'
import { selectedFilterSlice } from '@/domain/use-case/products/SelectedFilterSlice'
import { showSearchPageSlice } from '@/domain/use-case/products/search/showSearchPageSlice'
import { breadCrumbSlice } from '@/domain/use-case/breadCrumbSlice'
import { favorisSlice } from '@/domain/use-case/products/favorisSlice'
import { rececntlyViewsSlice } from '@/domain/use-case/products/recentlyReview/RececntlyViewsSlice'
import { featureProductSlice } from '@/domain/use-case/products/featureProductSlice'
import { moreLikeProductSlice } from '@/domain/use-case/products/likes/moreLikeProductSlice'
import { newArriveProductSlice } from '@/domain/use-case/products/newArriveProductSlice'
import { strapiServie } from '@/infrastructure/services/apis/strapiService'


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