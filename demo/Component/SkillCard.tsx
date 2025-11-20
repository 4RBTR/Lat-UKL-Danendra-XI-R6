import { useState } from "react";

interface SkillCardProps {
    name: string;
    initialValue: number;
}

export default function SkillCard({ name, initialValue }: SkillCardProps) {
    const [value, setValue] = useState(initialValue);

    return (
        <div className="bg-white rounded-xl shadow-md p-5 w-full">
            {/* Skill Name + Value */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <span className="text-red-600 font-bold">{value}%</span>
            </div>

            {/* Skill Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full mb-4">
                <div
                    className="h-3 bg-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${value}%` }}
                ></div>
            </div>

            {/* Range Slider */}
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                title="input"
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-red-500"
            />
        </div>
    );
}
