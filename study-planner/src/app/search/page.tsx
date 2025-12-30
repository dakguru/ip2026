"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto font-sans text-slate-800">
            <h1 className="text-3xl font-bold mb-6">Search Results</h1>

            {query ? (
                <div>
                    <p className="text-lg mb-8">
                        Showing results for: <span className="font-semibold text-blue-600">"{query}"</span>
                    </p>

                    <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">We're working on it!</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            The advanced global search is currently indexing our vast database of study materials, quizzes, and current affairs. Check back soon!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-slate-500">Please enter a search term to get started.</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading search...</div>}>
            <SearchContent />
        </Suspense>
    );
}
