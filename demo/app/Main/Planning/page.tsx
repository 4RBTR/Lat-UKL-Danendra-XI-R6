"use client";

import { useState, useEffect } from "react";
import {
    CheckCircle,
    Clock,
    Flag,
    MoveUp,
    Plus,
    Trash2,
    TrendingUp,
    Filter
} from "lucide-react";

// Tipe Data Plan
type Plan = {
    id: number;
    date: string;
    title: string;
    description: string;
    status: "pending" | "on progress" | "done";
};

export default function PlanningPage() {
    // Data Default
    const initialPlans: Plan[] = [
        { id: 1, date: "Juni 2027", title: "Lulus dari SMK Telkom Malang", description: "Selesai menempuh pendidikan dan siap memasuki dunia kerja.", status: "pending" },
        { id: 2, date: "2028", title: "Mulai Bekerja", description: "Bekerja sambil mengumpulkan dana untuk kuliah mandiri.", status: "pending" },
        { id: 3, date: "2029", title: "Mulai Kuliah Mandiri", description: "Mengambil kuliah sesuai minat dan jurusan IT.", status: "pending" },
    ];

    // --- STATE ---
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [showPopup, setShowPopup] = useState<{ show: boolean, msg: string }>({ show: false, msg: "" });
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState<string>("all");

    // State Form Input
    const [newDate, setNewDate] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");

    // --- LOAD & SAVE DATA (LocalStorage) ---
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio-plans");
        if (savedData) {
            try {
                setPlans(JSON.parse(savedData));
            } catch (error) {
                console.error("Error loading plans", error);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio-plans", JSON.stringify(plans));
        }
    }, [plans, isLoaded]);

    // --- LOGIC ---
    const handleStatusChange = (id: number, value: string) => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: value as Plan["status"] } : p
            )
        );
        triggerPopup("Status berhasil diupdate!");
    };

    const handleAddPlan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newDate.trim()) return;

        const newPlan: Plan = {
            // eslint-disable-next-line react-hooks/purity
            id: Date.now(),
            date: newDate,
            title: newTitle,
            description: newDesc || "Belum ada deskripsi detail.",
            status: "pending"
        };

        setPlans([...plans, newPlan]);
        setNewDate("");
        setNewTitle("");
        setNewDesc("");
        triggerPopup("Rencana baru ditambahkan!");
    };

    const handleDeletePlan = (id: number) => {
        if (confirm("Yakin ingin menghapus rencana ini?")) {
            setPlans(plans.filter(p => p.id !== id));
            triggerPopup("Rencana dihapus.");
        }
    };

    const triggerPopup = (msg: string) => {
        setShowPopup({ show: true, msg });
        setTimeout(() => setShowPopup({ show: false, msg: "" }), 2000);
    };

    // --- CALCULATIONS & FILTER ---
    const completedCount = plans.filter(p => p.status === "done").length;
    const progressPercentage = plans.length > 0 ? Math.round((completedCount / plans.length) * 100) : 0;

    const filteredPlans = plans.filter(p => {
        if (filter === "all") return true;
        return p.status === filter;
    });

    // --- STYLING UTILS ---
    const getIcon = (status: string) => {
        switch (status) {
            case "done": return <CheckCircle size={24} className="text-green-600" />;
            case "on progress": return <Clock size={24} className="text-yellow-600" />;
            default: return <Flag size={24} className="text-teal-600" />;
        }
    };

    const getCardStyles = (status: string) => {
        switch (status) {
            case "done": return "border-l-green-500 bg-green-50/50 shadow-md";
            case "on progress": return "border-l-yellow-500 bg-yellow-50/50 shadow-md";
            default: return "border-l-teal-500 bg-white shadow-md";
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-12 min-h-[80vh]">

            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    My Future Planning
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Masa depan dimulai dari perencanaan hari ini. Atur, pantau, dan wujudkan impianmu.
                </p>

                {/* Progress Bar Feature */}
                <div className="max-w-xl mx-auto bg-slate-100 rounded-full p-1 border border-slate-200 shadow-inner">
                    <div className="flex justify-between px-2 text-xs font-bold text-slate-500 mb-1">
                        <span>Progress Pencapaian</span>
                        <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-linear-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Control Panel (Add & Filter) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">

                {/* Form Tambah Rencana */}
                <div className="lg:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-4 text-teal-700 font-bold">
                        <Plus size={20} />
                        <h3>Tambah Target Baru</h3>
                    </div>
                    <form onSubmit={handleAddPlan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Tahun / Waktu (e.g. 2030)"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Judul Rencana"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi singkat..."
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="md:col-span-2 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                        <button type="submit" className="md:col-span-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-2">
                            <TrendingUp size={18} /> Tambahkan ke Timeline
                        </button>
                    </form>
                </div>

                {/* Filter Section */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full">
                    <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold">
                        <Filter size={20} />
                        <h3>Filter Tampilan</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {["all", "pending", "on progress", "done"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-left capitalize transition-all ${filter === status
                                    ? "bg-teal-600 text-white shadow-md font-bold pl-6"
                                    : "bg-white text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {status === "all" ? "Semua Rencana" : status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-linear-to-b from-teal-300 to-slate-200 md:-translate-x-1/2 rounded-full"></div>

                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative mb-12 flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Dot/Icon */}
                            <div className={`
                                absolute top-0 md:top-6 z-10 w-12 h-12
                                bg-white border-4 border-slate-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                                left-0 md:left-1/2 md:-translate-x-1/2
                            `}>
                                {getIcon(plan.status)}
                            </div>

                            {/* Spacer Desktop */}
                            <div className="hidden md:block md:w-1/2" />

                            {/* Content Card */}
                            <div className={`
                                w-full md:w-1/2 relative pl-16 md:pl-0
                                ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}
                            `}>
                                <div className={`
                                    group relative border border-l-4 transition-all duration-300
                                    rounded-xl p-6 w-full
                                    ${getCardStyles(plan.status)}
                                `}>
                                    {/* Delete Button (Hidden by default, show on group hover) */}
                                    <button
                                        onClick={() => handleDeletePlan(plan.id)}
                                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Hapus Rencana"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-2">
                                        <div className="bg-teal-100 p-1 rounded">
                                            <MoveUp className="w-4 h-4" />
                                        </div>
                                        {plan.date}
                                    </div>

                                    <h2 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight">
                                        {plan.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{plan.description}</p>

                                    {/* Status Control */}
                                    <div className="bg-white/50 p-2 rounded-lg border border-black/5">
                                        <select
                                            value={plan.status}
                                            title="select"
                                            onChange={(e) => handleStatusChange(plan.id, e.target.value)}
                                            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
                                        >
                                            <option value="pending">⏳ Masih Rencana (Pending)</option>
                                            <option value="on progress">🚀 Sedang Berjalan (On Progress)</option>
                                            <option value="done">✅ Selesai (Done)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 ml-10 md:ml-0">
                        <p className="text-slate-400 italic">Tidak ada rencana yang sesuai filter.</p>
                    </div>
                )}
            </div>

            {/* POPUP NOTIFICATION */}
            {showPopup.show && (
                <div className="fixed bottom-10 right-10 z-50 animate-bounce-short">
                    <div className="bg-slate-800 text-white shadow-2xl px-6 py-4 rounded-full flex gap-3 items-center">
                        <CheckCircle className="text-green-400" size={24} />
                        <span className="font-medium">{showPopup.msg}</span>
                    </div>
                </div>
            )}
        </div>
    );
}