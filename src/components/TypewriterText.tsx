import { useEffect, useState } from 'react'

type TypewriterTextProps = {
  text: string
  reduceMotion?: boolean
  className?: string
  delay?: number
  speed?: number
  onComplete?: () => void
}

export function TypewriterText({
  text,
  reduceMotion = false,
  className = '',
  delay = 150,
  speed = 35,
  onComplete,
}: TypewriterTextProps) {
  const [visibleText, setVisibleText] = useState('')
  const [isTyping, setIsTyping] = useState(!reduceMotion)

  useEffect(() => {
    setVisibleText('')
    setIsTyping(!reduceMotion)

    let intervalId: number | undefined
    const timeoutId = window.setTimeout(() => {
      let index = 0
      intervalId = window.setInterval(() => {
        index += 1
        setVisibleText(text.slice(0, index))

        if (index >= text.length) {
          window.clearInterval(intervalId)
          setIsTyping(false)
          onComplete?.()
        }
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [text, reduceMotion, delay, speed])

  return (
    <span className={`typewriter-text ${className}`}>
      {visibleText}
      <span
        aria-hidden="true"
        className={`typewriter-cursor ${isTyping ? 'typing' : ''}`}
      >
        |
      </span>
    </span>
  )
}
