import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import { formatDate, truncateText } from '@/core/utils'
import type { Blog } from '../types'

interface BlogCardProps {
  blog: Blog
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={blog.category}>{blog.category}</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {truncateText(blog.excerpt, 150)}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <span className="font-medium">{blog.author}</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
