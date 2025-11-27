/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    Gamepad2, RefreshCw, Brain, Calculator, Grid3X3, Play, Keyboard, Zap, Monitor, Lightbulb, Check,
    ShoppingCart, User, Code, Grid, Smartphone, Palette, List, Type, TrendingUp, AlertTriangle, X,
    Bot, Image, Send, MessageSquare, CornerUpLeft // NEW IMPORTS FOR GEMINI
} from "lucide-react";

// ----------------------------------------------------------------------
// 🎮 FUNGSI UTAMA: ARCADE PAGE
// ----------------------------------------------------------------------

export default function ArcadePage() {
    // Default diubah ke Gemini AI Playground untuk demonstrasi
    const [activeGame, setActiveGame] = useState<"tictactoe" | "math" | "memory" | "typer" | "reaction" | "designerai" | "gemini">("gemini");

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex items-center justify-center gap-3">
                    <Gamepad2 className="w-10 h-10" /> Arcade Zone
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Arena bermain untuk melatih logika, memori, kecepatan mengetik, refleks, dan menguji simulasi AI.
                </p>
            </div>

            {/* GAME TABS (Scrollable di Mobile) */}
            <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                <button onClick={() => setActiveGame("gemini")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "gemini" ? "bg-sky-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Bot size={18} /> Gemini AI
                </button>
                <button onClick={() => setActiveGame("tictactoe")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "tictactoe" ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Grid3X3 size={18} /> Tic-Tac-Toe
                </button>
                <button onClick={() => setActiveGame("math")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "math" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Calculator size={18} /> Math Rush
                </button>
                <button onClick={() => setActiveGame("memory")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "memory" ? "bg-pink-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Brain size={18} /> Memory
                </button>
                <button onClick={() => setActiveGame("typer")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "typer" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Keyboard size={18} /> Speed Typer
                </button>
                <button onClick={() => setActiveGame("designerai")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "designerai" ? "bg-teal-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Lightbulb size={18} /> Designer AI
                </button>
                <button onClick={() => setActiveGame("reaction")} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeGame === "reaction" ? "bg-red-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    <Zap size={18} /> Reaction
                </button>
            </div>

            {/* GAME CONTAINER */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 min-h-[500px] border border-slate-100 relative flex flex-col items-center justify-center">
                {activeGame === "gemini" && <GeminiAIPage />}
                {activeGame === "tictactoe" && <TicTacToe />}
                {activeGame === "math" && <MathRush />}
                {activeGame === "memory" && <MemoryGame />}
                {activeGame === "typer" && <SpeedTyper />}
                {activeGame === "designerai" && <AiWebDesigner />}
                {activeGame === "reaction" && <ReactionTest />}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 🧠 KOMPONEN BARU: GEMINI AI PLAYGROUND (SIMULASI INTERGRASI)
// ----------------------------------------------------------------------

type AiMode = "vision" | "generate" | "chat";

function GeminiAIPage() {
    const [mode, setMode] = useState<AiMode>("vision");
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [chatHistory, setChatHistory] = useState<Array<{ user: string, ai: string }>>([]);

    const handleGeminiCall = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isLoading || input.trim() === "") return;

        setIsLoading(true);
        setResponse("");

        // Clear history only if mode changes
        if (mode !== "chat") {
            setChatHistory([]);
        }

        setTimeout(() => {
            let aiResponse = "";
            let newChatHistory = chatHistory;

            if (mode === "vision") {
                aiResponse = handleVisionSimulation(input);
            } else if (mode === "generate") {
                aiResponse = handleGenerateSimulation(input);
            } else if (mode === "chat") {
                aiResponse = handleChatSimulation(input);

                newChatHistory = [...chatHistory, { user: input, ai: aiResponse }];
                setChatHistory(newChatHistory);
            }

            setResponse(aiResponse);
            setInput("");
            setIsLoading(false);
        }, 2000);
    };

    const handleVisionSimulation = (text: string) => {
        if (text.toLowerCase().includes("laptop") || text.toLowerCase().includes("komputer")) {
            return "Analisis Visual (V): Gambar yang diunggah menunjukkan perangkat elektronik komputasi. Ini adalah Laptop Gaming berpendingin tinggi dengan keyboard mekanikal. Saran: Periksa suhu GPU saat menjalankan game berat.";
        }
        if (text.toLowerCase().includes("kucing") || text.toLowerCase().includes("hewan")) {
            return "Analisis Visual (V): Gambar ini menunjukkan seekor Kucing Domestik dengan bulu berwarna campuran. Gemini mendeteksi ekspresi 'ingin bermain'. Saran: Berikan makanan dan pelukan ekstra hari ini.";
        }
        return "Analisis Visual (V): Gambar tidak terdeteksi dalam database simulasi. Asumsi: Ini adalah gambar non-standar dengan resolusi tinggi. Perlu konteks tambahan.";
    };

    const handleGenerateSimulation = (text: string) => {
        const topic = text.length > 50 ? text.substring(0, 50) + "..." : text;
        return `
### 📝 Artikel Hasil Generasi Gemini
**Judul:** Pentingnya ${topic} dalam Kehidupan Modern

**Paragraf 1:** Di era digital yang serba cepat ini, peran dari '${topic.toUpperCase()}' telah menjadi fundamental. Para ahli meyakini bahwa adopsi teknologi ini akan membawa perubahan paradigma yang signifikan dalam industri dan kehidupan sehari-hari.

**Paragraf 2:** Gemini merekomendasikan: Mulailah dengan langkah kecil, fokus pada implementasi yang berkelanjutan. Analisis mendalam menunjukkan peningkatan efisiensi sebesar 35% pada perusahaan yang mengintegrasikan konsep ini sepenuhnya.
        `;
    };

    const handleChatSimulation = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes("siapa kamu")) {
            return "Saya adalah Gemini, model AI besar, dilatih oleh Google. Apa yang bisa saya bantu hari ini?";
        }
        if (lowerText.includes("terima kasih")) {
            return "Sama-sama! Selalu senang bisa membantu. Ada lagi yang ingin Anda diskusikan?";
        }
        if (lowerText.includes("desain web")) {
            return "Anda baru saja bermain dengan AI Web Designer. Itu adalah simulasi yang menarik! Apakah Anda ingin saya generatekan 3 ide tema desain web minimalis?";
        }
        return "Gemini (Simulasi) : Saya memproses pertanyaan Anda. Untuk konteks yang lebih baik, bisakah Anda memperjelas tujuan dari pertanyaan tersebut? (Simulasi Respon Cerdas)";
    };

    const renderHistory = () => {
        if (mode !== "chat") {
            return response ? (
                <div className="bg-green-50 p-4 rounded-xl text-left border border-green-300">
                    <h4 className="font-bold text-green-700 flex items-center gap-2 mb-2"><Bot size={20} /> Gemini Response:</h4>
                    <pre className="whitespace-pre-wrap font-sans text-slate-800">{response}</pre>
                </div>
            ) : null;
        }

        return (
            <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                {chatHistory.map((item, index) => (
                    <div key={index} className="space-y-3">
                        {/* User Message */}
                        <div className="flex justify-end">
                            <div className="bg-blue-100 p-3 rounded-xl max-w-xs text-right shadow-sm">
                                <p className="font-bold text-blue-800">Anda:</p>
                                <p className="text-sm">{item.user}</p>
                            </div>
                        </div>
                        {/* AI Response */}
                        <div className="flex justify-start">
                            <div className="bg-teal-50 p-3 rounded-xl max-w-sm text-left shadow-sm">
                                <p className="font-bold text-teal-800 flex items-center gap-1"><Bot size={14} /> Gemini:</p>
                                <p className="text-sm">{item.ai}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 p-3 rounded-xl max-w-sm text-left shadow-sm">
                            <p className="font-bold text-slate-500 flex items-center gap-1"><Bot size={14} /> Gemini:</p>
                            <div className="animate-pulse text-slate-500">...typing</div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="text-center w-full max-w-3xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-sky-600 mb-6 flex items-center justify-center gap-2">
                <Bot className="text-sky-600" /> **Gemini AI Playground (Simulasi)** </h2>
            <p className="text-slate-500 mb-6">Uji coba kemampuan Gemini dalam tiga mode berbeda. Ini adalah simulasi dari integrasi API.</p>

            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => { setMode("vision"); setResponse(""); setChatHistory([]); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${mode === "vision" ? "bg-purple-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                    <Image size={18} /> Vision (Analisis Gambar)
                </button>
                <button
                    onClick={() => { setMode("generate"); setResponse(""); setChatHistory([]); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${mode === "generate" ? "bg-orange-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                    <Type size={18} /> Generate (Teks Panjang)
                </button>
                <button
                    onClick={() => { setMode("chat"); setResponse(""); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${mode === "chat" ? "bg-green-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                    <MessageSquare size={18} /> Chat Cerdas
                </button>
            </div>

            {/* Input & Konten Area */}
            <form onSubmit={handleGeminiCall} className="w-full">
                <div className="mb-6 p-4 border-2 border-slate-200 rounded-xl bg-white shadow-lg">
                    <h3 className="text-left text-xl font-bold mb-4 text-slate-700 flex items-center gap-2">
                        {mode === "vision" ? <Image className="text-purple-500" /> : mode === "generate" ? <Type className="text-orange-500" /> : <MessageSquare className="text-green-500" />}
                        Input {mode === "vision" ? "Konteks Gambar (Misal: Laptop/Kucing)" : mode === "generate" ? "Topik Artikel" : "Pesan Chat"}
                    </h3>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={mode === "chat" ? 2 : 4}
                        className="w-full p-3 border-2 border-sky-300 rounded-lg focus:border-sky-600 outline-none resize-none text-base"
                        placeholder={mode === "vision" ? "Tulis konteks gambar yang Anda unggah (misal: 'Analisis gambar laptop gaming ini')." :
                            mode === "generate" ? "Tulis topik, misal: 'Pentingnya AI dalam pengembangan web'..." :
                                "Ketik pesan Anda..."}
                        disabled={isLoading}
                    />

                    {mode === "vision" && (
                        <div className="mt-3 flex items-center justify-between">
                            <input type="file" accept="image/*" className="text-sm" title="Unggah gambar" disabled={isLoading} />
                            <p className="text-xs text-slate-500">*(Simulasi: Gambar tidak benar-benar terunggah)*</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || input.trim() === ""}
                    className={`w-full px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isLoading ? 'bg-slate-400 text-white' : 'bg-sky-600 text-white hover:bg-sky-700'
                        }`}
                >
                    {isLoading ?
                        <> <div className="animate-spin h-5 w-5 border-2 border-t-2 border-t-white border-sky-300 rounded-full"></div> Sending to Gemini... </> :
                        <> <Send size={18} /> Kirim ke Gemini </>
                    }
                </button>
            </form>

            {/* Output/History Area */}
            {(response || chatHistory.length > 0) && (
                <div className="mt-8 p-4 bg-slate-50 rounded-xl shadow-inner border-t-4 border-sky-500">
                    <h3 className="text-left text-2xl font-bold mb-4 text-sky-700 flex items-center gap-2">
                        <CornerUpLeft size={24} /> {mode === "chat" ? "Riwayat Percakapan" : "Hasil Gemini"}
                    </h3>
                    {renderHistory()}
                </div>
            )}
        </div>
    );
}


// ----------------------------------------------------------------------
// 🖥️ KOMPONEN BARU: LIVE DESIGN PREVIEW (FINAL INTERAKTIF)
// ----------------------------------------------------------------------

function LiveDesignPreview({ context, onBack }: any) {
    const { theme, color, custom_title, target_cols, custom_detail, font } = context;

    // State Fungsionalitas Dark Mode
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

    const finalTextColor = isDarkMode ? 'text-white' : 'text-slate-800';
    const finalBgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
    const itemBgColor = isDarkMode ? 'bg-slate-700' : 'bg-blue-100';
    const highlightColor = isDarkMode ? 'bg-teal-400 text-slate-900' : `bg-teal-600 text-white`;
    const finalFontClass = `font-${font}`;

    const renderContentItem = (i: number) => (
        <div key={i} className={`${itemBgColor} p-4 rounded-lg shadow-md ${finalTextColor}`}>
            <span className={`${finalFontClass} font-bold text-xl block mb-2`}>{custom_detail} {i + 1}</span>
            <p className="text-sm">Ini adalah konten deskripsi yang menggunakan font {font}.</p>
        </div>
    );

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-500 ${finalBgColor} ${finalTextColor}`}>

            {/* Navbar (Fungsional) */}
            <nav className={`sticky top-0 z-20 flex justify-between items-center p-4 shadow-lg border-b-4 border-teal-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 rounded-lg font-bold transition-colors bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                    >
                        <X size={18} /> Close Live Preview
                    </button>
                    <h1 className={`font-extrabold text-3xl uppercase ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>{custom_title}</h1>
                </div>

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${highlightColor}`}
                >
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </nav>

            <div className="p-8">
                {/* Header Utama */}
                <header className="text-center py-10">
                    <h2 className="text-5xl font-extrabold mb-3">Produksi Final: {custom_title} (V4)</h2>
                    <p className="text-xl text-slate-500">Desain ini lulus semua tes! Interaksi Dark Mode berfungsi.</p>
                </header>

                {/* Content Grid */}
                <div className={`grid gap-6 ${target_cols === "4" ? "grid-cols-1 md:grid-cols-4" : target_cols === "3" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"} max-w-5xl mx-auto`}>
                    {Array.from({ length: 6 }).map((_, i) => renderContentItem(i))}
                </div>

                <footer className="mt-20 text-center text-sm text-slate-400">
                    <p>Generated by AI Web Designer Simulator - Live Preview Mode.</p>
                </footer>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 🎮 GAME 6: AI WEB DESIGNER (LEVEL FINAL - DEV MODE & LIVE DEPLOYMENT)
// ----------------------------------------------------------------------

function AiWebDesigner() {
    const defaultPrompt = "Buat website TechBlog dengan 3 kolom artikel, tema biru-putih, font sans-serif modern, dan ada tombol Dark Mode.";

    const [prompt, setPrompt] = useState(defaultPrompt);
    const [designState, setDesignState] = useState<"initial" | "design1" | "design2" | "design3" | "design4">("initial");
    const [isLoading, setIsLoading] = useState(false);
    const [apiStep, setApiStep] = useState<string>("Ready to Generate");
    const [isApiError, setIsApiError] = useState(false);

    const [manualModification, setManualModification] = useState("");
    const [isModCorrect, setIsModCorrect] = useState(false);

    const [isLivePreview, setIsLivePreview] = useState(false);

    const analyzePrompt = (text: string) => {
        const lowerText = text.toLowerCase();

        const context = {
            theme: "light", color: "blue", type: "blog", icon: <TrendingUp size={20} className="text-blue-400" />,
            header_text: "Trending Articles", base_bg: "bg-blue-100", highlight: "bg-blue-600",
            target_cols: "3", font: "sans", component: "Card", custom_title: "My Site", custom_detail: "Detail Content Item"
        };

        const titleMatch = text.match(/website\s+([a-zA-Z0-9]+)/i);
        if (titleMatch && titleMatch[1]) { context.custom_title = titleMatch[1]; }
        else { const altTitleMatch = text.match(/web\s+([a-zA-Z0-9]+)/i); if (altTitleMatch && altTitleMatch[1]) { context.custom_title = altTitleMatch[1]; } }

        if (lowerText.includes("e-commerce") || lowerText.includes("toko online") || lowerText.includes("jual")) {
            context.type = "e-commerce"; context.header_text = "Product Listing"; context.icon = <ShoppingCart size={20} className="text-red-400" />;
            context.color = "red"; context.base_bg = "bg-red-100"; context.highlight = "bg-red-600"; context.custom_detail = "Item Harga Terbaik";
        } else if (lowerText.includes("portofolio") || lowerText.includes("profil") || lowerText.includes("programmer")) {
            context.type = "portfolio"; context.header_text = "Project Showcase"; context.icon = <Code size={20} className="text-green-400" />;
            context.color = "green"; context.base_bg = "bg-green-100"; context.highlight = "bg-green-600"; context.target_cols = "2"; context.custom_detail = "Project Keren";
        }

        if (lowerText.includes("merah")) { context.color = "red"; context.highlight = "bg-red-600"; }
        else if (lowerText.includes("hijau")) { context.color = "green"; context.highlight = "bg-green-600"; }
        else if (lowerText.includes("kuning")) { context.color = "yellow"; context.highlight = "bg-yellow-500"; }
        else if (lowerText.includes("ungu")) { context.color = "purple"; context.highlight = "bg-purple-600"; }
        else if (lowerText.includes("pink")) { context.color = "pink"; context.highlight = "bg-pink-600"; }
        else if (lowerText.includes("biru")) { context.color = "blue"; context.highlight = "bg-blue-600"; }

        if (lowerText.includes("dark mode") || lowerText.includes("hitam") || lowerText.includes("abu-abu")) {
            context.theme = "dark"; context.base_bg = "bg-gray-800"; context.highlight = "bg-gray-700";
        }

        if (lowerText.includes("4 kolom") || lowerText.includes("empat kolom")) { context.target_cols = "4"; }
        if (lowerText.includes("2 kolom") || lowerText.includes("dua kolom")) { context.target_cols = "2"; }

        if (lowerText.includes("tebal") || lowerText.includes("serif")) { context.font = "serif"; }
        if (lowerText.includes("list") || lowerText.includes("daftar")) { context.component = "List"; }

        return context;
    };

    const context = analyzePrompt(prompt);
    const { theme, color, type, icon, header_text, base_bg, highlight, target_cols, font, component, custom_title, custom_detail } = context;

    const getRefineButtonText = () => {
        if (isLoading) return "Processing...";
        if (isApiError) return "Try Again (API Error) ⚠️";

        if (designState === "design3" && !isModCorrect) {
            return "Refine 4: Perlu Modifikasi Kode Manual! ✍️";
        }

        switch (designState) {
            case "design1": return "Refine 1: Fix Layout & Responsiveness 🛠️";
            case "design2": return "Refine 2: Fix Color Consistency 🎨";
            case "design3": return "Refine 3: Fix Font and Interactivity ✨";
            default: return "Generate 🚀";
        }
    }

    const handleGenerate = () => {
        if (isLoading || prompt.trim() === "" || (designState !== "initial" && !isApiError && designState !== "design4")) return;

        setIsLoading(true);
        setIsApiError(false);
        setDesignState("initial");
        setManualModification("");
        setIsModCorrect(false);

        setApiStep("Menganalisis Prompt...");

        setTimeout(() => {
            setApiStep("Memanggil Generator API Eksternal...");

            setTimeout(() => {
                setApiStep("Menerima Data Desain Mentah...");

                if (Math.random() < 0.1) {
                    setIsApiError(true);
                    setApiStep("API Error: Koneksi terputus saat transfer data. Coba lagi.");
                    setIsLoading(false);
                    return;
                }

                setTimeout(() => {
                    setApiStep("Design Generated (V1.0)");
                    setDesignState("design1");
                    setIsLoading(false);
                }, 500);
            }, 1500);
        }, 1000);
    };


    const handleRefine = () => {
        if (isLoading || designState === "design4" || (designState === "initial" && !isApiError)) return;

        if (designState === "design3" && !isModCorrect) {
            setApiStep("ERROR: Modifikasi kode manual harus dilakukan sebelum Final Refinement.");
            setIsApiError(true);
            return;
        }

        setIsLoading(true);
        setIsApiError(false);

        const currentState = isApiError ? (designState === "initial" ? "design1" : designState) : designState;
        const nextState = currentState === "design1" ? "design2" : currentState === "design2" ? "design3" : "design4";

        setApiStep(`Mengirim Ulang Prompt ke API untuk Refinement (${nextState.toUpperCase()})...`);

        setTimeout(() => {
            setApiStep("AI sedang memproses koreksi bug...");

            setTimeout(() => {
                if (Math.random() < 0.05) {
                    setIsApiError(true);
                    setApiStep("Refine Error: Logic AI gagal memperbarui. Coba lagi.");
                    setIsLoading(false);
                    return;
                }

                setApiStep(`Design Refined (${nextState.toUpperCase()})`);
                setDesignState(nextState);
                setIsLoading(false);
            }, 1000);
        }, 500);
    };

    useEffect(() => {
        const requiredMod = `font-${font}`;

        if (designState === "design3") {
            if (manualModification.trim().toLowerCase().includes(requiredMod)) {
                setIsModCorrect(true);
            } else {
                setIsModCorrect(false);
            }
        }
    }, [manualModification, designState, font]);

    const getDesignIssues = (state: string) => {
        const issues: string[] = [];
        const t = target_cols;

        if (state === "design1") {
            issues.push(`**Layout Error:** Konten masih bertumpuk (1 kolom), harusnya ${t} kolom.`);
            issues.push(`**Bug Responsif:** Tampilan mobile rusak parah.`);
        }
        if (state === "design2") {
            issues.push(`**Color Glitch:** Header menggunakan mode Light, tapi body menggunakan mode Dark (Mix Mode).`);
            issues.push(`**Bug Responsif:** Di tablet, kolom tidak terdistribusi dengan benar.`);
        }
        if (state === "design3") {
            issues.push(`**CRITICAL ISSUE: Missing Detail:** Teks font seharusnya **${font}**, namun AI gagal mengaplikasikannya. Harus diperbaiki manual.`);
            issues.push(`**Interactivity Missing:** Tombol Dark Mode hanya dekorasi, tidak fungsional (akan diperbaiki otomatis).`);

            if (!isModCorrect) {
                issues.push(`**ACTION REQUIRED:** Anda harus menambahkan kelas CSS *font-${font}* secara manual ke kode sebelum Refine selanjutnya.`);
            }
        }
        return issues;
    };


    const renderCodePanel = () => {
        if (designState === "initial") return null;

        const codeSnippet = `
// HTML Structure (Tailwind CSS) for ${custom_title}
<div class="container mx-auto p-4 ${base_bg}">
    <nav class="flex justify-between p-2">
        <h1 class="text-xl font-bold">${custom_title}</h1>
        <button class="toggle-mode">Toggle Mode</button>
    </nav>

    <div class="grid gap-4 md:grid-cols-${target_cols} mt-8">
        <div class="card p-4 rounded-lg shadow ${designState === 'design3' ? '// BUG: FONT CLASS MISSING HERE' : ''}">
            <h2 class="text-lg // HINT: Tambahkan font di sini">
                ${custom_detail} 1
            </h2>
        </div>
        </div>
</div>
        `;

        const getFinalHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${custom_title} (Final V4)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
        .font-sans { font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
    </style>
</head>
<body class="${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-500">

    <div id="app-root" class="min-h-screen p-8">
        <nav id="navbar" class="sticky top-0 z-10 flex justify-between items-center p-4 mb-8 rounded-xl shadow-lg border-b-4 border-teal-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">
            <h1 class="font-extrabold text-3xl uppercase ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}">${custom_title}</h1>
            <button id="darkModeToggle" class="px-4 py-2 rounded-lg font-bold transition-colors bg-green-600 text-white">
                ${theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </nav>

        <div class="grid gap-6 grid-cols-1 md:grid-cols-${target_cols} max-w-5xl mx-auto">
            ${Array.from({ length: 6 }).map((_, i) => `
            <div class="p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-blue-100 text-slate-800'}">
                <span class="${font === 'serif' ? 'font-serif' : 'font-sans'} font-bold text-xl block mb-2">${custom_detail} ${i + 1}</span>
                <p class="text-sm">Konten...</p>
            </div>
            `).join('')}
        </div>
    </div>

    <script>
        const body = document.body;
        const toggleButton = document.getElementById('darkModeToggle');
        const items = document.querySelectorAll('.grid > div');
        const navbar = document.getElementById('navbar');
        
        let isDark = body.classList.contains('bg-gray-900');

        function updateMode() {
            body.classList.toggle('bg-gray-900', isDark);
            body.classList.toggle('text-white', isDark);
            body.classList.toggle('bg-white', !isDark);
            body.classList.toggle('text-gray-800', !isDark);

            navbar.classList.toggle('bg-gray-800', isDark);
            navbar.classList.toggle('bg-white', !isDark);
            
            toggleButton.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

            items.forEach(item => {
                item.classList.toggle('bg-slate-700', isDark);
                item.classList.toggle('bg-blue-100', !isDark);
                item.classList.toggle('text-white', isDark);
                item.classList.toggle('text-slate-800', !isDark);
            });
        }

        toggleButton.addEventListener('click', () => {
            isDark = !isDark;
            updateMode();
        });
        updateMode(); // Initial sync
    </script>
</body>
</html>
        `;


        return (
            <div className="mt-8 p-4 bg-gray-800 text-white rounded-xl shadow-2xl">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-yellow-400">
                    <Code size={20} /> Development Console: Code Snippet
                </h3>

                {designState === "design4" ? (
                    <>
                        <p className="text-green-400 font-bold mb-2">🎉 Kode Final (Ready to Deploy):</p>
                        <textarea
                            readOnly
                            value={getFinalHTML()}
                            title="text"
                            rows={15}
                            className="w-full text-xs font-mono p-3 bg-gray-900 text-green-300 rounded-lg resize-none"
                        />
                        <p className="mt-2 text-sm text-yellow-300">
                            **Petunjuk:** Copy kode di atas dan paste ke dalam file **`index.html`** Anda untuk melihatnya di browser asli!
                        </p>
                    </>
                ) : (
                    <>
                        <pre className="text-sm overflow-x-auto p-3 bg-gray-900 rounded-lg whitespace-pre-wrap wrap-break-word">
                            {codeSnippet.trim()}
                        </pre>

                        {designState === "design3" && (
                            <div className="mt-4 p-3 bg-red-800 rounded-lg">
                                <p className="font-bold text-lg text-red-300 mb-2">🚨 Perbaikan Manual Diperlukan</p>
                                <p className="text-sm text-red-200 mb-3">
                                    Anda harus mensimulasikan perbaikan: masukkan kelas CSS yang benar di bawah.
                                </p>
                                <input
                                    type="text"
                                    value={manualModification}
                                    onChange={(e) => setManualModification(e.target.value)}
                                    className={`w-full p-2 text-base font-mono rounded text-slate-900 border-2 ${isModCorrect ? 'border-green-500' : 'border-yellow-500'}`}
                                    placeholder={`Masukkan kelas font yang benar di sini... (Hint: font-${font})`}
                                    disabled={isLoading}
                                />
                                {isModCorrect && (
                                    <p className="mt-2 text-green-400 font-bold flex items-center gap-1">
                                        <Check size={16} /> Modifikasi Benar! Siap untuk Refine Akhir.
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    };

    const renderDesignOutput = (state: string) => {
        const issues = getDesignIssues(state);
        const currentTheme = state === "design1" ? "light" : theme;
        const itemBg = currentTheme === 'dark' ? 'bg-slate-700' : 'bg-blue-100';
        const finalTextColor = currentTheme === 'dark' ? 'text-white' : 'text-slate-800';
        const finalBorderColor = state === "design4" ? `border-green-500` : "border-slate-200";
        const finalFontClass = state === "design4" ? `font-${font}` : "font-sans";

        const renderContentItem = (i: number) => (
            <div key={i} className={`${itemBg} p-4 rounded-lg shadow-sm ${finalTextColor} ${component === 'List' ? 'flex items-center gap-4' : ''}`}>
                {component === 'List' ? <List size={20} /> : <Grid size={20} />}
                <span className={`${finalFontClass} font-bold`}>{custom_detail} {i + 1}</span>
            </div>
        );

        if (state === "initial") {
            return (
                <div className="text-center py-20 text-slate-400">
                    <Lightbulb size={40} className="mx-auto mb-4" />
                    <p>Tulis *prompt* kamu di atas, lalu tekan **Enter** atau **Generate**!</p>
                </div>
            );
        }

        return (
            <div className={`p-4 shadow-lg border-2 rounded-2xl ${finalBorderColor} ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${finalTextColor}`}>
                {/* Header */}
                <h3 className={`text-xl font-bold mb-4 flex justify-between items-center ${currentTheme === 'dark' ? 'text-teal-400' : 'text-slate-800'}`}>
                    Design Output ({state.replace('design', 'V')} / {currentTheme.toUpperCase()})
                    <span className={`text-sm font-normal px-2 py-1 rounded ${highlight}`}>
                        {header_text} {icon}
                    </span>
                </h3>

                {/* Navbar */}
                <div className={`flex justify-between items-center p-2 mb-4 rounded ${state === "design2" ? 'bg-white text-slate-800 border-red-500 border' : (currentTheme === 'dark' ? 'bg-slate-800 text-teal-400' : 'bg-blue-100')}`}>
                    <span className="font-bold text-xl uppercase">{custom_title}</span>
                    <button className={`text-sm border px-2 py-1 rounded ${state === "design4" ? 'bg-yellow-400 text-slate-900' : 'border-slate-400'}`}>
                        {state === "design4" ? 'Dark Mode (Active!)' : 'Toggle Mode'}
                    </button>
                </div>

                {/* Content Area */}
                <div className={`grid gap-4 ${state === "design1" ? "grid-cols-1" : (state === "design2" ? "grid-cols-2 md:grid-cols-3" : `grid-cols-1 md:grid-cols-${target_cols}`)}`}>
                    {Array.from({ length: parseInt(target_cols, 10) + 1 }).map((_, i) => renderContentItem(i))}
                </div>

                {/* Masalah (Issues) */}
                {issues.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded text-left">
                        <p className="font-bold text-red-700 mb-2">❌ Masalah Ditemukan (Refine Diperlukan):</p>
                        <ul className="list-disc list-inside text-red-600 space-y-1 text-sm">
                            {issues.map((issue, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: issue }}></li>
                            ))}
                        </ul>
                    </div>
                )}

                {state === "design4" && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-400 rounded text-left font-bold text-green-700 flex items-center gap-2">
                        <Check size={20} /> SEMPURNA! Desain Lulus Semua Tes.
                    </div>
                )}
            </div>
        );
    };

    // --- Render Kontrol Utama ---

    if (isLivePreview) {
        return <LiveDesignPreview context={context} onBack={() => setIsLivePreview(false)} />;
    }

    return (
        <div className="text-center w-full max-w-4xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-teal-600 mb-6 flex items-center justify-center gap-2">
                <Lightbulb className="text-teal-600" /> **AI Web Designer Simulator (Live Deployment)** 💡
            </h2>
            <p className="text-slate-500 mb-4 max-w-xl mx-auto">Selesaikan semua *refinement* (termasuk *bug manual*) untuk melihat kode final dan meluncurkannya ke *Live Preview*!</p>

            {/* Status API */}
            <div className={`mb-4 p-3 text-center text-sm font-semibold rounded-lg shadow-md transition-all ${isLoading ? 'bg-yellow-100 text-yellow-800 animate-pulse' :
                isApiError ? 'bg-red-100 text-red-700 font-bold flex items-center justify-center gap-2' :
                    'bg-slate-50 text-slate-600'
                }`}>
                {isApiError && <AlertTriangle size={16} />}
                {apiStep}
            </div>

            {/* Input Prompt */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                    className="grow p-3 border-2 border-teal-300 rounded-xl focus:border-teal-600 outline-none text-lg"
                    placeholder="E.g., Website toko online dengan 4 kolom produk dan tema merah..."
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || (designState !== "initial" && !isApiError && designState !== "design4")}
                    className={`px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 ${isApiError ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                >
                    {(isApiError && designState === "initial") ? "Retry Generate 💥" : (isLoading ? "Generating..." : "Generate 🚀")}
                </button>
            </div>

            {/* AREA OUTPUT */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Kolom Kiri: Visual Design Output */}
                <div className={`w-full ${designState !== "initial" ? 'lg:w-3/5' : 'lg:w-full'} p-4 md:p-8 rounded-2xl shadow-inner min-h-[400px] border-4 transition-all ${designState === "design4" ? `border-green-500 bg-slate-100` : "border-slate-200 bg-white"}`}>
                    <h3 className="text-left font-bold text-slate-600 mb-4 flex items-center gap-2">
                        <Monitor size={20} /> Preview Design Output:
                    </h3>
                    {isLoading && !isApiError ? (
                        <div className="text-center py-20">
                            <div className="animate-spin h-8 w-8 border-4 border-t-4 border-t-teal-600 border-slate-200 rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-600">{apiStep}...</p>
                        </div>
                    ) : (
                        <div className="transition-opacity duration-500">
                            {renderDesignOutput(designState)}
                        </div>
                    )}
                </div>

                {/* Kolom Kanan: Code Panel */}
                <div className="w-full lg:w-2/5">
                    {renderCodePanel()}
                </div>
            </div>


            {/* Tombol Refinement & Deployment */}
            <div className="mt-6 flex justify-center gap-4">
                {designState !== "design4" && (
                    <button
                        onClick={handleRefine}
                        disabled={designState === "initial" || designState === "design4" || isLoading || (designState === "design3" && !isModCorrect)}
                        className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${designState !== "initial" && designState !== "design4"
                            ? ((isApiError || (designState === "design3" && !isModCorrect)) ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700')
                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
                            }`}
                    >
                        <RefreshCw size={18} /> {getRefineButtonText()}
                    </button>
                )}

                {designState === "design4" && (
                    <button
                        onClick={() => setIsLivePreview(true)}
                        className="px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg bg-green-600 text-white hover:bg-green-700 animate-pulse"
                    >
                        <Play size={18} /> BUKA DI BROWSER (LIVE PREVIEW) 🚀
                    </button>
                )}
            </div>

            {/* Status Akhir */}
            {(designState === "design4") && (
                <p className="mt-4 text-green-600 font-semibold animate-pulse">
                    🎉 **PROYEK SELESAI!** Gunakan tombol di atas atau *copy* kode HTML lengkap di panel kanan.
                </p>
            )}

            {(designState !== "initial") && (
                <button
                    onClick={() => { setDesignState("initial"); setPrompt(defaultPrompt); setIsApiError(false); setApiStep("Ready to Generate"); setManualModification(""); setIsModCorrect(false); }}
                    className="mt-8 px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900 flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={18} /> Reset dan Coba Prompt Baru
                </button>
            )}
        </div>
    );
}

// ----------------------------------------------------------------------
// 🎮 GAME 1: TIC-TAC-TOE
// ----------------------------------------------------------------------

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    function calculateWinner(squares: any[]) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (squares.every(s => s !== null)) return 'Draw';
        return null;
    }

    const status = winner
        ? (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`)
        : `Next Player: ${isXNext ? 'X' : 'O'}`;

    const Square = ({ value, onClick }: { value: string | null; onClick: () => void }) => (
        <button
            className={`w-20 h-20 text-4xl font-extrabold border-4 rounded-lg flex items-center justify-center transition-all ${value === 'X' ? 'text-blue-500 border-blue-200 hover:bg-blue-50' :
                value === 'O' ? 'text-red-500 border-red-200 hover:bg-red-50' :
                    'text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
            onClick={onClick}
            disabled={value !== null || !!winner}
        >
            {value}
        </button>
    );

    return (
        <div className="text-center w-full max-w-sm animate-fadeIn">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center justify-center gap-2">
                <Grid3X3 className="text-indigo-600" /> Tic-Tac-Toe
            </h2>
            <div className={`text-2xl font-semibold mb-4 p-3 rounded-lg ${winner === 'X' || winner === 'O' ? 'bg-green-100 text-green-700' :
                winner === 'Draw' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'
                }`}>
                {status}
            </div>
            <div className="grid grid-cols-3 gap-2 mx-auto">
                {board.map((value, i) => (
                    <Square key={i} value={value} onClick={() => handleClick(i)} />
                ))}
            </div>
            <button
                onClick={resetGame}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex items-center gap-2 mx-auto"
            >
                <RefreshCw size={18} /> Reset Game
            </button>
        </div>
    );
}

// ----------------------------------------------------------------------
// 🎮 GAME 2: MATH RUSH
// ----------------------------------------------------------------------

function MathRush() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [gameStatus, setGameStatus] = useState<'running' | 'over'>('over');
    const inputRef = useRef<HTMLInputElement>(null);

    const generateProblem = () => {
        const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        let n1 = Math.floor(Math.random() * (op === '*' ? 10 : 20)) + 1;
        let n2 = Math.floor(Math.random() * (op === '*' ? 10 : 20)) + 1;

        if (op === '-' && n2 > n1) {
            [n1, n2] = [n2, n1];
        }

        setNum1(n1);
        setNum2(n2);
        setOperator(op);
        setAnswer('');
        if (inputRef.current) inputRef.current.focus();
    };

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameStatus !== 'running') return;

        let correctAnswer: number;
        switch (operator) {
            case '+': correctAnswer = num1 + num2; break;
            case '-': correctAnswer = num1 - num2; break;
            case '*': correctAnswer = num1 * num2; break;
            default: return;
        }

        if (parseInt(answer) === correctAnswer) {
            setScore(s => s + 1);
            generateProblem();
        } else {
            setTimeLeft(t => Math.max(0, t - 2));
            generateProblem();
        }
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(15);
        setGameStatus('running');
        generateProblem();
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameStatus === 'running' && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setGameStatus('over');
        }
        return () => clearTimeout(timer);
    }, [gameStatus, timeLeft]);

    return (
        <div className="text-center w-full max-w-sm animate-fadeIn">
            <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center justify-center gap-2">
                <Calculator className="text-orange-500" /> Math Rush
            </h2>

            {gameStatus === 'over' ? (
                <div className="py-10">
                    <p className="text-2xl font-bold mb-4 text-slate-700">Game Over!</p>
                    <p className="text-3xl font-extrabold text-orange-600 mb-8">Final Score: {score}</p>
                    <button onClick={startGame} className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">
                        <Play size={18} className="inline mr-2" /> Start New Game
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xl font-semibold p-2 bg-slate-100 rounded-lg">Score: <span className="text-orange-600 font-bold">{score}</span></div>
                        <div className={`text-2xl font-bold p-2 rounded-lg ${timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-600'}`}>
                            Time: {timeLeft}s
                        </div>
                    </div>

                    <div className="text-5xl font-extrabold text-slate-800 mb-8">
                        <span>{num1}</span>
                        <span className="mx-4 text-orange-500">{operator}</span>
                        <span>{num2}</span>
                        <span className="mx-4">=</span>
                        <span>?</span>
                    </div>

                    <form onSubmit={checkAnswer} className="flex flex-col items-center">
                        <input
                            ref={inputRef}
                            type="number"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full max-w-xs p-4 text-center text-3xl font-bold border-4 border-orange-300 rounded-xl focus:border-orange-600 outline-none"
                            placeholder="Jawaban..."
                            required
                        />
                        <button type="submit" className="mt-4 px-6 py-3 w-full max-w-xs bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">
                            Submit
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

// ----------------------------------------------------------------------
// 🎮 GAME 3: MEMORY GAME
// ----------------------------------------------------------------------

function MemoryGame() {
    const icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const [cards, setCards] = useState<string[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameStatus, setGameStatus] = useState<'playing' | 'over'>('over');

    const initializeCards = () => {
        const doubledIcons = [...icons, ...icons];
        for (let i = doubledIcons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doubledIcons[i], doubledIcons[j]] = [doubledIcons[j], doubledIcons[i]];
        }
        setCards(doubledIcons);
        setFlippedIndices([]);
        setMatchedIndices([]);
        setMoves(0);
        setGameStatus('playing');
    };

    useEffect(() => {
        if (matchedIndices.length === cards.length && cards.length > 0) {
            setGameStatus('over');
        }
    }, [matchedIndices, cards.length]);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [index1, index2] = flippedIndices;
            setMoves(m => m + 1);

            if (cards[index1] === cards[index2]) {
                setMatchedIndices(prev => [...prev, index1, index2]);
                setFlippedIndices([]);
            } else {
                const timer = setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [flippedIndices, cards]);

    const handleCardClick = (index: number) => {
        if (gameStatus !== 'playing' || flippedIndices.includes(index) || matchedIndices.includes(index) || flippedIndices.length === 2) {
            return;
        }
        setFlippedIndices(prev => [...prev, index]);
    };

    const Card = ({ index, icon }: { index: number, icon: string }) => {
        const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
        const isMatched = matchedIndices.includes(index);

        return (
            <button
                className={`w-16 h-16 md:w-20 md:h-20 text-3xl rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ${isFlipped
                    ? (isMatched ? 'bg-green-300 text-white' : 'bg-pink-400 text-white')
                    : 'bg-slate-300 hover:bg-slate-400 text-transparent'
                    } ${isMatched ? 'opacity-70' : ''}`}
                onClick={() => handleCardClick(index)}
                disabled={isFlipped || gameStatus === 'over' || flippedIndices.length === 2}
            >
                {isFlipped ? icon : '?'}
            </button>
        );
    };

    return (
        <div className="text-center w-full max-w-xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-pink-500 mb-6 flex items-center justify-center gap-2">
                <Brain className="text-pink-500" /> Memory Game
            </h2>

            {gameStatus === 'over' && cards.length > 0 ? (
                <div className="py-10">
                    <p className="text-2xl font-bold mb-4 text-slate-700">Congratulations!</p>
                    <p className="text-3xl font-extrabold text-pink-600 mb-8">Total Moves: {moves}</p>
                </div>
            ) : (
                <div className="flex justify-center mb-6">
                    <div className="text-xl font-semibold p-3 bg-slate-100 rounded-lg">Moves: <span className="text-pink-600 font-bold">{moves}</span></div>
                </div>
            )}

            <div className="grid grid-cols-4 gap-2 md:gap-4 mx-auto max-w-md">
                {cards.map((icon, index) => (
                    <Card key={index} index={index} icon={icon} />
                ))}
            </div>

            <button
                onClick={initializeCards}
                className="mt-8 px-6 py-2 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 flex items-center gap-2 mx-auto"
            >
                <Play size={18} /> {gameStatus === 'over' && cards.length > 0 ? "Play Again" : "Start Game"}
            </button>
        </div>
    );
}


// ----------------------------------------------------------------------
// 🎮 GAME 4: SPEED TYPER
// ----------------------------------------------------------------------

function SpeedTyper() {
    const textSamples = [
        "Pengalaman pemrograman yang menyenangkan adalah saat kode yang rumit dapat berjalan dengan lancar tanpa bug yang tersembunyi.",
        "Komputer modern dirancang untuk memproses informasi dengan kecepatan cahaya, mengubah cara kita berinteraksi dengan dunia digital.",
        "Kecerdasan buatan dan pembelajaran mesin adalah kunci masa depan teknologi, membuka peluang baru yang tak terbatas.",
        "Setiap baris kode adalah langkah kecil menuju sistem yang lebih besar dan lebih kuat, sebuah seni menciptakan dari ketiadaan.",
    ];

    const [text, setText] = useState('');
    const [typedText, setTypedText] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameStatus, setGameStatus] = useState<'ready' | 'running' | 'over'>('ready');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const initializeGame = () => {
        const newText = textSamples[Math.floor(Math.random() * textSamples.length)];
        setText(newText);
        setTypedText('');
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setErrors(0);
        setGameStatus('ready');
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTypedText = e.target.value;
        setTypedText(newTypedText);

        if (gameStatus === 'ready') {
            setGameStatus('running');
            setStartTime(Date.now());
        }

        let currentErrors = 0;
        for (let i = 0; i < newTypedText.length; i++) {
            if (newTypedText[i] !== text[i]) {
                currentErrors++;
            }
        }
        setErrors(currentErrors);

        if (newTypedText.length === text.length) {
            setEndTime(Date.now());
            setGameStatus('over');
            calculateWPM(newTypedText, currentErrors);
        }
    };

    const calculateWPM = (finalTypedText: string, finalErrors: number) => {
        if (startTime && endTime) {
            const timeTakenMinutes = (endTime - startTime) / 60000;
            const correctCharacters = text.length - finalErrors;
            const wordsTyped = correctCharacters / 5;
            const calculatedWPM = Math.round(wordsTyped / timeTakenMinutes);
            setWpm(calculatedWPM);
        }
    };

    const getCharClass = (char: string, index: number) => {
        if (index < typedText.length) {
            return char === typedText[index] ? 'text-green-600' : 'text-red-600 bg-red-100 rounded-sm';
        }
        return 'text-slate-500';
    };

    const focusInput = () => {
        if (gameStatus === 'ready' && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="text-center w-full max-w-3xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
                <Keyboard className="text-blue-600" /> Speed Typer
            </h2>

            {/* Teks Sampel */}
            <div
                className="text-left p-4 mb-6 rounded-xl bg-slate-50 border border-slate-200 text-xl font-mono leading-relaxed cursor-text"
                onClick={focusInput}
            >
                {text.split('').map((char, index) => (
                    <span key={index} className={getCharClass(char, index)}>
                        {char}
                    </span>
                ))}
            </div>

            {/* Input Area */}
            <textarea
                ref={inputRef}
                value={typedText}
                onChange={handleChange}
                disabled={gameStatus === 'over'}
                className="w-full h-24 p-4 text-xl font-mono border-2 border-blue-300 rounded-xl focus:border-blue-600 outline-none resize-none"
                placeholder={gameStatus === 'over' ? "Game Selesai. Klik Reset." : "Mulai mengetik di sini..."}
            />

            {/* Statistik */}
            <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-xl">
                <div className="text-xl font-bold text-slate-700">
                    WPM: <span className="text-blue-600">{wpm}</span>
                </div>
                <div className="text-xl font-bold text-slate-700">
                    Errors: <span className="text-red-600">{errors}</span>
                </div>
                {gameStatus === 'over' && (
                    <div className="text-xl font-bold text-slate-700">
                        Accuracy: <span className="text-green-600">{((text.length - errors) / text.length * 100).toFixed(1)}%</span>
                    </div>
                )}
            </div>

            {/* Tombol Reset */}
            <button
                onClick={initializeGame}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
                <RefreshCw size={18} /> Reset Game
            </button>
        </div>
    );
}

// ----------------------------------------------------------------------
// 🎮 GAME 5: REACTION TEST
// ----------------------------------------------------------------------

function ReactionTest() {
    const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go'>('waiting');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<number>(0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const startWaiting = () => {
        setGameState('waiting');
        setReactionTime(null);
        setStartTime(0);

        const randomTime = Math.random() * 2500 + 1500;

        const id = setTimeout(() => {
            setGameState('go');
            setStartTime(Date.now());
        }, randomTime);

        setTimeoutId(id);
        setGameState('ready');
    };

    const handleScreenClick = () => {
        if (gameState === 'waiting') {
            startWaiting();
        } else if (gameState === 'ready') {
            if (timeoutId) clearTimeout(timeoutId);
            setReactionTime(0);
            setGameState('waiting');
            alert("Terlalu cepat! Anda mengklik sebelum lampu hijau. Coba lagi.");
        } else if (gameState === 'go') {
            const timeTaken = Date.now() - startTime;
            setReactionTime(timeTaken);
            setGameState('waiting');
        }
    };

    const getColorClass = () => {
        switch (gameState) {
            case 'waiting': return 'bg-slate-300 hover:bg-slate-400';
            case 'ready': return 'bg-red-500 hover:bg-red-600';
            case 'go': return 'bg-green-500 hover:bg-green-600';
        }
    };

    const getMessage = () => {
        switch (gameState) {
            case 'waiting': return "Click anywhere to start the test.";
            case 'ready': return "Wait for green... (Don't click yet!)";
            case 'go': return "CLICK NOW!";
        }
    };

    return (
        <div className="text-center w-full max-w-xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center justify-center gap-2">
                <Zap className="text-red-500" /> Reaction Test
            </h2>

            <div
                className={`w-full h-64 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${getColorClass()}`}
                onClick={handleScreenClick}
            >
                <p className={`text-3xl font-extrabold text-white transition-opacity duration-300 ${gameState === 'waiting' && reactionTime === null ? 'opacity-100' : 'opacity-80'}`}>
                    {getMessage()}
                </p>
                {reactionTime !== null && (
                    <p className={`text-4xl font-extrabold mt-4 ${reactionTime === 0 ? 'text-yellow-200' : 'text-white'}`}>
                        {reactionTime === 0 ? "Premature Click" : `${reactionTime}ms`}
                    </p>
                )}
            </div>

            <div className="mt-6 text-xl font-semibold text-slate-700">
                {reactionTime !== null && reactionTime !== 0 && (
                    <p className="p-3 bg-green-100 rounded-xl">
                        Your Reaction Time: <span className="text-red-600 font-bold">{reactionTime} ms</span>
                    </p>
                )}
                {gameState === 'waiting' && reactionTime === null && (
                    <p className="p-3 bg-slate-100 rounded-xl">Target: Below 300ms</p>
                )}
            </div>
        </div>
    );
}