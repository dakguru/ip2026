import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, Cookie, Share2, Lock, UserCheck, ExternalLink, RefreshCcw, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                        Privacy Policy
                    </h1>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                        We are committed to protecting the privacy and security of your personal information.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 space-y-10">

                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                                1
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Introduction</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Welcome to Dak Guru. Your privacy is important to us, and we are committed to protecting the personal information you share while using our website and services.
                            </p>
                            <p className="mt-2">
                                This Privacy Policy explains how Dak Guru collects, uses, stores, and safeguards user information when you access or use the platform.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                                <Eye className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Information We Collect</h2>
                        </div>
                        <div className="pl-13 space-y-4">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-xl">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">a) Personal Information</h3>
                                <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-300 text-sm">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Mobile number</li>
                                    <li>Login credentials</li>
                                    <li>Payment-related details (processed securely through third-party payment gateways; Dak Guru does not store card or banking details)</li>
                                </ul>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-xl">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">b) Non-Personal Information</h3>
                                <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-300 text-sm">
                                    <li>Browser type</li>
                                    <li>Device information</li>
                                    <li>IP address</li>
                                    <li>Pages visited, time spent, and interaction data</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
                                3
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Purpose of Data Collection</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p className="mb-2">The information collected is used for the following purposes:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>User registration and account management</li>
                                <li>Providing access to learning content and services</li>
                                <li>Processing payments and transactions</li>
                                <li>Improving website functionality and user experience</li>
                                <li>Communicating updates, notices, or service-related information</li>
                                <li>Preventing fraud, misuse, or unauthorized access</li>
                                <li>Legal and compliance obligations</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                <Cookie className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Cookies & Tracking Technologies</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Dak Guru may use cookies and similar technologies to enhance user experience, analyze usage patterns, and improve platform performance.
                            </p>
                            <p className="mt-2 text-sm italic">
                                Users may disable cookies through browser settings; however, some features of the website may not function properly as a result.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 & 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold shrink-0">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Data Sharing & Disclosure</h2>
                            </div>
                            <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed space-y-2">
                                <p>Dak Guru does not sell, rent, or trade users’ personal information.</p>
                                <p>Information may be shared only:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>With trusted third-party service providers (solely for operational purposes)</li>
                                    <li>When required by law or government authority</li>
                                    <li>To protect the rights and safety of Dak Guru and its users</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Data Security</h2>
                            </div>
                            <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                                <p className="mb-2">
                                    We implement reasonable security measures to protect user data against unauthorized access.
                                </p>
                                <p>
                                    However, no method of data transmission over the internet is 100% secure, and Dak Guru cannot guarantee absolute security.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Section 7 - User Responsibilities */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold shrink-0">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">User Responsibilities</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p>
                                Users are responsible for maintaining the confidentiality of their login credentials. Dak Guru shall not be liable for any loss or damage arising from unauthorized access due to user negligence.
                            </p>
                        </div>
                    </section>

                    {/* Section 8, 9, 10 */}
                    <div className="space-y-6 pt-4">
                        <div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" /> Third-Party Links
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 pl-6">
                                The website may contain links to external websites. Dak Guru is not responsible for the privacy practices or content of such third-party sites. Users are advised to review their respective privacy policies.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Children’s Privacy</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 pl-6">
                                Dak Guru is intended for users preparing for competitive examinations. We do not knowingly collect personal information from children below the age of 18. If such information is inadvertently collected, it will be deleted.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                <Database className="w-4 h-4" /> Data Retention
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 pl-6">
                                User information is retained only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.
                            </p>
                        </div>
                    </div>

                    {/* Section 11 - Changes */}
                    <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <RefreshCcw className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Changes to This Policy</h2>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                            Dak Guru reserves the right to update or modify this Privacy Policy at any time without prior notice. Changes will be effective immediately upon being posted on the website. Continued use of the website after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Section 12 - Consent */}
                    <section className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">User Consent</h2>
                                <p className="text-zinc-600 dark:text-zinc-300">
                                    By accessing or using Dak Guru, you consent to the collection and use of information in accordance with this Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

                <div className="mt-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
