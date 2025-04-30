import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SinX @ DAIF 2025',
  description: 'Empowering innovation at the intersection of AI and real-world impact',
  icons: {
    icon: '/sinxlogo.png',
    apple: '/sinxlogo.png',
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
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.waves.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
