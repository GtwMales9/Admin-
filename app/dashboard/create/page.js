// /app/dashboard/create/page.js
'use client';
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useRouter } from 'next/navigation';

const API_BASE = '/api/links';

export default function CreateLinkPage() {
    const [formData, setFormData] = useState({
        websiteName: '',
        botToken: '',
        chatId: '',
        slug: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                throw new Error(data.message || 'Gagal membuat link.');
            }

            setMessage('✅ Link berhasil dibuat! Mengalihkan ke daftar link...');
            
            setTimeout(() => {
                router.push('/dashboard/links');
            }, 2000);

        } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- STYLES ---
    const styles = {
        formContainer: { maxWidth: '600px', margin: '0 auto', padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',},
        formGroup: { marginBottom: '20px',},
        label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#34495e',},
        input: { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box',},
        button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.3s', opacity: isLoading ? 0.7 : 1,},
        message: (isError) => ({ padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '20px', backgroundColor: isError ? '#f8d7da' : '#d4edda', color: isError ? '#721c24' : '#155724',})
    };

    return (
        <DashboardLayout>
            <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff20', paddingBottom: '10px', marginBottom: '30px', textAlign: 'center' }}>
                ➕ Buat Link Demo Baru
            </h1>

            <div style={styles.formContainer}>
                {message && <div style={styles.message(isError)}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="websiteName">Nama Website/Demo (Tampilan di link)</label>
                        <input type="text" id="websiteName" name="websiteName" value={formData.websiteName} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="botToken">Telegram Bot Token (Wajib)</label>
                        <input type="text" id="botToken" name="botToken" value={formData.botToken} onChange={handleChange} style={styles.input} required />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="chatId">Telegram Chat ID (Wajib)</label>
                        <input type="text" id="chatId" name="chatId" value={formData.chatId} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="slug">Custom URL (Opsional, cth: `fahil-gimang`)</label>
                        <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} style={styles.input} placeholder="Akan menggunakan ID otomatis jika dikosongkan" />
                    </div>

                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Membuat Link...' : 'Buat Link Sekarang'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}