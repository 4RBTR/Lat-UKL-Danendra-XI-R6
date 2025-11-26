/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
    GitCommit,
    Calendar,
    Zap,
    Bug,
    Star,
    ArrowUpCircle,
    Search,
    Map,
    CheckCircle,
    Clock,
    Loader,
    ThumbsUp,
    Filter,
    ChevronDown, // Icon baru untuk toggle detail
    ChevronUp // Icon baru untuk toggle detail
} from "lucide-react";

// --- TIPE DATA ---
type ChangeItem = { type: "New" | "Improvement" | "Fix"; text: string };
type FilterType = ChangeItem["type"] | "All";

type Log = {
    id: number;
    version: string;
    date: string;
    title: string;
    desc: string;
    changes: ChangeItem[];
    likes: number;
};

type RoadmapItem = {
    id: number;
    title: string;
    status: "Planned" | "In Progress" | "Completed";
    desc: string;
};

// --- DATA LOG STATIC ---
const initialLogs: Log[] = [
    {
        id: 5,
        version: "v3.0",
        date: "26 November 2025",
        title: "Performance Card & New Layout",
        desc: "Pembaruan besar-besaran pada Dashboard, termasuk metrik performa, penataan ulang grid layout, dan peningkatan stabilitas.",
        changes: [
            { type: "New", text: "Menambahkan Performance Rating Card (Progress Bar Skill)." },
            { type: "Improvement", text: "Perubahan layout Dashboard dari 2 kolom menjadi 3 kolom (1:2) untuk tampilan yang optimal." },
            { type: "New", text: "Menambahkan data stats dan heatmap ke layout baru." },
            { type: "Fix", text: "Mengoptimalkan komponen Music Player untuk mematikan auto-play di mode production." },
        ],
        likes: 15
    },
    {
        id: 4,
        version: "v2.5",
        date: "26 November 2024",
        title: "The Ultimate Dashboard Upgrade",
        desc: "Pembaruan besar-besaran pada halaman Dashboard dengan fitur interaktif seperti Real Music Player dan Pomodoro Timer.",
        changes: [
            { type: "New", text: "Menambahkan Real Music Player dengan progress bar." },
            { type: "New", text: "Fitur Pomodoro Timer untuk produktivitas." },
            { type: "New", text: "Quick Notes dengan Auto-Save (LocalStorage)." },
            { type: "Fix", text: "Memperbaiki error Hydration pada grafik Heatmap." }
        ],
        likes: 12
    },
    {
        id: 3,
        version: "v2.1",
        date: "25 November 2024",
        title: "Playground & Services",
        desc: "Menambahkan halaman eksperimen kode dan daftar layanan jasa profesional.",
        changes: [
            { type: "New", text: "Halaman Playground (Color Gen, Todo, Stopwatch)." },
            { type: "New", text: "Halaman Services dengan Kalkulator Estimasi Harga." },
            { type: "Improvement", text: "Refactoring kode Home agar lebih modular dan efisien." }
        ],
        likes: 8
    },
    {
        id: 2,
        version: "v1.8",
        date: "20 November 2024",
        title: "Portfolio Showcase",
        desc: "Meluncurkan halaman Gallery dan Projects untuk menampilkan karya-karya terbaik.",
        changes: [
            { type: "New", text: "Halaman My Projects dengan modal detail pop-up." },
            { type: "New", text: "Halaman Gallery dengan layout Masonry yang responsif." },
            { type: "Improvement", text: "Update Navbar dengan efek backdrop blur yang modern." }
        ],
        likes: 5
    },
    {
        id: 1,
        version: "v1.0",
        date: "10 November 2024",
        title: "Initial Release",
        desc: "Peluncuran pertama website portfolio pribadi yang dibangun dengan Next.js dan Tailwind CSS.",
        changes: [
            { type: "New", text: "Halaman Home, Profile, dan Skills." },
            { type: "New", text: "Integrasi Dark Mode (Basic)." },
            { type: "New", text: "Deploy ke Vercel." }
        ],
        likes: 20
    }
];

