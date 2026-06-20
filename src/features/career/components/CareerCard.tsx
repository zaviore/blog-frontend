'use client'

import { useState } from 'react'
import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import type { CareerExperience } from '../types'

interface CareerCardProps {
  experience: CareerExperience
}

export const CareerCard = ({ experience }: CareerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const fullText = experience.jobDetails.join(' ')
  const words = fullText.split(' ')
  const maxWords = 10
  const isTruncated = words.length > maxWords
  const displayText = isTruncated && !isExpanded 
    ? words.slice(0, maxWords).join(' ') + '...' 
    : fullText

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <div className="aspect-video border border-gray-200 p-5 bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            {experience.companyLogo ? (
              <img
                src={experience.companyLogo}
                alt={experience.company}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-4xl font-bold text-gray-300 dark:text-gray-600">
                {experience.company.charAt(0)}
              </div>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {experience.title}
          </h3>
          
          <div className="">
            <p className="text-md text-primary-600 dark:text-primary-400 font-medium">
              {experience.company}
            </p>
            {experience.startDate && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {experience.startDate} - {experience.endDate || 'Present'}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 ">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
            Job Detail
          </h4>
        <div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {displayText}
          </p>
          {isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
