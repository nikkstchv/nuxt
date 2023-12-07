<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

const route = useRoute()

definePageMeta({
  middleware: 'city',
})

const { holdingName } = useHoldingStore()
const initData = {
  transportType: { code: 'atv', name: '' },
  condition: { code: 'new', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Новые квадроциклы от официального дилера: цены на квадроциклы в наличии – ${holdingName}`,
  asc: {
    description: `Цены на новые квадроциклы в наличии. Продажа новых квадроциклов в Москве от официального дилера ${holdingName}`,
  },
  avtodom: {
    description: '⭐ Новые квадроциклы в наличии. Продажа новых квадроциклов в Москве по привлекательным ценам от интернет-магазина АВТОДОМ',
  },
}

const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
