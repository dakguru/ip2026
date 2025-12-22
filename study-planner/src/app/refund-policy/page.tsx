import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle, CreditCard, Ban, Clock, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
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
                        Refund Policy
                    </h1>
                    <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                        Please read our policy regarding refunds and cancellations carefully.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 space-y-10">

                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                                <RefreshCw className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">General Policy</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-3">
                            <p>
                                Thank you for choosing Dak Guru. As Dak Guru provides digital educational content and online services, all purchases made on the platform are generally <strong className="text-zinc-900 dark:text-zinc-100">non-refundable and non-transferable</strong>.
                            </p>
                            <p>
                                Once access to paid content is granted, it is deemed to have been delivered.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold shrink-0">
                                <Ban className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No Refund After Access</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p className="mb-3">Refunds will not be provided in the following cases:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Change of mind after purchase</li>
                                <li>Lack of usage or partial usage of content</li>
                                <li>Incompatibility with personal study preferences</li>
                                <li>Failure to clear or qualify in any examination</li>
                                <li>Misinterpretation of course details by the user</li>
                                <li>Internet issues, device issues, or technical problems on the user’s side</li>
                            </ul>
                            <p className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-800/30 text-red-700 dark:text-red-300 text-sm font-medium inline-block">
                                Digital content cannot be “returned,” so once unlocked — it’s final.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Exceptional Cases</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p className="mb-3">Refunds may be considered only in rare and exceptional circumstances, such as:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Duplicate payment due to a technical error</li>
                                <li>Payment debited but access not granted due to system failure</li>
                            </ul>
                            <p className="mb-3">
                                In such cases, users must report the issue within <strong className="text-zinc-900 dark:text-zinc-100">48 hours</strong> of payment along with valid proof (transaction ID, screenshots, etc.).
                            </p>
                            <p className="italic text-sm text-zinc-500">
                                Approval of refunds in these cases is solely at the discretion of Dak Guru.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold shrink-0">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Mode of Refund</h2>
                        </div>
                        <div className="pl-13 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p className="mb-2">If a refund is approved:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>It will be processed through the original mode of payment only</li>
                                <li>Processing time may take 7–10 working days, depending on the payment gateway or bank</li>
                                <li>No cash refunds will be issued.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Sections 5, 6, 7 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Subscription Plans
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                                <li>No refunds will be issued for unused subscription periods</li>
                                <li>Subscription fees are non-prorated</li>
                                <li>Early cancellation does not entitle the user to any refund</li>
                            </ul>
                        </section>

                        <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                <Ban className="w-4 h-4" /> Account Termination
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                If a user’s account is suspended or terminated due to violation of Terms & Conditions, no refund shall be applicable under any circumstances.
                            </p>
                        </section>
                    </div>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Policy Changes</h2>
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                            Dak Guru reserves the right to modify or update this Refund Policy at any time without prior notice. Changes will be effective immediately upon posting on the website.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Acceptance of Policy</h2>
                                <p className="text-zinc-600 dark:text-zinc-300">
                                    By making a purchase on Dak Guru, the user confirms that they have read, understood, and agreed to this Refund Policy in full.
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
