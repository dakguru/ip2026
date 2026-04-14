"use client";

import { Bookmark, X, ChevronRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfBookmarkOverlayProps {
    isVisible: boolean;
    onClose: () => void;
    bookmarks: number[];
    onJump: (page: number) => void;
    onRemove: (page: number) => void;
    colorMode: 'light' | 'dark' | 'sepia';
}

export default function PdfBookmarkOverlay({ 
    isVisible, onClose, bookmarks, onJump, onRemove, colorMode
}: PdfBookmarkOverlayProps) {
    
    const colorStyles = {
        ui: colorMode === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : colorMode === 'sepia' ? 'bg-[#fdf6e3] border-[#d4c39c] text-[#3d2e24]' : 'bg-white border-zinc-200 text-zinc-900',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`absolute top-0 right-0 bottom-0 w-72 z-50 shadow-2xl flex flex-col ${colorStyles.ui}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                                <Bookmark className="w-4 h-4 text-amber-500" fill="currentColor" />
                                Bookmarks
                            </h3>
                            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-2">
                            {bookmarks.length === 0 ? (
                                <div className="h-40 flex flex-col items-center justify-center text-center p-6 opacity-40">
                                    <Bookmark className="w-8 h-8 mb-2" />
                                    <p className="text-xs font-bold leading-relaxed">No bookmarks yet.<br/>Tag pages to see them here.</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {bookmarks.map((page) => (
                                        <div 
                                            key={page}
                                            className="group flex items-center gap-1"
                                        >
                                            <button 
                                                onClick={() => { onJump(page); onClose(); }}
                                                className="flex-1 flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors text-left"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold">Page {page}</span>
                                                    <span className="text-[10px] opacity-50 uppercase font-black tracking-tighter">Saved Position</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                            <button 
                                                onClick={() => onRemove(page)}
                                                className="p-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t opacity-40 text-center">
                            <p className="text-[9px] font-black uppercase tracking-widest">Bookmarks persist locally</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
