
import { NextResponse } from 'next/server';
import { toggleCommentLike } from '@/lib/community-db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { postId, commentId, username } = body;

        if (!postId || !commentId || !username) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const result = await toggleCommentLike(postId, commentId, username);

        if (result) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('[Comments Like API] Error toggling like:', error);
        return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
    }
}
