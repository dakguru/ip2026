import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === '/login';
    const isPublicPath = pathname === '/' ||
        pathname.startsWith('/guide') ||
        pathname.startsWith('/social') ||
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password') ||
        pathname === '/about' ||
        pathname === '/privacypolicy' ||
        pathname === '/terms' ||
        pathname === '/disclaimer' ||
        pathname === '/refund-policy';

    // If user is on login page and has a valid token, redirect to planner
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/planner', request.url));
    }

    // Protected Routes Logic
    // If it's not a public path and not login page, it requires authentication
    const isProtectedRoute = !isPublicPath && !isLoginPage;

    if (isProtectedRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Parse token safely
        let email = "";
        let sessionId = "";

        try {
            const parts = token.value.split(':');
            if (parts.length === 2) {
                [email, sessionId] = parts;
            }
        } catch (e) {
            console.error("Token parse error", e);
        }

        if (!email || !sessionId) {
            const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
            response.cookies.delete('auth_token');
            response.cookies.delete('user_session');
            response.cookies.delete('session_v');
            return response;
        }

        // Check if session was verified recently (avoid DB call)
        const isVerified = request.cookies.get('session_v');
        if (isVerified && isVerified.value === sessionId) {
            return NextResponse.next();
        }

        // Validate session via internal API with a timeout
        try {
            const baseUrl = request.nextUrl.origin;

            // Set an 8-second timeout for session validation to prevent "white screen" hang
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const validateRes = await fetch(`${baseUrl}/api/auth/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, sessionId }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!validateRes.ok) {
                const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
                response.cookies.delete('auth_token');
                response.cookies.delete('user_session');
                response.cookies.delete('session_v');
                return response;
            }

            const { valid } = await validateRes.json();

            if (!valid) {
                const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
                response.cookies.delete('auth_token');
                response.cookies.delete('user_session');
                response.cookies.delete('session_v');
                return response;
            }

            // Valid session! Set verification cookie for 10 minutes to skip DB check
            const response = NextResponse.next();
            response.cookies.set('session_v', sessionId, {
                maxAge: 600, // 10 minutes
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
            return response;
        } catch (error) {
            console.error('Middleware validation error:', error);
            // On internal error, we fallback to login for security
            const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
            response.cookies.delete('auth_token');
            response.cookies.delete('user_session');
            response.cookies.delete('session_v');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    ],
};
