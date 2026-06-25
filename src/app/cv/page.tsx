import Link from 'next/link'
import { careerData } from '@/features/career/data'

const profile = {
  name: 'Zamhadi',
  role: 'Frontend / Software Engineer',
  location: 'Indonesia',
  email: 'zamhadi21@gmail.com',
  summary:
    'Frontend engineer focused on scalable dashboards, AI-powered web applications, reusable component systems, and maintainable React/Next.js interfaces.',
}

const strengths = [
  'React, Next.js, TypeScript, and Tailwind CSS application development',
  'Dashboard UI, data-heavy workflows, filtering, charts, and pagination',
  'Reusable component architecture, design system implementation, and code reviews',
  'API integration, SSO integration, testing, deployment support, and performance optimization',
]

const projectHighlights = [
  'AI-powered CCTV monitoring, object detection, and face recognition web applications',
  'Visitor management and election monitoring dashboards',
  'Customer analytics dashboards with summaries, charts, filters, and optimized data views',
  'CMS-backed company profile websites and custom admin dashboards',
]

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10">
        <header className="grid gap-8 border-b border-gray-200 pb-8 dark:border-gray-800 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Curriculum Vitae
            </p>
            <h1 className="text-4xl font-bold text-gray-950 dark:text-white md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-xl text-gray-700 dark:text-gray-300">{profile.role}</p>
            <p className="mt-5 max-w-3xl leading-8 text-gray-600 dark:text-gray-400">
              {profile.summary}
            </p>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 md:text-right">
            <p>{profile.location}</p>
            <a
              className="block text-primary-600 hover:text-primary-700 dark:text-primary-400"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <Link
              className="block text-primary-600 hover:text-primary-700 dark:text-primary-400"
              href="/career-journey"
            >
              Career Journey
            </Link>
            <Link
              className="block text-primary-600 hover:text-primary-700 dark:text-primary-400"
              href="/blog"
            >
              Technical Blog
            </Link>
          </div>
        </header>

        <main className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-10">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">
                Core Strengths
              </h2>
              <ul className="mt-4 space-y-3">
                {strengths.map((item) => (
                  <li key={item} className="leading-7 text-gray-600 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">
                Project Highlights
              </h2>
              <ul className="mt-4 space-y-3">
                {projectHighlights.map((item) => (
                  <li key={item} className="leading-7 text-gray-600 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">
                Main Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(new Set(careerData.flatMap((item) => item.techStack))).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </aside>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">
              Experience
            </h2>
            <div className="mt-5 space-y-8">
              {careerData.map((experience) => (
                <article
                  key={experience.id}
                  className="border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-950 dark:text-white">
                        {experience.title}
                      </h3>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{experience.company}</p>
                    </div>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {experience.startDate} - {experience.endDate || 'Present'}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {experience.jobDetails.slice(0, 4).map((detail) => (
                      <li key={detail} className="leading-7 text-gray-600 dark:text-gray-400">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
