// /app/api/auth/login/route.js
import { NextResponse } from 'next/server';

// GANTI DENGAN VARIABEL ENV DI PROD
const ADMIN_USERNAME = 'admin'; 
const ADMIN_PASSWORD = 'password123'; 

export async function POST(request) {
    const { username, password } = await request.json();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return NextResponse.json({ message: 'Username atau password salah.' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Login berhasil!', success: true }, { status: 200 });
    
    // Set Cookie Sesi
    const token = `session_${Date.now()}`; 
    response.cookies.set('auth_token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7, 
        path: '/',
    });

    return response;
}