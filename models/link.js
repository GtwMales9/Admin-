// models/Link.js

import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  telegramBotToken: {
    type: String,
    required: true,
  },
  telegramChatId: {
    type: String,
    required: true,
  },
  websiteName: { // Untuk nama website spesifik per link (jika ada)
    type: String,
    required: false,
  },
  // --- BARU: Tanggal Kadaluarsa Link (Diatur Admin) ---
  expiresAt: {
    type: Date,
    required: true, 
  },
  // --------------------------------------------------------
}, { timestamps: true });

const Link = mongoose.models.Link || mongoose.model('Link', LinkSchema);
export default Link;