/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { School } from "@/data/schools";
import { X, MapPin, Calendar, BookOpen, School as SchoolIcon } from "lucide-react";

interface Props {
    school: School;
    onClose: () => void;
}

const SchoolModal = ({ school, onClose }: Props) => {
    return (
        // 1. BACKDROP (Gelap & Blur)
        // `z-[9999]` memastikan dia di atas segalanya (termasuk navbar).
        <div
            className="fixed inset-0 z-9999 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* 2. MODAL CARD */}
            {/* `max-h-[90vh]` membatasi tinggi agar tidak bablas keluar layar */}
            <div
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative ring-1 ring-white/20"
                onClick={(e) => e.stopPropagation()}
            >

                {/* --- HEADER SECTION (FIXED) --- */}
                <div className="relative bg-linear-to-r from-slate-100 to-slate-200 h-40 shrink-0 flex items-center justify-center">

                    {/* Pola Dekorasi Background (Dot Pattern) */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    {/* Tombol Close */}
                    <button
                        onClick={onClose}
                        title="button"
                        className="absolute top-4 right-4 z-20 bg-white text-slate-500 hover:text-red-600 p-2 rounded-full shadow-md transition-all hover:scale-110"
                    >
                        <X size={20} />
                    </button>

                    {/* --- LOGO SEKOLAH (FLOATING) --- */}
                    {/* Logo dibuat dalam lingkaran putih di tengah header */}
                    <div className="relative w-28 h-28 bg-white rounded-full p-4 shadow-lg flex items-center justify-center transform translate-y-10 border-4 border-white">
                        <div className="relative w-full h-full">
                            <Image
                                src={school.image}
                                alt={school.name}
                                fill
                                className="object-contain" // KUNCI: Agar logo tidak gepeng
                                sizes="150px"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* --- CONTENT BODY (SCROLLABLE) --- */}
                {/* Padding atas (pt-14) memberi ruang untuk logo yang menjorok ke bawah */}
                <div className="flex-1 overflow-y-auto px-6 md:px-8 pt-14 pb-8 custom-scrollbar">

                    {/* Judul & Badge */}
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 mb-2 border border-teal-200 uppercase tracking-wider">
                            {school.level}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {school.name}
                        </h2>
                    </div>

                    {/* Grid Informasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <InfoItem
                            icon={<Calendar className="w-5 h-5 text-blue-500" />}
                            label="Tahun Pendidikan"
                            value={`${school.startYear} - ${school.endYear}`}
                        />
                        <InfoItem
                            icon={<MapPin className="w-5 h-5 text-red-500" />}
                            label="Lokasi"
                            value={school.location}
                        />
                        {school.major && (
                            <InfoItem
                                icon={<BookOpen className="w-5 h-5 text-purple-500" />}
                                label="Jurusan"
                                value={school.major}
                                fullWidth
                            />
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <SchoolIcon size={20} className="text-slate-400" />
                            <h3 className="font-bold text-slate-800">Tentang Sekolah</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                            {school.description}
                        </p>
                    </div>

                    {/* Peta (Jika ada) */}
                    {school.mapUrl && (
                        <div className="mt-8">
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm h-56 bg-slate-100">
                                <iframe
                                    src={school.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title={`Peta ${school.name}`}
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- FOOTER (Sticky di Bawah Modal) --- */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
                    >
                        Tutup
                    </button>
                </div>

            </div>
        </div>
    );
};

// Helper Component Kecil untuk Info Grid
function InfoItem({ icon, label, value, fullWidth = false }: { icon: any, label: string, value: string, fullWidth?: boolean }) {
    return (
        <div className={`bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3 ${fullWidth ? 'sm:col-span-2' : ''}`}>
            <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-slate-800 font-semibold text-sm">{value}</p>
            </div>
        </div>
    )
}

export default SchoolModal;