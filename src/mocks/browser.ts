import { setupWorker } from 'msw/browser'
import { blogHandlers } from './handlers/blogHandlers'

export const worker = setupWorker(...blogHandlers)
