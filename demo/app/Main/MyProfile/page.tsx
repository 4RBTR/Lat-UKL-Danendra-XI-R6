"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
    MapPin,
    Calendar,
    Briefcase,
    Target,
    Heart,
    Gamepad2,
    Music,
    Code,
    BookOpen,
    Edit3,
    Save,
    X,
    Github,
    Linkedin,
    Instagram,
    Download,
    GraduationCap,
    Award,
    Plus,
    Trash2
} from "lucide-react";

// --- TIPE DATA ---
type Experience = {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
};

type UserProfile = {
    name: string;
    role: string;
    location: string;
    birthDate: string;
    school: string;
    about: string;
    vision: string;
    experiences: Experience[];
};

// =========================================================================
// 👇 PENTING: Variabel ini ditaruh DI LUAR function agar tidak bikin error looping
// =========================================================================
const defaultProfile: UserProfile = {
    name: "Danendra Bagas Himawan",
    role: "Pelajar • Calon Programmer • Kreator Digital",
    location: "Malang, Indonesia",
    birthDate: "8 Januari 2009",
    school: "Siswa SMK Telkom Malang (RPL)",
    about: "Halo! Saya lahir di Malang. Sejak kecil, saya memiliki ketertarikan yang sangat kuat terhadap teknologi. Saya adalah tipe orang yang senang bereksperimen (ngulik) hal-hal baru di depan komputer.",
    vision: "Bercita-cita menjadi seorang Software Engineer profesional yang mampu menciptakan inovasi digital bermanfaat.",
    experiences: [
        {
            id: 1,
            title: "Frontend Developer",
            company: "Portfolio Project",
            period: "2024 - Sekarang",
            description: "Membangun web portfolio interaktif menggunakan Next.js, Tailwind CSS, dan TypeScript."
        }
    ]
};

