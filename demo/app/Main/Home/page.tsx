"use client";
import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
    return (
        <div className="p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
            {/* Judul Halaman */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Selamat Datang di Website Pribadi Saya!
                </h1>

                {/* Paragraf Pembuka */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Halo! Saya <span className="font-semibold text-teal-600">Danendra Bagas Himawan</span>,
                    seorang pelajar dari SMK Telkom Malang yang memiliki ketertarikan dalam dunia teknologi
                    dan pengembangan diri. Website ini berisi perjalanan hidup dan pencapaian saya yang
                    tersusun rapi dalam beberapa bagian utama. Yuk, jelajahi untuk mengenal saya lebih dekat!
                </p>
            </div>

            {/* Section Informasi Halaman - UBAH DISINI JADI md:grid-cols-2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {/* 1. Profile Section */}
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col">
                    <div className="grow">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-3">Profile</h2>
                        <p className="text-gray-600 mb-6">
                            Berisi informasi pribadi saya seperti nama lengkap, tanggal lahir, asal,
                            dan deskripsi singkat mengenai minat serta cita-cita saya.
                        </p>
                    </div>
                    <Link
                        href="/Main/MyProfile"
                        className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold animate-btnPulse"
                    >
                        Lihat Profil Saya →
                    </Link>
                </div>

                {/* 2. MyEducation Section */}
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col">
                    <div className="grow">
                        <h2 className="text-2xl font-semibold text-green-700 mb-3">My Education</h2>
                        <p className="text-gray-600 mb-6">
                            Menampilkan perjalanan pendidikan saya dari TK hingga SMK,
                            lengkap dengan lokasi sekolah dan pengalaman belajar.
                        </p>
                    </div>
                    <Link
                        href="/Main/MyEducation"
                        className="block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-semibold animate-btnPulse"
                    >
                        Jelajahi Pendidikan →
                    </Link>
                </div>

                {/* 3. Planning Section */}
                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col">
                    <div className="grow">
                        <h2 className="text-2xl font-semibold text-yellow-700 mb-3">Planning</h2>
                        <p className="text-gray-600 mb-6">
                            Melihat perjalanan hidup saya dari masa kecil hingga sekarang dalam bentuk garis waktu (timeline) yang menarik.
                        </p>
                    </div>
                    <Link
                        href="/Main/Planning"
                        className="block text-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-semibold animate-btnPulse"
                    >
                        Lihat Garis Waktu →
                    </Link>
                </div>

                {/* 4. Skills Section (SEKARANG SUDAH DI DALAM GRID) */}
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col">
                    <div className="grow">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-3">Skills & Tech</h2>
                        <p className="text-gray-600 mb-6">
                            Daftar teknologi dan keahlian teknis yang saya kuasai, mulai dari Frontend, Backend, hingga Tools pendukung.
                        </p>
                    </div>
                    <Link
                        href="/Main/Skills"
                        className="block text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition font-semibold animate-btnPulse"
                    >
                        Lihat Keahlian →
                    </Link>
                </div>

            </div>

            {/* Penutup */}
            <div className="mt-10 border-t pt-6 text-center animate-fadeInSlow">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">
                    Terima Kasih Telah Berkunjung!
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Semoga website ini bisa menjadi sarana untuk berbagi perjalanan dan inspirasi saya.
                    🌿
                </p>
            </div>
        </div>
    );
};

export default Home;