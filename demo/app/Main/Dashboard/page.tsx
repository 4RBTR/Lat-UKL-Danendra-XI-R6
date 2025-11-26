/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
// Import data baru (tanpa PerformanceRating karena kita ubah)
import { performanceRatings, PerformanceRating, statsData } from '@/data/skillsData';
import {
    Activity, Code2, GitCommit, Coffee, Music,
    Cpu, Globe, Zap, Server, Play, Pause,
    SkipForward, SkipBack, Clock,
    Volume2, VolumeX, CheckSquare,
    TrendingUp,
    // Import semua ikon yang mungkin dibutuhkan oleh statsData
    LucideIcon // Menggunakan LucideIcon sebagai Type
} from "lucide-react";

// Map nama ikon dari string ke komponen Lucide-nya
const iconMap: { [key: string]: LucideIcon } = {
    GitCommit: GitCommit,
    Globe: Globe,
    Code2: Code2,
    // Tambahkan ikon lain jika kamu ingin menggunakan string di statsData
};

// --- KOMPONEN BARU: PERFORMANCE RATING CARD ---
const PerformanceCard = ({ ratings }: { ratings: PerformanceRating[] }) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-teal-600" /> Skill Performance
            </h2>
            <div className="space-y-6">
                {ratings.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-700">{item.skill}</span>
                            <span className={`text-sm font-bold ${item.textColorClass}`}>{item.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                // MENGGUNAKAN FULL STATIC CLASS NAMES DARI DATA
                                className={`h-2.5 rounded-full ${item.progressBarClass} transition-all duration-1000 ease-out`}
                                style={{ width: `${item.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 italic">
                *Penilaian ini adalah estimasi pribadi, menunjukkan progres belajar.
            </p>
        </div>
    );
};


export default function DashboardPage() {

    // --- 1. SMART GREETING ---
    const [greeting, setGreeting] = useState("Hello");
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
            const hour = now.getHours();
            if (hour < 12) setGreeting("Good Morning");
            else if (hour < 18) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // --- 2. REAL MUSIC PLAYER ---
    const playlist = [
        {
            title: "Study & Relax",
            artist: "Lofi Chill",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            coverColor: "bg-purple-500"
        },
        {
            title: "Coding Mode",
            artist: "Synthwave Mix",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            coverColor: "bg-teal-500"
        },
        {
            title: "Deep Focus",
            artist: "Ambient Noise",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            coverColor: "bg-orange-500"
        }
    ];

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Playback prevented/interrupted:", error);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const changeTrack = (direction: "next" | "prev") => {
        let newIndex = direction === "next"
            ? (currentTrack + 1) % playlist.length
            : (currentTrack - 1 + playlist.length) % playlist.length;

        setCurrentTrack(newIndex);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.pause();
            audioRef.current.load();

            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Auto-play interrupted:", error);
                    });
                }
            }
        }
    }, [currentTrack]);

    const fmtTime = (s: number) => {
        const min = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
    };

    // --- 3. CODING HEATMAP & STATS ---
    const heatmap = useMemo(() => {
        return Array.from({ length: 52 }, () => Math.floor(Math.random() * 5));
    }, []);


    const targets = [
        { id: 1, text: "Selesaikan Portfolio", done: false },
        { id: 2, text: "Push ke GitHub", done: true },
        { id: 3, text: "Pelajari React Server Component", done: false },
    ];
    const toggleTarget = (id: number) => {
        // Logika toggle
    };

    if (!time) return null;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER & JAM */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
                        {greeting}, Danendra! 👋
                    </h1>
                    <p className="text-slate-500">Welcome back to your workspace. (Shortcut: Ctrl+K)</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                    <Clock className="text-teal-600" size={20} />
                    <span className="font-mono font-bold text-xl text-slate-700">
                        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                </div>
            </div>

            {/* GRID UTAMA (3 KOLOM) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* KOLOM 1: PERFORMANCE RATING & TARGETS */}
                <div className="space-y-6">
                    {/* PASANG PERFORMANCE RATING */}
                    <PerformanceCard ratings={performanceRatings} />

                    {/* Weekly Targets */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><CheckSquare size={18} /> Quick Goals</h3>
                        <div className="space-y-3">
                            {targets.map((t) => (
                                <div key={t.id} onClick={() => toggleTarget(t.id)} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${t.done ? "bg-green-500 border-green-500" : "border-slate-500 group-hover:border-white"}`}>
                                        {t.done && <CheckSquare size={12} className="text-white" />}
                                    </div>
                                    <span className={`text-sm ${t.done ? "line-through text-slate-500" : "text-slate-200"}`}>{t.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* KOLOM 2 & 3 (SPAN 2): MUSIC PLAYER, STATS & HEATMAP */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Baris Atas: MUSIC PLAYER */}
                    <div className="relative bg-black rounded-[40px] p-8 text-white overflow-hidden shadow-2xl min-h-[350px] flex flex-col justify-between border border-slate-800">
                        {/* Background Blur Effect */}
                        <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 blur-[100px] transition-colors duration-1000 ${playlist[currentTrack].coverColor}`}></div>

                        {/* Header */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-white/60 mb-1">NOW PLAYING</p>
                                <h2 className="text-3xl font-bold">{playlist[currentTrack].title}</h2>
                                <p className="text-white/70 text-lg">{playlist[currentTrack].artist}</p>
                            </div>
                            <div className={`w-32 h-32 rounded-full shadow-2xl border-4 border-white/10 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''} ${playlist[currentTrack].coverColor}`}>
                                <Music size={40} className="text-white/80" />
                                <div className="absolute w-8 h-8 bg-black rounded-full"></div>
                            </div>
                        </div>

                        {/* Controls & Progress */}
                        <div className="relative z-10 space-y-6">

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono text-white/60">
                                    <span>{fmtTime(currentTime)}</span>
                                    <span>{fmtTime(duration)}</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 100}
                                    value={currentTime}
                                    title="track progress"
                                    onChange={(e) => {
                                        if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
                                    }}
                                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-teal-400"
                                />
                            </div>

                            {/* Main Buttons */}
                            <div className="flex items-center justify-between">
                                {/* Volume */}
                                <div className="flex items-center gap-2 group">
                                    <button onClick={() => setVolume(v => v === 0 ? 0.5 : 0)} title="mute/unmute">
                                        {volume === 0 ? <VolumeX size={20} className="text-white/60" /> : <Volume2 size={20} className="text-white/60" />}
                                    </button>
                                    <input
                                        type="range" min={0} max={1} step={0.1}
                                        title="volume slider"
                                        value={volume} onChange={(e) => {
                                            setVolume(Number(e.target.value));
                                            if (audioRef.current) audioRef.current.volume = Number(e.target.value);
                                        }}
                                        className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Play Controls */}
                                <div className="flex items-center gap-6">
                                    <button onClick={() => changeTrack("prev")} className="text-white/70 hover:text-white transition-colors" title="previous track">
                                        <SkipBack size={32} fill="currentColor" />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                                        title={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                    </button>
                                    <button onClick={() => changeTrack("next")} className="text-white/70 hover:text-white transition-colors" title="next track">
                                        <SkipForward size={32} fill="currentColor" />
                                    </button>
                                </div>

                                {/* Dummy Menu */}
                                <div className="w-6"></div>
                            </div>
                        </div>

                        {/* Hidden Audio Element */}
                        <audio
                            ref={audioRef}
                            src={playlist[currentTrack].src}
                            onTimeUpdate={onTimeUpdate}
                            onEnded={() => changeTrack("next")}
                        />
                    </div>

                    {/* Baris Bawah: STATS & HEATMAP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Sub-Kolom 1: Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 h-fit">
                            {statsData.map((stat, idx) => {
                                // Mengambil komponen ikon dari map
                                const IconComponent = iconMap[stat.icon];
                                return (
                                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-all">
                                        {/* MENGGUNAKAN FULL STATIC CLASS NAMES DARI DATA */}
                                        <div className={`p-2 rounded-xl ${stat.iconBgClass} mb-2`}>
                                            {IconComponent && <IconComponent size={20} />}
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-800">{stat.value}</h3>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Sub-Kolom 2: Heatmap */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Cpu size={18} className="text-teal-500" /> Activity Heatmap</h4>
                            <div className="flex flex-wrap gap-1">
                                {/* MENGGUNAKAN FULL STATIC CLASS NAMES DARI ARRAY */}
                                {heatmap.map((h, i) => (
                                    <div key={i} className={`w-3 h-3 rounded-sm transition-colors ${['bg-slate-100', 'bg-teal-200', 'bg-teal-400', 'bg-teal-600', 'bg-teal-800'][h]}`} title={`Activity Week ${i + 1}: Level ${h}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STYLE ANIMASI SPIN */}
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}