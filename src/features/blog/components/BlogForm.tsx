import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { Select } from '@/shared/ui/Select'
import { CATEGORIES } from '@/core/constants'
import { blogFormSchema } from '../schemas'
import type { CreateBlogDto } from '../types'

interface BlogFormProps {
  initialData?: Partial<CreateBlogDto>
  onSubmit: (data: CreateBlogDto) => void
  isLoading?: boolean
  submitText?: string
}

export const BlogForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = 'Create Blog'
}: BlogFormProps) => {
  const [articlePrompt, setArticlePrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatorError, setGeneratorError] = useState<string | null>(null)

  const form = useForm<CreateBlogDto>({
    defaultValues: {
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      category: initialData?.category || 'Frontend',
      author: initialData?.author || '',
      thumbnail: initialData?.thumbnail || 'https://picsum.photos/seed/default/800/400'
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
    }
  })

  const handleGenerateArticle = async () => {
    if (!articlePrompt.trim()) {
      setGeneratorError('Please enter a prompt first.')
      return
    }

    setIsGenerating(true)
    setGeneratorError(null)

    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: articlePrompt,
          title: form.state.values.title,
          category: form.state.values.category
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate article')
      }

      const data = await response.json()
      form.setFieldValue('content', data.content)

      if (!form.state.values.excerpt) {
        form.setFieldValue('excerpt', data.excerpt)
      }
    } catch {
      setGeneratorError('Article generator is unavailable. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => {
            if (!value) return blogFormSchema.title.required
            if (value.length < 5) return blogFormSchema.title.minLength.message
          }
        }}
        children={(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors.join(', ')}
              placeholder="Enter blog title"
            />
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form.Field
          name="category"
          validators={{
            onChange: ({ value }) => {
              if (!value) return blogFormSchema.category.required
            }
          }}
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <Select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as any)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(', ')}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
          )}
        />

        <form.Field
          name="author"
          validators={{
            onChange: ({ value }) => {
              if (!value) return blogFormSchema.author.required
            }
          }}
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author
              </label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(', ')}
                placeholder="Enter author name"
              />
            </div>
          )}
        />
      </div>

      <form.Field
        name="thumbnail"
        validators={{
          onChange: ({ value }) => {
            if (!value) return blogFormSchema.thumbnail.required
          }
        }}
        children={(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thumbnail URL
            </label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors.join(', ')}
              placeholder="Enter thumbnail URL"
            />
          </div>
        )}
      />

      <form.Field
        name="excerpt"
        validators={{
          onChange: ({ value }) => {
            if (!value) return blogFormSchema.excerpt.required
            if (value.length > 200) return blogFormSchema.excerpt.maxLength.message
          }
        }}
        children={(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt
              <span className="text-gray-400 ml-1">
                ({field.state.value.length}/200)
              </span>
            </label>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors.join(', ')}
              placeholder="Enter blog excerpt"
              rows={3}
            />
          </div>
        )}
      />

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Article Prompt
          </label>
          <Textarea
            value={articlePrompt}
            onChange={(e) => setArticlePrompt(e.target.value)}
            placeholder="Example: Write an article about how ISR works in Next.js for beginner frontend developers"
            rows={4}
          />
        </div>

        {generatorError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {generatorError}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleGenerateArticle}
          isLoading={isGenerating}
          disabled={isGenerating}
        >
          Generate Content
        </Button>
      </div>

      <form.Field
        name="content"
        validators={{
          onChange: ({ value }) => {
            if (!value) return blogFormSchema.content.required
            if (value.length < 50) return blogFormSchema.content.minLength.message
          }
        }}
        children={(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors.join(', ')}
              placeholder="Enter blog content"
              rows={10}
            />
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit]) => (
          <Button type="submit" disabled={!canSubmit || isLoading} isLoading={isLoading}>
            {submitText}
          </Button>
        )}
      />
    </form>
  )
}
