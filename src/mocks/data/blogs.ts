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

const blogTitles = [
  'Understanding React Query: A Comprehensive Guide',
  'Mastering TypeScript Generics',
  'Building Scalable Applications with Redux Toolkit',
  'The Future of Web Development in 2026',
  'CSS Grid vs Flexbox: When to Use Which',
  'Introduction to WebAssembly',
  'Optimizing React Performance',
  'Building REST APIs with Node.js',
  'The Power of Functional Programming',
  'Understanding React Server Components',
  'Advanced State Management Patterns',
  'Testing React Applications with Vitest',
  'Modern CSS Techniques You Should Know',
  'The Complete Guide to React Hooks',
  'Building Accessible Web Applications',
  'Introduction to GraphQL',
  'Docker for Frontend Developers',
  'Understanding Async/Await in JavaScript',
  'The Art of Code Review',
  'Career Growth for Software Engineers',
  'Building Real-time Applications with WebSockets',
  'Design Systems: From Theory to Practice',
  'Security Best Practices for Web Apps',
  'Introduction to Microfrontends',
  'The Psychology of User Experience',
  'TypeScript Best Practices',
  'Performance Optimization for Web Apps',
  'React Native vs Flutter: A Comparison',
  'Understanding HTTP/2 and HTTP/3',
  'The Evolution of JavaScript Frameworks',
  'Building CLI Tools with Node.js',
  'Database Design Patterns',
  'Container Orchestration with Kubernetes',
  'CI/CD Best Practices',
  'The Rise of AI in Software Development',
  'Monorepo Strategies',
  'Understanding Event-Driven Architecture',
  'Web Performance Optimization Checklist',
  'Modern Authentication Methods',
  'API Design Best Practices',
  'The Future of JavaScript',
  'Building Offline-First Applications',
  'Internationalization in React',
  'Error Handling Best Practices',
  'Code Splitting Techniques',
  'Memory Management in JavaScript',
  'The Art of Debugging',
  'Technical Writing for Developers',
  'Remote Work Best Practices',
  'Learning Strategies for Programmers'
]

const authors = [
  'John Doe',
  'Jane Smith',
  'Alex Johnson',
  'Sarah Williams',
  'Michael Brown',
  'Emily Davis',
  'Chris Wilson',
  'Lisa Anderson',
  'David Martinez',
  'Amy Taylor'
]

const generateBlogContent = (title: string): string => {
  return `
    <h2>Introduction</h2>
    <p>Welcome to this comprehensive guide on ${title.toLowerCase()}. In this article, we'll explore the fundamentals and dive deep into advanced concepts.</p>
    
    <h3>Getting Started</h3>
    <p>To begin, let's understand the core concepts. This foundation will help us build more complex applications later on. We'll cover the essential principles and how they work together.</p>
    
    <h3>Key Concepts</h3>
    <p>There are several key concepts we need to master. These concepts form the building blocks of modern web development. Understanding them will give you a competitive edge in your career.</p>
    
    <h3>Practical Examples</h3>
    <p>Let's look at some practical examples. These examples will demonstrate how to apply the concepts we've learned in real-world scenarios. Each example includes detailed explanations and best practices.</p>
    
    <h3>Best Practices</h3>
    <p>Following best practices is crucial for writing maintainable and scalable code. We'll discuss the most important ones and why they matter.</p>
    
    <h3>Conclusion</h3>
    <p>In conclusion, mastering these concepts will significantly improve your development skills. Keep practicing and applying what you've learned!</p>
  `
}

const generateBlogs = (count: number): Blog[] => {
  const blogs: Blog[] = []
  
  for (let i = 1; i <= count; i++) {
    const titleIndex = (i - 1) % blogTitles.length
    const title = blogTitles[titleIndex] + (i > blogTitles.length ? ` (Part ${Math.ceil(i / blogTitles.length)})` : '')
    const category = CATEGORIES[i % CATEGORIES.length]
    const author = authors[i % authors.length]
    const date = new Date(2025, 0, 1 + (i % 365))
    
    blogs.push({
      id: i,
      title,
      excerpt: `Learn ${title.toLowerCase()} from scratch with this comprehensive guide. Perfect for beginners and experienced developers alike.`,
      content: generateBlogContent(title),
      category,
      author,
      thumbnail: `https://picsum.photos/seed/blog${i}/800/400`,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString()
    })
  }
  
  return blogs.reverse()
}

export const mockBlogs = generateBlogs(120)
