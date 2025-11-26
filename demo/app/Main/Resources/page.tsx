/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Search,
    Youtube,
    Book,
    Palette,
    Wrench,
    ExternalLink,
    Bookmark,
    Tag,
    LayoutGrid,
    Globe
} from "lucide-react";

// --- TIPE DATA ---
type Resource = {
    id: number;
    title: string;
    category: "Learning" | "Docs" | "UI Assets" | "Tools";
    description: string;
    url: string;
    tags: string[]; // Contoh: ["Free", "Indonesia", "Video"]
    icon: any;
};

export default function ResourcesPage() {

    // --- DATA RESOURCE (Bisa ditambah sesukamu) ---
    const resources: Resource[] = [
        // LEARNING (YouTube / Course)
        {
            id: 1,
            title: "Web Programming Unpas",
            category: "Learning",
            description: "Channel YouTube legendaris untuk belajar web development bahasa Indonesia. Sangat lengkap!",
            url: "https://www.youtube.com/@sandhikagalih",
            tags: ["YouTube", "Indo", "Free"],
            icon: Youtube
        },
        {
            id: 2,
            title: "Kevin Powell",
            category: "Learning",
            description: "Raja CSS. Wajib ditonton kalau mau jago styling, flexbox, dan grid tanpa pusing.",
            url: "https://www.youtube.com/@KevinPowell",
            tags: ["YouTube", "CSS", "English"],
            icon: Youtube
        },
        {
            id: 3,
            title: "Dicoding Indonesia",
            category: "Learning",
            description: "Platform belajar coding terstruktur dengan kurikulum standar industri global.",
            url: "https://www.dicoding.com/",
            tags: ["Course", "Sertifikat", "Freemium"],
            icon: Globe
        },

        // DOCS (Dokumentasi)
        {
            id: 4,
            title: "React Documentation",
            category: "Docs",
            description: "Dokumentasi resmi React yang baru. Interaktif dan mudah dipahami pemula.",
            url: "https://react.dev/",
            tags: ["Official", "React", "Docs"],
            icon: Book
        },
        {
            id: 5,
            title: "MDN Web Docs",
            category: "Docs",
            description: "Kamus wajib web developer. Segala info tentang HTML, CSS, dan JS ada di sini.",
            url: "https://developer.mozilla.org/",
            tags: ["Official", "Reference"],
            icon: Book
        },

        // UI ASSETS (Icon, Ilustrasi)
        {
            id: 6,
            title: "Lucide React",
            category: "UI Assets",
            description: "Koleksi ikon open-source yang simpel, ringan, dan konsisten. (Dipakai di web ini!)",
            url: "https://lucide.dev/",
            tags: ["Icons", "SVG", "Free"],
            icon: Palette
        },
        {
            id: 7,
            title: "Tailwind UI / Components",
            category: "UI Assets",
            description: "Kumpulan komponen UI siap pakai untuk mempercepat styling dengan Tailwind CSS.",
            url: "https://tailwindui.com/",
            tags: ["UI Kit", "CSS"],
            icon: LayoutGrid
        },

        // TOOLS (Generator, dsb)
        {
            id: 8,
            title: "Vercel",
            category: "Tools",
            description: "Tempat deploy website paling mudah dan cepat khusus untuk Next.js.",
            url: "https://vercel.com/",
            tags: ["Hosting", "Free"],
            icon: Wrench
        },
        {
            id: 9,
            title: "Realtime Colors",
            category: "Tools",
            description: "Simulasi palet warna pada desain website secara realtime sebelum coding.",
            url: "https://realtimecolors.com/",
            tags: ["Color", "Generator"],
            icon: Wrench
        },
    ];

    // --- STATE ---
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    // --- LOGIC ---
    const filteredResources = resources.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filter === "All" || item.category === filter;
        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <Bookmark className="w-10 h-10" /> Pustaka Belajar
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Kumpulan sumber belajar, dokumentasi, dan tools favorit yang membantu saya berkembang sebagai Developer.
                </p>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-col md:flex-row gap-6 mb-10 justify-between items-center">

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {["All", "Learning", "Docs", "UI Assets", "Tools"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filter === cat
                                    ? "bg-slate-800 text-white shadow-lg"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari tools atau channel..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* GRID LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${item.category === "Learning" ? "bg-red-50 text-red-600" :
                                    item.category === "Docs" ? "bg-yellow-50 text-yellow-600" :
                                        item.category === "UI Assets" ? "bg-purple-50 text-purple-600" :
                                            "bg-blue-50 text-blue-600"
                                }`}>
                                <item.icon size={28} />
                            </div>
                            <ExternalLink size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                            {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {item.tags.map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-100">
                                    <Tag size={10} className="mr-1" /> {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>

            {/* EMPTY STATE */}
            {filteredResources.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">Resource tidak ditemukan 🧐</p>
                    <button onClick={() => { setSearch(""); setFilter("All") }} className="text-teal-600 font-bold mt-2 hover:underline text-sm">
                        Reset Filter
                    </button>
                </div>
            )}

        </div>
    );
}