/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Laptop,
    Mouse,
    Headphones,
    Monitor,
    Code,
    Terminal,
    Coffee,
    ExternalLink,
    Palette,
    Box,
    Star,
    Gift,
    Sparkles
} from "lucide-react";

// --- TIPE DATA ---
type GearItem = {
    id: number;
    category: "Hardware" | "Software" | "Office";
    name: string;
    description: string;
    icon: any;
    link: string;
    rating: number; // Fitur Baru: Rating 1-5
};

// Tipe Data Wishlist
type WishlistItem = {
    id: number;
    name: string;
    price: string;
};

export default function GearPage() {
    const [activeTab, setActiveTab] = useState<string>("All");

    // --- DATA GEAR (Sudah ditambah Rating) ---
    const gears: GearItem[] = [
        // HARDWARE
        {
            id: 1,
            category: "Hardware",
            name: "Lenovo LOQ / Laptop Gaming",
            description: "Laptop tempur utama untuk coding dan gaming. Spesifikasi Intel Core i5 12th Gen, RTX 3050.",
            icon: Laptop,
            link: "#",
            rating: 5
        },
        {
            id: 2,
            category: "Hardware",
            name: "Logitech G304 Wireless",
            description: "Mouse wireless tanpa delay, ringan, dan baterai awet berbulan-bulan.",
            icon: Mouse,
            link: "#",
            rating: 4
        },
        {
            id: 3,
            category: "Hardware",
            name: "Mechanical Keyboard",
            description: "Keyboard 75% dengan Red Switch biar gak terlalu berisik pas ngoding malem.",
            icon: Box,
            link: "#",
            rating: 5
        },
        {
            id: 4,
            category: "Hardware",
            name: "Monitor 24 Inch",
            description: "Monitor eksternal 1080p 144Hz buat multitasking buka preview browser.",
            icon: Monitor,
            link: "#",
            rating: 4
        },

        // SOFTWARE
        {
            id: 5,
            category: "Software",
            name: "VS Code",
            description: "Editor sejuta umat. Tema favorit: Tokyo Night / One Dark Pro.",
            icon: Code,
            link: "https://code.visualstudio.com/",
            rating: 5
        },
        {
            id: 6,
            category: "Software",
            name: "Windows Terminal",
            description: "Terminal modern dengan Oh-My-Posh biar tampilannya estetik.",
            icon: Terminal,
            link: "#",
            rating: 4
        },
        {
            id: 7,
            category: "Software",
            name: "Figma",
            description: "Tools andalan buat desain UI sebelum di-convert ke kode React.",
            icon: Palette,
            link: "https://www.figma.com/",
            rating: 5
        },

        // OFFICE
        {
            id: 9,
            category: "Office",
            name: "Meja Minimalis",
            description: "Meja custom ukuran 120x60cm warna putih biar kelihatan bersih.",
            icon: Coffee,
            link: "#",
            rating: 4
        },
        {
            id: 10,
            category: "Office",
            name: "Sony WH-1000XM4",
            description: "Headphone noise cancelling. Wajib banget buat fokus ngoding (Deep Work).",
            icon: Headphones,
            link: "#",
            rating: 5
        },
    ];

    // --- DATA WISHLIST (Barang Impian) ---
    const wishlist: WishlistItem[] = [
        { id: 1, name: "MacBook Pro M3", price: "Rp 25jt+" },
        { id: 2, name: "Herman Miller Chair", price: "Rp 15jt" },
        { id: 3, name: "Keychron Q1 Pro", price: "Rp 3jt" },
    ];

    // Logic Filter
    const filteredGears = activeTab === "All"
        ? gears
        : gears.filter(item => item.category === activeTab);

    // Helper Render Bintang
    const renderStars = (count: number) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={`${i < count ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <Laptop className="w-10 h-10" /> My Gear & Setup
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Daftar alat tempur yang saya gunakan sehari-hari untuk coding, desain, dan produktivitas.
                </p>
            </div>

            {/* --- FITUR BARU 1: SETUP REVEAL (FOTO) --- */}
            <div className="relative w-full h-64 md:h-80 bg-slate-200 rounded-3xl overflow-hidden mb-12 shadow-xl group">
                {/* Placeholder Image (Ganti src dengan foto setup asli kamu di folder public, misal "/setup.jpg") */}
                {/* <Image src="/setup.jpg" alt="My Desk Setup" fill className="object-cover" /> */}

                {/* Placeholder Sementara */}
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-r from-slate-800 to-slate-900 text-white">
                    <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-3 text-yellow-400 animate-pulse" />
                        <h3 className="text-2xl font-bold">Workspace Reveal</h3>
                        <p className="text-slate-400 text-sm">(Upload foto meja kerjamu di sini)</p>
                    </div>
                </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {["All", "Hardware", "Software", "Office"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === tab
                                ? "bg-slate-800 text-white shadow-lg ring-2 ring-slate-300"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* GRID LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {filteredGears.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start group relative overflow-hidden"
                    >
                        {/* Dekorasi Background */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full z-0 group-hover:bg-slate-100 transition-colors"></div>

                        {/* Icon Box */}
                        <div className={`p-4 rounded-xl shrink-0 transition-colors relative z-10 ${item.category === "Hardware" ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" :
                                item.category === "Software" ? "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white" :
                                    "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                            }`}>
                            <item.icon size={32} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 relative z-10">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors">
                                    {item.name}
                                </h3>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-300 hover:text-teal-600 transition-colors"
                                    title="Link External"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.category === "Hardware" ? "bg-blue-100 text-blue-700" :
                                        item.category === "Software" ? "bg-purple-100 text-purple-700" :
                                            "bg-orange-100 text-orange-700"
                                    }`}>
                                    {item.category}
                                </span>
                                {/* FITUR BARU 2: Rating */}
                                {renderStars(item.rating)}
                            </div>

                            <p className="text-slate-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- FITUR BARU 3: WISHLIST SECTION --- */}
            <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                            <Gift className="text-pink-400" /> My Wishlist
                        </h3>
                        <p className="text-slate-400">
                            Barang-barang impian yang ingin saya miliki untuk meningkatkan produktivitas di masa depan.
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="grid gap-3">
                            {wishlist.map((item) => (
                                <div key={item.id} className="flex justify-between items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-sm font-mono text-teal-300 bg-teal-900/50 px-2 py-1 rounded">
                                        {item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}