import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore: Allow importing global CSS without type declarations
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VallsMusic',
  description: 'Dengerin musik favoritmu kapan saja',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VallsMusic',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF8A00',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="apple-touch-icon" href="/icons/android-chrome-192x192.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}