interface GenerateArticleInput {
  prompt: string
  title?: string
  category?: string
}

export interface GeneratedArticle {
  content: string
  excerpt: string
  source: 'huggingface' | 'local'
}

const stripCodeFence = (value: string) =>
  value.replace(/^```(?:md|markdown)?/i, '').replace(/```$/i, '').trim()

const createExcerpt = (prompt: string, title?: string) => {
  const topic = title?.trim() || prompt.trim()
  return `A practical guide about ${topic.toLowerCase()} with key concepts, implementation notes, and best practices.`
    .slice(0, 197)
    .trim()
}

const createLocalArticle = ({ prompt, title, category }: GenerateArticleInput): GeneratedArticle => {
  const topic = title?.trim() || prompt.trim()
  const label = category || 'Technology'

  return {
    source: 'local',
    excerpt: createExcerpt(prompt, title),
    content: `
## Introduction

${topic} is an important topic in ${label.toLowerCase()} because it affects how teams design, build, and maintain software over time.

### Core Idea

${prompt.trim()} The main goal is to understand the problem clearly, choose a simple architecture, and keep the implementation easy to evolve.

### Implementation Approach

Start by defining the user need, then break the work into small components. Validate the data flow, handle loading and error states, and keep business logic separate from presentation code.

### Best Practices

- Prefer readable code and typed data contracts.
- Add focused tests around risky behavior.
- Avoid abstractions until repeated patterns prove they are useful.

### Conclusion

By approaching ${topic.toLowerCase()} with clear constraints and steady iteration, you can build a solution that is practical today and easier to improve later.
    `.trim()
  }
}

export const generateArticle = async (
  input: GenerateArticleInput
): Promise<GeneratedArticle> => {
  const token = process.env.HUGGINGFACE_API_TOKEN
  const model = process.env.HUGGINGFACE_MODEL || 'HuggingFaceH4/zephyr-7b-beta'

  if (!token) {
    return createLocalArticle(input)
  }

  const instruction = [
    'Write a blog article in clean Markdown.',
    'Use ## headings, ### subheadings, short paragraphs, and bullet lists when useful.',
    'Do not include markdown fences.',
    `Title: ${input.title || input.prompt}`,
    `Category: ${input.category || 'Technology'}`,
    `Prompt: ${input.prompt}`
  ].join('\n')

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: instruction,
          parameters: {
            max_new_tokens: 900,
            temperature: 0.7,
            return_full_text: false
          }
        })
      }
    )

    if (!response.ok) {
      return createLocalArticle(input)
    }

    const data = await response.json()
    const generatedText =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : data.generated_text

    if (!generatedText) {
      return createLocalArticle(input)
    }

    return {
      source: 'huggingface',
      excerpt: createExcerpt(input.prompt, input.title),
      content: stripCodeFence(generatedText)
    }
  } catch {
    return createLocalArticle(input)
  }
}
