
"use client";

import DakSutraForm from "@/components/admin/DakSutraForm";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";

export default function EditDakSutraPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/dak-sutra/${id}`)
            .then(res => res.json())
            .then(data => {
                setEntry(data.entry);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!entry) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <p className="text-zinc-500">Entry not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8">
            <DakSutraForm initialData={entry} isEdit />
        </div>
    );
}
