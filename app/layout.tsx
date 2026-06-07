import type { Metadata, Viewport } from 'next'
import { Orbitron, Rajdhani, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'


const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
})
const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SANTANA FAMILY — Les Démons de la Terreur',
  description:
    "Plateforme de recrutement officielle de la SANTANA FAMILY. L'élite ne se rejoint pas. Elle se mérite.",
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${orbitron.variable} ${rajdhani.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
