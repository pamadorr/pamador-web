import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

export const metadata = {
  title: 'PAMADOR',
  description: 'Onlaýn nahar sargama we eltip berme platformasy',
  icons: {
    icon: [{ url: '/assets/logo.png' }], // Path to your icon file in the public folder
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
