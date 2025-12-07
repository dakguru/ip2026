import { PlanItem, ProgressData } from "@/lib/types";
import { format, isSameDay, isToday, parseISO } from "date-fns";
import { CheckCircle2, Circle, Clock, Check } from "lucide-react";
import { useRef, useEffect } from "react";
import clsx from 'clsx';
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface ListViewProps {
    plan: PlanItem[];
    progress: ProgressData;
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export default function ListView({ plan, progress, selectedDate, onSelectDate }: ListViewProps) {
    const todayRef = useRef<HTMLDivElement>(null);

    // Scroll to today on mount
    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 h-full overflow-hidden flex flex-col transition-colors">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">Schedule List</span>
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {plan.map((item, idx) => {
                    const date = parseISO(item.date);
                    const isSelected = isSameDay(date, selectedDate);
                    const isDayToday = isToday(date);
                    const isCompleted = !!progress[item.date]?.completed;

                    return (
                        <div
                            key={item.date}
                            ref={isDayToday ? todayRef : null}
                            onClick={() => onSelectDate(date)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                                isSelected
                                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900/40 ring-1 ring-blue-100 dark:ring-blue-900/30"
                                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                                isDayToday && !isSelected && "bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/20"
                            )}
                        >
                            {/* Date Column */}
                            <div className="flex flex-col items-center justify-center w-14 shrink-0">
                                <span className={cn("text-xs font-bold uppercase", isSelected ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400")}>
                                    {format(date, 'MMM')}
                                </span>
                                <span className={cn("text-xl font-bold leading-none", isSelected ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-100")}>
                                    {format(date, 'd')}
                                </span>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                                    {format(date, 'EEE')}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className={cn("w-px h-10 self-center", isSelected ? "bg-blue-200 dark:bg-blue-800" : "bg-zinc-100 dark:bg-zinc-800")} />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={cn("font-semibold text-sm", isSelected ? "text-blue-900 dark:text-blue-200" : "text-zinc-800 dark:text-zinc-200")}>
                                        {item.title || "Rest / Revision"}
                                    </h3>
                                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />}
                                    {!isCompleted && item.type !== 'revision' && <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0" />}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded font-medium uppercase",
                                        item.type === 'heavy' ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" :
                                            item.type === 'light' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                                                item.type === 'mock' ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" :
                                                    "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                                    )}>
                                        {item.category || item.type}
                                    </span>
                                    {isDayToday && (
                                        <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Today
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
