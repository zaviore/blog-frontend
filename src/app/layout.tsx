import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/lib/redux/provider'
import { Providers } from '@/lib/providers'
import { MainLayout } from '@/shared/layouts/MainLayout'

export const metadata: Metadata = {
  title: 'Blog Portfolio',
  description: 'Personal blog and portfolio website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Providers>
            <MainLayout>
              {children}
            </MainLayout>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  )
}