export default function ProfilePage() {

    // --- STATE ---
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<"personal" | "education" | "experience">("personal");
    const [isLoaded, setIsLoaded] = useState(false);

    // Form State (untuk mode edit utama)
    const [formData, setFormData] = useState<UserProfile>(defaultProfile);

    // Form State (untuk input pengalaman baru di dalam modal)
    const [newExp, setNewExp] = useState<Partial<Experience>>({ title: "", company: "", period: "", description: "" });

    // --- LOAD & SAVE DATA ---
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio-profile");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);

                // Merge data agar aman (jika data lama kurang lengkap)
                const mergedProfile = { ...defaultProfile, ...parsed };

                // Pastikan array experiences ada
                if (!mergedProfile.experiences) {
                    mergedProfile.experiences = [];
                }

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setProfile(mergedProfile);
                setFormData(mergedProfile);
            } catch (error) {
                console.error("Error loading profile", error);
            }
        }
        setIsLoaded(true);
    }, []); // Dependency array kosong agar hanya jalan sekali saat mount

    const handleSave = () => {
        setProfile(formData);
        localStorage.setItem("portfolio-profile", JSON.stringify(formData));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(profile); // Reset form ke data asli
        setNewExp({ title: "", company: "", period: "", description: "" }); // Reset form exp
        setIsEditing(false);
    };

    // --- LOGIC EXPERIENCE (Inside Edit Modal) ---
    const handleAddExperience = () => {
        if (!newExp.title || !newExp.company) return alert("Judul dan Instansi wajib diisi!");

        const experienceToAdd: Experience = {
            id: Date.now(),
            title: newExp.title || "",
            company: newExp.company || "",
            period: newExp.period || "",
            description: newExp.description || ""
        };

        setFormData({
            ...formData,
            experiences: [experienceToAdd, ...formData.experiences]
        });

        setNewExp({ title: "", company: "", period: "", description: "" });
    };

    const handleDeleteExperience = (id: number) => {
        if (confirm("Hapus pengalaman ini dari daftar edit?")) {
            setFormData({
                ...formData,
                experiences: formData.experiences.filter(exp => exp.id !== id)
            });
        }
    };

    // --- RENDER TAB CONTENT ---
    const renderTabContent = () => {
        switch (activeTab) {
            case "education":
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">SMK Telkom Malang</h4>
                                <p className="text-sm text-teal-600 font-medium">Rekayasa Perangkat Lunak</p>
                                <p className="text-xs text-slate-500 mt-1">2024 - Sekarang</p>
                            </div>
                        </div>
                    </div>
                );
            case "experience":
                return (
                    <div className="space-y-4 animate-fadeIn">
                        {profile.experiences && profile.experiences.length > 0 ? (
                            profile.experiences.map((exp) => (
                                <div key={exp.id} className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-blue-50/50 transition-colors">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{exp.title}</h4>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm text-teal-600 font-bold">{exp.company}</span>
                                            <span className="text-xs text-slate-400">• {exp.period}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 italic bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                Belum ada pengalaman ditambahkan. <br /> Klik Edit Profil untuk menambah.
                            </div>
                        )}
                    </div>
                );
            default: // personal
                return (
                    <div className="text-gray-700 leading-relaxed space-y-4 text-justify animate-fadeIn">
                        <p>{profile.about}</p>
                    </div>
                );
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="max-w-6xl mx-auto animate-fadeIn pb-10 relative">

            {/* HEADER */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center px-4 md:px-0 gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-teal-600 mb-2">Profil Pribadi</h1>
                    <p className="text-gray-600">Kenali saya lebih dekat, mulai dari latar belakang hingga minat pribadi.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert("Fitur Download CV akan segera hadir!")}
                        className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">Download CV</span>
                    </button>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-shadow shadow-md hover:shadow-lg"
                    >
                        <Edit3 size={18} />
                        <span>Edit Profil</span>
                    </button>
                </div>
            </div>

            {/* GRID LAYOUT UTAMA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* KARTU 1: HERO SECTION */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border-l-4 border-teal-500 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full z-0 opacity-50"></div>
                    <div className="relative group shrink-0 z-10">
                        <div className="absolute -inset-1 bg-linear-to-r from-teal-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                            <Image src="/danendra.jpg" alt={profile.name} fill className="object-cover" priority />
                        </div>
                    </div>
                    <div className="text-center md:text-left flex-1 z-10 w-full">
                        <h2 className="text-3xl font-bold text-slate-800 mb-1">{profile.name}</h2>
                        <p className="text-teal-600 font-medium mb-4 bg-teal-50 inline-block px-3 py-1 rounded-full text-sm">
                            {profile.role}
                        </p>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <MapPin className="w-5 h-5 text-slate-400 shrink-0" /> <span>{profile.location}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Calendar className="w-5 h-5 text-slate-400 shrink-0" /> <span>{profile.birthDate}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Briefcase className="w-5 h-5 text-slate-400 shrink-0" /> <span>{profile.school}</span>
                            </div>
                        </div>

                        {/* SOCIAL MEDIA ICONS (Ditambahkan Kembali) */}
                        <div className="mt-6 flex justify-center md:justify-start gap-4">
                            <a href="https://github.com/4RBTR" className="p-2 bg-slate-100 rounded-full hover:bg-slate-800 hover:text-white transition-colors" title="github"><Github size={20} /></a>
                            <a href="https://linkedin.com/in/danendra" className="p-2 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors" title="linkedin"><Linkedin size={20} /></a>
                            <a href="https://www.instagram.com/danendrabagasandra/" className="p-2 bg-slate-100 rounded-full hover:bg-pink-600 hover:text-white transition-colors" title="instagram"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* KARTU 2: VISI */}
                <div className="bg-linear-to-br from-yellow-50 to-white rounded-xl shadow-md border-l-4 border-yellow-500 p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Target className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-800">Visi & Cita-cita</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm italic border-l-2 border-yellow-200 pl-4" title="area">{profile.vision}</p>
                </div>

                {/* KARTU 3: TABS */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border-t-4 border-blue-500 p-0 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="flex border-b border-slate-100 bg-slate-50/50">
                        {(["personal", "education", "experience"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 text-sm font-bold capitalize border-b-2 transition-colors ${activeTab === tab
                                    ? "border-blue-500 text-blue-600 bg-white"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="p-8 min-h-[250px]">{renderTabContent()}</div>
                </div>

                {/* KARTU 4: HOBI */}
                <div className="bg-white rounded-xl shadow-md border-l-4 border-pink-500 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><Heart className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-800">Hobi & Minat</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[{ icon: Code, t: "Coding" }, { icon: Music, t: "Musik" }, { icon: Gamepad2, t: "Gaming" }, { icon: BookOpen, t: "Membaca" }].map((i, x) => (
                            <div key={x} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                                <i.icon className="w-5 h-5 text-pink-500" /> <span className="text-sm font-medium text-slate-700">{i.t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- MODAL EDIT PROFILE --- */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeInScale flex flex-col">

                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-20">
                            <h2 className="text-2xl font-bold text-slate-800">Edit Profil & Pengalaman</h2>
                            <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600" title="button"><X size={24} /></button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-8">

                            {/* SECTION 1: INFO PRIBADI */}
                            <div>
                                <h3 className="text-lg font-bold text-teal-600 mb-4 border-b pb-2">Informasi Dasar</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                        <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="area"
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Role / Tagline</label>
                                        <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="input"
                                            value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Lokasi</label>
                                        <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="input"
                                            value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Sekolah</label>
                                        <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="area"
                                            value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Tentang Saya</label>
                                        <textarea rows={3} className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="area"
                                            value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Visi & Cita-cita</label>
                                        <textarea rows={2} className="w-full border rounded-lg p-2 outline-none focus:border-teal-500"
                                        title="area"
                                            value={formData.vision} onChange={(e) => setFormData({ ...formData, vision: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: EXPERIENCE CRUD */}
                            <div>
                                <h3 className="text-lg font-bold text-blue-600 mb-4 border-b pb-2">Kelola Pengalaman</h3>

                                {/* List Experience yang ada */}
                                <div className="space-y-3 mb-6">
                                    {formData.experiences.length === 0 && <p className="text-sm text-slate-400 italic">Belum ada pengalaman.</p>}
                                    {formData.experiences.map(exp => (
                                        <div key={exp.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <div>
                                                <p className="font-bold text-slate-700">{exp.title}</p>
                                                <p className="text-xs text-slate-500">{exp.company} ({exp.period})</p>
                                            </div>
                                            <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="a">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Form Tambah Baru */}
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                                        <Plus size={16} /> Tambah Pengalaman Baru
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                        <input placeholder="Judul (e.g. Project Manager)" className="border p-2 rounded text-sm"
                                            value={newExp.title} onChange={(e) => setNewExp({ ...newExp, title: e.target.value })} />
                                        <input placeholder="Instansi / Company" className="border p-2 rounded text-sm"
                                            value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} />
                                        <input placeholder="Periode (e.g. 2023 - 2024)" className="border p-2 rounded text-sm"
                                            value={newExp.period} onChange={(e) => setNewExp({ ...newExp, period: e.target.value })} />
                                        <input placeholder="Deskripsi Singkat" className="border p-2 rounded text-sm"
                                            value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} />
                                    </div>
                                    <button onClick={handleAddExperience} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">
                                        + Tambahkan ke Daftar
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white z-20">
                            <button onClick={handleCancel} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Batal</button>
                            <button onClick={handleSave} className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 flex items-center gap-2">
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}