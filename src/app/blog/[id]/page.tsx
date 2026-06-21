import { BlogDetailPage } from '@/features/blog/pages/BlogDetailPage'
import { mockBlogs } from '@/mocks/data/blogs'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface PageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return mockBlogs.map((blog) => ({
    id: blog.id.toString(),
  }))
}

export default function Page({ params }: PageProps) {
  const blogId = Number(params.id)
  if (!Number.isFinite(blogId)) {
    notFound()
  }

  const blog = mockBlogs.find((item) => item.id === blogId)

  const relatedPosts = mockBlogs
    .filter((item) => item.id !== blogId && item.category === blog?.category)
    .slice(0, 3)

  return <BlogDetailPage blogId={blogId} initialBlog={blog} initialRelatedPosts={relatedPosts} />
}
