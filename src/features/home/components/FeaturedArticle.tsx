import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import type { Blog } from '@/features/blog/types'

interface FeaturedArticleProps {
  blog: Blog
}

export const FeaturedArticle = ({ blog }: FeaturedArticleProps) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-semibold text-lg">Featured</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-emerald-300 transition-colors">
              {blog.title}
            </h2>
            <p className="text-gray-200 mb-6 line-clamp-2">
              {blog.excerpt}
            </p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              Read Article
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
