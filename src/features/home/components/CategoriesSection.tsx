import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import { CATEGORIES } from '@/core/constants'

export const CategoriesSection = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Link key={category} to={`/blog?category=${category}`}>
            <Badge variant={category} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {category}
            </Badge>
          </Link>
        ))}
      </div>
    </Card>
  )
}
