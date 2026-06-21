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
    id: blog.id.toString()
  }))
}

export default function Page({ params }: PageProps) {
  const blogId = Number(params.id)
  const blog = mockBlogs.find((item) => item.id === blogId)

  if (!blog) {
    notFound()
  }

  const relatedPosts = mockBlogs
    .filter((item) => item.id !== blog.id && item.category === blog.category)
    .slice(0, 3)

  return (
    <BlogDetailPage
      blogId={blog.id}
      initialBlog={blog}
      initialRelatedPosts={relatedPosts}
    />
  )
}
