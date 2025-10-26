// /app/dashboard/links/page.js
'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Link from 'next/link';

const API_BASE = '/api/links';

export default function LinksPage() {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLinks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE);
            if (!response.ok) throw new Error('Gagal mengambil data link.');
            const data = await response.json();
            setLinks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleDelete = async (id, websiteName) => {
        if (!confirm(`Yakin ingin menghapus link "${websiteName}"? Log yang terkait tidak akan terhapus.`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Gagal menghapus link.');

            alert('Link berhasil dihapus!');
            fetchLinks(); // Refresh list
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };
    
    // --- STYLES ---
    const styles = {
        header: { color: '#007bff', borderBottom: '2px solid #007bff20', paddingBottom: '10px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        createButton: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold'},
        table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px',},
        th: { padding: '15px', backgroundColor: '#34495e', color: 'white', textAlign: 'left', position: 'sticky', top: 0},
        td: { padding: '15px', borderBottom: '1px solid #eee', backgroundColor: 'white',},
        row: { boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderRadius: '8px',},
        actionButton: (color) => ({ padding: '5px 10px', marginRight: '5px', border: 'none', borderRadius: '3px', cursor: 'pointer', color: 'white', backgroundColor: color})
    };

    if (isLoading) return <DashboardLayout><h2>Loading...</h2></DashboardLayout>;
    if (error) return <DashboardLayout><h2 style={{ color: 'red' }}>Error: {error}</h2></DashboardLayout>;

    return (
        <DashboardLayout>
            <div style={styles.header}>
                <h1>Manajemen Link 🔗 ({links.length})</h1>
                <Link href="/dashboard/create" style={styles.createButton}>+ Buat Link Baru</Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nama Web</th>
                            <th style={styles.th}>Kunjungan</th>
                            <th style={styles.th}>URL Demo</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link) => (
                            <tr key={link._id} style={styles.row}>
                                <td style={styles.td}>{link.websiteName}</td>
                                <td style={styles.td}>{link.visits}</td>
                                <td style={styles.td}>
                                    <a href={`/demo/${link.slug || link._id}`} target="_blank" rel="noopener noreferrer">
                                        /demo/{link.slug || link._id}
                                    </a>
                                </td>
                                <td style={{...styles.td, color: link.isActive ? 'green' : 'red'}}>
                                    {link.isActive ? 'Aktif' : 'Non-aktif'}
                                </td>
                                <td style={styles.td}>
                                    <button onClick={() => handleDelete(link._id, link.websiteName)} style={styles.actionButton('#dc3545')}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {links.length === 0 && (
                <p style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '10px', marginTop: '20px' }}>
                    Belum ada link yang dibuat.
                </p>
            )}
        </DashboardLayout>
    );
}

export const dynamic = 'force-dynamic';