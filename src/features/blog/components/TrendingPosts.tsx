import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import type { Blog } from '../types'

interface TrendingPostsProps {
  blogs: Blog[]
}

export const TrendingPosts = ({ blogs }: TrendingPostsProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Trending Posts</h3>
      </div>
      <div className="space-y-4">
        {blogs.slice(0, 3).map((blog, index) => (
          <Link key={blog.id} to={`/blog/${blog.id}`} className="flex gap-4 group">
            <span className="text-3xl font-bold text-emerald-500">{String(index + 1).padStart(2, '0')}</span>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
                {blog.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                2.5k views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
