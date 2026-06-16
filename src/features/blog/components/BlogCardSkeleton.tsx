import { Card } from '@/shared/ui/Card'
import { Skeleton } from '@/shared/ui/Skeleton'

export const BlogCardSkeleton = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" className="aspect-video" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  )
}
