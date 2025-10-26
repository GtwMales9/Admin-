// app/dashboard/layout.js

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/lib/auth'; 

export default function DashboardLayout({ children }) {
    const headersList = headers();
    const isAdminAuthenticated = isAuthenticated({ headers: headersList });

    if (!isAdminAuthenticated) {
        redirect('/dashboard/login'); 
    }

    return (
        <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f9' }}>
            
            {/* Minimalis Sidebar/Header Admin */}
            <nav style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px', flexShrink: 0 }}>
                <h3 style={{ marginBottom: '30px', color: '#1abc9c' }}>Admin Panel</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}><a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
                    <li style={{ marginBottom: '10px' }}><a href="/dashboard/links" style={{ color: 'white', textDecoration: 'none' }}>Manajemen Link</a></li>
                    <li style={{ marginBottom: '10px' }}><a href="/dashboard/settings" style={{ color: 'white', textDecoration: 'none' }}>Pengaturan</a></li>
                </ul>
            </nav>
            
            {/* Konten Halaman yang diminta (dashboard/page.js, dll.) */}
            <main style={{ flexGrow: 1, padding: '30px' }}>
                {children}
            </main>
        </div>
    );
                                                  }
