import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FlashcardsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 transition-colors">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="max-w-4xl mx-auto text-center py-20">
                <h1 className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">Flashcards</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg">Coming Soon! Quick revision tools.</p>
            </div>
        </div>
    );
}
