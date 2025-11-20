// === Redesigned MyEducationPage ===
"use client";
import { useState } from "react";
import { schools, School } from "@/data/schools";
import SchoolModal from "@/Component/SchoolModal";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function MyEducationPage() {
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    return (
        <div className="min-h-screen p-10 bg-linear-to-br from-teal-50 via-white to-teal-100">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="flex justify-center mb-4">
                    <GraduationCap className="w-16 h-16 text-teal-600" />
                </div>
                <h1 className="text-5xl font-extrabold text-teal-700 drop-shadow-sm">
                    Riwayat Pendidikan Saya
                </h1>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
                    Perjalanan pendidikan yang membentuk karakter, prinsip, dan pola pikir
                    saya hingga sekarang. Klik sebuah sekolah untuk melihat detail lengkap.
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative border-l-4 border-teal-500 ml-6 space-y-12">
                {schools.map((school, index) => (
                    <motion.div
                        key={school.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="pl-10 relative"
                    >
                        {/* Bulat di garis timeline */}
                        <div className="w-5 h-5 bg-teal-600 rounded-full absolute -left-[11px] top-2 shadow-md"></div>

                        {/* Card */}
                        <div
                            onClick={() => setSelectedSchool(school)}
                            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-teal-100 hover:border-teal-400 transition-all"
                        >
                            <h2 className="text-2xl font-bold text-teal-700 mb-2">
                                {school.name}
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">{school.level}</p>
                            <p className="text-gray-700 leading-relaxed">{school.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {selectedSchool && (
                <SchoolModal
                    school={selectedSchool}
                    onClose={() => setSelectedSchool(null)}
                />
            )}
        </div>
    );
}
