import Image from "next/image";
import { School } from "@/data/schools";
import { X, MapPin, Calendar, BookOpen } from "lucide-react";

interface Props {
    school: School;
    onClose: () => void;
}

const SchoolModal = ({ school, onClose }: Props) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-y-auto max-h-[90vh] transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image & Close Button (Top Section) */}
                <div className="relative w-full h-48 md:h-64">
                    <Image
                        src={school.image}
                        alt={school.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {/* Tombol X yang jelas di sudut kanan atas */}
                    <button
                        className="absolute top-4 right-4 bg-white/90 text-slate-800 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-lg z-10"
                        onClick={onClose}
                        aria-label="Tutup Detail Sekolah"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {/* Header */}
                    <h2 className="text-3xl font-extrabold text-teal-700 mb-2">
                        {school.name}
                    </h2>

                    {/* Detail Info Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm border-b pb-4">

                        <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            <span>{school.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                            <BookOpen className="w-4 h-4 text-teal-500" />
                            <span>{school.level}</span>
                        </div>

                        <div className="col-span-2 md:col-span-1 flex items-center gap-2 text-slate-600 font-semibold bg-teal-50 p-1 rounded-full px-3">
                            <Calendar className="w-4 h-4 text-teal-700" />
                            <span>{school.startYear} - {school.endYear}</span>
                        </div>

                    </div>

                    {/* Description */}
                    <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Kisah Singkat</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed text-justify border-l-4 border-teal-200 pl-4 py-1">
                        {school.description}
                    </p>

                    {/* Map */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Lokasi Sekolah</h3>
                    <iframe
                        src={school.mapUrl}
                        width="100%"
                        height="300"
                        title={`Map ${school.name}`}
                        className="rounded-lg border-4 border-teal-200"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>

                    {/* Close Action (Footer) - Dibiarkan agar ada pilihan di bawah juga */}
                    <div className="mt-6 text-right">
                        <button
                            onClick={onClose}
                            className="bg-teal-600 text-white py-2 px-5 rounded-lg hover:bg-teal-700 transition font-semibold"
                        >
                            Tutup Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolModal;