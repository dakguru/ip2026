
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import PostModel from '@/models/Post';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { action, username, comment } = body;

        await dbConnect();
        const post = await PostModel.findOne({ id: Number(id) });

        if (!post || !post.answer) {
            return NextResponse.json({ error: 'Post or answer not found' }, { status: 404 });
        }

        // Initialize fields if missing
        if (!post.answer.likedBy) post.answer.likedBy = [];
        if (!post.answer.commentsList) post.answer.commentsList = [];
        if (typeof post.answer.upvotes !== 'number') post.answer.upvotes = 0;
        if (typeof post.answer.comments !== 'number') post.answer.comments = 0;

        if (action === 'like') {
            const alreadyLiked = post.answer.likedBy.includes(username);

            if (alreadyLiked) {
                // Unlike
                post.answer.likedBy = post.answer.likedBy.filter((u: string) => u !== username);
                post.answer.upvotes = Math.max(0, post.answer.upvotes - 1);
            } else {
                // Like
                post.answer.likedBy.push(username);
                post.answer.upvotes += 1;
            }
        } else if (action === 'comment') {
            if (!comment || !comment.text) {
                return NextResponse.json({ error: 'Invalid comment' }, { status: 400 });
            }

            post.answer.commentsList.push(comment);
            post.answer.comments = post.answer.commentsList.length;
        }

        // Since 'answer' is Mixed, we must mark it as modified
        post.markModified('answer');
        await post.save();

        return NextResponse.json({
            success: true,
            answer: post.answer
        });

    } catch (error) {
        console.error('Error interacting with answer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
