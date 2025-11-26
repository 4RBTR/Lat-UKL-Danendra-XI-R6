"use client";

import { useState } from "react";
import { schools, School } from "@/data/schools";
import SchoolModal from "@/Component/SchoolModal";
import {
    GraduationCap, Calendar, MapPin, Award,
    BookOpen, Download, Star, ChevronRight,
    Trophy, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

// --- DATA DUMMY SERTIFIKAT (Bisa dipindah ke file terpisah nanti) ---
const certificates = [
    {
        id: 1,
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding Indonesia",
        date: "2023",
        link: "#",
        tech: ["HTML", "CSS", "Flexbox"]
    },
    {
        id: 2,
        title: "ReactJS - The Complete Guide",
        issuer: "Udemy",
        date: "2024",
        link: "#",
        tech: ["React", "Redux", "Hooks"]
    },
    {
        id: 3,
        title: "Frontend Developer Expert",
        issuer: "Dicoding Indonesia",
        date: "2024",
        link: "#",
        tech: ["PWA", "Testing", "Optimization"]
    }
];

export default function MyEducationPage() {
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    // Stats
    const stats = [
        { label: "Institusi Formal", value: schools.length, icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Sertifikasi", value: certificates.length + "+", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "Tahun Belajar", value: "12+", icon: Calendar, color: "text-teal-500", bg: "bg-teal-50" },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* --- 1. HERO SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-2 block">
                            Academic & Professional Journey
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
                            Pendidikan & <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-blue-600">
                                Pengembangan Diri.
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                            Kombinasi pendidikan formal dan pembelajaran mandiri (self-taught) untuk terus relevan di dunia teknologi.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-3">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all"
                        >
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-800">{stat.value}</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- 2. FORMAL EDUCATION TIMELINE --- */}
            <div className="mb-24">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><GraduationCap size={24} /></div>
                    Pendidikan Formal
                </h2>

                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                    {schools.map((school, index) => (
                        <motion.div
                            key={school.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* TITIK TENGAH */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-300 group-hover:bg-teal-500 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <Star size={16} className="text-white" />
                            </div>

                            {/* KARTU KONTEN */}
                            <div
                                onClick={() => setSelectedSchool(school)}
                                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:-translate-y-1 relative overflow-hidden"
                            >
                                {/* Badge Tahun & Level */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full flex items-center gap-1">
                                        <Calendar size={12} /> {school.years}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                        {school.level}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                                    {school.name}
                                </h3>
                                <div className="flex items-center text-slate-400 text-sm mb-4">
                                    <MapPin size={14} className="mr-1" /> {school.location || "Indonesia"}
                                </div>

                                <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                                    {school.description}
                                </p>

                                {/* NEW: TECH STACK BADGES (Mockup Data, sesuaikan nanti) */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {["HTML", "CSS", "Basic JS"].map((tech, i) => (
                                        <span key={i} className="text-[10px] font-mono bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    <span className="text-[10px] text-slate-400 px-1">etc.</span>
                                </div>

                                <div className="flex items-center text-teal-600 text-sm font-bold group-hover:gap-2 transition-all border-t border-slate-50 pt-3">
                                    Lihat Detail <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- 3. CERTIFICATIONS & COURSES (BARU!) --- */}
            <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Trophy size={24} /></div>
                        Sertifikasi & Kursus
                    </h2>
                    <button className="text-sm font-bold text-teal-600 hover:underline hidden md:block">Lihat Semua di Gallery →</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <Award size={24} />
                                </div>
                                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{cert.date}</span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-4">{cert.issuer}</p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {cert.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{t}</span>
                                    ))}
                                </div>
                                <a href={cert.link} className="flex items-center justify-center w-full py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors">
                                    <ExternalLink size={14} className="mr-2" /> Lihat Kredensial
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 4. FOOTER QUOTE & CTA --- */}
            <div className="text-center bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <BookOpen size={32} className="mx-auto mb-4 text-teal-400" />
                    <h2 className="text-2xl font-serif italic mb-6">
                        Live as if you were to die tomorrow. Learn as if you were to live forever.
                    </h2>
                    <p className="text-slate-400 text-sm mb-8">— Mahatma Gandhi</p>

                    <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl hover:scale-105 transform">
                        <Download size={20} /> Download Resume / CV
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {selectedSchool && (
                <SchoolModal
                    school={selectedSchool}
                    onClose={() => setSelectedSchool(null)}
                />
            )}
        </div>
    );
}