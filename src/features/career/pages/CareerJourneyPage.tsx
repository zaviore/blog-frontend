'use client'

import { CareerCard } from '../components/CareerCard'
import { careerData } from '../data'

export const CareerJourneyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Career Journey
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerData.map((experience) => (
            <CareerCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  )
}
