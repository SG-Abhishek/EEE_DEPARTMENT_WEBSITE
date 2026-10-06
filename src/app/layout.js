import './globals.css';
import Navbar from '../../components/Navbar';

// This metadata boosts your SEO and shows up on Google/Discord
export const metadata = {
  title: 'EEE Department | GEC Palakkad',
  description: 'Welcome to the Department of Electrical and Electronics Engineering at Government Engineering College Sreekrishnapuram, Palakkad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* We apply syllabus-body globally to keep your original dark theme background */}
      <body className="syllabus-body">
        
        {/* The Navigation component manages its own visibility on /studio */}
        <Navbar/>

        {/* The current page content loads here */}
        {children}
        
      </body>
    </html>
  );
}