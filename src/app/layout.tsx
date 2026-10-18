import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Header from '../components/layout/Header';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';

export const viewport: Viewport = {
  themeColor: '#5c6b61',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Aura | Premium Personal Care',
  description: 'Aura offers a range of premium personal care products.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Personal Care',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Header />
        <Navbar />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
