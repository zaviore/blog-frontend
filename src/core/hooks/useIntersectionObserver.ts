import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  root?: null
  rootMargin?: string
  threshold?: number | number[]
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.1
}: UseIntersectionObserverProps = {}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setEntry(entries[0])
      },
      { root, rootMargin, threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observerRef.current.observe(currentElement)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [root, rootMargin, threshold])

  return [elementRef, entry] as const
}
