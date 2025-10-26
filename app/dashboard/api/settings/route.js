// app/dashboard/api/settings/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SettingsModel from '@/models/Settings';
import { isAuthenticated } from '@/lib/auth'; 

export async function POST(req) {
    await dbConnect();

    if (!isAuthenticated(req)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        
        const { 
            cloudinaryCloudName, 
            cloudinaryUploadPreset, 
            globalDemoTitle, 
            globalWebsiteTitle // <--- FIELD BARU DITERIMA
        } = body;
        
        const updateData = {
            cloudinaryCloudName,
            cloudinaryUploadPreset,
            globalDemoTitle,
            globalWebsiteTitle, // <--- DISIMPAN
        };

        const settings = await SettingsModel.findOneAndUpdate({}, updateData, {
            new: true,
            upsert: true,
        });

        return NextResponse.json({ success: true, settings });

    } catch (error) {
        return NextResponse.json({ message: 'Gagal update pengaturan', error: error.message }, { status: 500 });
    }
}

// ... (lanjutan GET)