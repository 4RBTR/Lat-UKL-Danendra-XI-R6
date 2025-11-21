"use client";
import { useState } from "react";
import { schools, School } from "@/data/schools";
import SchoolModal from "@/Component/SchoolModal";
// 'Calendar' dihapus karena tidak digunakan di sini.
import { GraduationCap, ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function MyEducationPage() {
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    return (
        // Gunakan container putih rounded seperti halaman Home/Skills
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 min-h-[80vh]">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-flex justify-center items-center p-4 bg-teal-100 rounded-full mb-6">
                    <GraduationCap className="w-10 h-10 text-teal-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
                    Riwayat Pendidikan
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    Jejak akademis yang membentuk pola pikir dan karakter saya.
                    <span className="block text-sm mt-2 text-teal-600 font-medium">
                        (Klik kartu sekolah untuk melihat detail pengalaman)
                    </span>
                </p>
            </motion.div>

            {/* Timeline Section */}
            <div className="relative max-w-3xl mx-auto">
                {/* Garis Vertikal Tengah */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-2 h-full w-0.5 bg-linear-to-b from-teal-200 via-teal-400 to-slate-200"></div>

                <div className="space-y-12">
                    {schools.map((school, index) => (
                        <motion.div
                            key={school.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Dot Indikator di Tengah */}
                            <div className="absolute left-[-5px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-teal-500 border-4 border-white rounded-full z-10 shadow-md"></div>

                            {/* Spacer untuk sisi kosong (Desktop only) */}
                            <div className="hidden md:block md:w-1/2" />

                            {/* Content Card */}
                            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                                }`}>
                                <div
                                    onClick={() => setSelectedSchool(school)}
                                    className="group cursor-pointer bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 border-l-4 border-l-teal-500 transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Background accent saat hover */}
                                    <div className="absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="relative z-10">
                                        {/* Level Badge */}
                                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full mb-3">
                                            {school.level}
                                        </span>

                                        <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">
                                            {school.name}
                                        </h2>

                                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                            {school.description}
                                        </p>

                                        {/* Footer Card */}
                                        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                                            <div className="flex items-center text-xs text-slate-400">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                <span>Lihat Lokasi</span>
                                            </div>
                                            <div className="flex items-center text-sm font-medium text-teal-600 group-hover:translate-x-1 transition-transform">
                                                Detail <ChevronRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Popup */}
            {selectedSchool && (
                <SchoolModal
                    school={selectedSchool}
                    onClose={() => setSelectedSchool(null)}
                />
            )}
        </div>
    );
}