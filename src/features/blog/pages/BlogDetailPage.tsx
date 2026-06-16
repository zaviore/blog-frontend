import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { Skeleton } from '@/shared/ui/Skeleton'
import { ConfirmModal } from '@/shared/ui/Modal'
import { formatDate } from '@/core/utils'
import { useBlog, useBlogsInfinite, useDeleteBlog } from '../hooks/useBlogs'
import { BlogCard } from '../components/BlogCard'

export const BlogDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const blogId = id ? parseInt(id) : undefined
  const { data: blog, isLoading } = useBlog(blogId)
  const { data: blogsData } = useBlogsInfinite({ limit: 5 })
  const deleteBlog = useDeleteBlog()

  const relatedPosts = blogsData?.pages[0]?.data.filter(
    (b) => b.id !== blogId && b.category === blog?.category
  ).slice(0, 3) || []

  const handleDelete = async () => {
    if (!blogId) return
    await deleteBlog.mutateAsync(blogId)
    navigate('/blog')
  }

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog not found
          </h1>
          <Link to="/blog">
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{blog.author}</span>
              <span>•</span>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex gap-3">
              <Link to={`/blog/${blog.id}/edit`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                isLoading={deleteBlog.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full aspect-video object-cover rounded-xl"
          />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </section>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteBlog.isPending}
      />
    </div>
  )
}
