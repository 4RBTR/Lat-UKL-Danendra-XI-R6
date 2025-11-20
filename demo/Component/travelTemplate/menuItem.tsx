import React from 'react';
import Link from "next/link"

// Properti untuk component list menu
interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    active?: boolean;
}

// Fungsi untuk menampilkan list pada sidebar
const TravelMenuItem = ({ icon, label, path, active }: MenuItemProps) => {
    return (
        <Link
            href={path}
            className={`flex items-center p-3 my-2 rounded-lg transition-colors
        ${active
                    ? 'text-white bg-teal-500 shadow-md'
                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-500'
                }`
            }
        >
            <span className="mr-3">{icon}</span>
            <span className="flex-1 font-medium">{label}</span>
        </Link>
    );
};

export default TravelMenuItem;