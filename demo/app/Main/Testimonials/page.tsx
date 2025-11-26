/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
    MessageSquare,
    Star,
    User,
    Send,
    Quote,
    ThumbsUp,
    PlusCircle
} from "lucide-react";

// --- TIPE DATA ---
type Review = {
    id: number;
    name: string;
    role: string;
    message: string;
    rating: number;
    date: string;
};

export default function TestimonialsPage() {

    // --- DATA DUMMY AWAL ---
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: 1,
            name: "Budi Santoso",
            role: "Guru RPL",
            message: "Danendra adalah siswa yang sangat berdedikasi. Pemahaman logika codingnya di atas rata-rata siswa lain. Web portfolionya sangat rapi!",
            rating: 5,
            date: "2 hari yang lalu"
        },
        {
            id: 2,
            name: "Siti Aminah",
            role: "Ketua OSIS",
            message: "Pernah kerjasama bareng Danendra buat web event sekolah. Kerjanya cepet, komunikasinya enak, dan hasilnya memuaskan banget.",
            rating: 5,
            date: "1 minggu yang lalu"
        },
        {
            id: 3,
            name: "Rian Saputra",
            role: "Freelance Client",
            message: "Desain UI-nya modern dan fresh. Suka banget sama pemilihan warnanya. Recommended frontend developer!",
            rating: 4,
            date: "3 minggu yang lalu"
        }
    ]);

    // State Form
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [newRating, setNewRating] = useState(5);

    // --- LOGIC TAMBAH REVIEW ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newMessage) return;

        const newReview: Review = {
            id: Date.now(),
            name: newName,
            role: newRole || "Pengunjung",
            message: newMessage,
            rating: newRating,
            date: "Baru saja"
        };

        setReviews([newReview, ...reviews]); // Tambah ke paling atas

        // Reset Form
        setNewName("");
        setNewRole("");
        setNewMessage("");
        setNewRating(5);
        alert("Terima kasih! Ulasan Anda telah ditambahkan.");
    };

    // Helper Bintang
    const renderStars = (count: number) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={`${i < count ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
                />
            ))}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <MessageSquare className="w-10 h-10" /> Kata Mereka
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Apa kata teman, guru, dan klien tentang hasil kerja dan kolaborasi dengan saya.
                </p>
            </div>

            {/* STATISTIK RATING */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full">
                        <Star size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-800">4.9/5</h3>
                        <p className="text-slate-500 text-sm">Rata-rata Rating</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                        <User size={32} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-800">{reviews.length}+</h3>
                        <p className="text-slate-500 text-sm">Total Ulasan</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-green-50 text-green-600 rounded-full">
                        <ThumbsUp size={32} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-800">100%</h3>
                        <p className="text-slate-500 text-sm">Kepuasan Klien</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* KOLOM KIRI: DAFTAR REVIEW */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Ulasan Terbaru</h2>

                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
                            <Quote className="absolute top-6 right-6 text-slate-100 w-10 h-10 group-hover:text-teal-50 transition-colors" />

                            <div className="flex items-start gap-4 mb-4">
                                {/* Avatar Otomatis dari UI Avatars */}
                                <img
                                    src={`https://ui-avatars.com/api/?name=${review.name}&background=random&color=fff`}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full shadow-sm object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-slate-800">{review.name}</h4>
                                    <p className="text-xs text-teal-600 font-bold uppercase tracking-wider">{review.role}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                {renderStars(review.rating)}
                            </div>

                            <p className="text-slate-600 leading-relaxed italic">
                                {review.message}
                            </p>

                            <p className="text-xs text-slate-400 mt-4 text-right">
                                {review.date}
                            </p>
                        </div>
                    ))}
                </div>

                {/* KOLOM KANAN: FORMULIR */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-24 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <PlusCircle className="text-teal-400" />
                            <h3 className="text-xl font-bold">Tulis Ulasan</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">
                            Pernah bekerjasama dengan saya? Bagikan pengalamanmu di sini!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                <input
                                    type="text" required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="Nama Kamu"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Role / Jabatan</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="Contoh: Teman Sekelas"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Rating</label>
                                <div className="flex gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewRating(star)}
                                            title="button"
                                            className={`p-2 rounded-lg transition-all ${newRating >= star ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-800 text-slate-600"}`}
                                        >
                                            <Star size={20} fill={newRating >= star ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Pesan</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                                    placeholder="Ceritakan pengalamanmu..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-900/50 flex items-center justify-center gap-2"
                            >
                                <Send size={18} /> Kirim Ulasan
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}