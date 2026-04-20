import { useEffect, useState } from 'react'

type InstagramEmbedProps = {
  account: string
  active: boolean
  preload?: boolean
}

export function InstagramEmbed({ account, active, preload = false }: InstagramEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const shouldRenderEmbed = active || preload
  const wrapperClass = active
    ? 'mb-12 flex flex-col items-center w-full'
    : 'w-full h-0 overflow-hidden opacity-0 pointer-events-none'

  useEffect(() => {
    if (!active && !preload) {
      return
    }

    const scriptSrc = 'https://www.instagram.com/embed.js'
    let attempts = 0

    const handleProcess = () => {
      const instgrm = (window as any).instgrm
      if (instgrm && instgrm.Embeds && typeof instgrm.Embeds.process === 'function') {
        instgrm.Embeds.process()
        setIsLoaded(true)
      }
    }

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (!existingScript) {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptSrc
      script.onload = () => {
        handleProcess()
      }
      script.onerror = () => setHasError(true)
      document.body.appendChild(script)
    } else {
      handleProcess()
    }

    const retryInterval = window.setInterval(() => {
      attempts += 1
      if (attempts > 12 || isLoaded) {
        window.clearInterval(retryInterval)
        return
      }
      handleProcess()
    }, 500)

    return () => window.clearInterval(retryInterval)
  }, [account, active, preload])

  return (
    <div className={wrapperClass} aria-hidden={!active}>
      {shouldRenderEmbed && (
        <blockquote
          key={account}
          className="instagram-media rounded-3xl overflow-hidden bg-white shadow-sm"
          data-instgrm-permalink={`https://www.instagram.com/${account}/`}
          data-instgrm-version="14"
          style={{ margin: '0 auto', maxWidth: 540, minWidth: 326, width: '100%' }}
        >
          <a
            href={`https://www.instagram.com/${account}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#125688', fontWeight: 'bold' }}
          >
            View on Instagram
          </a>
        </blockquote>
      )}

      {active ? (
        <>
          {!isLoaded && !hasError && (
            <p className="mt-4 text-sm text-stone-500">Loading Instagram preview…</p>
          )}
          {hasError && (
            <p className="mt-4 text-sm text-stone-500">Instagram preview unavailable.</p>
          )}
        </>
      ) : !preload ? (
        <div className="w-full rounded-3xl border border-stone-200 bg-white/85 p-8 text-center text-sm text-stone-500">
          Instagram preview will appear once you open the contact section.
        </div>
      ) : null}
    </div>
  )
}
