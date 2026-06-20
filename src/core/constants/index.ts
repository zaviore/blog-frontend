export const CATEGORIES = [
  'Frontend',
  'Backend',
  'Fullstack',
  'Mobile',
  'DevOps',
  'Design',
  'Career',
  'Other'
] as const

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest' },
  { value: '-createdAt', label: 'Oldest' },
  { value: 'title', label: 'Title A-Z' },
  { value: '-title', label: 'Title Z-A' }
]

export const DEFAULT_PAGE_SIZE = 10

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''