// --- DATA ROADMAP ---
const roadmap: RoadmapItem[] = [
    { id: 1, title: "Integrasi Blog (CMS)", status: "In Progress", desc: "Membuat halaman blog dinamis menggunakan Contentful atau Sanity untuk manajemen konten yang mudah." },
    { id: 2, title: "Login System", status: "Planned", desc: "Fitur login untuk admin agar bisa update konten website tanpa koding ulang (headless CMS)." },
    { id: 3, title: "Mobile App Version", status: "Planned", desc: "Membangun versi aplikasi mobile menggunakan React Native untuk jangkauan yang lebih luas." },
    { id: 4, title: "Dark Mode Toggle V2", status: "Completed", desc: "Penyempurnaan sistem tema gelap/terang yang tersimpan secara persisten di browser." },
];


export default function ChangelogPage() {

    // --- STATE ---
    const [activeTab, setActiveTab] = useState<"History" | "Roadmap">("History");
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("All");
    const [likedLogs, setLikedLogs] = useState<number[]>([]);
    const [logs, setLogs] = useState<Log[]>(initialLogs);
    // STATE BARU: Menyimpan ID log yang detailnya sedang dibuka
    const [openDetails, setOpenDetails] = useState<number[]>([initialLogs[0].id]);

    // --- LOGIC LIKE (LocalStorage) ---
    useEffect(() => {
        const savedLikes = localStorage.getItem("changelog-likes");
        if (savedLikes) {
            setLikedLogs(JSON.parse(savedLikes));
        }
        // Pastikan versi terbaru (ID tertinggi) terbuka secara default
        const latestId = Math.max(...initialLogs.map(log => log.id));
        setOpenDetails([latestId]);
    }, []);

    const handleLike = (id: number) => {
        if (likedLogs.includes(id)) return;

        const newLikes = [...likedLogs, id];
        setLikedLogs(newLikes);
        localStorage.setItem("changelog-likes", JSON.stringify(newLikes));

        setLogs(logs.map(log => log.id === id ? { ...log, likes: log.likes + 1 } : log));
    };

    // LOGIC BARU: Toggle Detail
    const toggleDetails = (id: number) => {
        setOpenDetails(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // --- LOGIC SEARCH & FILTER ---
    const filteredLogs = logs
        .filter(log =>
            log.title.toLowerCase().includes(search.toLowerCase()) ||
            log.version.toLowerCase().includes(search.toLowerCase())
        )
        .filter(log => {
            if (filterType === "All") return true;
            return log.changes.some(change => change.type === filterType);
        });

    // --- HELPER UI (Tidak Berubah) ---
    const getBadgeColor = (type: string) => {
        switch (type) {
            case "New": return "bg-green-100 text-green-700 border-green-200";
            case "Improvement": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Fix": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getBadgeIcon = (type: string) => {
        switch (type) {
            case "New": return <Star size={12} className="mr-1" />;
            case "Improvement": return <ArrowUpCircle size={12} className="mr-1" />;
            case "Fix": return <Bug size={12} className="mr-1" />;
            default: return <Zap size={12} className="mr-1" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "bg-green-500";
            case "In Progress": return "bg-blue-500";
            default: return "bg-slate-400";
        }
    };

    const filterOptions: { label: string, value: FilterType }[] = [
        { label: "Semua", value: "All" },
        { label: "Baru (New)", value: "New" },
        { label: "Peningkatan (Improvement)", value: "Improvement" },
        { label: "Perbaikan (Fix)", value: "Fix" },
    ];


    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <GitCommit className="w-10 h-10" /> Changelog & Roadmap
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Jejak langkah pengembangan website ini, dari masa lalu hingga rencana masa depan.
                </p>
            </div>

            {/* TABS NAVIGASI */}
            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setActiveTab("History")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === "History" ? "bg-teal-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                >
                    <Clock size={18} /> History
                </button>
                <button
                    onClick={() => setActiveTab("Roadmap")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === "Roadmap" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                >
                    <Map size={18} /> Roadmap
                </button>
            </div>

            {/* === KONTEN HISTORY (CHANGELOG) === */}
            {activeTab === "History" && (
                <div className="animate-fadeIn">

                    {/* Search & Filter Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

                        {/* 1. Search Bar */}
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari update (misal: v2.5, Dashboard...)"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* 2. Filter Dropdown */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none cursor-pointer text-slate-700"
                                value={filterType}
                                title="select"
                                onChange={(e) => setFilterType(e.target.value as FilterType)}
                            >
                                {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ArrowUpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={18} />
                        </div>

                    </div>

                    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-10 space-y-12">
                        {filteredLogs.map((log) => {
                            const isLatest = log.id === Math.max(...initialLogs.map(l => l.id)); // Cek apakah ini versi terbaru
                            const isOpen = openDetails.includes(log.id); // Cek apakah detailnya terbuka

                            return (
                                <div key={log.id} className="relative pl-8 md:pl-12 group">
                                    {/* Dot Timeline */}
                                    <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-teal-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>

                                    {/* Header Item */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                                        <div className="flex items-center gap-3">
                                            {/* BADGE BARU: "NEW UPDATE" */}
                                            {isLatest && (
                                                <span className="animate-pulse px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-bold font-sans mr-2 shadow-md">
                                                    ✨ NEW UPDATE
                                                </span>
                                            )}

                                            <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold font-mono">
                                                {log.version}
                                            </span>
                                            <span className="flex items-center text-sm text-slate-500 font-medium">
                                                <Calendar size={14} className="mr-1.5" /> {log.date}
                                            </span>
                                        </div>

                                        {/* Like Button */}
                                        <button
                                            onClick={() => handleLike(log.id)}
                                            disabled={likedLogs.includes(log.id)}
                                            className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full transition-all ${likedLogs.includes(log.id)
                                                ? "bg-pink-100 text-pink-600 cursor-default"
                                                : "bg-slate-100 text-slate-500 hover:bg-pink-100 hover:text-pink-600"
                                                }`}
                                        >
                                            <ThumbsUp size={12} className={likedLogs.includes(log.id) ? "fill-current" : ""} />
                                            {log.likes}
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{log.title}</h3>
                                    <p className="text-slate-600 mb-4 leading-relaxed">{log.desc}</p>

                                    {/* TOMBOL TOGGLE DETAIL BARU */}
                                    <button
                                        onClick={() => toggleDetails(log.id)}
                                        className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors mb-4"
                                    >
                                        {isOpen ? (
                                            <>
                                                <ChevronUp size={16} /> Sembunyikan Detail
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown size={16} /> Lihat {log.changes.length} Perubahan
                                            </>
                                        )}
                                    </button>


                                    {/* List Changes (KONTEN COLLAPSIBLE) */}
                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="space-y-3 pb-4"> {/* Padding bottom agar tidak menempel saat dibuka */}
                                            {log.changes.map((change, i) => (
                                                <div key={i} className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                                                    <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border tracking-wider ${getBadgeColor(change.type)}`}>
                                                        {getBadgeIcon(change.type)} {change.type}
                                                    </span>
                                                    <span className="text-slate-700 text-sm leading-relaxed">
                                                        {change.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredLogs.length === 0 && (
                        <p className="text-center text-slate-400 mt-10">Versi tidak ditemukan 🔍</p>
                    )}
                </div>
            )}

            {/* === KONTEN ROADMAP (MASA DEPAN - TIDAK BERUBAH) === */}
            {activeTab === "Roadmap" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    {roadmap.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all border-l-4 border-l-slate-300 overflow-hidden relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </div>
                                {item.status === "In Progress" && <Loader size={18} className="text-blue-500 animate-spin" />}
                                {item.status === "Completed" && <CheckCircle size={18} className="text-green-500" />}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                    {/* Suggestion Box */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                        <p className="text-slate-500 font-bold mb-2">Punya ide fitur lain?</p>
                        <a href="/Main/Contact" className="text-teal-600 text-sm font-bold hover:underline">
                            Sampaikan ke saya →
                        </a>
                    </div>
                </div>
            )}

        </div>
    );
}