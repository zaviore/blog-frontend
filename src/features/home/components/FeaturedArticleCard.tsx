import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import { formatDate, truncateText } from '@/core/utils'
import type { Blog } from '@/features/blog/types'

interface FeaturedArticleCardProps {
  blog: Blog
}

export const FeaturedArticleCard = ({ blog }: FeaturedArticleCardProps) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <Card className="group hover:shadow-lg transition-shadow overflow-hidden h-full">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-tr-full" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {truncateText(blog.excerpt, 100)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant={blog.category}>{blog.category}</Badge>
          </div>
        </div>
      </Card>
    </Link>
  )
}
