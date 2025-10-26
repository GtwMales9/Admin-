// /app/dashboard/components/Sidebar.js
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
    { name: 'Dashboard Home', href: '/dashboard', icon: '🏠' },
    { name: 'Manajemen Link', href: '/dashboard/links', icon: '🔗' },
    { name: 'Buat Link Baru', href: '/dashboard/create', icon: '➕' },
    { name: 'Log & Hasil', href: '/dashboard/logs', icon: '👁️' },
    { name: 'Pengaturan Global', href: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        if (!confirm("Anda yakin ingin Logout?")) return;

        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                alert('Logout berhasil. Anda akan dialihkan.');
                router.push('/dashboard/login');
            } else {
                alert('Gagal Logout.');
            }
        } catch (error) {
            alert('Terjadi kesalahan saat Logout.');
        }
    };

    const styles = {
        sidebar: { width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px', height: '100vh', position: 'fixed', top: 0, left: 0, overflowY: 'auto', fontFamily: 'sans-serif' },
        title: { fontSize: '1.5em', textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #34495e', paddingBottom: '15px' },
        navItem: (isActive) => ({
            display: 'block', padding: '12px 15px', marginBottom: '8px', borderRadius: '8px', textDecoration: 'none',
            color: isActive ? '#2c3e50' : 'white',
            backgroundColor: isActive ? '#ecf0f1' : 'transparent',
            transition: 'background-color 0.3s', fontWeight: isActive ? 'bold' : 'normal',
        }),
        logoutButton: { display: 'block', width: '100%', padding: '10px', marginTop: '30px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.title}>Admin Dashboard</div>
            <nav>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} style={styles.navItem(pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)))}>
                        {item.icon} {item.name}
                    </Link>
                ))}
            </nav>
            <button onClick={handleLogout} style={styles.logoutButton}>
                Keluar (Logout)
            </button>
        </div>
    );
}