<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :engine-type="initData.engineType.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import { useHoldingStore } from '@/store/holding'

const route = useRoute()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const engineTypes = ['electric', 'hybrid'].join('&')
const initData = {
  transportType: { code: 'cars', name: '' },
  condition: { code: 'new', name: '' },
  engineType: { code: `engine-type-is-${engineTypes}`, name: '' },
}

const { seo, total, cards, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить новый электромобиль в Москве и Санкт-Петербурге у официального дилера - ${holdingName}`,
  description: `Цены на новые электромобили в наличии. Продажа новых электромобилей в Москве от официального дилера ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
