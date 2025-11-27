"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
    Search, X, Folder, TrendingUp, Home,
    User, BookOpen, Settings, List, Activity,
    Layers, Code, Send,
    Gamepad, Book, FileText, Gift, Heart,
    Server, Sparkles
} from "lucide-react";

// --- DAFTAR SEMUA ROUTE (Berdasarkan Struktur Folder Kamu) ---
// Note: Path harus sesuai dengan nama folder di app/Main
const allRoutes = [
    // Struktur Utama
    { label: "Dashboard", path: "/Main/Dashboard", icon: <Home size={18} />, tags: "utama beranda index" },
    { label: "My Profile", path: "/Main/MyProfile", icon: <User size={18} />, tags: "profil diri info bio" },

    // Pendidikan & Skill
    { label: "My Education", path: "/Main/MyEducation", icon: <BookOpen size={18} />, tags: "pendidikan sekolah kampus" },
    { label: "Skills & Tech Stack", path: "/Main/Skills", icon: <TrendingUp size={18} />, tags: "keahlian teknologi framework" },

    // Project & Dokumentasi
    { label: "Projects Showcase", path: "/Main/Projects", icon: <Folder size={18} />, tags: "proyek aplikasi portofolio" },
    { label: "Snippets (Kode Cepat)", path: "/Main/Snippets", icon: <Code size={18} />, tags: "kode cepat helper fungsi" },
    { label: "Resources (Link Penting)", path: "/Main/Resources", icon: <List size={18} />, tags: "link referensi belajar" },
    { label: "Insights / Blog", path: "/Main/Insights", icon: <Book size={18} />, tags: "blog artikel tulisan" },

    // Utilitas & Pengaturan
    { label: "Design System (Gear)", path: "/Main/Gear", icon: <Layers size={18} />, tags: "komponen desain ui/ux" },
    { label: "Changelog", path: "/Main/Changelog", icon: <Activity size={18} />, tags: "update riwayat perubahan" },
    { label: "Settings", path: "/Main/Settings", icon: <Settings size={18} />, tags: "pengaturan konfigurasi" },
    { label: "Website Info", path: "/Main/WebsiteInfo", icon: <FileText size={18} />, tags: "tentang website info" },

    // Interaktif & Lain-lain
    { label: "Arcade Zone", path: "/Main/Arcade", icon: <Gamepad size={18} />, tags: "game permainan uji logika" },
    { label: "Playground", path: "/Main/Playground", icon: <Sparkles size={18} />, tags: "uji coba testing sandbox" },
    { label: "Testimonials", path: "/Main/Testimonials", icon: <Heart size={18} />, tags: "testimoni ulasan feedback" },
    { label: "Guestbook", path: "/Main/Guestbook", icon: <Gift size={18} />, tags: "buku tamu pesan" },
    { label: "Contact Me", path: "/Main/Contact", icon: <Send size={18} />, tags: "kontak hubungi email" },
    { label: "Services", path: "/Main/Services", icon: <Server size={18} />, tags: "layanan tawaran jasa" },
];


export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Filter Logic menggunakan useMemo agar performa lebih cepat
    const filteredRoutes = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) {
            // Jika tidak ada query, tampilkan 5 route utama
            return allRoutes.slice(0, 5);
        }

        return allRoutes.filter(route =>
            route.label.toLowerCase().includes(query) ||
            route.tags.toLowerCase().includes(query)
        ).slice(0, 10);
    }, [searchQuery]);

    // Keyboard Handler (Ctrl+K, Esc, Arrow Keys, Enter)
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
            setSearchQuery("");
            setSelectedIndex(0);
        } else if (isOpen) {
            if (e.key === 'Escape') {
                setIsOpen(false);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredRoutes.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredRoutes.length) % filteredRoutes.length);
            } else if (e.key === 'Enter' && filteredRoutes[selectedIndex]) {
                const route = filteredRoutes[selectedIndex];
                window.location.href = route.path;
                setIsOpen(false);
            }
        }
    }, [isOpen, filteredRoutes, selectedIndex]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-10000 bg-slate-900/60 backdrop-blur-sm flex justify-center pt-20 transition-all duration-200"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="bg-white w-full max-w-xl rounded-xl shadow-2xl flex flex-col overflow-hidden transform scale-95 md:scale-100 animate-slideDown"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="p-4 flex items-center border-b border-slate-100">
                    <Search className="text-slate-400 mr-3 shrink-0" size={20} />
                    <input
                        type="text"
                        placeholder="Cari halaman, fitur, atau tutorial..."
                        className="w-full text-lg outline-none placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        autoFocus
                    />
                    <button onClick={() => setIsOpen(false)} title="Close" className="text-slate-400 hover:text-slate-600 ml-2">
                        <X size={20} />
                    </button>
                </div>

                {/* Results List */}
                <div className="p-2 overflow-y-auto max-h-80">
                    {filteredRoutes.length > 0 ? (
                        filteredRoutes.map((route, index) => (
                            <Link
                                href={route.path}
                                key={route.path}
                                onClick={() => setIsOpen(false)}
                                // Gunakan ref untuk memastikan elemen yang dipilih ada di view saat navigasi keyboard
                                // Note: Untuk implementasi ref yang benar, perlu sedikit penambahan kode. 
                                // Untuk saat ini, kita fokus pada style.
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${index === selectedIndex ? "bg-teal-500 text-white shadow-md" : "hover:bg-slate-100 text-slate-700"
                                    }`}
                            >
                                <div className={`flex items-center gap-3 ${index === selectedIndex ? "text-white" : "text-teal-600"}`}>
                                    {route.icon}
                                    <span className={`font-medium ${index === selectedIndex ? "text-white" : "text-slate-800"}`}>{route.label}</span>
                                </div>
                                <span className="text-xs text-slate-400 hidden sm:block">GO</span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-slate-500 p-4">Tidak ada hasil ditemukan.</p>
                    )}
                </div>

                {/* Footer Hint */}
                <div className="p-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                    <span>Tekan <kbd className="font-bold border border-slate-300 rounded-sm p-0.5">↑</kbd> <kbd className="font-bold border border-slate-300 rounded-sm p-0.5">↓</kbd> untuk navigasi, <kbd className="font-bold border border-slate-300 rounded-sm p-0.5">↵ Enter</kbd> untuk memilih.</span>
                    <span className="ml-4">Shortcut: <kbd className="font-bold border border-slate-300 rounded-sm p-0.5">Ctrl</kbd> + <kbd className="font-bold border border-slate-300 rounded-sm p-0.5">K</kbd></span>
                </div>
            </div>
        </div>
    );
}