import { PlanItem, ProgressData, ConfidenceLevel } from "@/lib/types";
import { format } from "date-fns";
import { BookOpen, CheckCircle2, AlertTriangle, CircleDashed, Star, BarChart, List } from "lucide-react";
import { useState } from "react";
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import ConfidenceDialog from "./ConfidenceDialog";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface TrackerProps {
    plan: PlanItem[];
    progress: ProgressData;
    onComplete: (confidence: ConfidenceLevel, dateStr: string) => void;
    onUncomplete: (dateStr: string) => void;
    filter?: 'all' | 'completed' | 'overdue' | 'pending';
}

export default function SyllabusTracker({ plan, progress, onComplete, onUncomplete, filter = 'all' }: TrackerProps) {
    const [viewMode, setViewMode] = useState<'syllabus' | 'confidence'>('syllabus');
    const [selectedItem, setSelectedItem] = useState<PlanItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleItemClick = (item: PlanItem) => {
        const isCompleted = !!progress[item.date]?.completed;
        if (isCompleted) {
            // Directly uncomplete if already done
            onUncomplete(item.date);
        } else {
            // Open dialog if pending
            setSelectedItem(item);
            setIsDialogOpen(true);
        }
    };

    const handleConfirmConfidence = (confidence: ConfidenceLevel) => {
        if (selectedItem) {
            onComplete(confidence, selectedItem.date);
            setIsDialogOpen(false);
            setSelectedItem(null);
        }
    };

    // Grouping Logic
    const groupedItems = plan.reduce((acc, item) => {
        if (item.type === 'revision' || item.type === 'mock') return acc; // Skip non-topics

        const record = progress[item.date];
        const isCompleted = !!record?.completed;
        const confidence = record?.confidence;

        // Filter Logic
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = !isCompleted && item.date < today;

        if (filter === 'completed' && !isCompleted) return acc;
        if (filter === 'pending' && isCompleted) return acc;
        if (filter === 'overdue' && !isOverdue) return acc;

        let docKey = '';

        if (viewMode === 'syllabus') {
            // Group by Paper using the new category field
            const cat = item.category || 'Other';
            if (cat.includes("Paper I")) docKey = 'Paper I: Dept. Rules';
            else if (cat.includes("Paper III")) docKey = 'Paper III: General';
            else if (cat.includes("Paper II")) docKey = 'Paper II: Drafting & Writing';
            else docKey = 'Other';
        } else {
            // Group by Confidence
            if (!isCompleted) {
                if (isOverdue) docKey = 'Overdue / Late';
                else docKey = 'Pending / Not Covered';
            } else {
                if (confidence === 'low') docKey = 'Low Confidence (Needs Review)';
                else if (confidence === 'medium') docKey = 'Medium Confidence';
                else if (confidence === 'high') docKey = 'High Confidence (Mastered)';
                else docKey = 'Completed (No Rating)';
            }
        }

        if (!acc[docKey]) acc[docKey] = [];
        acc[docKey].push(item);
        return acc;
    }, {} as Record<string, PlanItem[]>);

    // Sort Keys specially for Confidence view
    const sortedKeys = Object.keys(groupedItems).sort((a, b) => {
        if (viewMode === 'syllabus') {
            const order = {
                'Paper I: Dept. Rules': 1,
                'Paper II: Drafting & Writing': 2,
                'Paper III: General': 3,
                'Other': 4
            };
            const orderA = order[a as keyof typeof order] ?? 99;
            const orderB = order[b as keyof typeof order] ?? 99;
            if (orderA !== orderB) return orderA - orderB;
            return a.localeCompare(b);
        }

        // Custom sort for Confidence: Low -> Medium -> High -> Pending
        const order = {
            'Low Confidence (Needs Review)': 1,
            'Medium Confidence': 2,
            'High Confidence (Mastered)': 3,
            'Completed (No Rating)': 4,
            'Pending / Not Covered': 5,
            'Overdue / Late': 0 // Show overdue first if present
        };
        const orderA = order[a as keyof typeof order] ?? 99;
        const orderB = order[b as keyof typeof order] ?? 99;
        return orderA - orderB;
    });

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 h-[600px] xl:h-[800px] overflow-hidden flex flex-col transition-colors">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                    {viewMode === 'syllabus' ? <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" /> : <BarChart className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                    {filter === 'all' ? (
                        viewMode === 'syllabus' ? 'Syllabus Tracker' : 'Mastery & Confidence'
                    ) : (
                        <span className="capitalize text-zinc-500 dark:text-zinc-400 font-normal">
                            Filtering By: <span className="text-zinc-900 dark:text-zinc-100 font-bold">{filter}</span>
                        </span>
                    )}
                </h2>

                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('syllabus')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2",
                            viewMode === 'syllabus' ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        )}
                    >
                        <List className="w-3.5 h-3.5" />
                        By Topic
                    </button>
                    <button
                        onClick={() => setViewMode('confidence')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2",
                            viewMode === 'confidence' ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        )}
                    >
                        <Star className="w-3.5 h-3.5" />
                        By Confidence
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-8">
                {sortedKeys.map((category) => {
                    const items = groupedItems[category];

                    // Header Color logic
                    let headerColor = "text-zinc-400 dark:text-zinc-500";
                    let bgColor = "bg-zinc-50 dark:bg-zinc-800/10";

                    if (category.includes("Low")) { headerColor = "text-red-600 dark:text-red-400"; bgColor = "bg-red-50/50 dark:bg-red-900/10"; }
                    else if (category.includes("Medium")) { headerColor = "text-yellow-600 dark:text-yellow-400"; bgColor = "bg-yellow-50/50 dark:bg-yellow-900/10"; }
                    else if (category.includes("High")) { headerColor = "text-green-600 dark:text-green-400"; bgColor = "bg-green-50/50 dark:bg-green-900/10"; }

                    return (
                        <div key={category} className={cn("rounded-lg p-2 transition-colors", bgColor)}>
                            <div className="flex items-center justify-between mb-3 px-2">
                                <h3 className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2", headerColor)}>
                                    {category.includes('Low') && <AlertTriangle className="w-4 h-4" />}
                                    {category.includes('High') && <CheckCircle2 className="w-4 h-4" />}
                                    {category.includes('Medium') && <Star className="w-4 h-4" />}
                                    {category}
                                </h3>
                                <span className="text-[10px] font-semibold bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                                    {items.length} Topics
                                </span>
                            </div>

                            <div className="space-y-2">
                                {items.map((item, idx) => {
                                    const status = progress[item.date];
                                    const isDone = !!status?.completed;
                                    const confidence = status?.confidence;

                                    return (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                                            <button
                                                onClick={() => handleItemClick(item)}
                                                className={cn(
                                                    "mt-0.5 rounded-full transition-all hover:scale-110 focus:outline-none",
                                                    isDone ? "text-green-500 dark:text-green-400" : "text-zinc-300 dark:text-zinc-600 hover:text-zinc-400 dark:hover:text-zinc-500"
                                                )}>
                                                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <CircleDashed className="w-5 h-5" />}
                                            </button>
                                            <div className="flex-1">
                                                <p className={cn("text-sm font-medium leading-snug mb-1", isDone ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-800 dark:text-zinc-200")}>
                                                    {item.title}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                                                    <span>{format(new Date(item.date), 'MMM d, yyyy')}</span>
                                                    {!isDone && <span className="text-zinc-300 dark:text-zinc-600">|</span>}
                                                    {!isDone && <span className="text-zinc-400 dark:text-zinc-500 font-medium">{item.category}</span>}

                                                    {isDone && confidence && viewMode === 'syllabus' && (
                                                        <span className={cn(
                                                            "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                                                            confidence === 'high' && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
                                                            confidence === 'medium' && "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
                                                            confidence === 'low' && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                                        )}>
                                                            {confidence}
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
                })}
            </div>

            <ConfidenceDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={handleConfirmConfidence}
            />
        </div>
    );
}
