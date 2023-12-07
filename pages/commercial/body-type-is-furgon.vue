<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

const route = useRoute()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const initData = {
  transportType: { code: 'commercial', name: '' },
  'body-type': { code: 'body-type-is-van', name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить грузовые автофургоны новые или с пробегом в ${location} – ГК ${holdingName}`,
  description: `Цены на автофургоны в ${location}, подержанные и новые фургоны в наличии. Приобретайте б/у грузовые автофургоны на привлекательных условиях в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
