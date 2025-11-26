/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
    PenTool,
    Send,
    MessageCircle,
    Clock,
    Trash2,
    Heart
} from "lucide-react";

// --- TIPE DATA ---
type GuestMessage = {
    id: number;
    name: string;
    message: string;
    date: string;
    avatarColor: string; // Biar warna-warni
};

export default function GuestbookPage() {

    // --- DATA DUMMY (Agar terlihat ramai) ---
    const initialMessages: GuestMessage[] = [
        {
            id: 1,
            name: "Elon Musk",
            message: "Websitnya kenceng banget! Pake roket apa bang? 🚀",
            date: "2 jam yang lalu",
            avatarColor: "bg-blue-500"
        },
        {
            id: 2,
            name: "Mark Zuckerberg",
            message: "Keren bro! Kapan-kapan mampir ke Metaverse ya.",
            date: "5 jam yang lalu",
            avatarColor: "bg-blue-700"
        },
        {
            id: 3,
            name: "Sandhika Galih",
            message: "Mantap! Jangan lupa titik koma ;",
            date: "1 hari yang lalu",
            avatarColor: "bg-red-500"
        }
    ];

    // --- STATE ---
    const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
    const [inputName, setInputName] = useState("");
    const [inputMsg, setInputMsg] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // Load dari LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("portfolio-guestbook");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Gabungkan data dummy dengan data user (User di paling atas)
                setMessages([...parsed, ...initialMessages]);
            } catch (e) {
                console.error(e);
            }
        }
        setIsLoaded(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // --- LOGIC KIRIM PESAN ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputName.trim() || !inputMsg.trim()) return;

        const newMessage: GuestMessage = {
            id: Date.now(),
            name: inputName,
            message: inputMsg,
            date: "Baru saja",
            avatarColor: `bg-${["teal", "purple", "orange", "pink", "indigo"][Math.floor(Math.random() * 5)]}-500`
        };

        // Update State
        const newMessagesList = [newMessage, ...messages];
        setMessages(newMessagesList);

        // Simpan HANYA pesan user ke LocalStorage (biar dummy gak numpuk)
        const userMessages = newMessagesList.filter(m => m.id > 100); // Asumsi id dummy kecil
        localStorage.setItem("portfolio-guestbook", JSON.stringify(userMessages));

        // Reset Form
        setInputName("");
        setInputMsg("");
    };

    // --- LOGIC HAPUS (Khusus pesan user sendiri) ---
    const handleDelete = (id: number) => {
        if (confirm("Hapus pesan ini?")) {
            const updated = messages.filter(m => m.id !== id);
            setMessages(updated);

            // Update LocalStorage
            const userMessages = updated.filter(m => m.id > 100);
            localStorage.setItem("portfolio-guestbook", JSON.stringify(userMessages));
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex items-center justify-center gap-3">
                    <PenTool className="w-10 h-10" /> Guestbook
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Tinggalkan jejakmu di sini! Tulis pesan, sapaan, atau sekadar Hadir agar saya tahu kamu pernah mampir.
                </p>
            </div>

            {/* INPUT BOX */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100 mb-12 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <MessageCircle size={20} className="text-teal-600" /> Tanda Tangan Buku Tamu
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Nama Kamu / Samaran"
                                className="flex-1 px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                required
                            />
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Tulis pesan kerenmu di sini..."
                            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 resize-none"
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            required
                        ></textarea>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-teal-200 flex items-center gap-2"
                            >
                                <Send size={18} /> Kirim Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* MESSAGES LIST */}
            <div className="space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className="group flex gap-4 md:gap-6 animate-fadeIn">

                        {/* Avatar */}
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${msg.avatarColor || 'bg-slate-400'}`}>
                            <span className="text-xl font-bold">{msg.name.charAt(0).toUpperCase()}</span>
                        </div>

                        {/* Bubble */}
                        <div className="flex-1">
                            <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm hover:shadow-md transition-all relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{msg.name}</h4>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> {msg.date}
                                        </span>
                                    </div>

                                    {/* Tombol Hapus (Hanya muncul untuk pesan baru/User) */}
                                    {msg.id > 100 && (
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Hapus pesan ini"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <p className="text-slate-600 leading-relaxed">
                                    {msg.message}
                                </p>
                            </div>

                            {/* Reaction (Hiasan) */}
                            <div className="flex gap-2 mt-2 ml-2">
                                <button className="text-xs font-bold text-slate-400 hover:text-pink-500 flex items-center gap-1 transition-colors">
                                    <Heart size={12} /> Like
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center mt-16 text-slate-400 text-sm bg-slate-50 py-4 rounded-xl border border-dashed border-slate-200">
                <p>* Pesan ini disimpan di browser kamu (LocalStorage) & Data Dummy.</p>
            </div>

        </div>
    );
}