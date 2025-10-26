// app/dashboard/api/login/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Pastikan ini terhubung ke .env.local via Vercel
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'admin_auth_token'; 
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 hari

export async function POST(req) {
    const { username, password } = await req.json();

    // Asumsi: ADMIN_PASSWORD di .env.local adalah hash, atau kita hash saat pertama kali dijalankan. 
    // Untuk demo ini, kita asumsikan ADMIN_PASSWORD yang di .env.local sudah di-hash.

    if (username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD)) {
        
        const token = jwt.sign(
            { username: ADMIN_USERNAME },
            JWT_SECRET,
            {
                // --- MODIFIKASI: Sesi admin menjadi 30 hari ---
                expiresIn: '30d', 
            }
        );

        const response = NextResponse.json({ success: true, message: 'Login berhasil' });
        
        // Atur cookie dengan waktu kadaluarsa 30 hari
        response.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: COOKIE_MAX_AGE_SECONDS, 
            path: '/',
        });

        return response;

    } else {
        // ... (handling error)
        return NextResponse.json({ success: false, message: 'Username atau password salah' }, { status: 401 });
    }
}