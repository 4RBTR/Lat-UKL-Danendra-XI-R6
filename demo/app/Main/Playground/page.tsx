/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/unsupported-syntax */
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
    Wind,
    Droplet,
    Clock,
    Search
} from "lucide-react";



export default function PlaygroundPage() {
    const [activeTool, setActiveTool] = useState<"color" | "todo" | "timer" | "calc" | "weather">("color");

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
                    Frontend Playground 🧪 (SIMPLE MODE)
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Kumpulan mini-tools interaktif dengan Local Storage dan State Management. Widget Cuaca menggunakan data simulasi.
                </p>
            </div>

            {/* TABS NAVIGASI */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {[
                    { id: "color", icon: Palette, label: "Color Gen (Pro)", color: "teal" },
                    { id: "todo", icon: ListTodo, label: "Mini Todo (LS)", color: "blue" },
                    { id: "timer", icon: Timer, label: "Stopwatch (Lap)", color: "orange" },
                    { id: "calc", icon: Calculator, label: "Calculator", color: "purple" },
                    { id: "weather", icon: CloudSun, label: "Weather UI (Dummy)", color: "sky" },
                ].map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id as any)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${activeTool === tool.id
                            ? `bg-${tool.color}-600 text-white shadow-lg ring-2 ring-${tool.color}-200`
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            }`}
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

// Helper: Konversi HSL ke Hex
function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Helper: Konversi Hex ke HSL
function hexToHsl(hex: string): [number, number, number] {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// --- 1. COLOR GENERATOR (ADVANCED) ---
function ColorGenerator() {
    const [color, setColor] = useState("#0d9488");
    const [copied, setCopied] = useState(false);
    const [format, setFormat] = useState<"HEX" | "RGB" | "HSL">("HEX");

    const generateColor = (initialColor?: string) => {
        const randomColor = initialColor || ("#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        setColor(randomColor);
        setCopied(false);
    };

    const getFormattedColor = useMemo(() => {
        // Parse warna untuk mendapatkan RGB dan HSL
        const [h, s, l] = hexToHsl(color);
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);

        switch (format) {
            case "RGB":
                return `rgb(${r}, ${g}, ${b})`;
            case "HSL":
                return `hsl(${h}, ${s}%, ${l}%)`;
            case "HEX":
            default:
                return color.toUpperCase();
        }
    }, [color, format]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getFormattedColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Hitung Analogous Colors (berjarak 30 derajat pada roda warna)
    const analogousColors = useMemo(() => {
        if (!color) return [];
        try {
            const [h, s, l] = hexToHsl(color);
            const h1 = (h + 30) % 360;
            const h2 = (h - 30 + 360) % 360;
            return [hslToHex(h1, s, l), hslToHex(h2, s, l)];
        } catch {
            return [];
        }
    }, [color]);

    return (
        <div className="flex flex-col items-center gap-8 animate-fadeIn w-full max-w-lg">
            <h2 className="text-2xl font-bold text-slate-800">Random Color Generator (Advanced)</h2>
            <div className="flex w-full justify-center gap-4">
                <button
                    onClick={() => setFormat("HEX")}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${format === "HEX" ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >HEX</button>
                <button
                    onClick={() => setFormat("RGB")}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${format === "RGB" ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >RGB</button>
                <button
                    onClick={() => setFormat("HSL")}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${format === "HSL" ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >HSL</button>
            </div>

            <div
                className="w-full h-64 rounded-3xl shadow-inner flex flex-col items-center justify-center transition-colors duration-500 border-4 border-white ring-1 ring-slate-200"
                style={{ backgroundColor: color }}
            >
                <span className="bg-black/20 text-white px-6 py-3 rounded-full font-mono font-bold text-xl backdrop-blur-sm shadow-sm select-text">
                    {getFormattedColor}
                </span>
            </div>

            {/* Analogous Pallete Display */}
            <div className="flex gap-2 justify-center">
                <div
                    className="w-10 h-10 rounded-lg cursor-pointer transition-transform hover:scale-110 shadow-md"
                    style={{ backgroundColor: analogousColors[0] }}
                    onClick={() => generateColor(analogousColors[0])}
                    title="Analogous 1"
                ></div>
                <div
                    className="w-10 h-10 rounded-lg border-2 border-dashed border-teal-300 shadow-lg"
                    style={{ backgroundColor: color }}
                    title="Base Color"
                ></div>
                <div
                    className="w-10 h-10 rounded-lg cursor-pointer transition-transform hover:scale-110 shadow-md"
                    style={{ backgroundColor: analogousColors[1] }}
                    onClick={() => generateColor(analogousColors[1])}
                    title="Analogous 2"
                ></div>
            </div>

            <div className="flex gap-4 w-full">
                <button
                    onClick={() => generateColor()}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <Palette size={18} /> Generate New
                </button>
                <button
                    onClick={copyToClipboard}
                    className="flex-1 py-3 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    {copied ? "Copied!" : `Copy ${format}`}
                </button>
            </div>
        </div>
    );
}

// --- 2. MINI TODO (with localStorage) ---
type Task = { id: number, text: string, done: boolean };

const getInitialTasks = (): Task[] => {
    if (typeof window !== 'undefined') {
        const storedTasks = localStorage.getItem('mini_todo_tasks');
        return storedTasks ? JSON.parse(storedTasks) : [
            { id: 1, text: "Belajar React/Next.js", done: false },
            { id: 2, text: "Tambahkan fitur baru", done: true },
        ];
    }
    return [];
};

function MiniTodo() {
    const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
    const [input, setInput] = useState("");

    // Effect untuk menyimpan tasks ke Local Storage setiap kali tasks berubah
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('mini_todo_tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
        setInput("");
    };

    const toggleTask = useCallback((id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }, [tasks]);

    const deleteTask = useCallback((id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    }, [tasks]);

    return (
        <div className="w-full max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Simple To-Do List (Local Storage)</h2>
            <form onSubmit={addTask} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tambah tugas baru..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md" title="Tambah Tugas">
                    <Plus />
                </button>
            </form>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-all group">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-slate-300 bg-white"}`}>
                                {task.done && <Check size={14} className="text-white" />}
                            </div>
                            <span className={`text-slate-700 font-medium transition-all ${task.done ? "line-through text-slate-400" : ""}`}>
                                {task.text}
                            </span>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="Hapus Tugas">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4">Tidak ada tugas. Santai dulu! 😎</p>}
            </div>
        </div>
    );
}

