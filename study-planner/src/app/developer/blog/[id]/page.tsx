"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        category: "Circular",
        description: "",
        link: "",
        image: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) throw new Error("Failed to fetch post");
                const data = await res.json();
                setFormData({
                    title: data.title,
                    date: data.date,
                    category: data.category,
                    description: data.description,
                    link: data.link,
                    image: data.image || ""
                });
            } catch (error) {
                console.error(error);
                alert("Failed to load post details");
                router.push("/developer/blog");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update post');
            }

            alert("Post updated successfully!");
            router.push("/developer/blog");
            router.refresh();

        } catch (error) {
            console.error(error);
            alert("Failed to update post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <Link href="/developer/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        Edit Blog Post
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100 placeholder:text-zinc-400"
                            placeholder="e.g., GDS Engagement Guidelines 2026"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Featured Image URL (Optional)</label>
                        <input
                            type="url"
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100 placeholder:text-zinc-400"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date</label>
                            <input
                                required
                                type="date"
                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                            <select
                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Circular</option>
                                <option>Order</option>
                                <option>Notification</option>
                                <option>Memo</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100 placeholder:text-zinc-400 resize-none"
                            placeholder="Brief summary of the update..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Document Link (PDF/Image URL)</label>
                        <input
                            type="url"
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-zinc-100 placeholder:text-zinc-400"
                            placeholder="https://..."
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Link href="/developer/blog" className="px-6 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
