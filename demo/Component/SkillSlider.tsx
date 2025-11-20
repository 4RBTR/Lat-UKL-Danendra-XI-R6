"use client";

import { useState } from "react";

interface Props {
    name: string;
    defaultValue: number;
    onValueChange: (name: string, value: number) => void;
}

export default function SkillSlider({ name, defaultValue, onValueChange }: Props) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        setValue(newVal);
        onValueChange(name, newVal);
    };

    return (
        <div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                title="input"
                onChange={handleChange}
                className="w-full accent-teal-500"
            />
        </div>
    );
}
