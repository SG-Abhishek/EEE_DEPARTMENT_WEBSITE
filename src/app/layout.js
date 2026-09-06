import './globals.css';
import Navbar from '../../components/Navbar';
import { Analytics } from '@vercel/analytics/next';

// This metadata boosts your SEO and shows up on Google/Discord
export const metadata = {
  title: 'EEE Department | GEC Palakkad',
  description: 'Welcome to the Department of Electrical and Electronics Engineering at Government Engineering College Sreekrishnapuram, Palakkad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We apply syllabus-body globally to keep your original dark theme background */}
      <body className="syllabus-body">
        
        {/* The Navigation component manages its own visibility on /studio */}
        <Navbar/>

        {/* The current page content loads here */}
        {children}
        <Analytics />
        
      </body>
    </html>
  );
}