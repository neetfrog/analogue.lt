import { useInstagramScript } from '../hooks/useInstagramScript'

type InstagramEmbedProps = {
  account: string
  active: boolean
  preload?: boolean
}

export function InstagramEmbed({ account, active, preload = false }: InstagramEmbedProps) {
  const { isLoaded, hasError } = useInstagramScript(active, preload)
  const shouldRenderEmbed = active || preload
  const wrapperClass = active
    ? 'mb-12 flex flex-col items-center w-full'
    : 'w-full h-0 overflow-hidden opacity-0 pointer-events-none'

  return (
    <div className={wrapperClass} aria-hidden={!active} aria-busy={active && !isLoaded}>
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
