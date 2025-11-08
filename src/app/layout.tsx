import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://donate.evvntly.com'),
  title: 'Support Evvntly - Donate',
  description: 'Support Evvntly and help us keep the events flowing. Your donation helps us maintain and improve our platform for discovering and sharing live events.',
  authors: [{ name: 'Evvntly' }],
  creator: 'Evvntly',
  publisher: 'Evvntly',
  openGraph: {
    title: 'Support Evvntly - Donate',
    description: 'Support Evvntly and help us keep the events flowing.',
    url: 'https://evvntly.com',
    siteName: 'Evvntly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Support Evvntly',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Evvntly - Donate',
    description: 'Support Evvntly and help us keep the events flowing.',
    images: ['/og-image.jpg'],
    creator: '@evvntly',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Theme appearance="dark">
            {children}
          </Theme>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
