'use client'

import { Card } from '@/shared/ui/Card'

interface TechItem {
  name: string
  icon: string
}

interface TechStackCarouselProps {
  techStack: TechItem[]
}

export const TechStackCarousel = ({ techStack }: TechStackCarouselProps) => {
  // Create 2 identical sets for seamless infinite loop
  const carouselItems = [...techStack, ...techStack]

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex gap-6"
        style={{
          animation: 'scroll 30s linear infinite'
        }}
      >
        {carouselItems.map((tech, index) => (
          <Card 
            key={`${tech.name}-${index}`} 
            className="p-6 text-center hover:shadow-lg transition-shadow flex-shrink-0"
            style={{ width: 180 }}
          >
            <img src={tech.icon} alt={tech.name} className="w-16 h-16 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
          </Card>
        ))}
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent pointer-events-none" />
      
      {/* CSS Animation - scroll exactly 50% to loop seamlessly */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
