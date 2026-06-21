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
  value.replace(/^```(?:html)?/i, '').replace(/```$/i, '').trim()

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
      <h2>Introduction</h2>
      <p>${topic} is an important topic in ${label.toLowerCase()} because it affects how teams design, build, and maintain software over time.</p>

      <h3>Core Idea</h3>
      <p>${prompt.trim()} The main goal is to understand the problem clearly, choose a simple architecture, and keep the implementation easy to evolve.</p>

      <h3>Implementation Approach</h3>
      <p>Start by defining the user need, then break the work into small components. Validate the data flow, handle loading and error states, and keep business logic separate from presentation code.</p>

      <h3>Best Practices</h3>
      <p>Prefer readable code, typed data contracts, and focused tests around risky behavior. Avoid adding abstractions too early; let repeated patterns prove that an abstraction is useful.</p>

      <h3>Conclusion</h3>
      <p>By approaching ${topic.toLowerCase()} with clear constraints and steady iteration, you can build a solution that is practical today and easier to improve later.</p>
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
    'Write a blog article in clean semantic HTML.',
    'Use h2, h3, and p tags only.',
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
