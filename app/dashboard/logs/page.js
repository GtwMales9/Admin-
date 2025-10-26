// /app/dashboard/logs/page.js
import DashboardLayout from '../components/DashboardLayout';
import dbConnect from '@/lib/db';
import LogModel from '@/models/Log';
import Link from 'next/link';

async function fetchLogs() {
    await dbConnect();
    const logs = await LogModel.find({})
        .sort({ createdAt: -1 })
        .populate('linkId', 'websiteName') 
        .lean();

    return JSON.parse(JSON.stringify(logs));
}

export default async function LogsListPage() {
    const logs = await fetchLogs();
    
    const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
    const thStyle = { padding: '12px', backgroundColor: '#34495e', color: 'white', textAlign: 'left' };
    const tdStyle = { padding: '12px', borderBottom: '1px solid #eee', backgroundColor: 'white' };
    const linkStyle = { textDecoration: 'none', color: '#007bff', display: 'block' };

    return (
        <DashboardLayout>
            <h1 style={{ color: '#007bff' }}>Daftar Semua Log 👁️ ({logs.length})</h1>

            {logs.length === 0 ? (
                <p style={{ padding: '50px', backgroundColor: 'white', borderRadius: '10px', textAlign: 'center' }}>
                    Belum ada Log Kunjungan yang tersimpan.
                </p>
            ) : (
                <div style={{ overflowX: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Waktu</th>
                                <th style={thStyle}>Link Target</th>
                                <th style={thStyle}>IP Address</th>
                                <th style={thStyle}>Perangkat</th>
                                <th style={thStyle}>Status Kamera</th>
                                <th style={thStyle}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log._id}>
                                    <td style={tdStyle}>{new Date(log.createdAt).toLocaleString()}</td>
                                    <td style={tdStyle}>{log.linkId?.websiteName || 'Link Dihapus'}</td>
                                    <td style={tdStyle}>{log.ipAddress}</td>
                                    <td style={tdStyle}>{log.deviceType || 'N/A'}</td>
                                    <td style={tdStyle}>
                                        <span style={{ color: log.isCameraSuccessful ? 'green' : 'red', fontWeight: 'bold' }}>
                                            {log.isCameraSuccessful ? 'SUKSES' : 'GAGAL'}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <Link href={`/dashboard/logs/${log._id}`} style={linkStyle}>
                                            Lihat Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </DashboardLayout>
    );
}

export const dynamic = 'force-dynamic';