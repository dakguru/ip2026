'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Trash2, Reply, ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
    _id: string;
    senderName: string;
    senderEmail: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/admin/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            } else {
                // If unauthorized, redirect
                if (res.status === 403) router.push('/login');
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(prev => prev.filter(m => m._id !== id));
            }
        } catch (e) {
            console.error("Delete failed", e);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                        <Mail className="w-8 h-8 text-blue-600" />
                        Admin Messages
                    </h1>
                </div>

                {messages.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">No Messages Yet</h3>
                        <p className="text-zinc-500 max-w-md mx-auto">Messages sent by users via "DM to Admin" will appear here.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {messages.map((msg) => (
                            <div key={msg._id} className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                                            {msg.senderName?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{msg.senderName}</h3>
                                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {msg.senderEmail || 'No Email'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end md:self-start">
                                        {msg.senderEmail && (
                                            <a
                                                href={`mailto:${msg.senderEmail}?subject=Re: Your message to Dak Guru Admin`}
                                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2"
                                            >
                                                <Reply className="w-4 h-4" /> Reply
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg text-zinc-700 dark:text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed border border-zinc-100 dark:border-zinc-800">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
