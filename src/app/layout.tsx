import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
// @ts-ignore: Allow importing global CSS without type declarations
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

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
  themeColor: '#7c5cfc',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icons/android-chrome-192x192.png" />
      </head>
      <body className={jakarta.className}>{children}</body>
    </html>
  )
}