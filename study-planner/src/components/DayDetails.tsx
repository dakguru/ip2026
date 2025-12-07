import { PlanItem, ConfidenceLevel } from "@/lib/types";
import { format } from "date-fns";
import { BookOpen, CheckCircle2, Check } from "lucide-react";
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState } from "react";
import ConfidenceDialog from "./ConfidenceDialog";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface DayDetailsProps {
    date: Date;
    planItem?: PlanItem;
    isCompleted: boolean;
    onComplete: (confidence: ConfidenceLevel) => void;
    onUncomplete: () => void;
}

export default function DayDetails({ date, planItem, isCompleted, onComplete, onUncomplete }: DayDetailsProps) {
    const [open, setOpen] = useState(false);

    // Strategy steps (mock)
    const strategySteps = [
        { time: "Min 0-90", text: "Deep Read. Focus only on the specific section." },
        { time: "Min 90-120", text: "Create One-Pager Notes." },
        { time: "Last 15m", text: "Solve 10 MCQs." }
    ];

    const handleConfirm = (level: 'low' | 'medium' | 'high') => {
        onComplete(level);
        setOpen(false);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden h-full flex flex-col transition-colors">
            {/* Header */}
            <div className={cn(
                "p-6 transition-colors duration-300",
                isCompleted ? "bg-green-600 dark:bg-green-700" : "bg-blue-600 dark:bg-blue-700"
            )}>
                <div className={cn(
                    "flex items-center gap-2 text-sm mb-1",
                    isCompleted ? "text-green-100" : "text-blue-100"
                )}>
                    <BookOpen className="w-4 h-4" />
                    <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                    <h2 className="text-2xl font-bold">Daily Schedule</h2>
                    {isCompleted && <CheckCircle2 className="w-8 h-8 opacity-50" />}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-8">
                {/* Topic Info */}
                {planItem ? (
                    <div className="flex gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            isCompleted ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        )}>
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">STUDY</p>
                            <h3 className={cn(
                                "text-xl font-bold mb-2",
                                isCompleted ? "text-green-900 dark:text-green-300" : "text-zinc-900 dark:text-zinc-100"
                            )}>{planItem.title}</h3>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 text-zinc-400 dark:text-zinc-500">No study plan today.</div>
                )}

                {/* Strategy List (Show only if pending or just for ref) */}
                {planItem && !isCompleted && planItem.type !== 'revision' && planItem.type !== 'mock' && (
                    <div className="space-y-4">
                        {/* Check for specific tips first, else fallback to generic strategy */}
                        {(planItem.tips && planItem.tips.length > 0) ? (
                            <>
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                                    Topic Mastery Tips
                                </h4>
                                <div className="space-y-3">
                                    {planItem.tips.map((tip, idx) => (
                                        <div key={idx} className="flex gap-3 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-100 dark:border-zinc-700">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                                                {tip}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Standard Strategy</h4>
                                {strategySteps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                        <div className="text-sm">
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{step.time}:</span>{" "}
                                            <span className="text-zinc-600 dark:text-zinc-400">{step.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                <div className="flex-1"></div>

                {/* Action Buttons */}
                {planItem && (
                    <>
                        {!isCompleted ? (
                            <>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-medium shadow-lg hover:shadow-xl dark:shadow-zinc-900/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Mark as Completed
                                </button>
                                <ConfidenceDialog
                                    open={open}
                                    onOpenChange={setOpen}
                                    onConfirm={handleConfirm}
                                />
                            </>
                        ) : (
                            <button
                                onClick={onUncomplete}
                                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                            >
                                <Check className="w-5 h-5" />
                                Completed (Undo)
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
