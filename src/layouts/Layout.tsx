import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.svg'

import { CgUser } from "react-icons/cg";

export default function Layout() {
    return (
        <>

            {/* start: Sidebar */}
            <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
                <a href="/" className="flex items-center pb-6 border-b border-b-gray-800">
                    <img
                        src={logo}
                        alt=""
                        className="w-2xl h-2s rounded object-cover"
                    />

                </a>
                <ul className="mt-4">
                    <li className="mb-1 group active">
                    <Link
                            to="/"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                        >
                            <CgUser />
                            <i className="ri-home-2-line mr-3 text-lg" />
                            <span className="text-sm">Dashboard Usuarios</span>
                    </Link>
                        
                    </li>
                  
                </ul>
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" />
            {/* end: Sidebar */}


            {/* start: Main */}
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">

                <div className="p-6">

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-4 mb-6">
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            
                            <Outlet/>
                        </div>

                    </div>


                </div>
            </main>
            {/* end: Main */}

        </>
    )
}
