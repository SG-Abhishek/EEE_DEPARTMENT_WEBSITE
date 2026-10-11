// app/layout.js
import './globals.css';
import Navbar from '../../components/Navbar';
import Script from 'next/script'; // Import Script component

export const metadata = {
  title: 'EEE Department | GEC Palakkad',
  description: 'Welcome to the Department of Electrical and Electronics Engineering at Government Engineering College Sreekrishnapuram, Palakkad.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EEE GECSKP',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="syllabus-body">
        <Navbar />
        {children}

        {/* Registers public/sw.js on page load */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}