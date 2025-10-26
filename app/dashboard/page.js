// /app/dashboard/page.js
import DashboardLayout from './components/DashboardLayout';
import LinkModel from '@/models/Link';
import LogModel from '@/models/Log';
import dbConnect from '@/lib/db';
import Link from 'next/link';

async function fetchDashboardData() {
    await dbConnect();
    
    const totalLinks = await LinkModel.countDocuments();
    const totalVisits = (await LinkModel.aggregate([
        { $group: { _id: null, total: { $sum: "$visits" } } }
    ]))[0]?.total || 0;
    const totalLogs = await LogModel.countDocuments();
    
    const latestLogs = await LogModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('linkId', 'websiteName') 
        .lean();

    return {
        totalLinks,
        totalVisits,
        totalLogs,
        latestLogs: JSON.parse(JSON.stringify(latestLogs)), 
    };
}

const cardStyle = {
    padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'white', flex: '1', minWidth: '200px', textAlign: 'center', margin: '10px'
};
const headerStyle = {
    color: '#007bff', marginBottom: '20px', borderBottom: '2px solid #007bff20', paddingBottom: '10px'
};
const statNumberStyle = {
    fontSize: '2.5em', fontWeight: 'bold', color: '#34495e'
};
const logTableStyle = {
    width: '100%', borderCollapse: 'collapse', marginTop: '20px',
};
const thStyle = {
    padding: '12px', backgroundColor: '#34495e', color: 'white', textAlign: 'left',
};
const tdStyle = {
    padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: 'white',
};

export default async function DashboardHomePage() {
    const { totalLinks, totalVisits, totalLogs, latestLogs } = await fetchDashboardData();

    return (
        <DashboardLayout>
            <h1 style={headerStyle}>Dashboard Overview 📊</h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                <div style={{ ...cardStyle, backgroundColor: '#e8f7ff' }}>
                    <p>Total Link Aktif</p>
                    <div style={statNumberStyle}>{totalLinks}</div>
                </div>
                <div style={{ ...cardStyle, backgroundColor: '#e6fff5' }}>
                    <p>Total Kunjungan (Semua Link)</p>
                    <div style={statNumberStyle}>{totalVisits}</div>
                </div>
                <div style={{ ...cardStyle, backgroundColor: '#fff7e6' }}>
                    <p>Total Log Tersimpan</p>
                    <div style={statNumberStyle}>{totalLogs}</div>
                </div>
            </div>

            <h2 style={{ ...headerStyle, fontSize: '1.5em' }}>5 Log Terbaru</h2>
            {latestLogs.length > 0 ? (
                <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <table style={logTableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Waktu</th>
                                <th style={thStyle}>Link Target</th>
                                <th style={thStyle}>IP Address</th>
                                <th style={thStyle}>Status Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestLogs.map((log) => (
                                <tr key={log._id}>
                                    <td style={tdStyle}>{new Date(log.createdAt).toLocaleString()}</td>
                                    <td style={tdStyle}>{log.linkId?.websiteName || 'Link Dihapus'}</td>
                                    <td style={tdStyle}>{log.ipAddress}</td>
                                    <td style={tdStyle}>
                                        <Link href={`/dashboard/logs/${log._id}`} style={{color: log.isCameraSuccessful ? 'green' : 'red', fontWeight: 'bold'}}>
                                            {log.isCameraSuccessful ? '✅ Sukses' : '❌ Gagal'}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>Belum ada Log yang tersimpan.</p>
            )}
        </DashboardLayout>
    );
}

export const dynamic = 'force-dynamic';