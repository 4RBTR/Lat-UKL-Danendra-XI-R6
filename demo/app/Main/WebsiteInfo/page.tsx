"use client";

import { useState } from "react";
import {
    Cpu,
    Zap,
    Layout,
    Type,
    Palette,
    Github,
    Server,
    Globe,
    Check,
    Copy,
    Code2,
    Layers
} from "lucide-react";

export default function WebsiteInfoPage() {

    // --- DATA TECH STACK ---
    const stack = [
        { name: "Next.js 14", desc: "App Router Framework", icon: Globe, color: "bg-slate-900 text-white" },
        { name: "React 18", desc: "UI Library", icon: Cpu, color: "bg-blue-500 text-white" },
        { name: "TypeScript", desc: "Type Safety", icon: Code2, color: "bg-blue-600 text-white" },
        { name: "Tailwind CSS", desc: "Utility-first CSS", icon: Layout, color: "bg-cyan-500 text-white" },
        { name: "Lucide React", desc: "Beautiful Icons", icon: Zap, color: "bg-pink-500 text-white" },
        { name: "Vercel", desc: "Hosting & Deployment", icon: Server, color: "bg-black text-white" },
    ];

    // --- DATA COLORS (Design System) ---
    const colors = [
        { name: "Teal Primary", hex: "#0d9488", class: "bg-teal-600" },
        { name: "Teal Light", hex: "#99f6e4", class: "bg-teal-200" },
        { name: "Slate Dark", hex: "#0f172a", class: "bg-slate-900" },
        { name: "Slate Text", hex: "#475569", class: "bg-slate-600" },
    ];

    // Logic Copy Color
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <Layers className="w-10 h-10" /> About This Website
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Mengintip dapur di balik pembuatan portfolio ini. Teknologi, desain, dan performa yang digunakan.
                </p>
            </div>

            {/* 1. TECH STACK GRID */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Server size={24} className="text-teal-600" /> Tech Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stack.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center h-40 group">
                            <div className={`p-3 rounded-xl mb-3 transition-transform group-hover:scale-110 ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                            <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

                {/* 2. DESIGN SYSTEM (Color Palette) */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Palette size={20} className="text-purple-500" /> Design System
                    </h3>

                    <div className="space-y-6">
                        {/* Typography Info */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Type size={14} /> Typography
                            </p>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <p className="text-3xl font-extrabold text-slate-800 mb-1">Inter</p>
                                <p className="text-slate-500 text-sm">Primary Font Family (Google Fonts)</p>
                            </div>
                        </div>

                        {/* Color Palette */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Color Palette (Click to Copy)</p>
                            <div className="grid grid-cols-2 gap-3">
                                {colors.map((col) => (
                                    <button
                                        key={col.hex}
                                        onClick={() => handleCopy(col.hex)}
                                        className="flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-lg hover:bg-slate-50 transition-all text-left group active:scale-95"
                                    >
                                        <div className={`w-10 h-10 rounded-full shadow-sm ${col.class} shrink-0 ring-2 ring-white ring-offset-2 ring-offset-slate-100`}></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-700 truncate">{col.name}</p>
                                            <p className="text-[10px] text-slate-400 font-mono">{col.hex}</p>
                                        </div>
                                        {copiedColor === col.hex ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-300 group-hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. PERFORMANCE (Lighthouse Score Simulation) */}
                <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
                    {/* Dekorasi Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-10"></div>

                    <h3 className="text-xl font-bold mb-8 flex items-center gap-2 relative z-10">
                        <Zap size={20} className="text-green-400" /> Performance (Lighthouse)
                    </h3>

                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        <ScoreCircle label="Performance" score={100} delay={0} />
                        <ScoreCircle label="Accessibility" score={100} delay={200} />
                        <ScoreCircle label="Best Practices" score={100} delay={400} />
                        <ScoreCircle label="SEO" score={100} delay={600} />
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10 text-center relative z-10">
                        <a
                            href="https://github.com/4RBTR/Lat-UKL-Danendra-XI-R6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold text-white transition-colors backdrop-blur-sm"
                        >
                            <Github size={18} /> View Source Code
                        </a>
                    </div>
                </div>
            </div>

            {/* FOOTER CREDIT */}
            <div className="text-center text-slate-400 text-sm bg-slate-50 py-6 rounded-2xl border border-dashed border-slate-200">
                <p>
                    Built with ❤️ and ☕ by <strong>Danendra Bagas</strong>.
                </p>
                <p className="mt-1 text-xs">
                    Inspired by Vercel Design System & UI Engineering Community.
                </p>
            </div>

        </div>
    );
}

// --- SUB-COMPONENT: SCORE CIRCLE (Untuk Grafik Lingkaran) ---
function ScoreCircle({ label, score, delay }: { label: string, score: number, delay: number }) {
    // Keliling lingkaran r=36 (2 * pi * r) ≈ 226
    const circumference = 226;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
            <div className="relative w-20 h-20 mb-2">
                {/* Lingkaran Background (Abu-abu) */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="40" cy="40" r="36"
                        stroke="currentColor" strokeWidth="6"
                        fill="transparent"
                        className="text-slate-800"
                    />
                    {/* Lingkaran Progress (Hijau) */}
                    <circle
                        cx="40" cy="40" r="36"
                        stroke="currentColor" strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="text-green-500 drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-green-400 font-mono">
                    {score}
                </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}