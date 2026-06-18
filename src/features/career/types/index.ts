export interface CareerExperience {
  id: string
  title: string
  company: string
  companyLogo?: string
  startDate: string
  endDate: string
  techStack: string[]
  jobDetails: string[]
  featured?: boolean
}
