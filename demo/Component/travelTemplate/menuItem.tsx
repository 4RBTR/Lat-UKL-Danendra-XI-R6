import React from 'react';
import Link from "next/link"

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    active?: boolean;
}

const TravelMenuItem = ({ icon, label, path, active }: MenuItemProps) => {
    return (
        <Link
            href={path}
            className={`flex items-center p-3 my-1 rounded-xl transition-all duration-200 group
            ${active
                ? 'text-white bg-linear-to-r from-teal-500 to-teal-400 shadow-md shadow-teal-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
            }`}
        >
            <span className={`mr-3 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-teal-500'}`}>
                {icon}
            </span>
            <span className="flex-1 font-medium text-sm">{label}</span>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>}
        </Link>
    );
};

export default TravelMenuItem;