export const loginSchema = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format'
    }
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' }
  }
}

export const registerSchema = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format'
    }
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' }
  },
  confirmPassword: {
    required: 'Please confirm your password',
    validate: (value: string, allValues: any) => {
      if (value !== allValues.password) {
        return 'Passwords do not match'
      }
      return true
    }
  }
}
