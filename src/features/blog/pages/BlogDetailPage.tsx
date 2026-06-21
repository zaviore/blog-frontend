'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { Skeleton } from '@/shared/ui/Skeleton'
import { formatDate } from '@/core/utils'
import { useBlog, useBlogsInfinite } from '../hooks/useBlogs'
import { BlogCard } from '../components/BlogCard'
import type { ReactNode } from 'react'
import type { Blog } from '../types'

interface BlogDetailPageProps {
  blogId?: number
  initialBlog?: Blog
  initialRelatedPosts?: Blog[]
}

const markdownComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-900 dark:text-white">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-white">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => <p className="mb-5 leading-8">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="leading-7">{children}</li>,
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary-600 underline underline-offset-4 hover:text-primary-700 dark:text-primary-400"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-primary-500 pl-4 text-gray-600 dark:text-gray-400">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="mb-6 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-100">
      {children}
    </pre>
  ),
}

export const BlogDetailPage = ({
  blogId: initialBlogId,
  initialBlog,
  initialRelatedPosts = [],
}: BlogDetailPageProps) => {
  const params = useParams()

  const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id
  const parsedRouteId = idParam ? Number(idParam) : undefined
  const routeId = Number.isFinite(parsedRouteId) ? parsedRouteId : undefined
  const blogId = initialBlogId ?? routeId
  const { data: blog, isLoading } = useBlog(blogId, initialBlog)
  const { data: blogsData } = useBlogsInfinite({ limit: 5 })

  const relatedPosts =
    blogsData?.pages[0]?.data
      .filter((item) => item.id !== blogId && item.category === blog?.category)
      .slice(0, 3) || initialRelatedPosts

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton variant="rectangular" className="aspect-video mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge variant={blog.category} className="mb-4">
            {blog.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">{blog.author}</span>
            <span>&bull;</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <div className="mb-8">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full aspect-video object-cover rounded-xl"
          />
        </div>

        <div className="max-w-none text-gray-700 dark:text-gray-300">
          <ReactMarkdown components={markdownComponents}>{blog.content || ''}</ReactMarkdown>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
