// app/layout.js

// Pastikan Anda mengimpor file CSS global Anda di sini (misalnya globals.css)
import './globals.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Jika Anda punya metadata, tambahkan di sini */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
    }
