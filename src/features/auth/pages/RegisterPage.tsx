import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { RegisterCredentials } from '../types'
import { registerSchema } from '../schemas'

interface ValidationErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)

  const validateField = (name: keyof RegisterCredentials, value: string, allValues?: RegisterCredentials) => {
    const schema = registerSchema[name]
    let error = ''

    if (schema.required && !value.trim()) {
      error = schema.required
    } else if (schema.pattern && !schema.pattern.value.test(value)) {
      error = schema.pattern.message
    } else if (schema.minLength && value.length < schema.minLength.value) {
      error = schema.minLength.message
    } else if (schema.validate && allValues) {
      const validationResult = schema.validate(value, allValues)
      if (validationResult !== true) {
        error = validationResult as string
      }
    }

    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof ValidationErrors]) {
      const error = validateField(name as keyof RegisterCredentials, value, formData)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: ValidationErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof RegisterCredentials, formData[key as keyof RegisterCredentials], formData)
      if (error) {
        newErrors[key as keyof ValidationErrors] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setRegisterError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful registration - in real app, store token in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: formData.name,
        email: formData.email
      }))

      navigate('/')
    } catch (error) {
      setRegisterError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
            />
          </div>

          {registerError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {registerError}
            </div>
          )}

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
