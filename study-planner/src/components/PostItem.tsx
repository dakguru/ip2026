"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Users, MessageSquare, ThumbsUp, Bookmark, Trash2, Pencil, Check, X, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export const PostItem = ({ post, onSave, isSaved, currentUser, onDelete, onRefresh }: { post: any, onSave?: (id: number) => void, isSaved?: boolean, currentUser?: any, onDelete?: (id: number) => void, onRefresh?: () => void }) => {
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
            // Use current user from props or fallback to cookie (in case prop is stale/missing)
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

    // Answer Interaction State
    const [answerLikes, setAnswerLikes] = useState(post.answer?.upvotes || 0);
    const [answerCommentsList, setAnswerCommentsList] = useState(post.answer?.commentsList || []);
    const [hasLikedAnswer, setHasLikedAnswer] = useState(false);
    const [answerCommentText, setAnswerCommentText] = useState("");

    // Sync state with props
    React.useEffect(() => {
        setLikesCount(post.likes || 0);
        if (currentUser && post.likedBy) {
            setHasLiked(post.likedBy.includes(currentUser.name));
        } else {
            setHasLiked(false);
        }

        // Sync Answer State
        if (post.answer) {
            setAnswerLikes(post.answer.upvotes || 0);
            setAnswerCommentsList(post.answer.commentsList || []);
            if (currentUser && post.answer.likedBy) {
                setHasLikedAnswer(post.answer.likedBy.includes(currentUser.name));
            }
        }
    }, [post.likes, post.likedBy, post.answer, currentUser]);

    const handleAnswerLike = () => {
        checkAuthAndExecute(async () => {
            const newLiked = !hasLikedAnswer;
            setHasLikedAnswer(newLiked);
            setAnswerLikes((prev: number) => newLiked ? prev + 1 : prev - 1);

            try {
                await fetch(`/api/community/posts/${post.id}/answer/interact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'like',
                        username: currentUser?.name || "User"
                    })
                });
            } catch (e) {
                console.error(e);
                setHasLikedAnswer(!newLiked);
                setAnswerLikes((prev: number) => !newLiked ? prev + 1 : prev - 1);
            }
        });
    };

    const handlePostAnswerComment = () => {
        checkAuthAndExecute(async () => {
            if (!answerCommentText.trim()) return;

            const newComment = {
                id: Date.now(),
                author: currentUser?.name || "User",
                text: answerCommentText,
                timestamp: "Just now"
            };

            setAnswerCommentsList((prev: any[]) => [...prev, newComment]);
            setAnswerCommentText("");

            try {
                await fetch(`/api/community/posts/${post.id}/answer/interact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'comment',
                        username: currentUser?.name || "User",
                        comment: { ...newComment, timestamp: new Date().toLocaleDateString() }
                    })
                });
            } catch (e) {
                console.error(e);
            }
        });
    };

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

    const formattedDate = post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy • h:mm a') : 'Recently';

    // Helper for Admin Badge
    const isAdmin = (role?: string, name?: string) => {
        const r = role?.toLowerCase() || "";
        const n = name?.toLowerCase() || "";
        return r.includes('admin') || n.includes('admin') || r.includes('mentor');
    };

    const AdminBadge = () => (
        <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-200 dark:border-blue-800 ml-2 shadow-sm">
            Admin <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </span>
    );

    return (
        <div className="p-6 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 text-left border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
            {/* Post Author Info */}
            <div className="flex items-center gap-3 mb-4">
                {/* Avatar for Post Author */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm border border-blue-200 dark:border-blue-800 shadow-sm">
                    {post.author ? post.author[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm group-hover:text-blue-600 transition-colors">
                            {post.author}
                        </span>
                        {isAdmin(post.role, post.author) && <AdminBadge />}
                    </div>
                    <div className="flex items-center text-xs text-zinc-500 gap-2">
                        <span>{post.role}</span>
                        <span>•</span>
                        <span className='flex items-center gap-1'><Clock className="w-3 h-3" /> {formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-3">
                {post.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Question */}
            <Link href="#" className="block group mb-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                </h3>
                {post.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line border-l-2 border-zinc-200 dark:border-zinc-700 pl-3">{post.description}</p>
                )}
            </Link>

            {/* Action Bar */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={handleCommentClick}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-500/20 active:scale-95"
                >
                    <MessageSquare className="w-4 h-4" />
                    {displayComments.length > 0 ? `${displayComments.length} Comments` : 'Comment'}
                </button>

                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${hasLiked ? 'bg-pink-50 border-pink-200 text-pink-600' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:bg-zinc-50'}`}
                >
                    <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-pink-600' : ''}`} /> {likesCount > 0 ? likesCount : 'Like'}
                </button>

                <button
                    onClick={() => onSave && onSave(post.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${isSaved ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:bg-zinc-50'}`}
                >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-600' : ''}`} /> {isSaved ? 'Saved' : 'Save'}
                </button>

                {(currentUser?.role === 'admin' || currentUser?.name === post.author) && (
                    <button
                        onClick={() => onDelete && onDelete(post.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                        title="Delete Question"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Comment Preview (Visible when Comment Box is Closed) */}
            {!showCommentBox && displayComments.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                    {displayComments.length > 2 && (
                        <button
                            onClick={handleCommentClick}
                            className="text-xs font-bold text-zinc-500 hover:text-blue-600 mb-3 flex items-center gap-1 transition-colors"
                        >
                            View all {displayComments.length} comments
                        </button>
                    )}
                    <div className="space-y-3">
                        {displayComments.slice(-2).map((comment: any) => (
                            <div key={comment.id} className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 shrink-0">
                                    {comment.author ? comment.author[0] : 'U'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{comment.author}</span>
                                        {isAdmin(comment.role, comment.author) && <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold border border-blue-200">Admin</span>}
                                        <span className="text-[10px] text-zinc-400">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Full Comment Box and List */}
            {showCommentBox && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300 bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex gap-3 items-start mb-6">
                        {/* Avatar for Current User in Input */}
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-1 shadow-md">
                            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 flex gap-2 items-center">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a meaningful comment..."
                                className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 shadow-sm min-w-0"
                                autoFocus
                            />
                            <button
                                onClick={handlePostComment}
                                className="shrink-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-black dark:hover:bg-zinc-200 transition-colors shadow-sm"
                            >
                                Post
                            </button>
                        </div>
                    </div>

                    {/* Display Comments */}
                    {displayComments.length > 0 && (
                        <div className="space-y-4">
                            {displayComments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-3 group/comment">
                                    {/* Avatar for Comment Author */}
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-xs shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                        {comment.author ? comment.author[0].toUpperCase() : 'U'}
                                    </div>

                                    <div className="flex-1 bg-white dark:bg-zinc-800 p-3 rounded-xl rounded-tl-none border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{comment.author}</span>
                                                {isAdmin(comment.role, comment.author) && <AdminBadge />}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-400 text-[10px]">{comment.timestamp}</span>
                                                {(currentUser?.role === 'admin' || currentUser?.name === comment.author) && !editingCommentId && (
                                                    <div className="flex gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => startEditComment(comment)}
                                                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-400 hover:text-blue-500 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {editingCommentId === comment.id ? (
                                            <div className="flex gap-2 items-center mt-1">
                                                <input
                                                    type="text"
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    className="flex-1 text-xs border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 bg-zinc-50 dark:bg-zinc-900"
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEditComment(comment.id)} className="text-green-600 hover:text-green-700">
                                                    <Check className="w-3 h-3" />
                                                </button>
                                                <button onClick={cancelEditComment} className="text-red-600 hover:text-red-700">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{comment.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Answer Section (Success Stories or Admin Answers) */}
            {post.answer && (
                <div className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm mt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded">Answer</span>
                        {post.answer.level && <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded">{post.answer.level}</span>}
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white">
                            {post.answer.avatar}
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{post.answer.author}</span>
                                {isAdmin(post.answer.role, post.answer.author) && <AdminBadge />}
                            </div>
                            <p className="text-xs text-zinc-500">{post.answer.role}</p>
                        </div>
                    </div>

                    <div className={`text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-3 transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.answer.content}
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 text-xs font-bold hover:underline mb-4 block"
                    >
                        {isExpanded ? 'Show less' : '...more'}
                    </button>

                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                            onClick={handleAnswerLike}
                            className={`flex items-center gap-1 text-xs transition-colors font-bold border px-3 py-1.5 rounded-full ${hasLikedAnswer ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-blue-600 border-transparent hover:bg-zinc-50'}`}
                        >
                            <ThumbsUp className={`w-3.5 h-3.5 ${hasLikedAnswer ? 'fill-blue-600' : ''}`} /> {answerLikes} Helpful
                        </button>
                        <span className="text-zinc-300 text-xs">|</span>
                        <button
                            onClick={toggleCommentsList}
                            className="text-zinc-500 hover:text-blue-600 text-xs text-center transition-colors font-medium hover:underline"
                        >
                            {answerCommentsList.length} Comments
                        </button>
                    </div>

                    {/* Answer Specific Comments (Real) */}
                    {showCommentsList && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 animate-in fade-in duration-300">
                            {/* Comment Input */}
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={answerCommentText}
                                    onChange={(e) => setAnswerCommentText(e.target.value)}
                                    placeholder="Reply to this answer..."
                                    className="flex-1 text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <button
                                    onClick={handlePostAnswerComment}
                                    className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1 rounded-lg text-xs font-bold hover:opacity-90"
                                >
                                    Post
                                </button>
                            </div>

                            {answerCommentsList.length > 0 ? (
                                answerCommentsList.map((comment: any, idx: number) => (
                                    <div key={idx} className="text-xs group bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-zinc-900 dark:text-zinc-100">{comment.author}</span>
                                            <span className="text-[10px] text-zinc-400">{comment.timestamp}</span>
                                        </div>
                                        <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{comment.text}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-zinc-400 italic">No comments yet.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
