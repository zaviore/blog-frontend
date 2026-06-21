'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Loader } from '@/shared/ui/Loader'
import { formatDate } from '@/core/utils'
import { useAppSelector } from '@/core/hooks'
import type { RootState } from '@/app/store'
import { useBlogsInfinite, useDeleteBlog } from '../hooks/useBlogs'

export const AdminBlogPage = () => {
  const router = useRouter()
  const { isAuthenticated, isInitialized } = useAppSelector((state: RootState) => state.auth)
  const { data, isLoading } = useBlogsInfinite({ limit: 20 })
  const deleteBlog = useDeleteBlog()

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, isInitialized, router])

  if (!isInitialized || !isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  const blogs = data?.pages.flatMap((page) => page.data) || []

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Blog</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage drafts, generated articles, and published blog content.
            </p>
          </div>
          <Link href="/admin/blog/create">
            <Button>Create Article</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <Badge variant={blog.category} className="mb-3">
                    {blog.category}
                  </Badge>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {blog.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {blog.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    {blog.author} &bull; {formatDate(blog.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/blog/${blog.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 rounded-md p-0"
                      aria-label={`View ${blog.title}`}
                      title="View"
                    >
                      <ViewIcon />
                    </Button>
                  </Link>
                  <Link href={`/admin/blog/${blog.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 rounded-md border-gray-300 p-0 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      aria-label={`Edit ${blog.title}`}
                      title="Edit"
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    className="h-9 w-9 rounded-md p-0"
                    onClick={() => deleteBlog.mutate(blog.id)}
                    isLoading={deleteBlog.isPending}
                    aria-label={`Delete ${blog.title}`}
                    title="Delete"
                  >
                    {!deleteBlog.isPending && <DeleteIcon />}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const iconClassName = 'h-4 w-4'

const ViewIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EditIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z" />
  </svg>
)

const DeleteIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
)
