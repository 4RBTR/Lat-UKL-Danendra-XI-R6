"use client"
import { ReactNode } from "react";
import TravelSidebar from "./sidebar"; // Ganti ke TravelSidebar

// Definisi Tipe Menu dan Props
type MenuType = { id: string, icon: ReactNode, path: string, label: string }
type MenuGroupType = { category: string, items: MenuType[] }
type TravelProp = { children: ReactNode, id: string, title: string, menuList: MenuGroupType[] }

const TravelTemplate = ({ children, id, title, menuList }: TravelProp) => {
    return (
        <div className="w-full min-h-dvh bg-gray-50">
            <TravelSidebar menuList={menuList} title={title} id={id}>
                {children}
            </TravelSidebar>
        </div>
    )
}

export default TravelTemplate