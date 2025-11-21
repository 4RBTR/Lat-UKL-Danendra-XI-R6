"use client";

import Image from "next/image";
import {
    MapPin,
    Calendar,
    Briefcase,
    Target,
    User,
    Heart,
    Gamepad2,
    Music,
    Code,
    BookOpen
} from "lucide-react";

const ProfilePage = () => {
    return (
        <div className="max-w-6xl mx-auto animate-fadeIn pb-10">

            {/* HEADER PAGE */}
            <div className="mb-8 text-center md:text-left px-4 md:px-0">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-2">
                    Profil Pribadi
                </h1>
                <p className="text-gray-600">
                    Kenali saya lebih dekat, mulai dari latar belakang hingga minat pribadi.
                </p>
            </div>

            {/* GRID LAYOUT UTAMA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* KARTU 1: HERO SECTION (Identitas Utama) - Lebar Penuh di Mobile, 2/3 di Desktop */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border-l-4 border-teal-500 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 hover:shadow-lg transition-all duration-300">
                    {/* Foto Profil dengan Ring Animasi */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-teal-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                            <Image
                                src="/danendra.jpg" // Pastikan foto ada di folder public
                                alt="Danendra Bagas Himawan"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Info Teks */}
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl font-bold text-slate-800 mb-1">
                            Danendra Bagas Himawan
                        </h2>
                        <p className="text-teal-600 font-medium mb-4 bg-teal-50 inline-block px-3 py-1 rounded-full text-sm">
                            Pelajar • Calon Programmer • Kreator Digital
                        </p>

                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <MapPin className="w-5 h-5 text-slate-400" />
                                <span>Malang, Indonesia</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Calendar className="w-5 h-5 text-slate-400" />
                                <span>8 Januari 2009</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Briefcase className="w-5 h-5 text-slate-400" />
                                <span>Siswa SMK Telkom Malang (RPL)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KARTU 2: VISI & CITA-CITA (Kotak Kanan Atas) */}
                <div className="bg-linear-to-br from-yellow-50 to-white rounded-xl shadow-md border-l-4 border-yellow-500 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Visi & Cita-cita</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        Bercita-cita menjadi seorang <strong>Software Engineer profesional</strong> yang mampu menciptakan inovasi digital bermanfaat, serta membangun sistem yang efisien dengan pengalaman pengguna (UX) terbaik.
                    </p>
                </div>

                {/* KARTU 3: TENTANG SAYA (Kotak Kiri Bawah) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border-l-4 border-blue-500 p-8 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Tentang Saya</h3>
                    </div>
                    <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
                        <p>
                            Halo! Saya lahir di Malang. Sejak kecil, saya memiliki ketertarikan yang sangat kuat terhadap teknologi,
                            terutama bagaimana sebuah kode bisa berubah menjadi aplikasi yang bermanfaat. Saya adalah tipe orang yang
                            senang bereksperimen (ngulik) hal-hal baru di depan komputer.
                        </p>
                        <p>
                            Saat ini saya sedang fokus mendalami <strong>Rekayasa Perangkat Lunak (RPL)</strong>.
                            Dunia Frontend dan Backend development adalah taman bermain saya saat ini. Saya percaya bahwa
                            teknologi bukan hanya soal kode, tapi soal bagaimana memecahkan masalah manusia dengan cara yang elegan.
                        </p>
                    </div>
                </div>

                {/* KARTU 4: HOBI & MINAT (Kotak Kanan Bawah) */}
                <div className="bg-white rounded-xl shadow-md border-l-4 border-pink-500 p-6 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Hobi & Minat</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                            <Code className="w-5 h-5 text-pink-500" />
                            <span className="text-sm font-medium text-slate-700">Coding Projects</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                            <Music className="w-5 h-5 text-pink-500" />
                            <span className="text-sm font-medium text-slate-700">Mendengar Musik</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                            <Gamepad2 className="w-5 h-5 text-pink-500" />
                            <span className="text-sm font-medium text-slate-700">Gaming Strategy</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                            <BookOpen className="w-5 h-5 text-pink-500" />
                            <span className="text-sm font-medium text-slate-700">Tech Articles</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;