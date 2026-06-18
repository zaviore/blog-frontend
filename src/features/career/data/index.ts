import type { CareerExperience } from '../types'

export const careerData: CareerExperience[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Telkom Indonesia (DAG)',
    companyLogo: './image.webp',
    startDate: 'January 2021',
    endDate: 'December 2022',
    techStack: ['Laravel', 'MySQL', 'HTML', 'BOOTSTRAP', 'JQuery', 'Docker', 'PHP', 'Server-side rendering (Blade)'],
    jobDetails: [
      'Building landing pages and admin dashboards using Laravel (MVC architecture)',
      'Designing MySQL database structures for customer analytics needs',
      'Implementing complex queries for customer data calculations and aggregation',
      'Developing dashboard features with summary statistics, dynamic charts, filtering, and pagination',
      'Frontend integration using Bootstrap & jQuery for dynamic interactions',
      'Developing reusable components on the dashboard display',
      'Creating customer data calculations based on MySQL queries',
      'Query optimization for dashboard performance',
      'Providing data visualization in the form of tables and graphs'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Telkom Indonesia (BigBox)',
    companyLogo: './image.webp',
    startDate: 'January 2022',
    endDate: 'Present',
    techStack: ['ReactJS', 'NextJS', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Material UI', 'Legion UI', 'Cypress', 'Jest', 'Docker', 'Google Analytics 4'],
    jobDetails: [
      'Developed and maintained AI-powered web applications, including real-time object detection, face recognition, CCTV monitoring, visitor management, and election monitoring systems.',
      'Built scalable and responsive dashboards using ReactJS, NextJS, TypeScript, and Tailwind CSS, focusing on performance, usability, and maintainability.',
      'Led frontend development initiatives, including SSO integration, reusable component libraries, design system implementation, and application architecture improvements.',
      'Collaborated closely with backend, AI, and product teams to integrate APIs, optimize user experience, and deliver business-driven solutions.',
      'Managed CI/CD processes, production deployments, monitoring, debugging, and performance optimization through code splitting, lazy loading, and modern frontend best practices.',
      'Conducted code reviews, established development standards, and mentored junior developers to ensure code quality and team growth.'
    ],
    featured: true
  },
  {
    id: '3',
    title: 'Freelance Software Engineer',
    company: 'Freelance',
    companyLogo: './freelance.png',
    startDate: 'June 2023',
    endDate: 'December 2023',
    techStack: ['Javascript/Typescript', 'NextJS', 'Tailwind', 'Hygraph', 'GraphQL', 'Node.js'],
    jobDetails: [
      'Create an Company profile base on CMS',
      'Create REST API',
      'Create an portopolio',
      'Maintaning dashboard and customizasing and features',
      'Create an dashboard'
    ]
  }
]
