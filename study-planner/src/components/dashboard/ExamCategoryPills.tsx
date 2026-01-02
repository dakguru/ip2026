"use client";

import { useState } from "react";
import { BookOpen, PlayCircle, Clock, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    { id: 'all', label: 'All' },
    { id: 'gds', label: 'GDS to MTS' },
    { id: 'mts', label: 'MTS to Postman' },
    { id: 'pa', label: 'LGO (PA/SA)' },
    { id: 'ip', label: 'Inspector Posts' },
];

export default function ExamCategoryPills() {
    const [active, setActive] = useState('ip');

    return (
        <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex px-4 gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActive(cat.id)}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${active === cat.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
