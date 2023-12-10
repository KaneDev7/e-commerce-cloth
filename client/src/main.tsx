import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Product from './pages/Product'
import Products from './pages/Products'
import ContextProvider from './context/ContextProvider'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './pages/Login'
import Register from './pages/Register'
import Panier from './pages/Panier'
import Admin from './pages/admin/admin'
import Commands from './pages/commandes'
import ForgotPassWord from './pages/ForgotPassWord'
import ResetPassword from './pages/ResetPassword'
import Informations from './pages/Information'

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
