import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

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
      <GoogleAnalytics gaId="G-VLXMNZWWK4" />
    </html>
  )
}
