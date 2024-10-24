import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/features/Header';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ecom test',
  description: 'Тестовое задание',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
