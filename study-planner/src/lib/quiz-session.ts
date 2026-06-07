import { cookies } from 'next/headers';
import dbConnect from './mongoose';
import User from '@/models/User';

export interface SessionUser {
    _id: any;
    name: string;
    email: string;
}

/**
 * Resolves the authenticated user from the `user_session` cookie and looks them
 * up in the database. Returns null when there is no valid session.
 *
 * Security: every MCQ attempt / bookmark / PDF route derives the user_id from
 * this server-side session — never from the request body — so a user can only
 * ever read or write their own data.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');
        if (!userSession?.value) return null;

        let sessionData: any;
        try {
            sessionData = JSON.parse(decodeURIComponent(userSession.value));
        } catch {
            sessionData = JSON.parse(userSession.value);
        }
        if (!sessionData?.email) return null;

        await dbConnect();
        const user = await User.findOne({ email: sessionData.email }).select('_id name email');
        if (!user) return null;

        return { _id: user._id, name: user.name, email: user.email };
    } catch (e) {
        console.error('getSessionUser error:', e);
        return null;
    }
}
