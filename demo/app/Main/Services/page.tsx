"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Monitor,
    Smartphone,
    Palette,
    Code2,
    Zap,
    Search,
    ArrowRight,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Calculator,
    Check
} from "lucide-react";

export default function ServicesPage() {

    // --- DATA SERVICES ---
    const services = [
        {
            icon: Monitor,
            title: "Web Development",
            desc: "Membangun website responsif, cepat, dan modern menggunakan Next.js dan React."
        },
        {
            icon: Palette,
            title: "UI/UX Design",
            desc: "Merancang antarmuka aplikasi yang estetik dan mudah digunakan (User Friendly) via Figma."
        },
        {
            icon: Smartphone,
            title: "Responsive Design",
            desc: "Memastikan website Anda tampil sempurna di semua perangkat (Laptop, Tablet, HP)."
        },
        {
            icon: Code2,
            title: "Slicing Design",
            desc: "Mengubah desain Figma/Adobe XD menjadi kode HTML/React yang rapi dan bersih."
        },
        {
            icon: Zap,
            title: "Performance Optimization",
            desc: "Meningkatkan kecepatan loading website agar performa SEO lebih maksimal."
        },
        {
            icon: Search,
            title: "SEO Dasar",
            desc: "Optimasi struktur kode agar website mudah ditemukan di mesin pencari Google."
        }
    ];

    // --- DATA PRICING ---
    const pricing = [
        {
            name: "Landing Page",
            price: "Rp 500rb+",
            desc: "Cocok untuk promosi produk atau profil diri.",
            features: ["1 Halaman Utama", "Responsive Mobile", "Gratis Hosting Vercel", "Revisi 2x"],
            isPopular: false
        },
        {
            name: "Company Profile",
            price: "Rp 1.5jt+",
            desc: "Solusi lengkap untuk bisnis & UMKM.",
            features: ["Hingga 5 Halaman", "Desain Premium", "Fitur Contact Form", "SEO Basic", "Revisi 5x"],
            isPopular: true // Highlight ini
        },
        {
            name: "Custom App",
            price: "Diskusi",
            desc: "Web aplikasi kompleks sesuai kebutuhan.",
            features: ["Fitur Custom", "Database Integration", "Admin Dashboard", "API Integration", "Support Prioritas"],
            isPopular: false
        }
    ];

    // --- DATA ESTIMATOR ---
    const addOns = [
        { id: 1, label: "Desain UI/UX (Figma)", price: 300000 },
        { id: 2, label: "Fitur Dark Mode", price: 150000 },
        { id: 3, label: "Animasi Interaktif", price: 200000 },
        { id: 4, label: "SEO Optimization", price: 250000 },
        { id: 5, label: "Formulir Email (EmailJS)", price: 100000 },
        { id: 6, label: "Multi-Bahasa (i18n)", price: 400000 },
    ];

    // --- STATE ---
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);

    // --- LOGIC ---
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const toggleAddOn = (id: number) => {
        if (selectedAddOns.includes(id)) {
            setSelectedAddOns(selectedAddOns.filter(item => item !== id));
        } else {
            setSelectedAddOns([...selectedAddOns, id]);
        }
    };

    const basePrice = 500000; // Harga dasar
    const totalPrice = basePrice + selectedAddOns.reduce((acc, id) => {
        const item = addOns.find(i => i.id === id);
        return acc + (item ? item.price : 0);
    }, 0);

    // Formatter Rupiah
    const formatRupiah = (num: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    };

    // --- DATA FAQ ---
    const faqs = [
        {
            q: "Berapa lama waktu pengerjaan website?",
            a: "Tergantung kompleksitas. Untuk Landing Page sederhana biasanya 3-5 hari, sedangkan website kompleks bisa 2-4 minggu."
        },
        {
            q: "Apakah menyediakan jasa Hosting & Domain?",
            a: "Saya bisa membantu mengarahkan dan melakukan setup (Deploy) ke Vercel atau Netlify, namun pembelian domain ditanggung klien."
        },
        {
            q: "Apakah saya perlu menyiapkan desain sendiri?",
            a: "Tidak wajib. Jika belum ada desain, saya bisa bantu buatkan UI/UX-nya terlebih dahulu sebelum masuk tahap coding."
        },
        {
            q: "Teknologi apa yang kamu gunakan?",
            a: "Spesialisasi saya adalah React, Next.js, Tailwind CSS, dan TypeScript untuk hasil yang modern dan performa tinggi."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Layanan Saya 🛠️
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Solusi digital terbaik untuk membantu bisnis atau ide Anda tampil online dengan profesional.
                </p>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {services.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                            <item.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* --- FITUR BARU 1: PRICING PACKAGES --- */}
            <div className="mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800">Pilihan Paket</h2>
                    <p className="text-slate-500 mt-2">Pilih paket yang sesuai dengan kebutuhan projekmu.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {pricing.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 ${plan.isPopular
                                    ? "bg-slate-900 text-white shadow-2xl scale-105 z-10 border-slate-900"
                                    : "bg-white text-slate-800 shadow-lg border-slate-100 hover:border-teal-500"
                                }`}
                        >
                            {plan.isPopular && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-teal-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </span>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${plan.isPopular ? "text-teal-300" : "text-teal-600"}`}>{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-3xl font-extrabold">{plan.price}</span>
                            </div>
                            <p className={`text-sm mb-6 ${plan.isPopular ? "text-slate-400" : "text-slate-500"}`}>{plan.desc}</p>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <CheckCircle size={18} className={plan.isPopular ? "text-teal-400" : "text-teal-600"} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/Main/Contact"
                                className={`block w-full py-3 rounded-xl font-bold text-center transition-colors ${plan.isPopular
                                        ? "bg-teal-500 hover:bg-teal-600 text-white"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                                    }`}
                            >
                                Pilih Paket
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- FITUR BARU 2: CALCULATOR ESTIMASI --- */}
            <div className="bg-linear-to-br from-teal-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-teal-100 mb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className=" items-center gap-3 mb-4 text-teal-700 bg-white inline-flex px-4 py-2 rounded-full shadow-sm">
                            <Calculator size={20} />
                            <span className="font-bold text-sm">Simulasi Biaya</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Hitung Estimasi Projek</h2>
                        <p className="text-slate-600 mb-8">
                            Pilih fitur tambahan yang kamu butuhkan untuk mendapatkan perkiraan biaya awal. Transparan dan tanpa biaya tersembunyi.
                        </p>

                        <div className="space-y-3">
                            {addOns.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleAddOn(item.id)}
                                    className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${selectedAddOns.includes(item.id)
                                            ? "bg-white border-teal-500 shadow-md"
                                            : "bg-white/50 border-slate-200 hover:bg-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedAddOns.includes(item.id) ? "bg-teal-500 border-teal-500" : "bg-white border-slate-300"
                                            }`}>
                                            {selectedAddOns.includes(item.id) && <Check size={14} className="text-white" />}
                                        </div>
                                        <span className="font-medium text-slate-700">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">+{formatRupiah(item.price)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col justify-center">
                        <h3 className="text-slate-500 font-medium uppercase text-sm tracking-wider mb-2">Estimasi Total</h3>
                        <div className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
                            {formatRupiah(totalPrice)}
                        </div>

                        <div className="space-y-3 mb-8 border-t border-slate-100 pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Biaya Dasar (Landing Page)</span>
                                <span className="font-bold text-slate-700">{formatRupiah(basePrice)}</span>
                            </div>
                            {selectedAddOns.length > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Fitur Tambahan ({selectedAddOns.length})</span>
                                    <span className="font-bold text-teal-600">
                                        + {formatRupiah(totalPrice - basePrice)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <Link href="/Main/Contact" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2">
                            Konsultasikan Sekarang <ArrowRight size={18} />
                        </Link>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            *Harga ini hanyalah estimasi awal dan dapat berubah sesuai detail brief.
                        </p>
                    </div>
                </div>
            </div>

            {/* WORKFLOW SECTION */}
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-10"></div>
                <div className="relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Bagaimana Saya Bekerja?</h2>
                        <p className="text-slate-400">Proses simpel, transparan, dan hasil maksimal.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        {[
                            { step: "01", title: "Diskusi", desc: "Membahas kebutuhan & ide." },
                            { step: "02", title: "Desain", desc: "Membuat rancangan UI/UX." },
                            { step: "03", title: "Coding", desc: "Eksekusi kode & fitur." },
                            { step: "04", title: "Deploy", desc: "Website siap online!" },
                        ].map((wf, idx) => (
                            <div key={idx} className="relative">
                                <div className="text-5xl font-extrabold text-slate-800/50 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-0">
                                    {wf.step}
                                </div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-teal-900/50">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{wf.title}</h4>
                                    <p className="text-sm text-slate-400">{wf.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Pertanyaan Umum (FAQ)</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors">
                                <span className="font-bold text-slate-800">{faq.q}</span>
                                {openFaq === idx ? <ChevronUp className="text-teal-600" /> : <ChevronDown className="text-slate-400" />}
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}