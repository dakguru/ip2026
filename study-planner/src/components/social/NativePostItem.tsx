"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { MessageSquare, ThumbsUp, Bookmark, Trash2, Pencil, Check, X, Clock, Send, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export const NativePostItem = ({ post, onSave, isSaved, currentUser, onDelete, onRefresh }: { post: any, onSave?: (id: number) => void, isSaved?: boolean, currentUser?: any, onDelete?: (id: number) => void, onRefresh?: () => void }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showCommentsList, setShowCommentsList] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentText, setCommentText] = useState("");
    const router = useRouter();

    const displayComments = post.comments || [];

    // Comment Edit State
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    const checkAuthAndExecute = (action: () => void) => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            action();
        } else {
            router.push('/login');
        }
    };

    const handleCommentClick = () => {
        checkAuthAndExecute(() => setShowCommentBox(!showCommentBox));
    };

    const handlePostComment = () => {
        checkAuthAndExecute(async () => {
            if (!commentText.trim()) return;

            let authorName = "User";
            if (currentUser) {
                authorName = currentUser.name;
            } else {
                const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
                if (match) {
                    try {
                        const decoded = decodeURIComponent(match[2]);
                        const user = JSON.parse(decoded);
                        authorName = user.name || "User";
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            const newComment = {
                id: Date.now(),
                author: authorName,
                text: commentText,
                timestamp: new Date().toLocaleDateString()
            };

            try {
                const res = await fetch('/api/community/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId: post.id, comment: newComment })
                });

                if (res.ok) {
                    setCommentText("");
                    if (onRefresh) onRefresh();
                }
            } catch (e) {
                console.error("Failed to post comment", e);
            }
        });
    }

    const handleDeleteComment = (commentId: number) => {
        checkAuthAndExecute(async () => {
            if (confirm("Delete this comment?")) {
                try {
                    const res = await fetch(`/api/community/comments?postId=${post.id}&commentId=${commentId}`, {
                        method: 'DELETE'
                    });
                    if (res.ok && onRefresh) onRefresh();
                } catch (e) { console.error(e); }
            }
        });
    };

    const startEditComment = (comment: any) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
    };

    const cancelEditComment = () => {
        setEditingCommentId(null);
        setEditingText("");
    };

    const saveEditComment = (commentId: number) => {
        checkAuthAndExecute(async () => {
            if (!editingText.trim()) return;

            try {
                const res = await fetch('/api/community/comments', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId: post.id, commentId, text: editingText })
                });
                if (res.ok) {
                    setEditingCommentId(null);
                    setEditingText("");
                    if (onRefresh) onRefresh();
                }
            } catch (e) { console.error(e); }
        });
    };

    const toggleCommentsList = () => {
        setShowCommentsList(!showCommentsList);
    };

    const [likesCount, setLikesCount] = useState<number>(post.likes || 0);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    // Sync state with props
    React.useEffect(() => {
        setLikesCount(post.likes || 0);
        if (currentUser && post.likedBy) {
            setHasLiked(post.likedBy.includes(currentUser.name));
        } else {
            setHasLiked(false);
        }
    }, [post.likes, post.likedBy, currentUser]);

    const handleLike = () => {
        checkAuthAndExecute(async () => {
            // Optimistic update
            const newHasLiked = !hasLiked;
            setHasLiked(newHasLiked);
            setLikesCount(prev => newHasLiked ? prev + 1 : prev - 1);

            try {
                const res = await fetch(`/api/community/posts/${post.id}/like`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser?.name || "User" })
                });

                if (!res.ok) {
                    // Revert if failed
                    setHasLiked(!newHasLiked);
                    setLikesCount(prev => !newHasLiked ? prev + 1 : prev - 1);
                }
            } catch (e) {
                console.error("Failed to toggle like", e);
                setHasLiked(!newHasLiked);
                setLikesCount(prev => !newHasLiked ? prev + 1 : prev - 1);
            }
        });
    };

    const formattedDate = post.createdAt ? format(new Date(post.createdAt), 'MMM d, h:mm a') : 'Recently';

    // Helper for Admin Badge
    const isAdmin = (role?: string, name?: string) => {
        const r = role?.toLowerCase() || "";
        const n = name?.toLowerCase() || "";
        return r.includes('admin') || n.includes('admin') || r.includes('mentor');
    };

    const isGoldUser = (role?: string) => role?.toLowerCase().includes('gold');
    const isSilverUser = (role?: string) => role?.toLowerCase().includes('silver');
    const isDiamondUser = (role?: string) => role?.toLowerCase().includes('diamond');
    const isPlatinumUser = (role?: string) => role?.toLowerCase().includes('platinum');

    const AdminBadge = () => (
        <span className="inline-flex items-center gap-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1.5">
            Admin <Check className="w-2.5 h-2.5" />
        </span>
    );

    const UserBadge = ({ role }: { role?: string }) => {
        if (!role) return null;
        const r = role.toLowerCase();

        if (r.includes('diamond')) {
            return (
                <span className="inline-flex items-center gap-0.5 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1.5">
                    Diamond <Check className="w-2.5 h-2.5" />
                </span>
            );
        }
        if (r.includes('platinum')) {
            return (
                <span className="inline-flex items-center gap-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1.5 shadow-sm">
                    Platinum <Check className="w-2.5 h-2.5" />
                </span>
            );
        }
        if (r.includes('gold')) {
            return (
                <span className="inline-flex items-center gap-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1.5 shadow-sm">
                    Gold <Check className="w-2.5 h-2.5" />
                </span>
            );
        }
        if (r.includes('silver')) {
            return (
                <span className="inline-flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1.5 shadow-sm">
                    Silver <Check className="w-2.5 h-2.5" />
                </span>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-4">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm border border-blue-200 dark:border-blue-800">
                            {post.author ? post.author[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                            <div className="flex items-center">
                                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-none">
                                    {post.author}
                                </span>
                                {isAdmin(post.role, post.author) && <AdminBadge />}
                                <UserBadge role={post.role} />
                            </div>
                            <span className="text-[10px] text-zinc-400 mt-0.5 block">{formattedDate}</span>
                        </div>
                    </div>
                    {(currentUser?.role === 'admin' || currentUser?.name === post.author) && (
                        <button
                            onClick={() => onDelete && onDelete(post.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="mb-4">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                        {post.title}
                    </h3>
                    {post.description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                            {post.description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                                #{tag.replace(/\s+/g, '')}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-50 dark:border-zinc-800">
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${hasLiked ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'}`}
                        >
                            <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                            <span>{likesCount || 'Like'}</span>
                        </button>
                        <button
                            onClick={handleCommentClick}
                            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>{displayComments.length || 'Comment'}</span>
                        </button>
                    </div>
                    <button
                        onClick={() => onSave && onSave(post.id)}
                        className={`p-1.5 rounded-full ${isSaved ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'text-zinc-400'}`}
                    >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            {showCommentBox && (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-all"
                            autoFocus
                        />
                        <button
                            onClick={handlePostComment}
                            disabled={!commentText.trim()}
                            className="p-2.5 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 transition-colors shadow-sm"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    {displayComments.length > 0 && (
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {displayComments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300 shrink-0">
                                        {comment.author ? comment.author[0] : 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`rounded-2xl rounded-tl-none p-3 shadow-sm border ${comment.author === 'Admin' ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/50' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800/50'}`}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{comment.author}</span>
                                                {isAdmin(comment.role, comment.author) && <AdminBadge />}
                                                <UserBadge role={comment.role} />
                                                <span className="text-[10px] text-zinc-400">{comment.timestamp}</span>
                                            </div>
                                            {editingCommentId === comment.id ? (
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        value={editingText}
                                                        onChange={(e) => setEditingText(e.target.value)}
                                                        className="flex-1 text-xs border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1"
                                                    />
                                                    <button onClick={() => saveEditComment(comment.id)} className="text-green-600"><Check className="w-3 h-3" /></button>
                                                    <button onClick={cancelEditComment} className="text-red-600"><X className="w-3 h-3" /></button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug whitespace-pre-wrap">
                                                    {comment.text.split(/(\*\*.*?\*\*)/g).map((part: string, i: number) => 
                                                        part.startsWith('**') && part.endsWith('**') 
                                                            ? <strong key={i} className="text-indigo-700 dark:text-indigo-400">{part.slice(2, -2)}</strong> 
                                                            : part
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        {(currentUser?.role === 'admin' || currentUser?.name === comment.author) && !editingCommentId && (
                                            <div className="flex gap-3 px-2 mt-1">
                                                <button onClick={() => startEditComment(comment)} className="text-[10px] font-medium text-zinc-400 hover:text-blue-600">Edit</button>
                                                <button onClick={() => handleDeleteComment(comment.id)} className="text-[10px] font-medium text-zinc-400 hover:text-red-600">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Answer Section (if any) */}
            {post.answer && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 border-t border-green-100 dark:border-green-900/30">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 rounded text-[10px] font-bold uppercase tracking-wider">Answered</span>
                        <span className="font-bold text-xs text-zinc-700 dark:text-zinc-300">by {post.answer.author}</span>
                    </div>
                    <p className={`text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.answer.content}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-bold text-green-600 dark:text-green-400 mt-1"
                    >
                        {isExpanded ? 'Show less' : 'Read full answer'}
                    </button>
                </div>
            )}
        </div>
    );
};
