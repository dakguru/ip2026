
import { getAllPosts } from '@/lib/community-db';
import SocialClient from './SocialClient';

export const dynamic = 'force-dynamic';

export default async function QueriesPage() {
    const posts = await getAllPosts();
    // Transform data to ensure it's serializable (handling potential Mongoose Date objects)
    const serializedPosts = JSON.parse(JSON.stringify(posts));

    return (
        <SocialClient initialPosts={serializedPosts} />
    );
}
