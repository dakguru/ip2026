"use client";

import { PlayCircle, FileText, Calendar, Video, Activity } from "lucide-react";
import Link from "next/link";

const actions = [
    { label: "Daily Quiz", icon: Activity, color: "bg-orange-100 text-orange-600", href: "/quiz/daily" },
    { label: "Prev. Papers", icon: FileText, color: "bg-blue-100 text-blue-600", href: "/notes" },
    { label: "Current Affairs", icon: Calendar, color: "bg-green-100 text-green-600", href: "/current-affairs" },
    { label: "Free Videos", icon: Video, color: "bg-purple-100 text-purple-600", href: "/videos" },
];

export default function QuickActions() {
    return (
        <div className="grid grid-cols-4 gap-4 px-4 py-6">
            {actions.map((action) => (
                <Link
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2"
                >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} shadow-sm active:scale-95 transition-transform`}>
                        <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-center text-zinc-700 dark:text-zinc-300 leading-tight">
                        {action.label}
                    </span>
                </Link>
            ))}
        </div>
    );
}
