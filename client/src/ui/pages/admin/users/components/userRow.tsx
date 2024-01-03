import { FaCircleUser } from "react-icons/fa6";

export default function UserRow({userData}) {
    const statut = userData?.isOnLine ? 'bg-green-500' : 'bg-red-500 '
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                    </label>
                </div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <FaCircleUser size={40} className='text-black/30' />
                <div className="ps-3">
                    <div className="text-base font-semibold capitalize"> {userData?.username} </div>
                    <div className="font-normal text-gray-500">{userData?.email}  </div>
                </div>
            </th>
            <td className="px-6 py-4">
                React Developer
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${statut} me-2`} ></div> Online
                </div>
            </td>
            <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit user
                </a>
            </td>
        </tr>
    )
}
