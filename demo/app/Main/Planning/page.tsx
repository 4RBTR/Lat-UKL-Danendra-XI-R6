"use client";

import { useState } from "react";
import { CheckCircle, Clock, Flag, MoveUp } from "lucide-react";

export default function PlanningPage() {
    const initialPlans = [
        // ... (data plans tetap sama) ...
        { id: 1, date: "Juni 2027", title: "Lulus dari SMK Telkom Malang", description: "Selesai menempuh pendidikan dan siap memasuki dunia kerja.", status: "pending" },
        { id: 2, date: "2028", title: "Mulai Bekerja", description: "Bekerja sambil mengumpulkan dana untuk kuliah mandiri.", status: "pending" },
        { id: 3, date: "2029", title: "Mulai Kuliah Mandiri", description: "Mengambil kuliah sesuai minat dan jurusan IT.", status: "pending" },
        { id: 4, date: "2030", title: "Cari Beasiswa Luar Negeri", description: "Mencoba beasiswa ke Jepang / Singapura / Eropa.", status: "pending" },
        { id: 5, date: "2031", title: "Belajar Bahasa Asing", description: "Mendalami bahasa Inggris & Jepang untuk memperkuat peluang.", status: "pending" },
        { id: 6, date: "2032", title: "Persiapan Pindah ke Luar Negeri", description: "Menyiapkan dokumen, paspor, sertifikat, dan administrasi.", status: "pending" },
    ];

    const [plans, setPlans] = useState(initialPlans);
    const [showPopup, setShowPopup] = useState(false);

    const handleStatusChange = (id: number, value: string) => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: value } : p
            )
        );

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1600);
    };

    const getIcon = (status: string) => {
        switch (status) {
            case "done":
                return <CheckCircle size={24} />;
            case "on progress":
                return <Clock size={24} />;
            default:
                return <Flag size={24} />;
        }
    };

    const getCardStyles = (status: string) => {
        switch (status) {
            case "done":
                return "border-l-green-500 bg-green-50/70 shadow-md";
            case "on progress":
                return "border-l-yellow-500 bg-yellow-50/70 shadow-md";
            default:
                return "border-l-teal-500 bg-teal-50/70 shadow-md";
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 min-h-[80vh]">
            <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-6">
                My future Planning
            </h1>

            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
                Berikut adalah rencana masa depan saya dalam bentuk *timeline* yang tersusun rapi.
                Kamu juga bisa mengubah status dari setiap agenda.
            </p>

            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line: Kiri pada mobile, Tengah pada desktop */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-teal-300 md:-translate-x-1/2"></div>

                {plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className={`relative mb-16 flex ${
                            // DESKTOP: Alternating layout (row / row-reverse)
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Dot/Icon: Selalu di kiri pada mobile, di tengah pada desktop */}
                        <div className={`
                            absolute top-0 z-10 w-10 h-10 
                            bg-white border-4 border-teal-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                            
                            left-2 md:left-1/2 md:-translate-x-1/2 // Posisi responsif
                        `}>
                            {getIcon(plan.status)}
                        </div>

                        {/* Spacer untuk Desktop (Mendorong Kartu ke Sisi Lain) */}
                        <div className="hidden md:block md:w-1/2" />


                        {/* Content Card */}
                        <div className={`
                            w-full md:w-1/2 relative
                            // MOBILE: Dorong konten ke kanan dot (ml-12)
                            ml-12
                            // DESKTOP: Reset dan atur padding untuk ruang tengah
                            md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}
                        `}>
                            <div className={`
                                bg-white border border-l-4 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300
                                rounded-xl p-6 w-full cursor-pointer
                                ${getCardStyles(plan.status)}
                            `}>
                                <p className="text-teal-600 font-bold text-sm flex items-center mb-1">
                                    <MoveUp className="w-4 h-4 mr-2" /> {plan.date}
                                </p>
                                <h2 className="text-xl font-extrabold text-slate-800 mt-1 mb-2">
                                    {plan.title}
                                </h2>
                                <p className="text-gray-700 mt-2">{plan.description}</p>

                                <div className="mt-4">
                                    <label className="text-sm text-gray-700 font-medium block">Status:</label>
                                    <select
                                        value={plan.status}
                                        title={`Status for ${plan.title}`}
                                        onChange={(e) => handleStatusChange(plan.id, e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer bg-white"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="on progress">On Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SUCCESS POPUP (Tetap) */}
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
                    <div className="
                        bg-white text-teal-500 shadow-xl border
                        border-teal-300 px-6 py-4 rounded-xl flex gap-3 items-center
                        animate-[fadeIn_0.3s_ease-out,fadeOut_0.3s_ease-in_1.4s_forwards]
                    ">
                        <CheckCircle className="text-teal-500" size={28} />
                        <span className="font-semibold text-lg">Status berhasil diupdate!</span>
                    </div>
                </div>
            )}

            {/* Animations (Tetap) */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(10px); }
                }
                `}
            </style>
        </div>
    );
}