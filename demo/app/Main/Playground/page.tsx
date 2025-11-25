"use client";

import { useState, useEffect } from "react";
import {
    Palette,
    ListTodo,
    Timer,
    Copy,
    Check,
    Plus,
    Trash2,
    Play,
    Pause,
    RotateCcw
} from "lucide-react";

export default function PlaygroundPage() {
    const [activeTool, setActiveTool] = useState<"color" | "todo" | "timer">("color");

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Frontend Playground 🧪
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Kumpulan mini-tools interaktif untuk mendemonstrasikan logika React dan manipulasi State tanpa Backend.
                </p>
            </div>

            {/* TABS NAVIGASI */}
            <div className="flex justify-center gap-4 mb-10 flex-wrap">
                <button
                    onClick={() => setActiveTool("color")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTool === "color" ? "bg-teal-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <Palette size={20} /> Color Gen
                </button>
                <button
                    onClick={() => setActiveTool("todo")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTool === "todo" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <ListTodo size={20} /> Mini Todo
                </button>
                <button
                    onClick={() => setActiveTool("timer")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTool === "timer" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <Timer size={20} /> Stopwatch
                </button>
            </div>

            {/* KONTEN TOOLS */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 min-h-[400px] border border-slate-100 relative overflow-hidden">

                {/* --- TOOL 1: COLOR GENERATOR --- */}
                {activeTool === "color" && <ColorGenerator />}

                {/* --- TOOL 2: TODO LIST --- */}
                {activeTool === "todo" && <MiniTodo />}

                {/* --- TOOL 3: STOPWATCH --- */}
                {activeTool === "timer" && <Stopwatch />}

            </div>
        </div>
    );
}

// --- KOMPONEN 1: COLOR GENERATOR ---
function ColorGenerator() {
    const [color, setColor] = useState("#0d9488");
    const [copied, setCopied] = useState(false);

    const generateColor = () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        setColor(randomColor);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800">Random Color Generator</h2>

            <div
                className="w-64 h-64 rounded-3xl shadow-inner flex items-center justify-center transition-colors duration-500 border-4 border-white ring-4 ring-slate-100"
                style={{ backgroundColor: color }}
            >
                <span className="bg-black/20 text-white px-4 py-2 rounded-full font-mono font-bold backdrop-blur-sm">
                    {color}
                </span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={generateColor}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition-all active:scale-95"
                >
                    Generate New
                </button>
                <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-slate-100 text-slate-900 border border-slate-300 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2 active:scale-95"
                >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    {copied ? "Copied!" : "Copy Hex"}
                </button>
            </div>
        </div>
    );
}

// --- KOMPONEN 2: MINI TODO ---
function MiniTodo() {
    const [tasks, setTasks] = useState<{ id: number, text: string, done: boolean }[]>([
        { id: 1, text: "Belajar Next.js", done: true },
        { id: 2, text: "Bikin Portfolio Keren", done: false },
    ]);
    const [input, setInput] = useState("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput("");
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="max-w-md mx-auto animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Simple To-Do List</h2>

            <form onSubmit={addTask} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tambah tugas baru..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors" title="button">
                    <Plus />
                </button>
            </form>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-slate-400 bg-white"}`}>
                                {task.done && <Check size={14} className="text-white" />}
                            </div>
                            <span className={`text-slate-700 font-medium transition-all ${task.done ? "line-through text-slate-400" : ""}`}>
                                {task.text}
                            </span>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors" title="button">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 text-sm mt-4">Tidak ada tugas. Santai dulu! 😎</p>}
            </div>
        </div>
    );
}

// --- KOMPONEN 3: STOPWATCH ---
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor((ms / 60000) % 60).toString().padStart(2, "0");
        const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
        const milliseconds = Math.floor((ms / 10) % 100).toString().padStart(2, "0");
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 animate-fadeIn py-10">
            <h2 className="text-2xl font-bold text-slate-800">React Stopwatch</h2>

            <div className="text-7xl md:text-8xl font-mono font-bold text-slate-700 tracking-wider">
                {formatTime(time)}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95 ${isRunning
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                >
                    {isRunning ? <><Pause fill="currentColor" /> Pause</> : <><Play fill="currentColor" /> Start</>}
                </button>

                <button
                    onClick={() => { setIsRunning(false); setTime(0); }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-md hover:scale-105 active:scale-95"
                >
                    <RotateCcw /> Reset
                </button>
            </div>
        </div>
    );
}