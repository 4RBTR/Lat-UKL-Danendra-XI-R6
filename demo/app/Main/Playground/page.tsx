/* eslint-disable react-hooks/unsupported-syntax */
"use client";

import { useState, useEffect } from "react";
import {
    Palette,
    ListTodo,
    Timer,
    Calculator,
    CloudSun,
    Copy,
    Check,
    Plus,
    Trash2,
    Play,
    Pause,
    RotateCcw,
    CloudRain,
    Sun,
    Wind
} from "lucide-react";

export default function PlaygroundPage() {
    const [activeTool, setActiveTool] = useState<"color" | "todo" | "timer" | "calc" | "weather">("color");

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Frontend Playground 🧪
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Kumpulan mini-tools interaktif untuk mendemonstrasikan logika React, State Management, dan UI Interaktif tanpa Backend.
                </p>
            </div>

            {/* TABS NAVIGASI */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {[
                    { id: "color", icon: Palette, label: "Color Gen", color: "teal" },
                    { id: "todo", icon: ListTodo, label: "Mini Todo", color: "blue" },
                    { id: "timer", icon: Timer, label: "Stopwatch", color: "orange" },
                    { id: "calc", icon: Calculator, label: "Calculator", color: "purple" },
                    { id: "weather", icon: CloudSun, label: "Weather UI", color: "sky" },
                ].map((tool) => (
                    <button
                        key={tool.id}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={() => setActiveTool(tool.id as any)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${activeTool === tool.id
                                ? `bg-${tool.color}-600 text-white shadow-lg ring-2 ring-${tool.color}-200`
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            }`}
                        // Note: Tailwind safelist mungkin diperlukan untuk dynamic color classes, 
                        // tapi untuk simplicitas kita pakai style manual atau class statis di bawah jika perlu.
                        style={activeTool === tool.id ? { backgroundColor: tool.color === 'sky' ? '#0ea5e9' : tool.color === 'orange' ? '#f97316' : tool.color === 'purple' ? '#9333ea' : tool.color === 'blue' ? '#2563eb' : '#0d9488' } : {}}
                    >
                        <tool.icon size={18} /> {tool.label}
                    </button>
                ))}
            </div>

            {/* KONTEN TOOLS */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 min-h-[450px] border border-slate-100 relative overflow-hidden flex flex-col items-center justify-center">

                {activeTool === "color" && <ColorGenerator />}
                {activeTool === "todo" && <MiniTodo />}
                {activeTool === "timer" && <Stopwatch />}
                {activeTool === "calc" && <SimpleCalculator />}
                {activeTool === "weather" && <WeatherWidget />}

            </div>
        </div>
    );
}

// --- 1. COLOR GENERATOR ---
function ColorGenerator() {
    const [color, setColor] = useState("#0d9488");
    const [copied, setCopied] = useState(false);

    const generateColor = () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setColor(randomColor);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-fadeIn w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-800">Random Color Generator</h2>
            <div
                className="w-full h-64 rounded-3xl shadow-inner flex items-center justify-center transition-colors duration-500 border-4 border-white ring-1 ring-slate-200"
                style={{ backgroundColor: color }}
            >
                <span className="bg-black/20 text-white px-6 py-3 rounded-full font-mono font-bold text-xl backdrop-blur-sm shadow-sm">
                    {color.toUpperCase()}
                </span>
            </div>
            <div className="flex gap-4 w-full">
                <button onClick={generateColor} className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                    Generate New
                </button>
                <button onClick={copyToClipboard} className="flex-1 py-3 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    {copied ? "Copied!" : "Copy Hex"}
                </button>
            </div>
        </div>
    );
}

// --- 2. MINI TODO ---
function MiniTodo() {
    const [tasks, setTasks] = useState<{ id: number, text: string, done: boolean }[]>([
        { id: 1, text: "Belajar Next.js", done: true },
        { id: 2, text: "Buat Portfolio Keren", done: false },
    ]);
    const [input, setInput] = useState("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput("");
    };

    return (
        <div className="w-full max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Simple To-Do List</h2>
            <form onSubmit={addTask} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tambah tugas baru..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"title=".">
                    <Plus />
                </button>
            </form>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-all group">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-slate-300 bg-white"}`}>
                                {task.done && <Check size={14} className="text-white" />}
                            </div>
                            <span className={`text-slate-700 font-medium transition-all ${task.done ? "line-through text-slate-400" : ""}`}>
                                {task.text}
                            </span>
                        </div>
                        <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"title="react">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4">Tidak ada tugas. Santai dulu! 😎</p>}
            </div>
        </div>
    );
}

// --- 3. STOPWATCH ---
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => setTime(t => t + 10), 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (ms: number) => {
        const mins = Math.floor((ms / 60000) % 60).toString().padStart(2, "0");
        const secs = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
        const mils = Math.floor((ms / 10) % 100).toString().padStart(2, "0");
        return `${mins}:${secs}:${mils}`;
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-fadeIn w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-slate-800">React Stopwatch</h2>
            <div className="w-64 h-64 rounded-full border-8 border-orange-100 flex items-center justify-center bg-white shadow-2xl relative">
                <div className="text-6xl font-mono font-bold text-slate-700 tracking-tighter z-10">
                    {formatTime(time)}
                </div>
                {isRunning && <div className="absolute inset-0 rounded-full border-4 border-orange-400 border-t-transparent animate-spin"></div>}
            </div>
            <div className="flex gap-4 w-full justify-center">
                <button onClick={() => setIsRunning(!isRunning)} className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95 w-40 justify-center ${isRunning ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-teal-600 text-white hover:bg-teal-700"}`}>
                    {isRunning ? <><Pause fill="currentColor" /> Pause</> : <><Play fill="currentColor" /> Start</>}
                </button>
                <button onClick={() => { setIsRunning(false); setTime(0); }} className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-md hover:scale-105 active:scale-95" title="react">
                    <RotateCcw />
                </button>
            </div>
        </div>
    );
}

// --- 4. CALCULATOR (BARU) ---
function SimpleCalculator() {
    const [display, setDisplay] = useState("0");

    const handlePress = (val: string) => {
        if (val === "C") setDisplay("0");
        else if (val === "=") {
            try {
                setDisplay(eval(display).toString()); // Note: eval is used for simplicity in playground
            } catch {
                setDisplay("Error");
            }
        } else {
            setDisplay(display === "0" ? val : display + val);
        }
    };

    const btns = ["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

    return (
        <div className="w-full max-w-xs animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Mini Calculator</h2>
            <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl">
                <div className="bg-slate-800 text-right text-white text-3xl font-mono p-4 rounded-xl mb-4 overflow-x-auto">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {btns.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handlePress(btn)}
                            className={`p-4 rounded-xl font-bold text-xl transition-all active:scale-95 ${btn === "=" ? "col-span-2 bg-purple-600 text-white hover:bg-purple-500" :
                                    btn === "C" ? "bg-red-500 text-white hover:bg-red-400" :
                                        ["/", "*", "-", "+"].includes(btn) ? "bg-slate-700 text-purple-300 hover:bg-slate-600" :
                                            "bg-slate-800 text-white hover:bg-slate-700"
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- 5. WEATHER WIDGET (BARU - SIMULASI) ---
function WeatherWidget() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [city, setCity] = useState("Malang");

    // Data Dummy Simulasi
    const weatherData = {
        temp: 24,
        condition: "Cloudy",
        humidity: 65,
        wind: 12
    };

    return (
        <div className="w-full max-w-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Weather UI (Demo)</h2>
            <div className="bg-linear-to-br from-sky-400 to-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top--20px right-20px w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-3xl font-bold">{city}</h3>
                        <p className="text-sky-100">Today, 12 Nov</p>
                    </div>
                    <CloudSun size={48} className="text-yellow-300" />
                </div>

                <div className="text-center mb-8">
                    <span className="text-8xl font-bold">{weatherData.temp}°</span>
                    <p className="text-xl font-medium mt-2">{weatherData.condition}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <Wind size={20} className="mb-1 text-sky-200" />
                        <span className="font-bold">{weatherData.wind} km/h</span>
                        <span className="text-xs text-sky-100">Wind</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-white/20">
                        <CloudRain size={20} className="mb-1 text-sky-200" />
                        <span className="font-bold">{weatherData.humidity}%</span>
                        <span className="text-xs text-sky-100">Hum</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Sun size={20} className="mb-1 text-sky-200" />
                        <span className="font-bold">6h</span>
                        <span className="text-xs text-sky-100">Sun</span>
                    </div>
                </div>
            </div>
            <p className="text-center text-slate-400 text-xs mt-4">*Data simulasi (dummy data)</p>
        </div>
    );
}