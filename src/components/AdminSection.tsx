import { useEffect, useMemo, useState } from 'react'
import type { GearItem } from '../data/content'

type AdminSectionProps = {
  items: GearItem[]
  onSaveItems: (items: GearItem[]) => Promise<void>
}

const parseList = (value: string) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

const formatList = (value?: string[]) => (value && value.length ? value.join('\n') : '')

const defaultGearItem = (): GearItem => ({
  id: Date.now(),
  name: '',
  price: '',
  condition: '',
  category: 'cameras',
  manufacturer: '',
  description: '',
  sold: false,
  image: '',
  details: '',
  specs: [],
  tags: [],
  moreImages: []
})

export function AdminSection({ items, onSaveItems }: AdminSectionProps) {
  const [draftItems, setDraftItems] = useState<GearItem[]>(items)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setDraftItems(items)
    setIsDirty(false)
  }, [items])

  const updateItem = <K extends keyof GearItem>(id: number, field: K, value: GearItem[K]) => {
    setDraftItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
    setIsDirty(true)
  }

  const updateTextList = (id: number, field: 'specs' | 'tags' | 'moreImages', value: string) => {
    updateItem(id, field, parseList(value) as GearItem[typeof field])
  }

  const addNewItem = () => {
    const nextItem = defaultGearItem()
    setDraftItems((current) => [nextItem, ...current])
    setIsDirty(true)
  }

  const deleteItem = (id: number) => {
    setDraftItems((current) => current.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  const [saveError, setSaveError] = useState<string | null>(null)
  const [savePending, setSavePending] = useState(false)

  const saveChanges = async () => {
    try {
      setSavePending(true)
      setSaveError(null)
      await onSaveItems(draftItems)
      setIsDirty(false)
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save changes')
    } finally {
      setSavePending(false)
    }
  }

  const handleImageUpload = async (id: number, file: File, field: 'image' | 'moreImages') => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') {
        return
      }

      if (field === 'image') {
        updateItem(id, 'image', result)
      } else {
        const currentItem = draftItems.find((item) => item.id === id)
        if (!currentItem) {
          return
        }
        const updatedImages = [...(currentItem.moreImages ?? []), result]
        updateItem(id, 'moreImages', updatedImages as GearItem['moreImages'])
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <section className="w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-24 py-16 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 text-center">
          <p className="text-amber-600 text-sm tracking-[0.2em] uppercase font-medium mb-4">Admin Dashboard</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Manage shop items</h2>
          <p className="mt-4 text-stone-500 text-base md:text-lg leading-8">
            Add, edit, price, and update product details, photos, and links. Changes are saved securely on the backend.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={addNewItem}
            className="inline-flex items-center justify-center rounded-3xl bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Add new item
          </button>
          <button
            type="button"
            onClick={saveChanges}
            disabled={!isDirty || savePending}
            className={`inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-medium transition ${isDirty ? 'bg-amber-600 text-white hover:bg-amber-500' : 'bg-stone-200 text-stone-500 cursor-not-allowed'}`}
          >
            {savePending ? 'Saving...' : 'Save changes'}
          </button>
        </div>
        {saveError ? <p className="mb-6 text-sm text-red-600">{saveError}</p> : null}

        <div className="space-y-6">
          {draftItems.map((item) => (
            <div key={item.id} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.name || 'New item'}</h3>
                  <p className="text-sm text-stone-500">ID: {item.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-100"
                >
                  Delete
                </button>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Name
                  <input
                    value={item.name}
                    onChange={(event) => updateItem(item.id, 'name', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Price
                  <input
                    value={item.price}
                    onChange={(event) => updateItem(item.id, 'price', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Condition
                  <input
                    value={item.condition}
                    onChange={(event) => updateItem(item.id, 'condition', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Category
                  <input
                    value={item.category}
                    onChange={(event) => updateItem(item.id, 'category', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Manufacturer
                  <input
                    value={item.manufacturer}
                    onChange={(event) => updateItem(item.id, 'manufacturer', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Sold
                  <input
                    type="checkbox"
                    checked={item.sold}
                    onChange={(event) => updateItem(item.id, 'sold', event.target.checked)}
                    className="h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-400"
                  />
                </label>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Description
                  <textarea
                    value={item.description}
                    rows={3}
                    onChange={(event) => updateItem(item.id, 'description', event.target.value)}
                    className="min-h-[5rem] rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Details
                  <textarea
                    value={item.details}
                    rows={4}
                    onChange={(event) => updateItem(item.id, 'details', event.target.value)}
                    className="min-h-[7rem] rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Specs (one per line)
                  <textarea
                    value={formatList(item.specs)}
                    rows={4}
                    onChange={(event) => updateTextList(item.id, 'specs', event.target.value)}
                    className="min-h-[7rem] rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Tags (one per line)
                  <textarea
                    value={formatList(item.tags)}
                    rows={3}
                    onChange={(event) => updateTextList(item.id, 'tags', event.target.value)}
                    className="min-h-[5rem] rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Main image URL
                  <input
                    value={item.image}
                    onChange={(event) => updateItem(item.id, 'image', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Upload main photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) {
                        handleImageUpload(item.id, file, 'image')
                        setIsDirty(true)
                      }
                    }}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  More image URLs (one per line)
                  <textarea
                    value={formatList(item.moreImages)}
                    rows={4}
                    onChange={(event) => updateTextList(item.id, 'moreImages', event.target.value)}
                    className="min-h-[7rem] rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Upload additional photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      const files = event.target.files
                      if (!files) {
                        return
                      }
                      Array.from(files).forEach((file) => handleImageUpload(item.id, file, 'moreImages'))
                      setIsDirty(true)
                    }}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Vinted URL
                  <input
                    value={item.vintedUrl ?? ''}
                    onChange={(event) => updateItem(item.id, 'vintedUrl', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Wikipedia URL
                  <input
                    value={item.wikiUrl ?? ''}
                    onChange={(event) => updateItem(item.id, 'wikiUrl', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
                  Inquiry email
                  <input
                    type="email"
                    value={item.inquiryEmail ?? ''}
                    onChange={(event) => updateItem(item.id, 'inquiryEmail', event.target.value)}
                    className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>
              </div>

              {item.image || item.moreImages?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {item.image ? (
                    <div className="overflow-hidden rounded-3xl bg-stone-100">
                      <img src={item.image} alt={`${item.name} preview`} className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                  {item.moreImages?.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-3xl bg-stone-100">
                      <img src={src} alt={`${item.name} extra ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
