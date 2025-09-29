import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/shared/Header'
import { Toaster } from 'sonner'
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'r.network - Darkex Case',
  description: 'Next.js - Tailwind CSS - TypeScript - Zustand - Shadcn UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${hanken.className} font- antialiased`}>
        <Header />
        <div className="h-[calc(100dvh-56px)] mt-14">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
