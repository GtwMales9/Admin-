// /app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logout berhasil.', success: true }, { status: 200 });
    
    // Hapus Cookie Sesi
    response.cookies.set('auth_token', '', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 0, 
        path: '/',
    });

    return response;
}