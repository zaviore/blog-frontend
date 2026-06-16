import { createBrowserRouter, Outlet } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { HomePage } from '@/features/blog/pages/HomePage'
import { BlogListPage } from '@/features/blog/pages/BlogListPage'
import { BlogDetailPage } from '@/features/blog/pages/BlogDetailPage'
import { CreateBlogPage } from '@/features/blog/pages/CreateBlogPage'

const LayoutWithOutlet = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export const router = createBrowserRouter([
  {
    element: <LayoutWithOutlet />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/blog',
        element: <BlogListPage />
      },
      {
        path: '/blog/create',
        element: <CreateBlogPage />
      },
      {
        path: '/blog/:id',
        element: <BlogDetailPage />
      },
      {
        path: '/blog/:id/edit',
        element: <CreateBlogPage />
      }
    ]
  }
])
