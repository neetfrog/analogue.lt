import { useEffect } from 'react'

export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior

    if (isOpen) {
      document.body.dataset.lightboxOpen = 'true'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.documentElement.style.overscrollBehavior = 'none'
    } else {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }

    return () => {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }
  }, [isOpen])
}
