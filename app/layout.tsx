import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://courtatlas-public-records.citrus-horse-7476.chatgpt.site'),
  title: 'CourtAtlas — Public Court Record Navigator',
  description: 'Search public state court record systems from one clear, privacy-conscious starting point.',
  openGraph: {
    title: 'CourtAtlas — Public Court Record Navigator',
    description: 'Public court records. One clear starting point.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'CourtAtlas public court records navigator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourtAtlas — Public Court Record Navigator',
    description: 'Public court records. One clear starting point.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
