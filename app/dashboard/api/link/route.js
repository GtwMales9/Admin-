// app/dashboard/api/link/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Link from '@/models/Link';
import { isAuthenticated } from '@/lib/auth'; 

export async function POST(req) {
    await dbConnect();

    // 1. Cek Autentikasi Admin
    if (!isAuthenticated(req)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // --- MODIFIKASI: Ambil expirationDays (default 7 hari) ---
        const { slug, botToken, chatId, websiteName, expirationDays = 7 } = await req.json();
        
        // Validasi: Pastikan hari adalah angka antara 1 dan 30 (batas maksimal)
        const days = Math.max(1, Math.min(30, parseInt(expirationDays, 10)));
        // -----------------------------------------------------------------

        // HITUNG TANGGAL KADALUARSA
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days); 

        const newLink = new Link({
            slug: slug.toLowerCase(),
            telegramBotToken: botToken,
            telegramChatId: chatId,
            websiteName: websiteName,
            expiresAt: expirationDate, // <--- DISIMPAN
        });

        await newLink.save();
        
        return NextResponse.json({ success: true, link: newLink }, { status: 201 });

    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: 'Slug sudah digunakan.' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Gagal membuat link', error: error.message }, { status: 500 });
    }
}
// ... (lanjutan GET dan DELETE)