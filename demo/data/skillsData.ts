export interface PerformanceRating {
    skill: string;
    level: number; // Rating dari 0 hingga 100
    // Menggunakan class lengkap (Full Static Class Names)
    progressBarClass: string; 
    textColorClass: string;
}

export const performanceRatings: PerformanceRating[] = [
    { skill: "Frontend Logic (React/Hooks)", level: 90, progressBarClass: "bg-blue-500", textColorClass: "text-blue-600" },
    { skill: "Styling & UI/UX (Tailwind)", level: 85, progressBarClass: "bg-teal-500", textColorClass: "text-teal-600" },
    { skill: "Next.js / SSR/SSG", level: 80, progressBarClass: "bg-orange-500", textColorClass: "text-orange-600" },
    { skill: "Backend Integration (API)", level: 75, progressBarClass: "bg-purple-500", textColorClass: "text-purple-600" },
    { skill: "Basic Algorithms & Logic", level: 65, progressBarClass: "bg-red-500", textColorClass: "text-red-600" },
    { skill: "System Design (Scalability)", level: 50, progressBarClass: "bg-gray-500", textColorClass: "text-gray-600" },
];

export const statsData = [
    { label: "Total Commits", value: "1,240", icon: "GitCommit", iconBgClass: "bg-blue-50 text-blue-600", color: "blue" },
    { label: "Projek Selesai", value: "12", icon: "Globe", iconBgClass: "bg-teal-50 text-teal-600", color: "teal" },
    { label: "Jam Ngoding", value: "350+", icon: "Code2", iconBgClass: "bg-purple-50 text-purple-600", color: "purple" },
];

// Catatan: Saya akan mengganti icon di file Dashboard secara manual karena tipe data icon tidak bisa di-export.