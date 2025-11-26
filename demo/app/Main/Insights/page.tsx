"use client";

import { useState } from "react";
import {
    BookOpen, Search, Clock, ChevronRight,
    X, User, Calendar, Share2, Heart
} from "lucide-react";
import Image from "next/image";

// --- TIPE DATA ARTKEL ---
type Article = {
    id: number;
    title: string;
    excerpt: string; // Ringkasan
    content: string; // Isi Full (HTML simpel)
    category: "Tech" | "Life" | "Tutorial" | "Opinion";
    date: string;
    readTime: string;
    image: string;
    likes: number;
};

// --- DATA DUMMY ARTIKEL ---
const articlesData: Article[] = [
    {
        id: 1,
        title: "Kenapa Saya Memilih Next.js untuk Portfolio Ini?",
        excerpt: "Next.js menawarkan fitur Server Side Rendering dan optimasi gambar yang luar biasa. Simak alasan teknis lengkapnya di sini.",
        category: "Tech",
        date: "20 Nov 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1618477247222-ac5970ac9650?q=80&w=800&auto=format&fit=crop",
        content: `
            <p class="mb-4">Saat membangun portfolio ini, saya dihadapkan pada dua pilihan: Create React App (CRA) atau Next.js. Akhirnya saya memilih Next.js, dan ini adalah keputusan terbaik.</p>
            <h3 class="text-xl font-bold text-slate-800 mb-2">1. Performa Luar Biasa</h3>
            <p class="mb-4">Dengan fitur Static Site Generation (SSG), halaman diload dengan sangat cepat karena sudah di-build di server.</p>
            <h3 class="text-xl font-bold text-slate-800 mb-2">2. Image Optimization</h3>
            <p class="mb-4">Komponen <code>&lt;Image /&gt;</code> dari Next.js otomatis mengubah format gambar ke WebP dan menyesuaikan ukuran layar. Ini menghemat bandwidth pengguna.</p>
            <p>Kesimpulannya, Next.js memberikan Developer Experience (DX) yang menyenangkan sekaligus User Experience (UX) yang maksimal.</p>
        `,
        likes: 124
    },
    {
        id: 2,
        title: "Cara Mengatur Waktu antara Sekolah dan Coding",
        excerpt: "Tips manajemen waktu bagi pelajar SMK yang ingin mendalami dunia programming tanpa mengorbankan nilai akademik.",
        category: "Life",
        date: "15 Nov 2024",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
        content: `
            <p class="mb-4">Banyak teman bertanya, "Kapan kamu tidur?". Sebenarnya kuncinya bukan begadang, tapi <strong>Fokus</strong>.</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>Gunakan teknik <strong>Pomodoro</strong> (25 menit kerja, 5 menit istirahat).</li>
                <li>Manfaatkan jam kosong di sekolah untuk membaca dokumentasi.</li>
                <li>Jangan coding saat otak lelah, hasilnya pasti bug.</li>
            </ul>
            <p>Kesehatan tetap nomor satu. Coding itu maraton, bukan lari sprint.</p>
        `,
        likes: 89
    },
    {
        id: 3,
        title: "Tutorial: Membuat Dark Mode dengan Tailwind CSS",
        excerpt: "Panduan singkat implementasi fitur tema gelap (dark mode) menggunakan class 'dark' pada Tailwind.",
        category: "Tutorial",
        date: "10 Nov 2024",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        content: `
            <p class="mb-4">Dark mode bukan sekadar tren, tapi kebutuhan aksesibilitas. Berikut cara mudahnya:</p>
            <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4 overflow-x-auto"><code>// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}</code></pre>
            <p class="mb-4">Setelah itu, kita hanya perlu menambahkan class <code>dark</code> di tag HTML utama saat user menekan tombol toggle.</p>
        `,
        likes: 256
    }
];

export default function InsightsPage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // Filter Logic
    const filteredArticles = articlesData.filter(art => {
        const matchSearch = art.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filter === "All" || art.category === filter;
        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <BookOpen className="w-10 h-10" /> Insights & Blog
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Tulisan, tutorial, dan pemikiran saya seputar teknologi dan kehidupan sebagai developer muda.
                </p>
            </div>

            {/* SEARCH & FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {["All", "Tech", "Life", "Tutorial"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filter === cat
                                    ? "bg-teal-600 text-white shadow-md"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ARTICLE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                    >
                        {/* Image Cover */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-bold rounded-lg shadow-sm uppercase tracking-wider">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                {article.title}
                            </h3>

                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                <span className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-pink-500 transition-colors">
                                    <Heart size={14} className="group-hover:fill-current" /> {article.likes}
                                </span>
                                <span className="flex items-center text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                                    Baca Selengkapnya <ChevronRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ARTICLE MODAL (Reader View) */}
            {selectedArticle && (
                <div className="fixed inset-0 z-9999 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedArticle(null)}>
                    <div
                        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header (Scrollable with content or Fixed? Let's make it scrollable body) */}
                        <div className="relative h-64 shrink-0">
                            <Image
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                title="button"
                                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-all"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="px-2 py-1 bg-teal-500 text-[10px] font-bold rounded mb-2 inline-block uppercase">{selectedArticle.category}</span>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">{selectedArticle.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-200">
                                    <span className="flex items-center gap-1"><User size={14} /> Danendra Bagas</span>
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {selectedArticle.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <div
                                className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-teal-600 hover:prose-a:text-teal-500"
                                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                            />

                            {/* Share Section */}
                            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                                <p className="text-sm font-bold text-slate-500">Suka artikel ini?</p>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">
                                    <Share2 size={16} /> Bagikan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}