// /app/dashboard/logs/[logId]/page.js
import DashboardLayout from '../../components/DashboardLayout';
import dbConnect from '@/lib/db';
import LogModel from '@/models/Log';
import { notFound } from 'next/navigation';

async function fetchLogDetail(logId) {
    await dbConnect();
    const log = await LogModel.findById(logId)
        .populate('linkId', 'websiteName')
        .lean();

    if (!log) {
        return notFound();
    }
    return JSON.parse(JSON.stringify(log));
}

export default async function LogDetailPage({ params }) {
    const log = await fetchLogDetail(params.logId);
    
    const detailContainerStyle = { padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
    const detailGroupStyle = { marginBottom: '20px', padding: '15px', borderLeft: '3px solid #007bff30', backgroundColor: '#f9f9f9', borderRadius: '5px' };
    const labelStyle = { fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' };
    const photoGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' };
    const imageStyle = { width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover', transition: 'transform 0.3s' };

    return (
        <DashboardLayout>
            <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff20', paddingBottom: '10px', marginBottom: '30px' }}>
                Detail Log: {log.ipAddress}
            </h1>

            <div style={detailContainerStyle}>
                
                <h3 style={{ color: '#007bff', marginBottom: '20px' }}>Informasi Dasar</h3>
                
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>Link Target:</span>
                    <p>{log.linkId?.websiteName || 'Link Dihapus'}</p>
                </div>
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>Waktu Kunjungan:</span>
                    <p>{new Date(log.createdAt).toLocaleString()}</p>
                </div>

                <h3 style={{ color: '#007bff', margin: '30px 0 20px 0' }}>Data Kunjungan</h3>
                
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>Alamat IP:</span>
                    <p>{log.ipAddress}</p>
                </div>
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>Lokasi:</span>
                    <p>{log.location || 'N/A'}</p>
                </div>
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>Perangkat (Device Type):</span>
                    <p>{log.deviceType || 'N/A'}</p>
                </div>
                <div style={detailGroupStyle}>
                    <span style={labelStyle}>User Agent:</span>
                    <p style={{ wordBreak: 'break-all', fontSize: '0.9em' }}>{log.userAgent}</p>
                </div>

                <h3 style={{ color: '#007bff', margin: '30px 0 20px 0' }}>Hasil Kamera ({log.photoUrls.length} Foto)</h3>
                
                <div style={{...detailGroupStyle, borderLeft: log.isCameraSuccessful ? '3px solid green' : '3px solid red'}}>
                    <span style={labelStyle}>Status Pengambilan Foto:</span>
                    <p style={{ color: log.isCameraSuccessful ? 'green' : 'red', fontWeight: 'bold' }}>
                        {log.isCameraSuccessful ? 'BERHASIL' : 'GAGAL'}
                    </p>
                </div>

                {log.photoUrls.length > 0 && (
                    <div style={photoGridStyle}>
                        {log.photoUrls.map((url, index) => (
                            <div key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={url} 
                                        alt={`Captured Photo ${index + 1}`} 
                                        style={imageStyle}
                                        onError={(e) => { e.target.src = '/placeholder-image.png'; e.target.alt = 'Gagal memuat foto'; }} // Fallback
                                    />
                                </a>
                                <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '0.9em' }}>Foto #{index + 1}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export const dynamic = 'force-dynamic';