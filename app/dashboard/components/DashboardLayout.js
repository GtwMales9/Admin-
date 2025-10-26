// /app/dashboard/components/DashboardLayout.js
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
    const styles = {
        mainContainer: {
            display: 'flex',
            fontFamily: 'sans-serif',
            backgroundColor: '#f4f7f6',
            minHeight: '100vh',
        },
        contentWrapper: {
            marginLeft: '250px', 
            padding: '40px',
            width: 'calc(100% - 250px)',
        },
    };

    return (
        <div style={styles.mainContainer}>
            <Sidebar />
            <div style={styles.contentWrapper}>
                {children}
            </div>
        </div>
    );
}