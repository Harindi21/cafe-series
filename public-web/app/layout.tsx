import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kirikopi — Slow coffee. Warm bakes. Good company.',
  description:
    'A neighbourhood coffee house in the heart of Colombo.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}