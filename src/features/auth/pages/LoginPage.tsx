'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { LoginCredentials } from '../types'
import { loginSchema } from '../schemas'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { login } from '@/app/store/authSlice'
import type { RootState } from '@/app/store'

interface ValidationErrors {
  email: string
  password: string
}

export const LoginPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  const validateField = (name: keyof LoginCredentials, value: string) => {
    const schema = loginSchema[name] as any
    let error = ''

    if (schema.required && !value.trim()) {
      error = schema.required
    } else if (schema.pattern && !schema.pattern.value.test(value)) {
      error = schema.pattern.message
    } else if (schema.minLength && value.length < schema.minLength.value) {
      error = schema.minLength.message
    }

    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof ValidationErrors]) {
      const error = validateField(name as keyof LoginCredentials, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: ValidationErrors = {
      email: '',
      password: ''
    }
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof LoginCredentials, formData[key as keyof LoginCredentials])
      if (error) {
        newErrors[key as keyof ValidationErrors] = error
      }
    })

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setLoginError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login - in real app, store token in localStorage
      const user = {
        id: '1',
        name: formData.email.split('@')[0] || 'Test User',
        email: formData.email
      }

      localStorage.setItem('user', JSON.stringify(user))
      dispatch(login(user))

      router.push('/')
    } catch (error) {
      setLoginError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
            />
          </div>

          {loginError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {loginError}
            </div>
          )}

          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
