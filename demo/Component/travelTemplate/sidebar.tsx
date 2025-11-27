"use client"
import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react" // Import Icon Panah
import TravelMenuItem from "./menuItem"

// --- TIPE DATA ---
type MenuItemType = { id: string, icon: ReactNode, path: string, label: string }
type MenuGroupType = { category: string, items: MenuItemType[] }

type TravelProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuGroupType[]
}

// --- SUB-COMPONENT: GROUP MENU (ACCORDION) ---
const SidebarGroup = ({ group, activeId }: { group: MenuGroupType, activeId: string }) => {
    // Cek apakah salah satu item di dalam grup ini sedang aktif
    // Jika iya, default-nya terbuka (true). Jika tidak, tertutup (false).
    const isActiveGroup = group.items.some(item => item.id === activeId);
    const [isOpen, setIsOpen] = useState(isActiveGroup);

    return (
        <div className="mb-2">
            {/* Tombol Kategori (Klik untuk Buka/Tutup) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-slate-400 hover:text-teal-600 transition-colors group"
            >
                <span className="text-[11px] font-extrabold uppercase tracking-widest">
                    {group.category}
                </span>
                {/* Icon Panah Berputar */}
                <div className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={14} />
                </div>
            </button>

            {/* List Menu (Animasi Buka/Tutup) */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-3 space-y-1 pb-2">
                    {group.items.map((menu, i) => (
                        <TravelMenuItem
                            key={i}
                            icon={menu.icon}
                            label={menu.label}
                            path={menu.path}
                            active={menu.id === activeId}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- MAIN COMPONENT: SIDEBAR ---
const TravelSidebar = ({ children, id, title, menuList }: TravelProp) => {
    const [isShow, setIsShow] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState("")

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Jakarta",
                year: "numeric", month: "long", day: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
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
                    <button onClick={() => setIsShow(true)} title="Toggle Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="font-extrabold text-2xl text-white tracking-wider leading-tight">{title}</h1>
                        <p className="text-xs text-teal-100">{currentTime}</p>
                    </div>
                </div>

                {/* User / Dropdown */}
                <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white p-2 rounded-full hover:bg-teal-600/50 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="font-semibold hidden md:inline">Na   vigation</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-10 top-full border border-slate-100 animate-fadeIn">
                            <Link href="/Main/Changelog" className="block px-4 py-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-600 font-medium transition-colors">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-slate-400"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    View Changelog
                                </div>
                            </Link>
                            <Link href="/Main/Settings" className="block px-4 py-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-600 font-medium transition-colors">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-slate-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                    Settings
                                </div>
                            </Link>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <Link href="/Main/Dashboard" className="block px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-semibold transition-colors">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    Back Dashboard
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* SIDEBAR SECTION */}
            <div className={`flex flex-col w-72 h-full fixed top-0 left-0 transition-transform duration-300 z-50 bg-white shadow-2xl border-r-4 border-teal-400 ${isShow ? '' : '-translate-x-full'}`}>

                {/* Top Sidebar */}
                <div className="p-4 flex justify-between items-center border-b border-slate-100">
                    <div className="flex items-center gap-2 text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                        <span className="font-extrabold text-xl tracking-tight">Portfolio.</span>
                    </div>
                    <button onClick={() => setIsShow(false)} className="hover:bg-slate-100 p-1 rounded-full text-slate-400 hover:text-red-500 transition" title="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                {/* User Info */}
                <div className="bg-teal-50/50 p-4 flex items-center gap-3 border-b border-teal-100">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">DB</div>
                    <div>
                        <p className="text-sm font-bold text-slate-700">Danendra Bagas</p>
                        <p className="text-xs text-teal-600 font-medium">Frontend Dev</p>
                    </div>
                </div>

                {/* 🔥 MENU LIST (ACCORDION) 🔥 */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2 custom-scrollbar">
                    {menuList.map((group, idx) => (
                        <SidebarGroup
                            key={idx}
                            group={group}
                            activeId={id}
                        />
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 pt-24 md:pt-28">
                {children}
            </div>
        </div>
    )
}

export default TravelSidebar