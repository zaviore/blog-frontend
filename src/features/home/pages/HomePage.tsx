'use client'

import Link from 'next/link'
import { TypingEffect } from '@/shared/components/TypingEffect'
import { useBlogsInfinite } from '@/features/blog/hooks/useBlogs'
import { FeaturedArticleCard } from '../components/FeaturedArticleCard'


const stats = [
  { value: '3+', label: 'Years building web products' },
  { value: '6+', label: 'Production dashboards shipped' },
  { value: 'AI', label: 'Monitoring and analytics domain' },
]

const selectedWork = [
  {
    title: 'AI CCTV Monitoring Dashboard',
    description:
      'Real-time monitoring interface for object detection, face recognition, and operational CCTV workflows.',
    role: 'Frontend Engineer',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'API Integration'],
  },
  {
    title: 'Visitor Management System',
    description:
      'Responsive web app for visitor registration, identity workflows, and internal operational reporting.',
    role: 'Frontend Developer',
    stack: ['React', 'Material UI', 'SSO', 'Testing'],
  },
  {
    title: 'Customer Analytics Dashboard',
    description:
      'Admin dashboard with dynamic charts, filtering, pagination, aggregation, and reusable UI modules.',
    role: 'Software Engineer',
    stack: ['Laravel', 'MySQL', 'Bootstrap', 'Docker'],
  },
]

const techGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Quality',
    items: ['Cypress', 'Jest', 'Code Review', 'Reusable Components'],
  },
  {
    title: 'Backend & Tools',
    items: ['Node.js', 'Laravel', 'MySQL', 'PostgreSQL', 'Docker'],
  },
]

export const HomePage = () => {
  const { data, isLoading } = useBlogsInfinite({ limit: 3 })

  const featuredBlogs = data?.pages[0]?.data || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
              Frontend / Software Engineer
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-950 dark:text-white md:text-6xl">
              Hi, I'm{' '}
              <span className="text-primary-600 dark:text-primary-400">
                <TypingEffect text="Zamhadi" />
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              I build scalable dashboards, AI-powered web applications, and maintainable
              React/Next.js interfaces for complex product workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#selected-work"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                View My Work
              </Link>
              <Link
                href="https://drive.google.com/file/d/12MLwQbOy_d7yQvYrghnouGoUuXJL5xsW/view"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-800 transition-colors hover:border-primary-500 hover:text-primary-600 dark:border-gray-700 dark:text-gray-100 dark:hover:border-primary-400 dark:hover:text-primary-400"
              >
                View CV
              </Link>
            
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-4 rounded-2xl border border-primary-200 dark:border-primary-900" />
            <img
              src="/zam-photo.jpeg"
              alt="Zamhadi"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl shadow-gray-200 dark:shadow-black/30"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-blue-50 px-4 py-8 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-gray-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="selected-work" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Selected Work
            </p>
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
              Product interfaces for real operational problems.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {selectedWork.map((project) => (
              <article
                key={project.title}
                className="rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:border-primary-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800"
              >
                <p className="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400">
                  {project.role}
                </p>
                <h3 className="text-xl font-bold text-gray-950 dark:text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900/40 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Career Snapshot
            </p>
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
              From dashboards to AI-powered web apps.
            </h2>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              My work spans frontend architecture, API integration, reusable component systems,
              testing, deployment support, and close collaboration with product, backend, and AI
              teams.
            </p>
            <Link
              href="/career-journey"
              className="mt-6 inline-flex items-center rounded-lg bg-gray-950 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              See Full Career Journey
            </Link>
          </div>

          <div className="grid gap-4">
            {techGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
              >
                <h3 className="font-semibold text-gray-950 dark:text-white">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 px-4 py-16 dark:border-gray-800 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
                Latest Writing
              </p>
              <h2 className="text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
                Notes from building and learning.
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              View all articles
            </Link>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {featuredBlogs.map((blog) => (
                <FeaturedArticleCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-900 px-4 py-16 text-white dark:bg-black">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Let's build something useful.</h2>
            <p className="mt-3 max-w-2xl text-white">
              Open to frontend engineering roles, product dashboard work, and technical
              collaboration around React, Next.js, and web application architecture.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:zamhadi21@gmail.com"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-medium text-gray-950 transition-colors hover:bg-gray-200"
            >
              Email Me
            </a>
           
          </div>
        </div>
      </section>
    </div>
  )
}
