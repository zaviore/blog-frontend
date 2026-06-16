export const blogFormSchema = {
  title: {
    required: 'Title is required',
    minLength: { value: 5, message: 'Title must be at least 5 characters' }
  },
  category: {
    required: 'Category is required'
  },
  excerpt: {
    required: 'Excerpt is required',
    maxLength: { value: 200, message: 'Excerpt must be at most 200 characters' }
  },
  content: {
    required: 'Content is required',
    minLength: { value: 50, message: 'Content must be at least 50 characters' }
  },
  author: {
    required: 'Author is required'
  },
  thumbnail: {
    required: 'Thumbnail URL is required'
  }
}
