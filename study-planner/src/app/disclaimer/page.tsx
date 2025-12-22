import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
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
                        Disclaimer
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                        Important information regarding our affiliation and content policy.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 space-y-8">

                    {/* Main Alert Box */}
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                        <div className="p-3 bg-amber-100 dark:bg-amber-800/20 rounded-full shrink-0">
                            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">Private Educational Initiative</h3>
                            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                                Dak Guru is a private educational initiative created solely for learning, guidance, and exam-preparation purposes.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">No Government Affiliation</h2>
                            <p>
                                This website is <strong className="text-zinc-900 dark:text-zinc-100">not affiliated with, endorsed by, sponsored by, or associated with</strong> the Government of India, the Department of Posts, India Post, or any other government organization, authority, or department.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Information Source & Accuracy</h2>
                            <p>
                                All content provided on Dak Guru—including study materials, MCQs, notes, explanations, and updates—is prepared based on publicly available information, reference materials, and the personal academic understanding of the creators.
                            </p>
                            <p className="mt-3">
                                While every effort is made to ensure accuracy and relevance, the information on this website <strong className="text-zinc-900 dark:text-zinc-100">should not be treated as official or authoritative.</strong>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">User Responsibility</h2>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border-l-4 border-blue-500">
                                <p className="italic text-zinc-600 dark:text-zinc-400">
                                    "Users are strongly advised to verify all information with official notifications, rules, acts, circulars, and government sources before relying on it for examinations or official purposes."
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Branding & Liability</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>The use of the name <strong>“Dak Guru”</strong> is purely for branding and educational identity and does not imply any official status or government recognition.</li>
                                <li>By using this website, you acknowledge and agree that Dak Guru shall not be held responsible for any errors, omissions, or consequences arising from the use of the content provided.</li>
                            </ul>
                        </section>
                    </div>

                </div>

                <div className="mt-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
