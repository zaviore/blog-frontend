import apiClient from '@/core/api/axios'
import type { Blog, CreateBlogDto, UpdateBlogDto } from '../types'
import type { PaginatedResponse, ApiResponse } from '@/core/types'

export interface GetBlogsParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  sort?: string
}

export const blogService = {
  async getBlogs(params?: GetBlogsParams): Promise<ApiResponse<PaginatedResponse<Blog>>> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.category) searchParams.set('category', params.category)
    if (params?.sort) searchParams.set('sort', params.sort)

    const response = await apiClient.get(`/blogs?${searchParams.toString()}`)
    return response.data
  },

  async getBlogById(id: number): Promise<ApiResponse<Blog>> {
    const response = await apiClient.get(`/blogs/${id}`)
    return response.data
  },

  async createBlog(data: CreateBlogDto): Promise<ApiResponse<Blog>> {
    const response = await apiClient.post('/blogs', data)
    return response.data
  },

  async updateBlog(id: number, data: UpdateBlogDto): Promise<ApiResponse<Blog>> {
    const response = await apiClient.put(`/blogs/${id}`, data)
    return response.data
  },

  async deleteBlog(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/blogs/${id}`)
    return response.data
  }
}
