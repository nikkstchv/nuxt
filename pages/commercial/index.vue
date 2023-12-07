<template>
  <CatalogMainLayout
    :type-of-transport="typeOfTransport"
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
  middleware: 'city',
})

const { holdingName } = useHoldingStore()
const initData = {
  transportType: { code: 'commercial', name: '' },
}
const additionalData = { transportType: ['trucks'] }
const typeOfTransport = [initData.transportType.code, ...additionalData.transportType]
const { seo, total, cards } = await useInitCatalog({ initData, additionalData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Коммерческий транспорт у официального дилера в ${holdingName}`,
  description: `Продажа коммерческого автотранспорта от официального дилера ${holdingName}. Каталог коммерческого транспорт в наличии`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
