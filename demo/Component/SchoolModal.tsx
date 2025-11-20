import Image from "next/image";
import { School } from "@/data/schools";

interface Props {
    school: School;
    onClose: () => void;
}

const SchoolModal = ({ school, onClose }: Props) => {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all scale-100 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-56">
                    <Image
                        src={school.image}
                        alt={school.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <button
                        className="absolute top-3 right-3 bg-white/70 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    <h2 className="text-3xl font-extrabold text-teal-600 mb-2">
                        {school.name}
                    </h2>
                    <p className="text-gray-500 mb-4">{school.location}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {school.description}
                    </p>

                    <iframe
                        src={school.mapUrl}
                        width="100%"
                        height="300"
                        title={`Map ${school.name}`}
                        className="rounded-lg border border-gray-200"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default SchoolModal;
