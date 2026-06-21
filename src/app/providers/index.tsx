'use client'

import { ReduxProvider } from '@/lib/redux/provider'
import { Providers } from '@/lib/providers'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Providers>{children}</Providers>
    </ReduxProvider>
  )
}
