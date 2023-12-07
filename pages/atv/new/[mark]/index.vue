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
  condition: { code: 'new', name: '', nameRu: '' },
  transportType: { code: 'atv', name: '', nameRu: '' },
  mark: { code: route.params.mark, name: '', nameRu: '' },
}
const { seo, total, cards, markName, markNameRu, currentYear } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  asc: {
    title: `Купить ${markName} ${currentYear} года в Москве у официального дилера: модельный ряд и цены на ${markNameRu} 2021–${currentYear} – ${holdingName}`,
    description: `Цены на новые ${markName} в Москве, новые квадроциклы ${markName} в наличии. Приобретайте новые ${markName} на привлекательных условиях у официального дилера в ${holdingName}`,

  },
  avtodom: {
    title: `Квадроциклы ${markName} новые в наличии в Москве, купить ${markName} 2022 - ${currentYear} года – АВТОДОМ`,
    description: `⭐ Цены на новые квадроциклы ${markName} в Москве. Приобретайте новые ${markName} на привлекательных условиях у официального дилера в АВТОДОМ`,
  },
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
