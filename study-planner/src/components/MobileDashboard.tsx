"use client";

import HomeHeader from "@/components/HomeHeader";
import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import QuickActions from "@/components/dashboard/QuickActions";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import ExamCategoryPills from "@/components/dashboard/ExamCategoryPills";
import MobileBottomNav from "@/components/MobileBottomNav";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-24">
            {/* Custom Header for Mobile Dashboard (Simpler than Web) */}
            <div className="sticky top-0 z-40 bg-white dark:bg-zinc-950 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Good Morning,</span>
                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{displayName}</span>
                </div>
                <div className="flex items-center gap-3">
                    {/* Notification Icon could go here */}
                    <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold">
                        {displayName.charAt(0)}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <DashboardCarousel />

                <ExamCategoryPills />

                <QuickActions />

                <ContinueLearning />

                {/* Recent Tests Section */}
                <div className="px-4 mt-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-3">Recommended Tests</h3>
                    <div className="space-y-3">
                        {[1, 2].map(i => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded">FULL MOCK</span>
                                    <span className="text-xs text-zinc-500">2 Hrs</span>
                                </div>
                                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 mb-1">LDCE IP 2026 Full Mock Test {i}</h4>
                                <div className="flex items-center gap-3 text-xs text-zinc-500">
                                    <span>150 Questions</span>
                                    <span>•</span>
                                    <span>300 Marks</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-zinc-50 dark:border-zinc-800 flex justify-between items-center">
                                    <span className="text-xs font-semibold text-green-600">Avg Score: 180</span>
                                    <button className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full">Attempt</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Spacer for Bottom Nav */}
            <div className="h-16"></div>

            {/* Bottom Nav is rendered by Layout, but we ensure it works well with this padding */}
        </div>
    );
}
