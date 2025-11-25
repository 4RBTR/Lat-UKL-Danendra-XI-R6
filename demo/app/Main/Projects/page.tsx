"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Github,
    ExternalLink,
    Code2,
    Layers,
    X,
    FolderGit2
} from "lucide-react";

// --- TIPE DATA ---
type Project = {
    id: number;
    title: string;
    category: "Web App" | "Mobile App" | "UI/UX Design";
    image: string;
    description: string;
    techStack: string[];
    demoUrl: string;
    repoUrl: string;
};

export default function ProjectsPage() {

    // --- DATA PROJEK ---
    const projects: Project[] = [
        {
            id: 1,
            title: "Portfolio Website",
            category: "Web App",
            image: "/Project1.png",
            description: "Website portfolio pribadi yang interaktif dengan fitur dark mode, animasi mengetik, dan manajemen data menggunakan LocalStorage.",
            techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
            demoUrl: "#",
            repoUrl: "https://github.com/4RBTR/Lat-UKL-Danendra-XI-R6"
        },
        {
            id: 2,
            title: "E-Library SMK Telkom",
            category: "Web App",
            image: "/project2.jpg",
            description: "Sistem informasi perpustakaan untuk meminjam dan mengembalikan buku secara digital, lengkap dengan fitur admin dashboard.",
            techStack: ["React", "Node.js", "MySQL"],
            demoUrl: "#",
            repoUrl: "#"
        },
        {
            id: 3,
            title: "Health Tracker UI",
            category: "UI/UX Design",
            image: "/project3.jpg",
            description: "Desain antarmuka aplikasi kesehatan mobile dengan fokus pada kemudahan penggunaan dan visualisasi data kesehatan pengguna.",
            techStack: ["Figma", "Adobe Illustrator"],
            demoUrl: "#",
            repoUrl: "#"
        },
    ];

    // --- STATE ---
    const [filter, setFilter] = useState<string>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // --- FILTER LOGIC ---
    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn pb-20">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-teal-600 mb-4 flex justify-center items-center gap-3">
                    <FolderGit2 className="w-10 h-10" /> My Projects
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Kumpulan karya terbaik yang pernah saya kerjakan, mulai dari website, aplikasi, hingga desain antarmuka.
                </p>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {["All", "Web App", "Mobile App", "UI/UX Design"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${filter === cat
                            ? "bg-teal-600 text-white shadow-lg ring-2 ring-teal-300"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col"
                    >
                        {/* CARD IMAGE (Tetap object-cover biar rapi di grid) */}
                        <div className="h-48 bg-slate-100 relative overflow-hidden">
                            <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm z-10">
                                {project.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.slice(0, 3).map((tech) => (
                                    <span key={tech} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-200 font-medium">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="px-2 py-1 bg-slate-50 text-slate-400 text-xs rounded border border-slate-200">
                                        +{project.techStack.length - 3}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={() => setSelectedProject(project)}
                                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                            >
                                Lihat Detail <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <Code2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400">Belum ada projek di kategori ini.</h3>
                </div>
            )}

            {/* --- MODAL DETAIL PROJECT --- */}
            {selectedProject && (
                <div className="fixed inset-0 z-100 flex items-start justify-center p-4 pt-10 md:pt-20 bg-slate-900/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden mb-10 min-h-[500px]">

                        {/* Tombol Close */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            title="Close"
                            className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white hover:text-red-500 transition-all shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Left: Image Area (MODAL) */}
                        {/* PERBAIKAN DI SINI: bg-white/bg-black dan object-contain */}
                        <div className="w-full md:w-1/2 bg-slate-50 relative min-h-[300px] md:min-h-full flex items-center justify-center p-4 border-r border-slate-100">
                            <div className="relative w-full h-full min-h-[250px]">
                                <Image 
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    fill 
                                    // GANTI object-cover JADI object-contain AGAR TIDAK KEPOTONG
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right: Content Area (Modal) */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {selectedProject.category}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">
                                {selectedProject.title}
                            </h2>

                            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                                {selectedProject.description}
                            </p>

                            <div className="mb-10">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase text-sm tracking-wide">
                                    <Layers size={18} /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech) => (
                                        <span key={tech} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg font-semibold text-sm border border-slate-200">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 mt-auto">
                                <a
                                    href={selectedProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-teal-600 text-white py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-2 text-center"
                                >
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                                <a
                                    href={selectedProject.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-slate-800 text-white py-3.5 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg hover:shadow-slate-300 flex items-center justify-center gap-2 text-center"
                                >
                                    <Github size={20} /> Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}