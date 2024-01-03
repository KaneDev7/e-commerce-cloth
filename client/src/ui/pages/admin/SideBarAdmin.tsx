import { useNavigate } from 'react-router-dom'

export default function SideBarAdmin() {
    const navigate = useNavigate()

    return (
        <div className='w-[250px]  h-screen lg:block hidden  bg-white sticky top-[100px] left-0 '>
            <div className='p-5'>
                <h1 className='text-2xl'>Admin</h1>
                <ul className='mt-10 text-sm space-y-2 font-bold text-black/70'>
                    <li className='p-3  hover:bg-blue-300/25 rounded-sm cursor-pointer' onClick={() =>navigate('/admin/products') }>Products</li>
                    <li className='p-3 bg-blue-300/25  hover:bg-blue-300/25 rounded-sm cursor-pointer' onClick={() =>navigate('/admin') }>Commandes</li>
                    <li className='p-3  hover:bg-blue-300/25 rounded-sm cursor-pointer' onClick={() =>navigate('/admin/users') }>Utilisateurs</li>
                </ul>
            </div>
        </div>
    )
}
