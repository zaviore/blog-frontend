'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { Card } from '@/shared/ui/Card'
import { Loader } from '@/shared/ui/Loader'
import { CATEGORIES, SORT_OPTIONS } from '@/core/constants'
import { useBlogsInfinite } from '../hooks/useBlogs'
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver'
import { BlogCard } from '../components/BlogCard'
import { BlogCardSkeleton } from '../components/BlogCardSkeleton'
import { debounce } from '@/core/utils'

export const BlogListPage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 300),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSetSearch(e.target.value)
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useBlogsInfinite({
      search: debouncedSearch,
      category: category || undefined,
      sort: sort || undefined
    })

  const [observerRef, entry] = useIntersectionObserver({ threshold: 0.1 })

  const blogs = data?.pages.flatMap((page) => page.data) || []

  if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage()
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Blog Posts
          </h1>
          <Link href="/blog/create">
            <Button>Write Post</Button>
          </Link>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={handleSearchChange}
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <Card className="p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {hasNextPage && (
              <div
                ref={observerRef}
                className="flex justify-center py-12"
              >
                {isFetchingNextPage ? (
                  <Loader />
                ) : (
                  <Button onClick={() => fetchNextPage()} variant="outline">
                    Load More
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
