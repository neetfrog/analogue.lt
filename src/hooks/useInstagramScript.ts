import { useEffect, useState } from 'react'

const scriptSrc = 'https://www.instagram.com/embed.js'
let instagramScriptPromise: Promise<void> | null = null

function loadInstagramScript() {
  if (instagramScriptPromise) {
    return instagramScriptPromise
  }

  instagramScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null

    if (existingScript) {
      if (existingScript.dataset.instagramLoaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(), { once: true })
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = scriptSrc
    script.onload = () => {
      script.dataset.instagramLoaded = 'true'
      resolve()
    }
    script.onerror = () => reject()
    document.body.appendChild(script)
  })

  return instagramScriptPromise
}

export function useInstagramScript(active: boolean, preload = false) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!active && !preload) {
      return
    }

    let mounted = true
    let intervalId: number | undefined

    const processEmbeds = () => {
      const instgrm = (window as any).instgrm
      if (instgrm?.Embeds?.process && typeof instgrm.Embeds.process === 'function') {
        instgrm.Embeds.process()
        if (mounted) {
          setIsLoaded(true)
        }
        if (intervalId) {
          window.clearInterval(intervalId)
          intervalId = undefined
        }
      }
    }

    const load = () => {
      loadInstagramScript()
        .then(() => {
          if (!mounted) {
            return
          }

          processEmbeds()
          intervalId = window.setInterval(processEmbeds, 500)
        })
        .catch(() => {
          if (mounted) {
            setHasError(true)
          }
        })
    }

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 500 })
      : window.setTimeout(load, 150)

    return () => {
      mounted = false
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId as number)
      }
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [active, preload])

  return { isLoaded, hasError }
}
