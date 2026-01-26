
import { cookies } from 'next/headers';
import dbConnect from './mongoose';
import User from '@/models/User';

export async function isAdmin() {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');

        if (!userSession) return false;

        const session = JSON.parse(decodeURIComponent(userSession.value));
        if (!session || !session.email) return false;

        await dbConnect();
        const user = await User.findOne({ email: session.email }).select('role');

        return user && user.role === 'admin';
    } catch (e) {
        console.error("Admin check error:", e);
        return false;
    }
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
