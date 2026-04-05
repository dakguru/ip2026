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
        pathname === '/refund-policy' ||
        pathname.startsWith('/dak-sutra') ||
        pathname === '/mock-tests';

    const isLogout = request.nextUrl.searchParams.get('logout') === 'true';
    const reason = request.nextUrl.searchParams.get('reason');
    const isSessionExpired = reason === 'session_expired';
    const isMultipleLogin = reason === 'multiple_login';

    // If user is on login page and has a token, redirect to planner
    // UNLESS they are explicitly logging out, their session expired, or they were kicked out for concurrent login
    if (isLoginPage && token && !isLogout && !isSessionExpired && !isMultipleLogin) {
        return NextResponse.redirect(new URL('/planner', request.url));
    }

    if (isLoginPage && (isLogout || isSessionExpired || isMultipleLogin)) {
        // If explicitly logging out or session expired, ensure we clear cookies and show login page
        const response = NextResponse.next();
        const cookieOptions = {
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        };
        response.cookies.set('auth_token', '', { ...cookieOptions, maxAge: 0 });
        response.cookies.set('user_session', '', { ...cookieOptions, maxAge: 0 });
        response.cookies.set('session_v', '', { ...cookieOptions, maxAge: 0 });
        return response;
    }

    // Protected Routes Logic
    // If it's not a public path and not login page, it requires authentication
    const isProtectedRoute = !isPublicPath && !isLoginPage;

    if (isProtectedRoute) {
        if (!token) {
            // Use 303 to force a GET request to the login page, even if the current request is a POST (e.g. from Razorpay)
            return NextResponse.redirect(new URL('/login', request.url), 303);
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
            const response = NextResponse.redirect(new URL('/login?reason=session_expired', request.url), 303);
            const cookieOptions = {
                path: '/',
                ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
            };
            response.cookies.set('auth_token', '', { ...cookieOptions, maxAge: 0 });
            response.cookies.set('user_session', '', { ...cookieOptions, maxAge: 0 });
            response.cookies.set('session_v', '', { ...cookieOptions, maxAge: 0 });
            return response;
        }

        // NEW: Check for short-term session verification cache (session_v)
        // This avoids hitting the DB on every single navigation within a short window.
        const sessionVerified = request.cookies.get('session_v');
        if (sessionVerified?.value === sessionId) {
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

            const { valid, status } = await validateRes.json();

            if (!valid) {
                const reason = status === 'conflict' ? 'multiple_login' : 'session_expired';
                const response = NextResponse.redirect(new URL(`/login?reason=${reason}`, request.url), 303);
                const cookieOptions = {
                    path: '/',
                    ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
                };
                response.cookies.set('auth_token', '', { ...cookieOptions, maxAge: 0 });
                response.cookies.set('user_session', '', { ...cookieOptions, maxAge: 0 });
                response.cookies.set('session_v', '', { ...cookieOptions, maxAge: 0 });
                return response;
            }

            // Valid session! 
            // We set a short-lived 'session_v' cookie (10 minutes) to cache this verification.
            // This drastically improves navigation speed for the user.
            const response = NextResponse.next();
            const cookieOptions = {
                path: '/',
                maxAge: 600, // 10 minutes cache
                ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
            };
            response.cookies.set('session_v', sessionId, cookieOptions);
            return response;
        } catch (error) {
            console.error('Middleware validation error:', error);
            // On internal error during navigation, we fallback to allowing to prevent blocking the user,
            // as strict security is already handled by individual page components/APIs.
            return NextResponse.next();
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
