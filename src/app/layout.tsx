import type { Metadata } from 'next'
import './globals.css'
import '@mdxeditor/editor/style.css'
import { ReduxProvider } from '@/lib/redux/provider'
import { Providers } from '@/lib/providers'
import { MainLayout } from '@/shared/layouts/MainLayout'

export const metadata: Metadata = {
  title: 'Zamhadi - Frontend Engineer',
  description: 'Portfolio, career journey, CV, and technical writing by Zamhadi.',
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
            <MainLayout>{children}</MainLayout>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  )
}
