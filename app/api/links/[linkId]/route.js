// /app/api/links/[linkId]/route.js
import dbConnect from '@/lib/db';
import LinkModel from '@/models/Link';
import { NextResponse } from 'next/server';

// ==============================================
// METHOD GET: Mengambil Detail Link
// ==============================================
export async function GET(request, { params }) {
    await dbConnect();
    const { linkId } = params;

    try {
        const link = await LinkModel.findById(linkId).lean();
        if (!link) {
            return NextResponse.json({ message: 'Link tidak ditemukan.' }, { status: 404 });
        }
        return NextResponse.json(link, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal mengambil detail link.' }, { status: 500 });
    }
}

// ==============================================
// METHOD PUT: Memperbarui Link
// ==============================================
export async function PUT(request, { params }) {
    await dbConnect();
    const { linkId } = params;

    try {
        const data = await request.json();
        const { websiteName, botToken, chatId, slug, isActive } = data;

        if (!websiteName || !botToken || !chatId) {
            return NextResponse.json({ message: 'Data wajib tidak boleh kosong.' }, { status: 422 });
        }
        
        // Cek duplikasi slug, kecuali untuk link itu sendiri
        if (slug) {
            const existingLink = await LinkModel.findOne({ 
                slug, 
                _id: { $ne: linkId } 
            });
            if (existingLink) {
                return NextResponse.json({ message: 'Slug sudah digunakan oleh link lain.' }, { status: 400 });
            }
        }

        const updatedLink = await LinkModel.findByIdAndUpdate(
            linkId,
            { websiteName, botToken, chatId, slug: slug || undefined, isActive },
            { new: true } // Mengembalikan dokumen yang sudah diperbarui
        ).lean();

        if (!updatedLink) {
            return NextResponse.json({ message: 'Link tidak ditemukan.' }, { status: 404 });
        }

        return NextResponse.json({ 
            message: 'Link berhasil diperbarui.', 
            link: updatedLink 
        }, { status: 200 });

    } catch (error) {
        console.error("Error memperbarui link:", error);
        return NextResponse.json({ message: 'Gagal memperbarui link.' }, { status: 500 });
    }
}

// ==============================================
// METHOD DELETE: Menghapus Link
// ==============================================
export async function DELETE(request, { params }) {
    await dbConnect();
    const { linkId } = params;

    try {
        const deletedLink = await LinkModel.findByIdAndDelete(linkId);
        if (!deletedLink) {
            return NextResponse.json({ message: 'Link tidak ditemukan.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Link berhasil dihapus.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal menghapus link.' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';