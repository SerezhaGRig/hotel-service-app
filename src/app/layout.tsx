import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ← This line is crucial

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'LuxStay Hotels - Luxury Hotel Service',
    description: 'Experience comfort and elegance in the heart of the city',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
