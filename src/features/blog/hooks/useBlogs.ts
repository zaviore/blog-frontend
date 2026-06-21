import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogService, type GetBlogsParams } from '../services'
import { useAppDispatch } from '@/core/hooks'
import { addNotification } from '@/app/store/notificationSlice'
import type { Blog, UpdateBlogDto } from '../types'

export const useBlogsInfinite = (params: Omit<GetBlogsParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['blogs', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await blogService.getBlogs({ ...params, page: pageParam })
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined
    },
    staleTime: 5 * 60 * 1000
  })
}

export const useBlog = (id: number | undefined, initialBlog?: Blog) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) throw new Error('Blog ID is required')
      const response = await blogService.getBlogById(id)
      return response.data
    },
    enabled: !!id,
    initialData: initialBlog,
    staleTime: 10 * 60 * 1000
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch(addNotification({ type: 'success', message: 'Blog created successfully!' }))
    },
    onError: () => {
      dispatch(addNotification({ type: 'error', message: 'Failed to create blog' }))
    }
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogDto }) =>
      blogService.updateBlog(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['blog', variables.id] })
      dispatch(addNotification({ type: 'success', message: 'Blog updated successfully!' }))
    },
    onError: () => {
      dispatch(addNotification({ type: 'error', message: 'Failed to update blog' }))
    }
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch(addNotification({ type: 'success', message: 'Blog deleted successfully!' }))
    },
    onError: () => {
      dispatch(addNotification({ type: 'error', message: 'Failed to delete blog' }))
    }
  })
}
