"use client"
import { ReactNode, useState, useEffect } from "react"
import TravelMenuItem from "./menuItem"

type MenuType = { id: string, icon: ReactNode, path: string, label: string }
type TravelProp = { children: ReactNode, id: string, title: string, menuList: MenuType[] }

const TravelSidebar = ({ children, id, title, menuList }: TravelProp) => {
    const [isShow, setIsShow] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState("")

    // Update waktu setiap detik (WIB)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Jakarta",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
            const formatter = new Intl.DateTimeFormat("id-ID", options)
            setCurrentTime(formatter.format(now) + " WIB")
        } 

        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    return (
        <div className="w-full min-h-dvh bg-gray-50">
            {/* HEADER SECTION */}
            <header className="flex justify-between items-center p-4 bg-linear-to-r from-teal-500 to-teal-400 shadow-lg fixed top-0 w-full z-40">
                <div className="flex gap-4 items-center">
                    {/* Menu Toggle Button */}
                    <button onClick={() => setIsShow(true)} title="Toggle Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Judul + Waktu */}
                    <div>
                        <h1 className="font-extrabold text-2xl text-white tracking-wider leading-tight">{title}</h1>
                        <p className="text-xs text-teal-100">{currentTime}</p>
                    </div>
                </div>

                {/* User / Logout Section */}
                <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white p-2 rounded-full hover:bg-teal-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="font-semibold hidden md:inline">Admin</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 top-full border border-gray-100">
                            <a href="Home" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold border-t mt-1">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>
                                    Back To Home
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* SIDEBAR SECTION */}
            <div
                className={`flex flex-col w-64 h-full fixed top-0 left-0 transition-transform z-50 bg-white shadow-2xl border-r-4 border-teal-400
                ${isShow ? '' : '-translate-x-full'}`}
            >
                <div className="ml-auto p-4">
                    <button onClick={() => setIsShow(false)} title="Close Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Logo */}
                <div className="mb-6 w-full flex justify-center border-b pb-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-teal-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21v-4.5m0-4.5H2.36M12 12h19.64M12 12a9.004 9.004 0 0 0 5.659 2.571m0 0a8.995 8.995 0 0 1-11.318 0m0 0a9.003 9.003 0 0 1 3.75-2.232l.835-.091v.75M12 12V9M6.51 16.791a8.965 8.965 0 0 1-1.804-1.258l-.422-.445m.002-1.745l.183-.497m8.495 2.103a9.003 9.003 0 0 1 3.2-2.245l.386-.134m.001-1.077l.081-.295M19.5 12h1.5M4.5 12H3" />
                        </svg>
                        <h1 className="text-2xl font-extrabold text-teal-500"></h1>
                    </div>
                </div>

                {/* User */}
                <div className="w-full mb-6 bg-teal-500 text-white p-4 flex gap-3 items-center">
                    <div className="size-10 bg-white rounded-full flex items-center justify-center text-teal-400 font-bold">AN</div>
                    <div className="text-base font-semibold"></div>
                </div>

                {/* Menu */}
                <div className="w-full p-2 overflow-y-auto flex-1">
                    <div className="px-5">
                        {menuList.map((menu, index) => (
                            <TravelMenuItem
                                icon={menu.icon}
                                label={menu.label}
                                path={menu.path}
                                active={menu.id === id}
                                key={`keyMenu${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 pt-20">
                {children}
            </div>
        </div>
    )
}

export default TravelSidebar
