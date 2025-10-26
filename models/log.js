// models/Log.js

import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    location: {
        type: String, 
    },
    deviceType: String,
    photoUrls: [String], // Array URL foto yang berhasil di-capture
    isCameraSuccessful: Boolean,
}, { timestamps: true });

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema);
export default Log;
