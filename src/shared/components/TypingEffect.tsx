import { useState, useEffect } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
}

export const TypingEffect = ({ text, speed = 150 }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const type = () => {
      if (!isDeleting && index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index))
        setIndex((prev) => prev + 1)
      } else if (isDeleting && index > 0) {
        setDisplayText((prev) => prev.slice(0, -1))
        setIndex((prev) => prev - 1)
      } else if (!isDeleting && index === text.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
      }
    }

    const timer = setTimeout(type, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [displayText, index, isDeleting, text, speed])

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  )
}
