import { CATEGORIES } from '@/core/constants'

export interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  category: (typeof CATEGORIES)[number]
  author: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export interface CreateBlogDto {
  title: string
  excerpt: string
  content: string
  category: (typeof CATEGORIES)[number]
  author: string
  thumbnail: string
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}