// --- 3. STOPWATCH (with Lap Timer) ---
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

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

    const handleLap = () => {
        if (!isRunning) return;
        setLaps(prevLaps => [...prevLaps, time]);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-fadeIn w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-slate-800">React Stopwatch (Lap Timer)</h2>
            <div className="w-64 h-64 rounded-full border-8 border-orange-100 flex items-center justify-center bg-white shadow-2xl relative">
                <div className="text-6xl font-mono font-bold text-slate-700 tracking-tighter z-10">
                    {formatTime(time)}
                </div>
                {isRunning && <div className="absolute inset-0 rounded-full border-4 border-orange-400 border-t-transparent animate-spin-slow"></div>}
            </div>

            <div className="flex gap-4 w-full justify-center">
                <button
                    onClick={handleReset}
                    disabled={isRunning && time > 0}
                    className={`p-3 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 ${time === 0 ? 'bg-slate-200 text-slate-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    title="Reset"
                >
                    <RotateCcw />
                </button>

                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95 w-40 justify-center ${isRunning ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                    title={isRunning ? "Pause" : "Start"}
                >
                    {isRunning ? <><Pause fill="currentColor" /> Pause</> : <><Play fill="currentColor" /> Start</>}
                </button>

                <button
                    onClick={handleLap}
                    disabled={!isRunning && time === 0}
                    className={`p-3 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 ${isRunning ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-slate-200 text-slate-400'}`}
                    title="Lap"
                >
                    <Clock />
                </button>
            </div>

            {/* Lap Times Display */}
            {laps.length > 0 && (
                <div className="w-full mt-4 max-h-40 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Lap Times</h3>
                    <ul className="space-y-1">
                        {laps.map((lapTime, index) => (
                            <li key={index} className="flex justify-between font-mono text-sm text-slate-600 bg-white p-2 rounded">
                                <span className="font-bold text-orange-600">Lap {laps.length - index}:</span> {/* Tampilkan dari yang terbaru */}
                                <span>{formatTime(lapTime)}</span>
                            </li>
                        )).reverse()}
                    </ul>
                </div>
            )}
        </div>
    );
}

// --- 4. CALCULATOR (COMPLETE) ---
function SimpleCalculator() {
    const [display, setDisplay] = useState("0");

    const handlePress = (val: string) => {
        if (val === "C") setDisplay("0");
        else if (val === "DEL") {
            setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
        }
        else if (val === "=") {
            try {
                // Hati-hati dengan eval, hanya untuk demonstrasi playground
                let result = eval(display.replace(/[^-()\d/*+.]/g, '')).toString();
                setDisplay(result);
            } catch {
                setDisplay("Error");
            }
        } else {
            const lastChar = display.slice(-1);
            const isOperator = ["/", "*", "-", "+"].includes(val);
            const lastIsOperator = ["/", "*", "-", "+"].includes(lastChar);

            if (display === "0" && val !== ".") {
                setDisplay(val);
            } else if (lastIsOperator && isOperator) {
                setDisplay(display.slice(0, -1) + val);
            } else {
                setDisplay(display + val);
            }
        }
    };

    const btns = [
        "C", "DEL", "(", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "="
    ];

    return (
        <div className="w-full max-w-xs animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Mini Calculator</h2>
            <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl">
                <div className="bg-slate-800 text-right text-white text-3xl font-mono p-4 rounded-xl mb-4 overflow-x-auto h-16 flex items-center justify-end">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {btns.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handlePress(btn)}
                            className={`p-4 rounded-xl font-bold text-xl transition-all active:scale-95 ${btn === "=" ? "col-span-2 bg-purple-600 text-white hover:bg-purple-500" :
                                btn === "C" ? "bg-red-500 text-white hover:bg-red-400" :
                                    btn === "DEL" ? "bg-orange-500 text-white hover:bg-orange-400" :
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

// --- 5. WEATHER WIDGET (DUMMY DATA MODE - FIXED) ---

// Helper untuk memilih ikon berdasarkan kondisi
const getWeatherIcon = (condition: string) => {
    switch (condition) {
        case 'Clear':
            return <Sun size={48} className="text-yellow-300" />;
        case 'Rain':
            return <CloudRain size={48} className="text-sky-300" />;
        case 'Clouds':
        default:
            return <CloudSun size={48} className="text-slate-300" />;
    }
};

function WeatherWidget() {
    const [cityInput, setCityInput] = useState("Malang");
    const [weatherData, setWeatherData] = useState<any>(null);
    const [currentCity, setCurrentCity] = useState("Malang");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasInitialized = useRef(false);

    // Data Dummy Cuaca (randomized sedikit agar terasa dinamis)
    const generateDummyData = useCallback(() => { // Hapus 'city: string' jika tidak dipakai di sini
        const conditions = ['Clouds', 'Clear', 'Rain'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        return {
            temp: 24 + Math.floor(Math.random() * 5), // 24-28
            condition: condition,
            description: condition === 'Clouds' ? 'berawan tebal' : condition === 'Rain' ? 'hujan ringan' : 'langit cerah',
            humidity: 65 + Math.floor(Math.random() * 20), // 65-85
            windSpeed: 8 + Math.floor(Math.random() * 10), // 8-17 km/h
            minTemp: 22 + Math.floor(Math.random() * 3), // 22-24
        };
    }, []); // Dependensi kosong karena tidak ada variabel luar yang dipakai

    const fetchWeather = useCallback((city: string) => {
        setLoading(true);
        setError(null);

        // Simulasikan delay jaringan (misalnya 500ms)
        setTimeout(() => {
            const data = generateDummyData(); // Panggil tanpa argumen jika generateDummyData tidak butuh
            setWeatherData(data);
            setCurrentCity(city);
            setLoading(false);
        }, 500);

    }, [generateDummyData]); // Dependensi: [generateDummyData]
    // Panggil fetchWeather saat komponen dimuat (default: Malang)
    // FIX: Gunakan ref untuk memastikan hanya fetch sekali pada mount
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            fetchWeather("Malang");
        }
    }, [fetchWeather]); // <--- HANYA [fetchWeather] untuk memastikan konsistensi dan Fast Refresh tidak bingung

    // Handler untuk tombol cari
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (cityInput.trim()) {
            // Ini akan memanggil fetchWeather, yang kemudian akan memanggil setCurrentCity,
            // tetapi fetchWeather tidak akan dipanggil dua kali oleh useEffect di atas
            // karena currentCity bukan lagi dependensi di sana.
            fetchWeather(cityInput.trim());
        }
    };

    return (
        <div className="w-full max-w-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Weather UI (Data Simulasi)</h2>

            {/* Input Kota */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Cari Kota (Contoh: Jakarta)"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
                <button type="submit" disabled={loading} className="bg-sky-600 text-white p-3 rounded-xl hover:bg-sky-700 transition-colors shadow-md disabled:bg-sky-400" title="Cari Cuaca">
                    <Search />
                </button>
            </form>

            {/* Status dan Hasil */}
            {loading && <p className="text-center text-sky-600 py-8">Mengambil data cuaca simulasi...</p>}
            {error && <p className="text-center text-red-500 bg-red-50 p-4 rounded-xl border border-red-200">⚠️ {error}</p>}

            {weatherData && !loading && (
                <div className="bg-linear-to-br from-sky-400 to-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    {/* Visual effect */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-3xl font-bold capitalize">{currentCity}</h3>
                            <p className="text-sky-100">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                        </div>
                        {getWeatherIcon(weatherData.condition)}
                    </div>

                    <div className="text-center mb-8">
                        <span className="text-8xl font-bold">{weatherData.temp}°</span>
                        <p className="text-xl font-medium mt-2 capitalize">{weatherData.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                        {/* Angin */}
                        <div className="flex flex-col items-center">
                            <Wind size={20} className="mb-1 text-sky-200" />
                            <span className="font-bold">{weatherData.windSpeed} km/h</span>
                            <span className="text-xs text-sky-100">Angin</span>
                        </div>
                        {/* Kelembaban */}
                        <div className="flex flex-col items-center border-x border-white/20">
                            <Droplet size={20} className="mb-1 text-sky-200" />
                            <span className="font-bold">{weatherData.humidity}%</span>
                            <span className="text-xs text-sky-100">Kelembaban</span>
                        </div>
                        {/* Suhu Minimum */}
                        <div className="flex flex-col items-center">
                            <Sun size={20} className="mb-1 text-sky-200" />
                            <span className="font-bold">{weatherData.minTemp}°C</span>
                            <span className="text-xs text-sky-100">Min Temp</span>
                        </div>
                    </div>
                </div>
            )}
            <p className="text-center text-slate-400 text-xs mt-4">*Data di atas adalah data simulasi acak, bukan real-time.</p>
        </div>
    );
}