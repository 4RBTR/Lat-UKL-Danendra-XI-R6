"use client";

import { useState } from "react";
import { CheckCircle, Clock, Flag } from "lucide-react";

export default function PlanningPage() {
    const initialPlans = [
        {
            id: 1,
            date: "Juni 2027",
            title: "Lulus dari SMK Telkom Malang",
            description: "Selesai menempuh pendidikan dan siap memasuki dunia kerja.",
            status: "pending",
        },
        {
            id: 2,
            date: "2028",
            title: "Mulai Bekerja",
            description: "Bekerja sambil mengumpulkan dana untuk kuliah mandiri.",
            status: "pending",
        },
        {
            id: 3,
            date: "2029",
            title: "Mulai Kuliah Mandiri",
            description: "Mengambil kuliah sesuai minat dan jurusan IT.",
            status: "pending",
        },
        {
            id: 4,
            date: "2030",
            title: "Cari Beasiswa Luar Negeri",
            description: "Mencoba beasiswa ke Jepang / Singapura / Eropa.",
            status: "pending",
        },
        {
            id: 5,
            date: "2031",
            title: "Belajar Bahasa Asing",
            description: "Mendalami bahasa Inggris & Jepang untuk memperkuat peluang.",
            status: "pending",
        },
        {
            id: 6,
            date: "2032",
            title: "Persiapan Pindah ke Luar Negeri",
            description: "Menyiapkan dokumen, paspor, sertifikat, dan administrasi.",
            status: "pending",
        },
    ];

    const [plans, setPlans] = useState(initialPlans);
    const [showPopup, setShowPopup] = useState(false);

    const handleStatusChange = (id: number, value: string) => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: value } : p
            )
        );

        // Show success popup
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1600);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-white text-gray-900 px-6">
            <h1 className="text-4xl font-extrabold text-teal-500 text-center mb-6">
                My Future Planning
            </h1>

            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Berikut adalah rencana masa depan saya dalam bentuk timeline yang tersusun rapi.
                Kamu juga bisa mengubah status dari setiap agenda.
            </p>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 h-full w-1 bg-teal-300 -translate-x-1/2"></div>

                {plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className={`mb-12 flex items-start gap-6 ${
                            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}
                    >
                        {/* Content Card */}
                        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 w-full max-w-sm">
                            <p className="text-teal-500 font-semibold">{plan.date}</p>
                            <h2 className="text-xl font-bold mt-1">{plan.title}</h2>
                            <p className="text-gray-600 mt-2">{plan.description}</p>

                            <div className="mt-4">
                                <label className="text-sm text-gray-700 font-medium">
                                    Status:
                                </label>
                                <select
                                    value={plan.status}
                                    title="select"
                                    onChange={(e) =>
                                        handleStatusChange(plan.id, e.target.value)
                                    }
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="on progress">On Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>

                        {/* Timeline icon */}
                        <div className="flex flex-col items-center">
                            <div className="bg-teal-500 text-white p-3 rounded-full shadow-lg">
                                {plan.status === "done" ? (
                                    <CheckCircle size={24} />
                                ) : plan.status === "on progress" ? (
                                    <Clock size={24} />
                                ) : (
                                    <Flag size={24} />
                                )}
                            </div>

                            {/* Connector Line */}
                            {index !== plans.length - 1 && (
                                <div className="flex-1 w-1 bg-teal-300 mt-2"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* SUCCESS POPUP */}
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

            {/* Animations */}
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
