import React from 'react'
import SideBarAdmin from './SideBarAdmin'
import { Outlet } from 'react-router-dom'
import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'



export default function AdminLayout() {
    return (
        <>
            <NavbarFixed />
            <Navbar />
            <div className='globalWidth mt-10 px-4'>
                <div className='w-full flex gap-5'>
                    <SideBarAdmin />
                    <Outlet />
                </div>
            </div>
        </>

    )
}
