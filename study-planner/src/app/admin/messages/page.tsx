'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Trash2, Reply, ArrowLeft, Loader2, Calendar, Search, MessageSquare, Users, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
    _id: string;
    senderName: string;
    senderEmail: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

const AVATAR_COLORS = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-blue-600',
];

function getAvatarColor(name: string) {
    const index = (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

function formatRelativeTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor(diff / 60000);
    if (days > 6) return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return 'Just now';
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
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
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(prev => prev.filter(m => m._id !== id));
            }
        } catch (e) {
            console.error("Delete failed", e);
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = messages.filter(m =>
        m.senderName?.toLowerCase().includes(search.toLowerCase()) ||
        m.senderEmail?.toLowerCase().includes(search.toLowerCase()) ||
        m.message?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Loading messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="border-b border-white/5 bg-white/3 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-4 h-4 text-slate-300" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Mail className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white leading-none">Admin Messages</h1>
                                <p className="text-xs text-slate-400 mt-0.5">{messages.length} total message{messages.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all w-56"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
                {/* Mobile search */}
                <div className="relative sm:hidden mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>

                {/* Stats row */}
                {messages.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { icon: MessageSquare, label: 'Total', value: messages.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { icon: Users, label: 'Senders', value: new Set(messages.map(m => m.senderEmail)).size, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                            { icon: Clock, label: 'Today', value: messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        ].map(({ icon: Icon, label, value, color, bg }) => (
                            <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-4 h-4 ${color}`} />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-white leading-none">{value}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Messages */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
                            <Mail className="w-9 h-9 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-300 mb-2">
                            {search ? 'No results found' : 'No Messages Yet'}
                        </h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">
                            {search ? `No messages match "${search}"` : 'Messages sent by users via "DM to Admin" will appear here.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {filtered.map((msg) => (
                            <div
                                key={msg._id}
                                className={`group bg-white/3 border border-white/8 rounded-2xl p-5 hover:bg-white/6 hover:border-white/15 transition-all duration-200 ${deletingId === msg._id ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAvatarColor(msg.senderName)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
                                        {msg.senderName?.[0]?.toUpperCase() || 'U'}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3 mb-1">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-white truncate">{msg.senderName}</h3>
                                                <p className="text-xs text-slate-500 truncate">{msg.senderEmail || 'No email'}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatRelativeTime(msg.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Message body */}
                                        <p className="text-slate-300 text-sm leading-relaxed mt-3 whitespace-pre-wrap bg-white/3 border border-white/6 rounded-xl px-4 py-3">
                                            {msg.message}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 mt-3">
                                            {msg.senderEmail && (
                                                <a
                                                    href={`mailto:${msg.senderEmail}?subject=Re: Your message to Dak Guru Admin`}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 border border-blue-500/25 text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-500/25 transition-colors"
                                                >
                                                    <Reply className="w-3.5 h-3.5" /> Reply via Email
                                                </a>
                                            )}
                                            <button
                                                onClick={() => handleDelete(msg._id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/0 border border-transparent text-slate-600 rounded-lg text-xs font-medium hover:bg-red-500/15 hover:border-red-500/25 hover:text-red-400 transition-all ml-auto"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
