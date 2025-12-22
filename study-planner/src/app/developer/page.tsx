"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, FileText, Settings, Shield, Plus, Database, UserPlus, FileSignature, LayoutDashboard } from "lucide-react";

export default function DeveloperPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-indigo-600" />
                        Developer CMS
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Manage users, content creators, and system resources.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. Manage Developers */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">Admin</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Manage Developers</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Create and manage accounts with developer access privileges.</p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full py-2 px-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/20 text-sm flex items-center justify-center gap-2 transition-colors">
                                <UserPlus className="w-4 h-4" /> Create Developer
                            </button>
                            <Link href="/admin" className="w-full py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm flex items-center justify-center gap-2 transition-colors">
                                View List
                            </Link>
                        </div>
                    </div>

                    {/* 2. Manage Content Creators */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <FileSignature className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">Content</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Manage Creators</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Authorize users to create and publish study materials.</p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full py-2 px-4 rounded-lg bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-100 dark:hover:bg-purple-900/20 text-sm flex items-center justify-center gap-2 transition-colors">
                                <Plus className="w-4 h-4" /> Add Creator
                            </button>
                            <button className="w-full py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm flex items-center justify-center gap-2 transition-colors">
                                View Creators
                            </button>
                        </div>
                    </div>

                    {/* 3. Postal Documentation (New) */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">Updates</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Postal Documentation</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Compile and publish departmental updates, circulars, and notifications.</p>
                        <div className="flex flex-col gap-2">
                            <Link href="/developer/blog/new" className="w-full py-2 px-4 rounded-lg bg-pink-50 dark:bg-pink-900/10 text-pink-600 dark:text-pink-400 font-medium hover:bg-pink-100 dark:hover:bg-pink-900/20 text-sm flex items-center justify-center gap-2 transition-colors">
                                <Plus className="w-4 h-4" /> Add Update
                            </Link>
                            <Link href="/developer/blog" className="w-full py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm flex items-center justify-center gap-2 transition-colors">
                                View All
                            </Link>
                        </div>
                    </div>

                    {/* Admin Panel (New) */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">Super Admin</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Admin Panel</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Manage users, payment details, and global system settings.</p>
                        <div className="flex flex-col gap-2">
                            <Link href="/admin" className="w-full py-2 px-4 rounded-lg bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 font-medium hover:bg-orange-100 dark:hover:bg-orange-900/20 text-sm flex items-center justify-center gap-2 transition-colors">
                                <Settings className="w-4 h-4" /> Go to Panel
                            </Link>
                        </div>
                    </div>

                    {/* 3. Manage System/Things */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Database className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">System</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Manage Resources</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Manage quizzes, flashcards, PDF notes and other system data.</p>
                        <div className="flex flex-col gap-2">
                            <Link href="/admin" className="w-full py-2 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/20 text-sm flex items-center justify-center gap-2 transition-colors">
                                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                            </Link>
                            <button className="w-full py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm flex items-center justify-center gap-2 transition-colors">
                                System Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Note */}
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 flex gap-4 items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                        <Settings className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Developer Access</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                            This area is restricted to authorized personnel only. Actions taken here directly affect the live application.
                            Please use caution when managing user roles and system resources.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
