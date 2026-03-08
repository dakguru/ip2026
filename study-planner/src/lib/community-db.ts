import dbConnect from './mongoose';
import PostModel from '@/models/Post';
import { getEnrichedUsers } from "./db";
import { getMembershipTier, getTierDisplayName } from "./membership-utils";
import UserModel from '@/models/User';

// Re-export interfaces for use in other files
export interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: string;
    likes?: number;
    likedBy?: string[];
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
// Helper: Map Mongoose doc to Post interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(doc: any, userMap?: Map<string, any>): Post {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const comments = doc.comments?.map((c: any) => ({
        id: c.id,
        author: c.author,
        text: c.text,
        timestamp: c.timestamp,
        likes: c.likes || 0,
        likedBy: c.likedBy || []
    })) || [];

    return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        author: doc.author,
        role: getEnrichedRole(doc.author, doc.role, userMap),
        followers: doc.followers,
        views: doc.views,
        answer: doc.answer ? {
            ...doc.answer,
            role: getEnrichedRole(doc.answer.author, doc.answer.role, userMap)
        } : null,
        comments: comments.map((c: any) => ({
            ...c,
            role: getEnrichedRole(c.author, c.role, userMap)
        })),
        tags: doc.tags || [],
        createdAt: doc.createdAt,
        likes: doc.likes,
        likedBy: doc.likedBy || []
    };
}

// Helper to deterministically adding badges to old posts/comments
// Helper to getting badges based on REAL user membership
function getEnrichedRole(author: string, currentRole?: string, userMap?: Map<string, any>): string {
    const role = currentRole || "Aspirant";

    // 1. If we have a user map, assume it's the source of truth
    if (userMap) {
        const user = userMap.get(author);

        // Clean up existing badge strings to avoid duplication if re-processing
        let baseRole = role;
        baseRole = baseRole.replace(/\s*\((Gold|Silver|Diamond|Platinum)\s*Member\)/i, "").trim();
        baseRole = baseRole.replace(/\s*\(Gold\)/i, "").trim();
        baseRole = baseRole.replace(/\s*\(Silver\)/i, "").trim();
        baseRole = baseRole.replace(/\s*\(Diamond\)/i, "").trim();
        baseRole = baseRole.replace(/\s*\(Platinum\)/i, "").trim();

        if (!baseRole) baseRole = "Aspirant";

        // Admin checks
        if (!user || user.role === 'admin' || baseRole.toLowerCase().includes("admin") || author.toLowerCase().includes("dak guru")) {
            return baseRole;
        }

        // Assign badge based on DB membership level + Course Mode
        const tier = getMembershipTier(user.membershipLevel, user.courseMode);

        if (tier === 'diamond') return `${baseRole} (Diamond Member)`;
        if (tier === 'platinum') return `${baseRole} (Platinum Member)`;
        if (tier === 'gold') return `${baseRole} (Gold Member)`;
        if (tier === 'silver') return `${baseRole} (Silver Member)`;

        return baseRole; // Free user
    }

    // Fallback if no userMap provided (should rarely happen if getAllPosts is used)
    const name = author.toLowerCase();

    // 1. Skip admins/official accounts from getting extra badges
    if (name.includes("admin") || name.includes("dak guru") || role.toLowerCase().includes("admin")) {
        return role;
    }

    // 2. If already has a badge, return as is
    if (role.toLowerCase().includes("gold") || role.toLowerCase().includes("silver")) {
        return role;
    }

    // 3. Explicit overrides for the requested users
    if (name.includes("sateesh") || name.includes("vikram") || name.includes("suresh") || name.includes("prabhu")) return `${role} (Gold Member)`;
    if (name.includes("meera")) return `${role} (Silver Member)`;

    // 4. Default: No badge for others (Free users)
    return role;
}

export async function getAllPosts(): Promise<Post[]> {
    await dbConnect();
    const posts = await PostModel.find({}).sort({ createdAt: -1 }).lean();

    // Collect all unique authors
    const authors = new Set<string>();
    posts.forEach((p: any) => {
        if (p.author) authors.add(p.author);
        if (p.answer && p.answer.author) authors.add(p.answer.author);
        if (p.comments) {
            p.comments.forEach((c: any) => {
                if (c.author) authors.add(c.author);
            });
        }
    });

    // Fetch user details for these authors
    const users = await UserModel.find({ name: { $in: Array.from(authors) } }).select('name role membershipLevel courseMode').lean();

    // Create lookup map
    const userMap = new Map<string, any>();
    users.forEach((u: any) => userMap.set(u.name, u));

    return posts.map((post: any) => mapPost(post, userMap));
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

    // Fetch user for this author to return correct badge immediately
    const user = await UserModel.findOne({ name: post.author }).select('name role membershipLevel courseMode').lean();
    const userMap = new Map();
    if (user) userMap.set(user.name, user);

    return mapPost(newPost, userMap);
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
        { $push: { comments: { ...comment, likes: 0, likedBy: [] } } }
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

export async function toggleCommentLike(postId: number, commentId: number, username: string): Promise<{ likes: number, isLiked: boolean } | null> {
    await dbConnect();
    const post = await PostModel.findOne({ id: postId });
    if (!post) return null;

    const comment = post.comments.find((c: any) => c.id === commentId);
    if (!comment) return null;

    let likedBy = comment.likedBy || [];
    let likes = comment.likes || 0;
    const alreadyLiked = likedBy.includes(username);

    if (alreadyLiked) {
        likedBy = likedBy.filter((u: string) => u !== username);
        likes = Math.max(0, likes - 1);
    } else {
        likedBy.push(username);
        likes += 1;
    }

    // Update specific comment in array
    await PostModel.updateOne(
        { id: postId, "comments.id": commentId },
        {
            $set: {
                "comments.$.likes": likes,
                "comments.$.likedBy": likedBy
            }
        }
    );

    return { likes, isLiked: !alreadyLiked };
}
