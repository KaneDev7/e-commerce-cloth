import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Products from './pages/productDetails/Products'
import ContextProvider from './context/ContextProvider'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Panier from './pages/cart/Panier'
import Admin from './pages/admin/admin'
import Commands from './pages/commands/commandes'
import ForgotPassWord from './pages/auth/ForgotPassWord'
import ResetPassword from './pages/auth/ResetPassword'
import Informations from './pages/auth/Information'
import Favoris from './pages/favoris/Favoris'

const { store, persistor } = configureStore()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'products/:id',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <Product />
      },
      {
        path: 'admin',
        element: <Admin />
      },
      {
        path: 'panier',
        element: <Panier />
      },
      {
        path: 'commands',
        element: <Commands />
      },
      {
        path: 'infos',
        element: <Informations/>
      },
      {
        path: 'favoris',
        element: <Favoris/>
      },
      {
        path: 'login/:frompath/:id',
        element: <Login />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassWord/>
      },
      {
        path: 'resetpassword/:code',
        element: <ResetPassword />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
