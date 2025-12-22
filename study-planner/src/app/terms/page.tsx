import Link from "next/link";
import { ArrowLeft, ShieldAlert, FileText, Scale, Eye, Lock } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
                        Terms & Conditions <span className="text-zinc-400 font-normal ml-2 text-2xl">| Disclaimer</span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using our platform.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 space-y-10">

                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                                1
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Nature of the Platform</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Dak Guru is a privately owned, independent educational website operated as a self-learning and exam-preparation platform. It is <strong className="text-zinc-900 dark:text-zinc-100">not</strong> an official website of the Government of India, the Department of Posts, India Post, or any other government body, authority, or institution.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                                2
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No Affiliation or Endorsement</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Dak Guru does not claim any affiliation, association, authorization, endorsement, or sponsorship from any government organization or authority. Any resemblance in terminology, syllabus references, or subject matter is purely for academic and educational purposes.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
                                3
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Educational Use Only</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
                            <p>
                                All content available on this website—including but not limited to study materials, notes, MCQs, explanations, flashcards, planners, mock tests, and updates—is provided strictly for educational and informational purposes only.
                            </p>
                            <p>
                                The content does not constitute official advice, legal interpretation, or authoritative instruction, and shall not be treated as a substitute for official rules, acts, notifications, circulars, or examination instructions issued by competent authorities.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold shrink-0">
                                4
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Accuracy & Limitation of Liability</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
                            <p>
                                While reasonable efforts are made to ensure accuracy, completeness, and relevance of the content, Dak Guru makes no warranties or guarantees, express or implied, regarding correctness, reliability, or timeliness.
                            </p>
                            <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/20">
                                <p className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Dak Guru shall not be held liable for:</p>
                                <ul className="list-disc pl-5 space-y-1 text-rose-700 dark:text-rose-300">
                                    <li>Any errors or omissions in content</li>
                                    <li>Any loss, damage, or consequence arising from reliance on the content</li>
                                    <li>Any academic, professional, or examination-related outcomes</li>
                                </ul>
                            </div>
                            <p>
                                Use of the website and its content is entirely at the user’s own risk.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                5
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Verification Responsibility</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Users are solely responsible for verifying information with official government sources, notifications, rules, acts, and examination authorities before relying on it for exams, applications, or official work.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                                6
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Intellectual Property</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                All original content, design, branding, and structure of Dak Guru are the intellectual property of the platform, unless otherwise stated. Unauthorized copying, reproduction, redistribution, or commercial use of content is strictly prohibited.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold shrink-0">
                                7
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Branding Clarification</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                The name “Dak Guru” is a brand name chosen for educational identity purposes only and does not imply government ownership, approval, or official recognition.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold shrink-0">
                                8
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Acceptance of Terms</h2>
                        </div>
                        <div className="pl-11 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                By accessing or using Dak Guru, you acknowledge that you have read, understood, and agreed to this disclaimer and the associated Terms & Conditions in full.
                            </p>
                        </div>
                    </section>

                </div>

                <div className="mt-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                    © {new Date().getFullYear()} Dak Guru. All rights reserved.
                </div>
            </div>
        </div>
    );
}
