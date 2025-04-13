import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Animated',
  description: 'Created by vansh',
  generator: 'vansh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
