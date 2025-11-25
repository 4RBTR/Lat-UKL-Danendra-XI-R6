"use client";

import { useState } from "react";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Loader2,
    Github,
    Linkedin,
    Instagram
} from "lucide-react";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi kirim pesan (2 detik)
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
            // Reset form logic here later
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Let s Connect! 🤝
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Punya pertanyaan, tawaran kerjasama, atau sekadar ingin menyapa?
                    Jangan ragu untuk menghubungi saya.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* BAGIAN KIRI: Info Kontak */}
                <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Mail className="w-6 h-6 text-teal-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email</p>
                                    <p className="font-medium">danendra_himawan_33rpl@student.smktelkom-mlg.sch.id</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Phone className="w-6 h-6 text-teal-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">WhatsApp</p>
                                    <p className="font-medium">+62 882-1737-4415</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <MapPin className="w-6 h-6 text-teal-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Lokasi</p>
                                    <p className="font-medium">Malang, Jawa Timur, Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <p className="text-sm text-slate-400 mb-4">Sosial Media</p>
                        <div className="flex gap-4">
                            <a href="https://github.com/4RBTR" className="p-3 bg-white/10 rounded-full hover:bg-teal-600 transition-colors" title="link">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-colors" title="link">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/danendrabagasandra/" className="p-3 bg-white/10 rounded-full hover:bg-pink-600 transition-colors" title="link">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BAGIAN KANAN: Formulir Pesan */}
                <div className="p-8 md:p-12 bg-white">
                    {isSent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Send className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pesan Terkirim!</h3>
                            <p className="text-slate-500 mb-8">
                                Terima kasih telah menghubungi. Saya akan membalas pesan Anda secepatnya.
                            </p>
                            <button
                                onClick={() => setIsSent(false)}
                                className="text-teal-600 font-bold hover:underline"
                            >
                                Kirim pesan lain
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-slate-50"
                                        placeholder="Nama Kamu"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-slate-50"
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subjek</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-slate-50" title="select">
                                    <option>Tawaran Kerjasama (Freelance)</option>
                                    <option>Diskusi Projek</option>
                                    <option>Sekadar Menyapa</option>
                                    <option>Lainnya</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Pesan</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-slate-50 resize-none"
                                    placeholder="Tulis pesanmu di sini..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
                                ) : (
                                    <><Send className="w-5 h-5" /> Kirim Pesan</>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}