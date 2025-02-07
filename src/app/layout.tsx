import type { Metadata } from 'next'
import './globals.css'
import { raleway } from '@/lib/fonts'
import { ReactNode } from 'react'
import MainProvider from '@/components/providers/MainProvider'
import MainLayout from '@/components/test-components/MainLayout'
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.className}`}
        // className={`${raleway.className} flex min-h-screen w-full grow flex-col items-center justify-center`}
      >
        <MainProvider>
          <MainLayout>{children}</MainLayout>
        </MainProvider>
      </body>
    </html>
  )
}
