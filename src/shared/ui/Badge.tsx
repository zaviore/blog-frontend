import { cn } from '@/core/utils'
import { CATEGORIES } from '@/core/constants'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: (typeof CATEGORIES)[number] | 'default' | 'outline'
}

const categoryColors: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Backend: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Fullstack: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Mobile: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  DevOps: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  Design: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  Career: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
}

export const Badge = ({ className, children, variant = 'default', ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        categoryColors[variant] || categoryColors.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
