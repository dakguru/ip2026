import dbConnect from './mongoose';
import PostModel from '@/models/Post';

// Re-export interfaces for use in other files
export interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: string;
}

export interface Post {
    id: number;
    title: string;
    description?: string;
    author: string;
    role: string;
    followers: string;
    views: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answer: any | null;
    comments: Comment[];
    tags: string[];
    createdAt: string;
    likes?: number;
    likedBy?: string[];
}

// Helper: Map Mongoose doc to Post interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(doc: any): Post {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const comments = doc.comments?.map((c: any) => ({
        id: c.id,
        author: c.author,
        text: c.text,
        timestamp: c.timestamp
    })) || [];

    return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        author: doc.author,
        role: doc.role,
        followers: doc.followers,
        views: doc.views,
        answer: doc.answer,
        comments: comments,
        tags: doc.tags || [],
        createdAt: doc.createdAt,
        likes: doc.likes,
        likedBy: doc.likedBy || []
    };
}

export async function getAllPosts(): Promise<Post[]> {
    await dbConnect();
    const posts = await PostModel.find({}).sort({ createdAt: -1 }); // Newest first
    return posts.map(mapPost);
}

// No longer needed for external consumers, but kept for compatibility logic if any
export async function savePosts(posts: Post[]) {
    // No-op or bulk write if really needed, but generally we operate on individual items
    // This signature was for replacing the whole JSON.
    // For Mongoose, we shouldn't really use this pattern.
}

export async function addPost(post: Post): Promise<Post> {
    await dbConnect();
    // Ensure defaults
    const newPost = await PostModel.create({
        ...post,
        likes: 0,
        likedBy: [],
        comments: []
    });
    return mapPost(newPost);
}

export async function deletePost(id: number): Promise<boolean> {
    await dbConnect();
    const result = await PostModel.deleteOne({ id });
    return result.deletedCount > 0;
}

// Comments
export async function addComment(postId: number, comment: Comment): Promise<boolean> {
    await dbConnect();
    const result = await PostModel.updateOne(
        { id: postId },
        { $push: { comments: comment } }
    );
    return result.modifiedCount > 0;
}

export async function updateComment(postId: number, commentId: number, newText: string): Promise<boolean> {
    await dbConnect();
    // Use array filters to update specific comment
    const result = await PostModel.updateOne(
        { id: postId, "comments.id": commentId },
        { $set: { "comments.$.text": newText } }
    );
    return result.modifiedCount > 0;
}

export async function deleteComment(postId: number, commentId: number): Promise<boolean> {
    await dbConnect();
    const result = await PostModel.updateOne(
        { id: postId },
        { $pull: { comments: { id: commentId } } }
    );
    return result.modifiedCount > 0;
}

export async function toggleLike(postId: number, username: string): Promise<{ likes: number, liked: boolean } | null> {
    await dbConnect();
    const post = await PostModel.findOne({ id: postId });
    if (!post) return null;

    let likedBy = post.likedBy || [];
    let likes = post.likes || 0;
    const alreadyLiked = likedBy.includes(username);

    if (alreadyLiked) {
        likedBy = likedBy.filter((u: string) => u !== username);
        likes = Math.max(0, likes - 1);
    } else {
        likedBy.push(username);
        likes += 1;
    }

    // Update DB
    await PostModel.updateOne({ id: postId }, { likes, likedBy });

    return { likes, liked: !alreadyLiked };
}
