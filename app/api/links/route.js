// /app/api/links/route.js
import dbConnect from '@/lib/db';
import LinkModel from '@/models/Link';
import { NextResponse } from 'next/server';

// ==============================================
// METHOD GET: Mengambil Daftar Semua Link
// ==============================================
export async function GET() {
    await dbConnect();
    try {
        const links = await LinkModel.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(links, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal mengambil daftar link.' }, { status: 500 });
    }
}

// ==============================================
// METHOD POST: Membuat Link Baru
// ==============================================
export async function POST(request) {
    await dbConnect();
    try {
        const data = await request.json();
        const { websiteName, botToken, chatId, slug } = data;

        if (!websiteName || !botToken || !chatId) {
            return NextResponse.json({ message: 'Nama Web, Bot Token, dan Chat ID wajib diisi.' }, { status: 422 });
        }

        // Cek jika slug sudah ada
        if (slug) {
            const existingLink = await LinkModel.findOne({ slug });
            if (existingLink) {
                return NextResponse.json({ message: 'Slug sudah digunakan. Pilih nama lain.' }, { status: 400 });
            }
        }

        const newLink = await LinkModel.create({
            websiteName,
            botToken,
            chatId,
            slug: slug || undefined, // Simpan undefined jika slug kosong
        });

        return NextResponse.json({ 
            message: 'Link berhasil dibuat.', 
            link: newLink 
        }, { status: 201 });

    } catch (error) {
        console.error("Error membuat link:", error);
        return NextResponse.json({ message: 'Gagal membuat link.' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';