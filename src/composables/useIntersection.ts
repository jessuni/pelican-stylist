import { useState, useEffect } from 'react'

let observerOptions: IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 1.0,
}
export default function useIntersection(
  elRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = observerOptions
): boolean {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, options)

    if (elRef.current) {
      observer.observe(elRef.current)
    }
    return () => {
      if (elRef.current) {
        observer.unobserve(elRef.current)
      }
    }
  }, [])
  return isVisible
}
