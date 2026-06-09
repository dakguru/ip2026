
import { cookies } from 'next/headers';
import dbConnect from './mongoose';
import User from '@/models/User';

/**
 * Resolves the logged-in user's role from the server-side session cookie.
 * Never trust a role passed from the client — always look it up here.
 */
export async function getSessionRole(): Promise<'user' | 'admin' | 'super_admin' | null> {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');
        if (!userSession) return null;

        const session = JSON.parse(decodeURIComponent(userSession.value));
        if (!session || !session.email) return null;

        await dbConnect();
        const user = await User.findOne({ email: session.email }).select('role');
        if (!user) return null;

        return (user.role as 'user' | 'admin' | 'super_admin') || 'user';
    } catch (e) {
        console.error("Role check error:", e);
        return null;
    }
}

/**
 * True for both `admin` and `super_admin` — these roles share access to the
 * developer/admin areas. Use a more specific check if super-admin-only gating
 * is ever required.
 */
export async function isAdmin() {
    const role = await getSessionRole();
    return role === 'admin' || role === 'super_admin';
}

export async function getAdminEmail() {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');
        if (!userSession) return null;
        const session = JSON.parse(decodeURIComponent(userSession.value));
        return session.email || null;
    } catch {
        return null;
    }
}
