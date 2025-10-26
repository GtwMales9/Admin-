// /app/api/settings/route.js
import dbConnect from '@/lib/db';
import SettingsModel from '@/models/Settings';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const settings = await SettingsModel.findOneAndUpdate(
            {}, 
            { $setOnInsert: { cloudinaryCloudName: 'default-cloud', cloudinaryUploadPreset: 'default-preset' } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal mengambil pengaturan.' }, { status: 500 });
    }
}

export async function PUT(request) {
    await dbConnect();
    try {
        const data = await request.json();
        const { cloudinaryCloudName, cloudinaryUploadPreset, globalDemoTitle } = data;

        if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
            return NextResponse.json({ message: 'Nama Cloudinary dan Preset wajib diisi.' }, { status: 422 });
        }

        const updatedSettings = await SettingsModel.findOneAndUpdate(
            {}, 
            { cloudinaryCloudName, cloudinaryUploadPreset, globalDemoTitle },
            { new: true, upsert: true }
        ).lean();

        return NextResponse.json({ message: 'Pengaturan berhasil diperbarui.', settings: updatedSettings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal memperbarui pengaturan.' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';