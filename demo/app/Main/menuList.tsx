import { ReactNode } from "react"
// Import icon dari Lucide (lebih ringan daripada SVG manual)
// Kalau kamu mau tetap pakai SVG manual, tinggal ganti bagian icon-nya
import {
    Activity, User, BookOpen, Calendar,
    Code2, FolderGit2, Zap, Gamepad2,
    Box, PenTool, MessageSquare, Laptop, Bookmark, FileCode, Info, Contact
} from "lucide-react";

// Tipe Data Baru (Grouped)
export interface IPropMenu {
    category: string;
    items: {
        id: string;
        path: string;
        label: string;
        icon: ReactNode;
    }[];
}

const menuList: IPropMenu[] = [
    {
        category: "Overview",
        items: [
            {
                id: 'Dashboard',
                path: '/Main/Dashboard',
                label: 'Dashboard',
                icon: <Activity size={20} />
            },
        ]
    },
    {
        category: "Personal Info",
        items: [
            {
                id: 'MyProfile',
                path: '/Main/MyProfile',
                label: 'Profile',
                icon: <User size={20} />
            },
            {
                id: 'MyEducation',
                path: '/Main/MyEducation',
                label: 'Education',
                icon: <BookOpen size={20} />
            },
            {
                id: 'Planning',
                path: '/Main/Planning',
                label: 'Planning',
                icon: <Calendar size={20} />
            },
            {
                id: 'Skills',
                path: '/Main/Skills',
                label: 'Skills',
                icon: <Code2 size={20} />
            },
        ]
    },
    {
        category: "Showcase",
        items: [
            {
                id: 'Projects',
                path: '/Main/Projects',
                label: 'Projects',
                icon: <FolderGit2 size={20} />
            },
            {
                id: 'Services',
                path: '/Main/Services',
                label: 'Services',
                icon: <Zap size={20} />
            },
        ]
    },
    {
        category: "Play & Fun",
        items: [
            {
                id: 'Arcade',
                path: '/Main/Arcade',
                label: 'Arcade Zone',
                icon: <Gamepad2 size={20} />
            },
            {
                id: 'Playground',
                path: '/Main/Playground',
                label: 'Playground',
                icon: <Box size={20} />
            },
        ]
    },
    {
        category: "Community",
        items: [
            {
                id: 'Guestbook',
                path: '/Main/Guestbook',
                label: 'Guestbook',
                icon: <PenTool size={20} />
            },
            {
                id: 'Testimonials',
                path: '/Main/Testimonials',
                label: 'Testimonials',
                icon: <MessageSquare size={20} />
            },
            {
                id: 'Contact',
                path: '/Main/Contact',
                label: 'Contact',
                icon: <Contact size={20} />
            },
            {
            id: 'Insights',
            path: '/Main/Insights',
            label: 'Insights / Blog',
            icon: <BookOpen size={20}/> // Pastikan import BookOpen
        },
        ]
    },
    {
        category: "System",
        items: [
            {
                id: 'Gear',
                path: '/Main/Gear',
                label: 'My Gear',
                icon: <Laptop size={20} />
            },
            {
                id: 'Resources',
                path: '/Main/Resources',
                label: 'Resources',
                icon: <Bookmark size={20} />
            },
            {
                id: 'Snippets',
                path: '/Main/Snippets',
                label: 'Snippets',
                icon: <FileCode size={20} />
            },
            {
                id: 'WebsiteInfo',
                path: '/Main/WebsiteInfo',
                label: 'About Site',
                icon: <Info size={20} />
            },
        ]
    }
];

export default menuList;