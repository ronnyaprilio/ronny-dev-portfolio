import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getProfile } from '@/lib/profileRepository';

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const profileCache = await getProfile();
  return {
    title: profileCache.metadata_title,
    description: profileCache.metadata_description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}