/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Code2,
    Copy,
    Check,
    Terminal,
    FileCode,
    Hash,
    Atom,
    Plus,
    X,
    Save,
    Trash2,
    Star
} from "lucide-react";

// --- TIPE DATA ---
type Snippet = {
    id: number;
    title: string;
    language: "React" | "CSS" | "JavaScript" | "Git" | "TypeScript";
    code: string;
    description: string;
    isFavorite: boolean; // Fitur Baru: Favorit
};

export default function SnippetsPage() {

    // Data Awal
    const initialSnippets: Snippet[] = [
        {
            id: 1,
            title: "Div Center Absolute",
            language: "CSS",
            description: "Cara klasik membuat elemen ke tengah layar.",
            code: `.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}`,
            isFavorite: true
        },
        {
            id: 2,
            title: "Basic UseState Hook",
            language: "React",
            description: "Template dasar penggunaan state.",
            code: `const [count, setCount] = useState(0);\n\n// Update value\nsetCount(count + 1);`,
            isFavorite: false
        },
        {
            id: 3,
            title: "Git Push New Repo",
            language: "Git",
            description: "Perintah wajib saat pertama kali upload ke GitHub.",
            code: `git init\ngit add .\ngit commit -m "first commit"\ngit branch -M master\ngit remote add origin <link>\ngit push -u origin master`,
            isFavorite: false
        },
        {
            id: 4,
            title: "Map Array to List",
            language: "JavaScript",
            description: "Mengubah array data menjadi elemen HTML list.",
            code: `items.map((item, index) => (\n  <li key={index}>{item}</li>\n))`,
            isFavorite: false
        },
        {
            id: 5,
            title: "Tailwind Gradient Text",
            language: "CSS",
            description: "Membuat teks gradasi warna dengan Tailwind.",
            code: `className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"`,
            isFavorite: false
        }
    ];

    // --- STATE ---
    const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // State Modal & Form
    const [showModal, setShowModal] = useState(false);
    const [newSnippet, setNewSnippet] = useState<Partial<Snippet>>({
        title: "",
        language: "JavaScript",
        code: "",
        description: ""
    });

    // --- LOCAL STORAGE LOAD & SAVE ---
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio-snippets");
        if (savedData) {
            try {
                setSnippets(JSON.parse(savedData));
            } catch (error) {
                console.error("Error loading snippets", error);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio-snippets", JSON.stringify(snippets));
        }
    }, [snippets, isLoaded]);

    // --- LOGIC ---
    const handleCopy = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleFavorite = (id: number) => {
        setSnippets(snippets.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
    };

    const handleDelete = (id: number) => {
        if (confirm("Hapus snippet ini?")) {
            setSnippets(snippets.filter(s => s.id !== id));
        }
    };

    const handleAddSnippet = () => {
        if (!newSnippet.title || !newSnippet.code) return alert("Judul dan Kode wajib diisi!");

        const snippetToAdd: Snippet = {
            id: Date.now(),
            title: newSnippet.title || "Untitled",
            language: newSnippet.language as Snippet["language"],
            code: newSnippet.code || "",
            description: newSnippet.description || "",
            isFavorite: false
        };

        setSnippets([snippetToAdd, ...snippets]);
        setNewSnippet({ title: "", language: "JavaScript", code: "", description: "" });
        setShowModal(false);
    };

    // --- FILTERING ---
    const filteredSnippets = snippets
        .filter(item => {
            const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
            const matchCategory = filter === "All" || item.language === filter;
            const matchFavorite = filter === "Favorites" ? item.isFavorite : true;
            return matchSearch && matchCategory && matchFavorite;
        })
        .sort((a, b) => (b.isFavorite === a.isFavorite ? 0 : b.isFavorite ? 1 : -1)); // Favorit selalu di atas

    // --- HELPER ICON ---
    const getIcon = (lang: string) => {
        switch (lang) {
            case "React": return <Atom size={18} className="text-sky-400" />;
            case "CSS": return <Hash size={18} className="text-blue-500" />;
            case "JavaScript": return <FileCode size={18} className="text-yellow-500" />;
            case "TypeScript": return <Code2 size={18} className="text-blue-600" />;
            case "Git": return <Terminal size={18} className="text-orange-500" />;
            default: return <Code2 size={18} />;
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn pb-20 relative">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <Code2 className="w-10 h-10" /> My Snippets
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Simpan dan kelola potongan kode sakti kamu di sini.
                    Jangan sampai lupa syntax lagi! 🧠
                </p>
            </div>

            {/* CONTROL BAR */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">

                {/* Search */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari snippet..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {["All", "Favorites", "React", "CSS", "JavaScript", "Git"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setFilter(lang)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${filter === lang
                                    ? "bg-slate-800 text-white shadow-md"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {lang === "Favorites" ? <Star size={14} className="inline -mt-1 mr-1 fill-current" /> : ""}
                            {lang}
                        </button>
                    ))}
                </div>

                {/* Add Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-200 transition-all active:scale-95"
                >
                    <Plus size={20} /> <span className="hidden md:inline">Add Snippet</span>
                </button>
            </div>

            {/* SNIPPET GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSnippets.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">

                        {/* Card Header */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
                                    {getIcon(item.language)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 leading-tight">{item.title}</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.language}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => toggleFavorite(item.id)}
                                    title="button"
                                    className={`p-2 rounded-lg transition-all ${item.isFavorite ? "text-yellow-400 hover:bg-yellow-50" : "text-slate-300 hover:text-yellow-400 hover:bg-slate-100"}`}
                                >
                                    <Star size={18} fill={item.isFavorite ? "currentColor" : "none"} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    title="button"
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Code Block (Mac Style) */}
                        <div className="relative bg-slate-900 p-4 overflow-hidden">
                            {/* Mac Buttons Decoration */}
                            <div className="absolute top-3 left-3 flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>

                            <button
                                onClick={() => handleCopy(item.code, item.id)}
                                className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                title="Copy Code"
                            >
                                {copiedId === item.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            </button>

                            <pre className="font-mono text-xs md:text-sm text-teal-300 leading-relaxed mt-4 overflow-x-auto custom-scrollbar">
                                <code>{item.code}</code>
                            </pre>
                        </div>

                        {/* Description */}
                        <div className="p-4 bg-white flex-1 border-t border-slate-100">
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 hover:line-clamp-none transition-all">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {filteredSnippets.length === 0 && (
                <div className="text-center py-20">
                    <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                        <Search size={32} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-lg font-medium">Snippet tidak ditemukan.</p>
                    <button onClick={() => { setSearch(""); setFilter("All") }} className="text-teal-600 font-bold mt-2 hover:underline text-sm">
                        Reset Pencarian
                    </button>
                </div>
            )}

            {/* --- MODAL ADD SNIPPET --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeInScale">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <Plus size={20} className="text-teal-600" /> Tambah Snippet Baru
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600" title="button"><X size={24} /></button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Navbar Responsive"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={newSnippet.title}
                                    onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bahasa</label>
                                <select
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                                    value={newSnippet.language}
                                    title="Pilih Bahasa"
                                    onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value as any })}
                                >
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="TypeScript">TypeScript</option>
                                    <option value="React">React (TSX/JSX)</option>
                                    <option value="CSS">CSS / Tailwind</option>
                                    <option value="Git">Git Command</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kode</label>
                                <textarea
                                    rows={6}
                                    placeholder="// Ketik atau paste kode di sini..."
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-mono text-sm bg-slate-50"
                                    value={newSnippet.code}
                                    onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    placeholder="Penjelasan singkat fungsinya..."
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={newSnippet.description}
                                    onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors">Batal</button>
                            <button onClick={handleAddSnippet} className="px-6 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}