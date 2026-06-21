'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card } from '@/shared/ui/Card'
import { BlogForm } from '../components/BlogForm'
import { useCreateBlog, useUpdateBlog, useBlog } from '../hooks/useBlogs'
import { useAppSelector } from '@/core/hooks'
import type { RootState } from '@/app/store'
import type { CreateBlogDto } from '../types'

export const CreateBlogPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { isAuthenticated, isInitialized } = useAppSelector((state: RootState) => state.auth)
  const createBlog = useCreateBlog()
  const updateBlog = useUpdateBlog()

  const blogId = id ? parseInt(id as string) : undefined
  const { data: blog, isLoading: isLoadingBlog } = useBlog(blogId)
  const isEdit = !!blogId

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isInitialized, router])

  const handleSubmit = async (data: CreateBlogDto) => {
    if (isEdit && blogId) {
      await updateBlog.mutateAsync({ id: blogId, data })
    } else {
      await createBlog.mutateAsync(data)
    }
    router.push('/blog')
  }

  if (!isInitialized || !isAuthenticated || (isEdit && isLoadingBlog)) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEdit ? 'Edit Blog Post' : 'Create Blog Post'}
        </h1>
        <Card className="p-8">
          <BlogForm
            initialData={blog}
            onSubmit={handleSubmit}
            isLoading={isEdit ? updateBlog.isPending : createBlog.isPending}
            submitText={isEdit ? 'Update Post' : 'Create Post'}
          />
        </Card>
      </div>
    </div>
  )
}
