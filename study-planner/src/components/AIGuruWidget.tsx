"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Sparkles, MessageSquare, Loader2, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function AIGuruWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I am **AI Guru**, your 24x7 study companion for **IP Exam 2026**. Application of rules, syllabus topics, or just a quick doubt - ask me anything!",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the very first welcome message if it's static, 
            // but keeping it helps context if needed. Gemini handles it.)
            const apiHistory = messages.slice(1).map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch('/api/ai-guru/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    history: apiHistory
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "I'm having trouble connecting to the server right now. Please check if the API Key is configured or try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end pointer-events-none">
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-zinc-900 w-[350px] md:w-[400px] h-[500px] md:h-[600px] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden mb-4"
                        >
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between text-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none">AI Guru 24x7</h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-xs font-medium text-white/90">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50 scroll-smooth custom-scrollbar">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === 'user'
                                                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-none'
                                                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-700 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.role === 'assistant' ? (
                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>

                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 shrink-0 mt-1">
                                                <User className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                                            <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about rules, acts or syllabus..."
                                        disabled={isLoading}
                                        className="w-full pl-4 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 text-sm"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-center text-zinc-400 mt-2">
                                    AI Guru can make mistakes. Verify critical info from official sources.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`h-14 w-14 md:h-16 md:w-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative group ${isOpen
                            ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rotate-90'
                            : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                        }`}
                >
                    {isOpen ? <X className="w-6 h-6 md:w-8 md:h-8" /> : <MessageSquare className="w-6 h-6 md:w-8 md:h-8 fill-current" />}

                    {/* Ping Effect when closed */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
                        </span>
                    )}

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        Ask AI Guru
                    </span>
                </motion.button>
            </div>
        </div>
    );
}
