// /app/dashboard/login/page.js
'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login berhasil! Mengalihkan ke Dashboard.');
                router.push('/dashboard'); 
            } else {
                setError(data.message || 'Login gagal. Coba lagi.');
            }
        } catch (err) {
            setError('Gagal terhubung ke server.');
        } finally {
            setIsLoading(false);
        }
    };

    const formStyle = { maxWidth: '400px', margin: '50px auto', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', fontFamily: 'sans-serif' };
    const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' };
    const buttonStyle = { width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };

    return (
        <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>🔐 Admin Panel Login</h2>
                {error && (<p style={{ color: '#dc3545', textAlign: 'center', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da' }}>{error}</p>)}
                <div>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading} style={inputStyle}/>
                </div>
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} style={inputStyle}/>
                </div>
                <button type="submit" disabled={isLoading} style={{ ...buttonStyle, opacity: isLoading ? 0.7 : 1 }}>
                    {isLoading ? 'Memproses...' : 'Login'}
                </button>
            </form>
        </div>
    );
}