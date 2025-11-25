"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Code2,
    Rocket,
    Star,
    Mail,
    MessageCircle
} from "lucide-react";

const Home: React.FC = () => {
    // --- STATE UNTUK EFEK MENGETIK ---
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const roles = ["Student at SMK Telkom", "Frontend Developer", "Tech Enthusiast"];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Tunggu sebelum hapus
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    return (
        <div className="p-4 md:p-8 bg-white shadow-2xl rounded-2xl animate-fadeIn max-w-7xl mx-auto">

            {/* --- HERO SECTION --- */}
            <div className="bg-linear-to-r from-teal-500 to-emerald-600 rounded-xl p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
                {/* Dekorasi Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Hi, I am <span className="text-yellow-300">Danendra Bagas</span> 👋
                    </h1>
                    <div className="text-xl md:text-2xl font-medium h-8 mb-6 text-teal-100 flex items-center gap-2">
                        <span>I am a</span>
                        <span className="border-r-2 border-yellow-300 pr-1 animate-pulse font-bold text-white">
                            {text}
                        </span>
                    </div>
                    <p className="max-w-2xl text-teal-50 text-lg leading-relaxed mb-8">
                        Selamat datang di ruang digital saya! Website ini mendokumentasikan perjalanan saya belajar teknologi,
                        membangun projek, dan merancang masa depan.
                    </p>

                    {/* Statistik Singkat */}
                    <div className="grid grid-cols-3 gap-4 max-w-lg">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center border border-white/30">
                            <Rocket className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
                            <div className="font-bold text-xl">5+</div>
                            <div className="text-xs text-teal-100">Projects</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center border border-white/30">
                            <Code2 className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
                            <div className="font-bold text-xl">10+</div>
                            <div className="text-xs text-teal-100">Skills</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center border border-white/30">
                            <Star className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
                            <div className="font-bold text-xl">2</div>
                            <div className="text-xs text-teal-100">Years Exp</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NAVIGATION GRID --- */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="bg-teal-600 w-2 h-8 rounded-full"></span>
                    Jelajahi Portfolio
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Profile Section */}
                <div className="group bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="grow mb-4">
                        <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-500 transition-colors">Profile</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Kenali siapa saya, latar belakang, visi misi, serta hobi yang membentuk kepribadian saya saat ini.
                        </p>
                    </div>
                    <Link
                        href="/Main/MyProfile"
                        className="flex items-center justify-between bg-white text-blue-600 py-3 px-5 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all font-semibold shadow-sm group-hover:shadow-md"
                    >
                        Lihat Profil <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 2. MyEducation Section */}
                <div className="group bg-green-50 p-6 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="grow mb-4">
                        <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-green-500 transition-colors">Education</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Riwayat pendidikan formal saya dari awal hingga saat ini bersekolah di SMK Telkom Malang.
                        </p>
                    </div>
                    <Link
                        href="/Main/MyEducation"
                        className="flex items-center justify-between bg-white text-green-600 py-3 px-5 rounded-lg border border-green-200 hover:bg-green-600 hover:text-white transition-all font-semibold shadow-sm group-hover:shadow-md"
                    >
                        Riwayat Sekolah <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 3. Planning Section */}
                <div className="group bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="grow mb-4">
                        <h2 className="text-2xl font-bold text-yellow-700 mb-2 group-hover:text-yellow-500 transition-colors">Planning</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Garis waktu (timeline) rencana masa depan, target karir, dan mimpi yang ingin saya capai.
                        </p>
                    </div>
                    <Link
                        href="/Main/Planning"
                        className="flex items-center justify-between bg-white text-yellow-600 py-3 px-5 rounded-lg border border-yellow-200 hover:bg-yellow-500 hover:text-white transition-all font-semibold shadow-sm group-hover:shadow-md"
                    >
                        Lihat Rencana <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 4. Skills Section */}
                <div className="group bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="grow mb-4">
                        <h2 className="text-2xl font-bold text-purple-700 mb-2 group-hover:text-purple-500 transition-colors">Skills & Tech</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Gudang senjata saya: Bahasa pemrograman, Frameworks, dan Tools yang saya gunakan sehari-hari.
                        </p>
                    </div>
                    <Link
                        href="/Main/Skills"
                        className="flex items-center justify-between bg-white text-purple-600 py-3 px-5 rounded-lg border border-purple-200 hover:bg-purple-600 hover:text-white transition-all font-semibold shadow-sm group-hover:shadow-md"
                    >
                        Cek Skill <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>

            {/* --- CONNECT SECTION --- */}
            <div className="mt-12 bg-slate-900 rounded-xl p-8 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Tertarik berkolaborasi?</h3>
                    <p className="text-slate-400 mb-6">Jangan ragu untuk menyapa atau mengajak kerjasama!</p>
                    <div className="flex justify-center gap-4">
                        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">
                            <Mail className="w-4 h-4" /> Email Me
                        </button>
                        <button className="flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-900 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </button>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-linear(circle_at_center,var(--tw-gradient-stops))] from-teal-500 via-slate-900 to-slate-900"></div>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-slate-100 pt-6 text-center">
                <p className="text-slate-500 text-sm">
                    © 2024 Danendra Bagas Himawan. Made with ❤️ and Next.js.
                </p>
            </div>
        </div>
    );
};

export default Home;