'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { toggleTheme } from '@/app/store/themeSlice'
import { initializeAuth, logout } from '@/app/store/authSlice'
import type { RootState } from '@/app/store'
import { Button } from '@/shared/ui/Button'
import ToastContainer from '@/shared/ui/Toast'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const theme = useAppSelector((state: RootState) => state.theme.mode)
  const user = useAppSelector((state: RootState) => state.auth.user)
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
    const storedUser = localStorage.getItem('user')
    dispatch(initializeAuth(storedUser ? JSON.parse(storedUser) : null))
  }, [dispatch])

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(logout())
    router.push('/admin/login')
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/career-journey', label: 'Career' },
    { path: '/cv', label: 'CV' },
  ]

  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-gray-950">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="shrink-0 text-xl font-bold text-gray-900 dark:text-white">
              Zamhadi
            </Link>

            <nav className="flex items-center gap-4 overflow-x-auto md:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    pathname === link.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-4">
              {isAdminRoute && isMounted && user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/admin/blog"
                    className="text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Admin Blog
                  </Link>
                  <span className="hidden text-sm text-gray-600 dark:text-gray-400 md:inline">
                    Hi, {user.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : null}

              <button
                onClick={() => dispatch(toggleTheme())}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-gray-200 px-4 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-6xl text-center text-gray-600 dark:text-gray-400">
          <p>Copyright 2026 Zamhadi. Built with React, TypeScript and Tailwind CSS.</p>
        </div>
      </footer>

      <ToastContainer />
    </div>
  )
}
