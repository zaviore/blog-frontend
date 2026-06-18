import { Card } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'

export const SavedArticles = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Saved Articles</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Sign in to see your saved articles and continue reading where you left off.
      </p>
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
        Sign In
      </Button>
    </Card>
  )
}
