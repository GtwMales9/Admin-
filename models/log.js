// /models/Log.js
import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true, },
    ipAddress: { type: String, required: true, },
    location: String,
    userAgent: String,
    deviceType: String,
    photoUrls: [{ type: String, }], 
    isCameraSuccessful: { type: Boolean, default: false, },
}, { timestamps: true });

export default mongoose.models.Log || mongoose.model('Log', LogSchema);