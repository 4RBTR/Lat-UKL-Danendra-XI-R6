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
    Trash2
} from "lucide-react";

// Tipe data untuk Skill
type Skill = {
    id: number;
    name: string;
    category: "Frontend" | "Backend" | "Design" | "Tools";
    level: number; // 1-100
};

export default function SkillsPage() {
    // Data awal
    const initialSkills: Skill[] = [
        { id: 1, name: "React / Next.js", category: "Frontend", level: 90 },
        { id: 2, name: "Node.js", category: "Backend", level: 75 },
        { id: 3, name: "Figma", category: "Design", level: 80 },
        { id: 4, name: "Git & GitHub", category: "Tools", level: 85 },
    ];

    // State
    const [skills, setSkills] = useState<Skill[]>(initialSkills);
    const [filter, setFilter] = useState<string>("Semua");
    const [search, setSearch] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);

    // Input State
    const [newSkillName, setNewSkillName] = useState("");
    const [newSkillCategory, setNewSkillCategory] = useState<Skill["category"]>("Frontend");

    // --- LOAD DATA ---
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

    // --- SAVE DATA ---
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio-skills", JSON.stringify(skills));
        }
    }, [skills, isLoaded]);

    // Logic CRUD
    const handleLevelChange = (id: number, rawValue: string) => {
        let newLevel = parseInt(rawValue);
        if (isNaN(newLevel)) newLevel = 0;
        newLevel = Math.max(0, Math.min(100, newLevel));

        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, level: newLevel } : skill
        ));
    };

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkillName.trim()) return;
        const newSkill: Skill = {
            id: Date.now(),
            name: newSkillName,
            category: newSkillCategory,
            level: 75,
        };
        setSkills([newSkill, ...skills]);
        setNewSkillName("");
    };

    const handleDeleteSkill = (id: number) => {
        if (confirm("Hapus skill ini?")) {
            setSkills(skills.filter((s) => s.id !== id));
        }
    };

    // Filter Logic
    const filteredSkills = skills.filter((skill) => {
        const matchCategory = filter === "Semua" || skill.category === filter;
        const matchSearch = skill.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    // --- THEME CONFIGURATION ---
    const getTheme = (cat: string) => {
        switch (cat) {
            case "Frontend":
                return {
                    border: "border-l-blue-500",
                    text: "text-blue-600",
                    bg: "bg-blue-500",
                    badge: "bg-blue-50 text-blue-700"
                };
            case "Backend":
                return {
                    border: "border-l-green-500",
                    text: "text-green-600",
                    bg: "bg-green-500",
                    badge: "bg-green-50 text-green-700"
                };
            case "Design":
                return {
                    border: "border-l-purple-500",
                    text: "text-purple-600",
                    bg: "bg-purple-500",
                    badge: "bg-purple-50 text-purple-700"
                };
            case "Tools":
                return {
                    border: "border-l-yellow-500",
                    text: "text-yellow-600",
                    bg: "bg-yellow-500",
                    badge: "bg-yellow-50 text-yellow-700"
                };
            default:
                return {
                    border: "border-l-slate-500",
                    text: "text-slate-600",
                    bg: "bg-slate-500",
                    badge: "bg-slate-100 text-slate-600"
                };
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
        // Container Utama disesuaikan dengan Home (bg-white, shadow-lg, rounded-lg)
        <div className="p-8 bg-white shadow-lg rounded-lg animate-fadeIn min-h-[80vh]">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Keahlian & Teknologi
                </h1>
                <p className="text-gray-700 leading-relaxed">
                    Daftar teknologi yang saya kuasai. Anda dapat mengelola skill dan tingkat kemahiran di sini.
                    Data tersimpan otomatis di browser Anda.
                </p>
            </div>

            {/* Control Bar */}
            <div className="mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center justify-between">

                    {/* Form Tambah */}
                    <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto grow">
                        <input
                            type="text"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            placeholder="Skill baru..."
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64 outline-none"
                        />
                        <select
                            value={newSkillCategory}
                            title="select"
                            onChange={(e) => setNewSkillCategory(e.target.value as Skill["category"])}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white outline-none"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Design">Design</option>
                            <option value="Tools">Tools</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center transition-colors animate-btnPulse"
                        >
                            <Plus className="w-5 h-5 mr-1" /> Tambah
                        </button>
                    </form>

                    {/* Search */}
                    <div className="relative w-full lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari skill..."
                            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
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
            </div>

            {/* GRID CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => {
                        const theme = getTheme(skill.category);
                        return (
                            <div
                                key={skill.id}
                                className={`group bg-white rounded-lg border-l-4 ${theme.border} shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 p-6 relative`}
                            >
                                <button
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    title="button"
                                    className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{skill.name}</h3>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${theme.badge}`}>
                                            {getIcon(skill.category)}
                                            <span className="ml-1.5">{skill.category}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-medium text-slate-500">Proficiency</span>
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
                                            className={`h-full rounded-full transition-all duration-1000 ${theme.bg}`}
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        <X className="w-10 h-10 mb-3 opacity-30" />
                        <p>Tidak ada skill ditemukan.</p>
                        <button onClick={() => { setFilter("Semua"); setSearch("") }} className="text-teal-600 font-medium mt-2 hover:underline">Reset Filter</button>
                    </div>
                )}
            </div>
        </div>
    );
}