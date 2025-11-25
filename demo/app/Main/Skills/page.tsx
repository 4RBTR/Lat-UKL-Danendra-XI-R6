"use client";

import { useState, useEffect } from "react";
import {
    Code2,
    Database,
    Palette,
    Terminal,
    Plus,
    Search,
    X,
    Trash2,
    Info,
    ArrowUpDown,
    Check,
    Pencil,
    Save
} from "lucide-react";

// --- TIPE DATA ---
type Skill = {
    id: number;
    name: string;
    category: "Frontend" | "Backend" | "Design" | "Tools";
    level: number;
    description: string;
};

// --- KOMPONEN UTAMA ---
export default function SkillsPage() {
    // Data Awal
    const initialSkills: Skill[] = [
        { id: 1, name: "React / Next.js", category: "Frontend", level: 90, description: "Library JavaScript populer untuk membangun UI interaktif." },
        { id: 2, name: "Node.js", category: "Backend", level: 75, description: "Runtime JavaScript sisi server." },
        { id: 3, name: "Figma", category: "Design", level: 80, description: "Alat desain UI/UX kolaboratif." },
    ];

    // --- STATE ---
    const [skills, setSkills] = useState<Skill[]>(initialSkills);
    const [filter, setFilter] = useState<string>("Semua");
    const [search, setSearch] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);

    // State Baru: Sorting & Notifikasi
    const [sortBy, setSortBy] = useState<"level" | "name">("level");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [notification, setNotification] = useState<string | null>(null);

    // Form Inputs
    const [newSkillName, setNewSkillName] = useState("");
    const [newSkillCategory, setNewSkillCategory] = useState<Skill["category"]>("Frontend");
    const [newSkillDesc, setNewSkillDesc] = useState("");

    // Modal State
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isEditingMode, setIsEditingMode] = useState(false); // Mode edit di dalam modal

    // --- EFFECT: LOAD DATA ---
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio-skills");
        if (savedData) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSkills(JSON.parse(savedData));
            } catch (error) {
                console.error("Error loading skills", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // --- EFFECT: SAVE DATA ---
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio-skills", JSON.stringify(skills));
        }
    }, [skills, isLoaded]);

    // --- HELPER: NOTIFIKASI ---
    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // --- LOGIC: CRUD ---
    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkillName.trim()) return;

        const newSkill: Skill = {
            id: Date.now(),
            name: newSkillName,
            category: newSkillCategory,
            level: 70, // Default level
            description: newSkillDesc || "Belum ada deskripsi.",
        };

        setSkills([newSkill, ...skills]);
        setNewSkillName("");
        setNewSkillDesc("");
        showNotification("Skill berhasil ditambahkan!");
    };

    const handleDeleteSkill = (id: number) => {
        if (confirm("Yakin ingin menghapus skill ini?")) {
            setSkills(skills.filter((s) => s.id !== id));
            showNotification("Skill dihapus.");
            if (selectedSkill?.id === id) setSelectedSkill(null);
        }
    };

    const handleUpdateSkill = (updatedSkill: Skill) => {
        setSkills(skills.map(s => s.id === updatedSkill.id ? updatedSkill : s));
        setSelectedSkill(updatedSkill); // Update data di modal juga
        setIsEditingMode(false);
        showNotification("Perubahan disimpan!");
    };

    const handleLevelChange = (id: number, rawValue: string) => {
        let newLevel = parseInt(rawValue);
        if (isNaN(newLevel)) newLevel = 0;
        newLevel = Math.max(0, Math.min(100, newLevel));

        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, level: newLevel } : skill
        ));
    };

    // --- LOGIC: SORTING & FILTERING ---
    const toggleSort = () => {
        if (sortBy === "level") {
            setSortBy("name");
            setSortOrder("asc");
        } else {
            setSortBy("level");
            setSortOrder("desc");
        }
    };

    const processedSkills = skills
        .filter((skill) => {
            const matchCategory = filter === "Semua" || skill.category === filter;
            const matchSearch = skill.name.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchSearch;
        })
        .sort((a, b) => {
            if (sortBy === "level") {
                return sortOrder === "asc" ? a.level - b.level : b.level - a.level;
            } else {
                return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
        });

    // --- THEME UTILS ---
    const getTheme = (cat: string) => {
        switch (cat) {
            case "Frontend": return { border: "border-l-blue-500", text: "text-blue-600", bg: "bg-blue-500", badge: "bg-blue-50 text-blue-700" };
            case "Backend": return { border: "border-l-green-500", text: "text-green-600", bg: "bg-green-500", badge: "bg-green-50 text-green-700" };
            case "Design": return { border: "border-l-purple-500", text: "text-purple-600", bg: "bg-purple-500", badge: "bg-purple-50 text-purple-700" };
            case "Tools": return { border: "border-l-yellow-500", text: "text-yellow-600", bg: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" };
            default: return { border: "border-l-slate-500", text: "text-slate-600", bg: "bg-slate-500", badge: "bg-slate-100 text-slate-600" };
        }
    };

    const getIcon = (cat: string) => {
        switch (cat) {
            case "Frontend": return <Code2 className="w-5 h-5" />;
            case "Backend": return <Database className="w-5 h-5" />;
            case "Design": return <Palette className="w-5 h-5" />;
            default: return <Terminal className="w-5 h-5" />;
        }
    };

    return (
        <div className="p-4 md:p-8 bg-white shadow-xl rounded-xl min-h-[85vh] relative max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">
                    Keahlian & Teknologi
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    Kelola portofolio skill Anda. Data tersimpan otomatis di browser.
                </p>
            </div>

            {/* CONTROL BAR (Responsive Grid) */}
            <div className="mb-8 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">

                {/* 1. Form Input Section */}
                <form onSubmit={handleAddSkill} className="mb-6 pb-6 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Tambah Skill Baru</h3>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 grow">
                            <input
                                type="text"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                placeholder="Nama Skill (e.g. Python)"
                                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none w-full"
                            />
                            <select
                                value={newSkillCategory}
                                title="select"
                                onChange={(e) => setNewSkillCategory(e.target.value as Skill["category"])}
                                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white outline-none sm:w-40"
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Design">Design</option>
                                <option value="Tools">Tools</option>
                            </select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 grow-2">
                            <input
                                type="text"
                                value={newSkillDesc}
                                onChange={(e) => setNewSkillDesc(e.target.value)}
                                placeholder="Deskripsi singkat..."
                                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none w-full"
                            />
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center transition-all active:scale-95 shadow-md hover:shadow-lg w-full sm:w-auto whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5 mr-1" /> Tambah
                            </button>
                        </div>
                    </div>
                </form>

                {/* 2. Filter & Sort Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar mask-gradient">
                        {["Semua", "Frontend", "Backend", "Design", "Tools"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${filter === cat
                                    ? "bg-teal-600 border-teal-600 text-white shadow-md"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative grow md:grow-0 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari..."
                                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <button
                            onClick={toggleSort}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                            title="Urutkan"
                        >
                            <ArrowUpDown className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">
                                {sortBy === 'level' ? 'Level' : 'Nama'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedSkills.length > 0 ? (
                    processedSkills.map((skill) => {
                        const theme = getTheme(skill.category);
                        return (
                            <div
                                key={skill.id}
                                className={`group bg-white rounded-xl border-l-[6px] ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative flex flex-col justify-between h-full`}
                            >
                                {/* Tombol Aksi (Hanya muncul saat hover di desktop, selalu ada di mobile via layout tweak) */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setSelectedSkill(skill); setIsEditingMode(false); }}
                                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                        title="Detail"
                                    >
                                        <Info className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSkill(skill.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        title="Hapus"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div>
                                    <div
                                        onClick={() => { setSelectedSkill(skill); setIsEditingMode(false); }}
                                        className="cursor-pointer pr-16"
                                    >
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{skill.name}</h3>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${theme.badge}`}>
                                            {getIcon(skill.category)}
                                            <span className="ml-1.5 uppercase tracking-wider">{skill.category}</span>
                                        </span>
                                    </div>

                                    {/* Preview Deskripsi (Truncated) */}
                                    <p className="mt-4 text-slate-500 text-sm line-clamp-2">
                                        {skill.description}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Penguasaan</span>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                value={skill.level}
                                                title="input"
                                                onChange={(e) => handleLevelChange(skill.id, e.target.value)}
                                                className={`w-12 text-right text-lg font-bold bg-transparent border-none p-0 focus:ring-0 ${theme.text} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none`}
                                            />
                                            <span className={`text-sm font-bold ml-0.5 ${theme.text}`}>%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${theme.bg}`}
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <X className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-medium">Tidak ada skill yang cocok.</p>
                        <button onClick={() => { setFilter("Semua"); setSearch("") }} className="text-teal-600 font-bold mt-2 hover:underline">
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>

            {/* --- MODAL POP UP (EDIT FEATURE) --- */}
            {selectedSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedSkill(null)}
                    ></div>

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className={`p-6 ${getTheme(selectedSkill.category).bg} text-white shrink-0 relative transition-colors duration-300`}>
                            <button
                                onClick={() => setSelectedSkill(null)}
                                title="button"
                                className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full p-1.5 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {!isEditingMode ? (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md shadow-inner">
                                            {getIcon(selectedSkill.category)}
                                        </div>
                                        <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-xs uppercase tracking-wider backdrop-blur-md">
                                            {selectedSkill.category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight">{selectedSkill.name}</h2>
                                </>
                            ) : (
                                <div className="text-center font-bold text-lg text-white/90">
                                    Mode Edit
                                </div>
                            )}
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-6 overflow-y-auto">
                            {isEditingMode ? (
                                // --- FORM EDIT ---
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Skill</label>
                                        <input
                                            type="text"
                                            title="text"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                            value={selectedSkill.name}
                                            onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                                        <select
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                                            value={selectedSkill.category}
                                            title="select"
                                            onChange={(e) => setSelectedSkill({ ...selectedSkill, category: e.target.value as Skill["category"] })}
                                        >
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Design">Design</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                                        <textarea
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none h-24 resize-none"
                                            value={selectedSkill.description}
                                            title="text"
                                            onChange={(e) => setSelectedSkill({ ...selectedSkill, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Level ({selectedSkill.level}%)</label>
                                        <input
                                            type="range" min="0" max="100"
                                            title="Level"
                                            className="w-full accent-teal-600 cursor-pointer"
                                            value={selectedSkill.level}
                                            onChange={(e) => setSelectedSkill({ ...selectedSkill, level: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                // --- TAMPILAN READ ONLY ---
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi</h3>
                                        <p className="text-slate-700 text-lg leading-relaxed">
                                            {selectedSkill.description}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-600 font-semibold text-sm">Tingkat Kemahiran</span>
                                            <span className={`text-2xl font-black ${getTheme(selectedSkill.category).text}`}>
                                                {selectedSkill.level}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${getTheme(selectedSkill.category).bg}`}
                                                style={{ width: `${selectedSkill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                            {isEditingMode ? (
                                <>
                                    <button
                                        onClick={() => setIsEditingMode(false)}
                                        className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={() => handleUpdateSkill(selectedSkill)}
                                        className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 shadow-md flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Simpan
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditingMode(true)}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                                >
                                    <Pencil className="w-4 h-4" /> Edit Skill
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- NOTIFIKASI TOAST --- */}
            {notification && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-short z-60">
                    <div className="bg-green-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">{notification}</span>
                </div>
            )}

        </div>
    );
}