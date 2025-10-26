// models/Settings.js

import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    cloudinaryCloudName: {
        type: String,
        default: 'djaiuiu4x',
    },
    cloudinaryUploadPreset: {
        type: String,
        default: 'upload',
    },
    // --- BARU: Judul yang tampil di halaman demo ---
    globalWebsiteTitle: {
        type: String,
        default: 'Portofolio Profesional', // Nilai default
    },
    globalDemoTitle: { // Judul Hero Section
        type: String,
        default: 'Fahil Gimang',
    },
    // -------------------------------------------------------
}, { timestamps: true });

const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export default SettingsModel;