"use client";

import { useState } from "react";
import { skills as initialSkills } from "@/data/skills";
import SkillSlider from "@/Component/SkillSlider";
import { CheckCircle } from "lucide-react";

export default function Skill() {
    const [skillValues, setSkillValues] = useState(
        Object.fromEntries(initialSkills.map((s) => [s.name, s.level]))
    );

    const [savedData, setSavedData] = useState<Record<string, number> | null>(null);

    const handleValueChange = (name: string, value: number) => {
        setSkillValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setSavedData(skillValues);

        // Show popup
        setShowPopup(true);

        // Hide popup after 1.8 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 1800);
    };

    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="min-h-screen pt-28 pb-20 bg-white text-gray-800 px-6">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-teal-500">
                My Skills
            </h1>

            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Kamu dapat mengubah level kemampuan menggunakan slider di bawah.
                Klik <span className="font-semibold text-teal0-500">Save</span> untuk menyimpan sementara.
            </p>

            {/* CARD WRAPPER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {initialSkills.map((skill) => (
                    <div
                        key={skill.name}
                        className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="text-teal-500" size={24} />
                            <h2 className="text-xl font-bold">{skill.name}</h2>
                        </div>

                        <SkillSlider
                            name={skill.name}
                            defaultValue={skill.level}
                            onValueChange={handleValueChange}
                        />

                        <p className="mt-3 text-sm text-gray-600">
                            Level:{" "}
                            <span className="font-semibold text-teal-500">
                                {skillValues[skill.name]}%
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={handleSave}
                    className="px-6 py-3 rounded-xl font-semibold
                    bg-teal-600 hover:bg-teal-600 text-white transition shadow-lg"
                >
                    Save
                </button>
            </div>

            {/* SUCCESS POPUP */}
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
                    <div className="
                        bg-white text-teal-500 shadow-xl border
                        border-teal-300 px-6 py-4 rounded-xl flex gap-3 items-center
                        animate-[fadeIn_0.3s_ease-out,fadeOut_0.3s_ease-in_1.5s_forwards]
                    ">
                        <CheckCircle className="text-teal-500" size={28} />
                        <span className="font-semibold text-lg">Skill berhasil disimpan!</span>
                    </div>
                </div>
            )}

            {/* RESULT */}
            {savedData && (
                <div className="max-w-xl mx-auto mt-10 bg-white border border-teal-200 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center text-teal-500">
                        Saved Skills
                    </h2>
                    {Object.entries(savedData).map(([name, value]) => (
                        <p key={name} className="text-gray-700 text-lg">
                            {name}:{" "}
                            <span className="text-teal-500 font-semibold">{value}%</span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
