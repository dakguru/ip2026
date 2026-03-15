"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, XCircle } from 'lucide-react';

interface ConfirmExitModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
}

export default function ConfirmExitModal({
    isOpen,
    onConfirm,
    onCancel,
    title = "End Session?",
    message = "Your current practice session will be closed. Do you really want to go back?"
}: ConfirmExitModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onCancel}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 w-full max-w-sm relative shadow-2xl z-10 text-center border border-zinc-100 dark:border-zinc-800"
                    >
                        <button 
                            onClick={onCancel}
                            className="absolute right-6 top-6 p-2 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>

                        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                            {title}
                        </h3>
                        
                        <p className="text-zinc-500 dark:text-zinc-400 mb-10 font-medium leading-relaxed">
                            {message}
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onConfirm}
                                className="w-full py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-zinc-200 dark:shadow-none"
                            >
                                Yes, Go Back
                            </button>
                            <button
                                onClick={onCancel}
                                className="w-full py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                            >
                                No, Keep Practicing
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
