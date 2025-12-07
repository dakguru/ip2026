import { ConfidenceLevel } from "@/lib/types";
import { AlertTriangle, Star, CheckCircle2, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface ConfidenceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (confidence: ConfidenceLevel) => void;
}

export default function ConfidenceDialog({ open, onOpenChange, onConfirm }: ConfidenceDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
                <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-2xl focus:outline-none z-50 animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
                    <Dialog.Title className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        How confident do you feel?
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                        This helps us schedule your revisions effectively.
                    </Dialog.Description>

                    <div className="space-y-3">
                        <button
                            onClick={() => onConfirm("low")}
                            className="w-full p-4 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center gap-3 transition-colors text-left group"
                        >
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <div>
                                <div className="font-bold text-red-900 dark:text-red-200">Low Confidence</div>
                                <div className="text-xs text-red-700 dark:text-red-300">
                                    Needs immediate logic (Review +2 days)
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => onConfirm("medium")}
                            className="w-full p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 flex items-center gap-3 transition-colors text-left"
                        >
                            <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
                            <div>
                                <div className="font-bold text-yellow-900 dark:text-yellow-200">Medium Confidence</div>
                                <div className="text-xs text-yellow-700 dark:text-yellow-300">Solid, but revisit in 3 days</div>
                            </div>
                        </button>

                        <button
                            onClick={() => onConfirm("high")}
                            className="w-full p-4 rounded-lg border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 flex items-center gap-3 transition-colors text-left"
                        >
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
                            <div>
                                <div className="font-bold text-green-900 dark:text-green-200">High Confidence</div>
                                <div className="text-xs text-green-700 dark:text-green-300">Mastered!</div>
                            </div>
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
                            <X className="w-4 h-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
