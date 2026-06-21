import type { Blog, CreateBlogDto, UpdateBlogDto } from '../types'
import type { PaginatedResponse, ApiResponse } from '@/core/types'
import { mockBlogs } from '@/mocks/data/blogs'

export interface GetBlogsParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  sort?: string
}

let blogs = [...mockBlogs]

const createResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message
})

const sortBlogs = (items: Blog[], sort?: string) => {
  const sorted = [...items]

  switch (sort) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case '-title':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case '-createdAt':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    case 'createdAt':
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}

export const blogService = {
  async getBlogs(params?: GetBlogsParams): Promise<ApiResponse<PaginatedResponse<Blog>>> {
    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    const search = params?.search?.trim().toLowerCase()

    const filteredBlogs = blogs.filter((blog) => {
      const matchesSearch = search
        ? [blog.title, blog.excerpt, blog.content, blog.author]
            .some((value) => value.toLowerCase().includes(search))
        : true
      const matchesCategory = params?.category
        ? blog.category === params.category
        : true

      return matchesSearch && matchesCategory
    })

    const sortedBlogs = sortBlogs(filteredBlogs, params?.sort)
    const offset = (page - 1) * limit
    const data = sortedBlogs.slice(offset, offset + limit)
    const totalPages = Math.ceil(sortedBlogs.length / limit)

    return createResponse({
      data,
      total: sortedBlogs.length,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages
    })
  },

  async getBlogById(id: number): Promise<ApiResponse<Blog>> {
    const blog = blogs.find((item) => item.id === id)

    if (!blog) {
      throw new Error('Blog not found')
    }

    return createResponse(blog)
  },

  async createBlog(data: CreateBlogDto): Promise<ApiResponse<Blog>> {
    const now = new Date().toISOString()
    const blog: Blog = {
      ...data,
      id: Math.max(...blogs.map((item) => item.id), 0) + 1,
      createdAt: now,
      updatedAt: now
    }

    blogs = [blog, ...blogs]
    return createResponse(blog, 'Blog created successfully')
  },

  async updateBlog(id: number, data: UpdateBlogDto): Promise<ApiResponse<Blog>> {
    const blog = blogs.find((item) => item.id === id)

    if (!blog) {
      throw new Error('Blog not found')
    }

    const updatedBlog = {
      ...blog,
      ...data,
      updatedAt: new Date().toISOString()
    }

    blogs = blogs.map((item) => (item.id === id ? updatedBlog : item))
    return createResponse(updatedBlog, 'Blog updated successfully')
  },

  async deleteBlog(id: number): Promise<ApiResponse<void>> {
    blogs = blogs.filter((item) => item.id !== id)
    return createResponse(undefined, 'Blog deleted successfully')
  }
}
