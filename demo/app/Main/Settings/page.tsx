/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useEffect, useRef } from "react";
import {
    Settings, Trash2, User, Bell, Moon, Save,
    RefreshCw, AlertTriangle, LogOut, Download,
    Upload, Palette, Monitor, Check, Info,
    Database, Key, Copy, Eye, EyeOff, Keyboard, Globe
} from "lucide-react";

export default function SettingsPage() {
    // --- STATE ---
    const [username, setUsername] = useState("Danendra Bagas");
    const [email, setEmail] = useState("admin@portfolio.com");
    const [accentColor, setAccentColor] = useState("Teal");
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("English");
    const [isSaved, setIsSaved] = useState(false);

    // System & Storage
    const [systemInfo, setSystemInfo] = useState({ browser: "", platform: "", res: "" });
    const [storageStats, setStorageStats] = useState({ used: 0, percent: 0 });

    // API Key Simulation
    const [apiKey, setApiKey] = useState("");
    const [showKey, setShowKey] = useState(false);
    const [isKeyCopied, setIsKeyCopied] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- LOAD DATA ---
    useEffect(() => {
        // Load Basic Data
        const savedName = localStorage.getItem("admin-name");
        if (savedName) setUsername(savedName);
        const savedColor = localStorage.getItem("theme-accent");
        if (savedColor) setAccentColor(savedColor);
        const savedKey = localStorage.getItem("dev-api-key");
        if (savedKey) setApiKey(savedKey);

        // Get System Info
        setSystemInfo({
            browser: navigator.userAgent.split(")")[0].split(";")[1]?.trim() || "Unknown",
            platform: navigator.platform,
            res: `${window.screen.width}x${window.screen.height}`
        });

        calculateStorage();
    }, []);

    // --- LOGIC CALCULATE STORAGE (Real-time) ---
    const calculateStorage = () => {
        let total = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += (localStorage[key].length + key.length) * 2; // approx bytes
            }
        }
        const usedKB = (total / 1024).toFixed(2);
        const percent = Math.min((total / (5 * 1024 * 1024)) * 100, 100); // Max 5MB standard
        setStorageStats({ used: Number(usedKB), percent });
    };

    // --- LOGIC SIMPAN PROFIL ---
    const handleSaveProfile = () => {
        localStorage.setItem("admin-name", username);
        localStorage.setItem("theme-accent", accentColor);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        setTimeout(() => window.location.reload(), 500); // Force update sidebar
    };

    // --- LOGIC API KEY ---
    const generateApiKey = () => {
        const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setApiKey(newKey);
        localStorage.setItem("dev-api-key", newKey);
    };

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        setIsKeyCopied(true);
        setTimeout(() => setIsKeyCopied(false), 2000);
    };

    // --- LOGIC EXPORT/IMPORT/RESET (Sama seperti sebelumnya) ---
    const handleExport = () => {
        const dataToBackup = {
            guestbook: localStorage.getItem("portfolio-guestbook"),
            notes: localStorage.getItem("dashboard-note"),
            snippets: localStorage.getItem("portfolio-snippets"),
            adminName: localStorage.getItem("admin-name"),
            timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(dataToBackup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (json.guestbook) localStorage.setItem("portfolio-guestbook", json.guestbook);
                if (json.notes) localStorage.setItem("dashboard-note", json.notes);
                if (json.snippets) localStorage.setItem("portfolio-snippets", json.snippets);
                if (json.adminName) localStorage.setItem("admin-name", json.adminName);
                alert("Data berhasil di-restore! Halaman akan dimuat ulang.");
                window.location.reload();
            } catch { alert("File backup rusak."); }
        };
        reader.readAsText(file);
    };

    const handleResetData = () => {
        if (confirm("⚠️ BAHAYA: Hapus SEMUA data lokal?")) {
            localStorage.clear();
            alert("Reset berhasil.");
            window.location.reload();
        }
    };

    // Data Warna
    const colors = [
        { name: "Teal", bg: "bg-teal-500" },
        { name: "Blue", bg: "bg-blue-500" },
        { name: "Violet", bg: "bg-violet-500" },
        { name: "Orange", bg: "bg-orange-500" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="mb-10 border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-slate-600" /> Settings
                </h1>
                <p className="text-slate-500 mt-2">
                    Konfigurasi profil, preferensi developer, dan manajemen data.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* KOLOM KIRI (Main Settings) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. PROFILE SETTINGS */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User size={20} className="text-teal-600" /> General Profile
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">Display Name</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" title="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">Language</label>
                                <div className="relative">
                                    <select
                                        value={language}
                                        title="select"
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white"
                                    >
                                        <option>English (US)</option>
                                        <option>Bahasa Indonesia</option>
                                        <option>Javanese (Ngoko)</option>
                                    </select>
                                    <Globe size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-600 mb-2">Accent Color</label>
                            <div className="flex gap-3">
                                {colors.map((c) => (
                                    <button key={c.name} onClick={() => setAccentColor(c.name)} className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center transition-transform hover:scale-110 ${accentColor === c.name ? "ring-2 ring-offset-2 ring-slate-400" : ""}`}>
                                        {accentColor === c.name && <Check size={16} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleSaveProfile} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center gap-2">
                                {isSaved ? <Check size={18} /> : <Save size={18} />} {isSaved ? "Saved!" : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    {/* 2. DATA MANAGEMENT */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <RefreshCw size={20} className="text-blue-600" /> Data Management
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <button onClick={handleExport} className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                <Download size={18} /> Backup (.json)
                            </button>
                            <button onClick={handleImportClick} className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                <Upload size={18} /> Restore
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" title="input" />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-600 flex items-center gap-2"><Database size={16} /> Local Storage Usage</span>
                                <span className="text-xs font-mono text-slate-500">{storageStats.used} KB / 5 MB</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${storageStats.percent}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DEVELOPER API KEY (SIMULASI) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Key size={20} className="text-yellow-600" /> Developer Settings
                        </h2>
                        <p className="text-sm text-slate-500 mb-4">Generate Personal Access Token untuk integrasi API (Simulasi).</p>

                        {apiKey ? (
                            <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg border border-slate-200">
                                <code className="flex-1 font-mono text-sm text-slate-700 break-all">
                                    {showKey ? apiKey : "sk_live_•••••••••••••••••••••"}
                                </code>
                                <button onClick={() => setShowKey(!showKey)} className="p-2 text-slate-500 hover:text-slate-800">
                                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <button onClick={copyApiKey} className="p-2 text-slate-500 hover:text-teal-600">
                                    {isKeyCopied ? <Check size={18} className="text-teal-600" /> : <Copy size={18} />}
                                </button>
                            </div>
                        ) : (
                            <button onClick={generateApiKey} className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-900 transition-all">
                                Generate New Token
                            </button>
                        )}
                        {apiKey && (
                            <button onClick={() => { setApiKey(""); localStorage.removeItem("dev-api-key") }} className="mt-3 text-xs text-red-500 hover:underline">
                                Revoke Token
                            </button>
                        )}
                    </div>

                </div>

                {/* KOLOM KANAN (Info & Shortcuts) */}
                <div className="lg:col-span-1 space-y-8">

                    {/* SYSTEM INFO */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Monitor size={18} className="text-purple-600" /> System Info
                        </h2>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Platform</span>
                                <span className="font-mono font-bold text-slate-700">{systemInfo.platform}</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Browser</span>
                                <span className="font-mono font-bold text-slate-700 truncate max-w-[150px]">{systemInfo.browser}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Resolution</span>
                                <span className="font-mono font-bold text-slate-700">{systemInfo.res}</span>
                            </li>
                        </ul>
                    </div>

                    {/* SHORTCUTS CHEATSHEET */}
                    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Keyboard size={18} className="text-teal-400" /> Shortcuts
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Search Snippets</span>
                                <kbd className="bg-white/20 px-2 py-1 rounded font-mono text-xs">Ctrl + K</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Save Changes</span>
                                <kbd className="bg-white/20 px-2 py-1 rounded font-mono text-xs">Ctrl + S</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Toggle Menu</span>
                                <kbd className="bg-white/20 px-2 py-1 rounded font-mono text-xs">Ctrl + B</kbd>
                            </div>
                        </div>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                        <h2 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                            <AlertTriangle size={18} /> Danger Zone
                        </h2>
                        <p className="text-red-600/80 text-xs mb-4">
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <button
                            onClick={handleResetData}
                            className="w-full px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                        >
                            <Trash2 size={16} /> Reset All Data
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}