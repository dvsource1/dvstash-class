import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Neucha } from 'next/font/google'

const font = Neucha({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DV Stash Class-Room',
  description:
    'Excel in your O/L Science exam with our interactive practice platform. Access a vast question bank, track progress and boost your confidence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
