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
  condition: { code: 'used', name: '' },
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
  asc: {
    description: `Цены на квадроциклы с пробегом, подержанные квадроциклы в наличии. Приобретайте б/у квадроциклы на привлекательных условиях в компании ${holdingName}`,
  },
  avtodom: {
    description: '⭐ Цены на квадроциклы с пробегом, подержанные квадроциклы в наличии. Приобретайте б/у квадроциклы на привлекательных условиях в компании АВТОДОМ',
  },
  title: `Купить квадроцикл c пробегом в Москве: цены на б/у квадроциклы – ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
