'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/core/hooks'
import type { RootState } from '@/app/store'

export default function Page() {
  const router = useRouter()
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (!isInitialized) return

    router.replace(isAuthenticated ? '/admin/blog' : '/admin/login')
  }, [isAuthenticated, isInitialized, router])

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
    </div>
  )
}
