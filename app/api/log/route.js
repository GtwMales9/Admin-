// /app/api/log/route.js
import dbConnect from '@/lib/db';
import LogModel from '@/models/Log';
import LinkModel from '@/models/Link';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await dbConnect();
    try {
        const { linkId, ipAddress, userAgent, location, deviceType, photoUrls, isCameraSuccessful } = await request.json();

        if (!linkId || !ipAddress) {
            return NextResponse.json({ message: 'Data dasar tidak lengkap.' }, { status: 400 });
        }
        
        const newLog = await LogModel.create({
            linkId, ipAddress, userAgent, location, deviceType,
            photoUrls: photoUrls || [],
            isCameraSuccessful: isCameraSuccessful || false,
        });

        // Tambah hitungan kunjungan di model Link
        await LinkModel.findByIdAndUpdate(linkId, { $inc: { visits: 1 } });

        return NextResponse.json({ message: 'Data Log berhasil disimpan.', logId: newLog._id }, { status: 201 });
    } catch (error) {
        console.error("Error menyimpan log:", error);
        return NextResponse.json({ message: 'Gagal menyimpan data log.' }, { status: 500 });
    }
}