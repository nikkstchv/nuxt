<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :mark-name="markName"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

definePageMeta({
  middleware: 'city',
})

const { holdingName } = useHoldingStore()
const route = useRoute()
const initData = {
  condition: { code: 'used', name: '', nameRu: '' },
  transportType: { code: 'atv', name: '', nameRu: '' },
  mark: { code: route.params.mark, name: '', nameRu: '' },
}
const { seo, total, cards, markName, markNameRu } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  asc: {
    title: `Купить ${markName} с пробегом: цены на б/у ${markNameRu} в Москве – ${holdingName}`,
    description: `Цены на ${markName} с пробегом в Москве, подержанные квадроциклы ${markName} в наличии. Приобретайте б/у ${markName} автомобили на привлекательных условиях в ${holdingName}`,
  },
  avtodom: {
    title: `Квадроциклы ${markName} с пробегом в Москве, купить квадроциклы ${markName} б/у – АВТОДОМ`,
    description: `⭐ Продажа подержанных квадроциклов ${markName} в Москве. Приобретайте б/у квадроциклы ${markName} на привлекательных условиях в АВТОДОМ.`,
  },
  description: `Цены на ${markName} с пробегом в Москве, подержанные автомобили ${markName} в наличии. Приобретайте б/у ${markName} автомобили на привлекательных условиях в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
