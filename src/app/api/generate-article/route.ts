import { NextResponse } from 'next/server'
import { generateArticle } from '@/features/blog/services/articleGenerator'

export async function POST(request: Request) {
  const body = await request.json()
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''

  if (!prompt) {
    return NextResponse.json(
      { message: 'Prompt is required' },
      { status: 400 }
    )
  }

  const article = await generateArticle({
    prompt,
    title: typeof body.title === 'string' ? body.title : undefined,
    category: typeof body.category === 'string' ? body.category : undefined
  })

  return NextResponse.json(article)
}
