import { useHoldingStore } from '@/store/holding'

export default function (seoDefault, seo) {
  const { domain } = useHoldingStore()
  const title = seo?.seoTitle || seoDefault[domain]?.title || seoDefault?.title || ''
  const description = seo?.seoDescription || seoDefault[domain]?.description || seoDefault?.description || ''
  return {
    title,
    description,
  }
}
