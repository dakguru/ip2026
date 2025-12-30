import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === '/login';
    const isPublicPath = pathname === '/' || pathname.startsWith('/guide') || pathname.startsWith('/social') || pathname.startsWith('/api/auth') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');

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

        // Validate session
        try {
            const [email, sessionId] = token.value.split(':');

            if (!email || !sessionId) {
                const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
                response.cookies.delete('auth_token');
                response.cookies.delete('user_session');
                return response;
            }

            // Call internal API for validation (middleware can't use DB directly easily)
            const baseUrl = request.nextUrl.origin;
            const validateRes = await fetch(`${baseUrl}/api/auth/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, sessionId })
            });

            if (!validateRes.ok) {
                // Critical error or unauthorized
                const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
                response.cookies.delete('auth_token');
                response.cookies.delete('user_session');
                return response;
            }

            const { valid } = await validateRes.json();

            if (!valid) {
                const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
                response.cookies.delete('auth_token');
                response.cookies.delete('user_session');
                return response;
            }
        } catch (error) {
            console.error('Middleware session check failed:', error);
            // On error, let the request through or handle fallback? 
            // Better to fail safe (require login)
            const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url));
            response.cookies.delete('auth_token');
            response.cookies.delete('user_session');
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
