// app/dashboard/layout.js

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Asumsi: Anda memiliki fungsi untuk memvalidasi token dari cookies
import { isAuthenticated } from '@/lib/auth'; 

export default function DashboardLayout({ children }) {
    // Di lingkungan server (Vercel/Node.js), kita perlu mengambil headers
    const headersList = headers();
    
    // Cek apakah Admin sudah login menggunakan token di cookie
    // Gunakan isAuthenticated dari '/lib/auth' Anda
    const isAdminAuthenticated = isAuthenticated({ headers: headersList });

    // Jika Admin belum terautentikasi, alihkan ke halaman login
    if (!isAdminAuthenticated) {
        // Karena ini komponen Server, kita gunakan redirect dari next/navigation
        redirect('/dashboard/login'); 
    }

    // Tampilkan konten halaman dashboard jika sudah terautentikasi
    return (
        <div className="dashboard-container">
            {/* Di sini Anda bisa menambahkan sidebar atau navigasi dashboard yang spesifik */}
            <header style={{ padding: '15px', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
                <p style={{ fontWeight: 'bold' }}>Dashboard Admin</p>
            </header>
            
            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
      }
