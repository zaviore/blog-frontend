export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
