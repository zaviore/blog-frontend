import { http, HttpResponse } from 'msw'
import { mockBlogs } from '../data/blogs'
import type { Blog } from '../data/blogs'
import { DEFAULT_PAGE_SIZE } from '@/core/constants'

export const blogHandlers = [
  http.get('/blogs', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || DEFAULT_PAGE_SIZE.toString())
    const search = url.searchParams.get('search') || ''
    const category = url.searchParams.get('category') || ''
    const sort = url.searchParams.get('sort') || 'createdAt'

    let filteredBlogs = [...mockBlogs]

    if (search) {
      const searchLower = search.toLowerCase()
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower) ||
          blog.content.toLowerCase().includes(searchLower)
      )
    }

    if (category) {
      filteredBlogs = filteredBlogs.filter((blog) => blog.category === category)
    }

    if (sort) {
      const sortField = sort.startsWith('-') ? sort.slice(1) : sort
      const sortOrder = sort.startsWith('-') ? -1 : 1

      filteredBlogs.sort((a, b) => {
        const aVal = (a as any)[sortField]
        const bVal = (b as any)[sortField]

        if (sortField === 'createdAt') {
          return sortOrder * (new Date(aVal).getTime() - new Date(bVal).getTime())
        }

        return sortOrder * aVal.localeCompare(bVal)
      })
    }

    const total = filteredBlogs.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

    return HttpResponse.json({
      success: true,
      data: {
        data: paginatedBlogs,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages
      }
    })
  }),

  http.get('/blogs/:id', ({ params }) => {
    const id = parseInt(params.id as string)
    const blog = mockBlogs.find((b) => b.id === id)

    if (!blog) {
      return HttpResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: blog
    })
  }),

  http.post('/blogs', async ({ request }) => {
    const body = (await request.json()) as Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>
    const newBlog: Blog = {
      ...body,
      id: mockBlogs.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockBlogs.unshift(newBlog)

    return HttpResponse.json({
      success: true,
      data: newBlog,
      message: 'Blog created successfully'
    })
  }),

  http.put('/blogs/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string)
    const body = (await request.json()) as Partial<Blog>
    const blogIndex = mockBlogs.findIndex((b) => b.id === id)

    if (blogIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    mockBlogs[blogIndex] = {
      ...mockBlogs[blogIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      success: true,
      data: mockBlogs[blogIndex],
      message: 'Blog updated successfully'
    })
  }),

  http.delete('/blogs/:id', ({ params }) => {
    const id = parseInt(params.id as string)
    const blogIndex = mockBlogs.findIndex((b) => b.id === id)

    if (blogIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    mockBlogs.splice(blogIndex, 1)

    return HttpResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  })
]
