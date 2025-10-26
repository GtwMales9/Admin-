// /app/dashboard/settings/page.js
'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const API_BASE = '/api/settings';

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        cloudinaryCloudName: '',
        cloudinaryUploadPreset: '',
        globalDemoTitle: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE);
            if (!response.ok) throw new Error('Gagal mengambil pengaturan.');
            const data = await response.json();
            setFormData(data);
        } catch (err) {
            setMessage(`❌ Error saat memuat: ${err.message}`);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch(API_BASE, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                throw new Error(data.message || 'Gagal menyimpan pengaturan.');
            }

            setMessage('✅ Pengaturan berhasil diperbarui!');
            setFormData(data.settings); 

        } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
            setIsError(true);
        } finally {
            setIsSaving(false);
        }
        
        setTimeout(() => setMessage(''), 5000);
    };

    const style = { maxWidth: '700px', margin: '30px auto', padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
    const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', marginBottom: '15px' };
    const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
    const messageStyle = (isErr) => ({ padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '20px', backgroundColor: isErr ? '#f8d7da' : '#d4edda', color: isErr ? '#721c24' : '#155724' });

    if (isLoading) return <DashboardLayout><h2>Loading Pengaturan...</h2></DashboardLayout>;

    return (
        <DashboardLayout>
            <h1 style={{ color: '#007bff', textAlign: 'center' }}>⚙️ Pengaturan Global</h1>

            <div style={style}>
                {message && <div style={messageStyle(isError)}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    
                    <h3>Konfigurasi Cloudinary</h3>

                    <label>Cloudinary Cloud Name</label>
                    <input type="text" name="cloudinaryCloudName" value={formData.cloudinaryCloudName} onChange={handleChange} style={inputStyle} required />

                    <label>Cloudinary Upload Preset</label>
                    <input type="text" name="cloudinaryUploadPreset" value={formData.cloudinaryUploadPreset} onChange={handleChange} style={inputStyle} required />
                    
                    <h3 style={{ marginTop: '30px' }}>Tampilan Demo</h3>
                    
                    <label>Judul Global Demo</label>
                    <input type="text" name="globalDemoTitle" value={formData.globalDemoTitle} onChange={handleChange} style={inputStyle} required />

                    <button type="submit" disabled={isSaving} style={buttonStyle}>
                        {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export const dynamic = 'force-dynamic';