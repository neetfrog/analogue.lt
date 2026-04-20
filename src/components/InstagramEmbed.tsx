import { useEffect } from 'react'

type InstagramEmbedProps = {
  account: string
}

export function InstagramEmbed({ account }: InstagramEmbedProps) {
  useEffect(() => {
    const scriptSrc = 'https://www.instagram.com/embed.js'

    const handleProcess = () => {
      const instgrm = (window as any).instgrm
      if (instgrm && instgrm.Embeds && typeof instgrm.Embeds.process === 'function') {
        instgrm.Embeds.process()
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
      document.body.appendChild(script)
    } else {
      handleProcess()
    }

    const retry = window.setTimeout(handleProcess, 1200)
    return () => window.clearTimeout(retry)
  }, [account])

  return (
    <div className="mb-12 flex flex-col items-center">
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
    </div>
  )
}
