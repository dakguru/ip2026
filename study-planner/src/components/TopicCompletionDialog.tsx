"use client";

import { CheckCircle2, BookOpen, AlertCircle, PlayCircle, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

interface TopicCompletionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onMarkComplete: () => void;
    topicName?: string;
}

export default function TopicCompletionDialog({ open, onOpenChange, onMarkComplete, topicName }: TopicCompletionDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-0 shadow-2xl focus:outline-none z-50 animate-in zoom-in-95 duration-200 overflow-hidden">

                    {/* Header with Pattern */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-12 -mb-12"></div>

                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-300" />
                                Topic Completed?
                            </h2>
                            <p className="text-blue-100 text-sm opacity-90">
                                {topicName ? `Great job on finishing "${topicName}"!` : "Great job on finishing this topic!"}
                            </p>
                        </div>

                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="text-center mb-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">
                                Do you feel confident?
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                "Have you completed this topic confidently? Do you want to test yourself?"
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link href="/quiz">
                                <button
                                    onClick={() => {
                                        onMarkComplete();
                                        onOpenChange(false);
                                    }}
                                    className="w-full group relative overflow-hidden rounded-xl p-4 transition-all hover:shadow-lg border border-blue-100 bg-blue-50 hover:bg-blue-100"
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md group-hover:scale-110 transition-transform">
                                            <PlayCircle className="h-6 w-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-blue-900">Attempt MCQ Test</div>
                                            <div className="text-xs text-blue-600 font-medium">Challenge yourself now</div>
                                        </div>
                                    </div>
                                </button>
                            </Link>

                            <div className="relative flex items-center py-2">
                                <div className="grow border-t border-slate-100"></div>
                                <span className="mx-4 shrink-0 text-xs font-semibold text-slate-400">OR</span>
                                <div className="grow border-t border-slate-100"></div>
                            </div>

                            <button
                                onClick={() => {
                                    onMarkComplete();
                                    onOpenChange(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Just Mark as Completed
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
