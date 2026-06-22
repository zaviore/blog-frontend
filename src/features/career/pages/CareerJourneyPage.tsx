'use client'

import Link from 'next/link'
import { careerData } from '../data'

export const CareerJourneyPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-14 dark:bg-gray-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Career Journey
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-5xl">
              Work experience, impact, and technical growth.
            </h1>
          </div>
          <div>
            <p className="leading-8 text-gray-600 dark:text-gray-400">
              A detailed look at the products, dashboards, internal tools, and frontend systems I
              have helped design, build, maintain, and improve across engineering teams.
            </p>
            <Link
              href="/cv"
              className="mt-5 inline-flex items-center rounded-lg bg-primary-600 px-5 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              View CV
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gray-200 dark:bg-gray-800 md:block" />
          <div className="space-y-8">
            {careerData.map((experience) => (
              <article
                key={experience.id}
                className="relative grid gap-5 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-[220px_1fr] md:pl-12"
              >
                <div className="absolute left-3 top-8 hidden h-3 w-3 rounded-full border-2 border-primary-600 bg-white dark:bg-gray-950 md:block" />
                <aside>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {experience.startDate} - {experience.endDate || 'Present'}
                  </p>
                  {experience.featured ? (
                    <span className="mt-3 inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      Featured role
                    </span>
                  ) : null}
                </aside>

                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
                        {experience.title}
                      </h2>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{experience.company}</p>
                    </div>
                    {experience.companyLogo ? (
                      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-950">
                        <img
                          src={experience.companyLogo}
                          alt={experience.company}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : null}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {experience.jobDetails.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-3 leading-7 text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
