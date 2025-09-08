import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import LayoutHeader from '@/app/LayoutHeader';
import LayoutFooter from '@/app/LayoutFooter';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// disable font awesome inject css into head.(let nextjs handle it) To prevent styling issue
config.autoAddCss = false;

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'TyrangYangBlog',
  description: 'Tyrang Yang blog',
};

export const dynamic = 'error'; // disable any dynamic function
export const revalidate = false; // stop ISR

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LayoutHeader />
        {children}
        <LayoutFooter />
      </body>
    </html>
  );
}
