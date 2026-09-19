import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'virtuu booth — your virtual photo booth',
  description: 'make moments, not just photos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFDF5] text-[#24652A] min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="py-8 text-center text-xs text-[#24652A]/60 border-t border-[#A8D3A8]/30">
          virtuu booth • make moments, not just photos ✨
        </footer>
      </body>
    </html>
  );
}
