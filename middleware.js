// /middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/dashboard/links', '/dashboard/logs', '/dashboard/settings', '/dashboard/create'];
const authRoutes = ['/dashboard/login'];
const AUTH_COOKIE_NAME = 'auth_token';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(url.pathname);

    if (isProtected && !token) {
        url.pathname = '/dashboard/login';
        return NextResponse.redirect(url);
    }

    if (isAuthRoute && token) {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/dashboard'],
};