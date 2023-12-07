<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
    :param-filter-name="paramFilterName"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const route = useRoute()
const initData = {
  condition: { code: 'new', name: '' },
  transportType: { code: 'moto', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
  filter: { code: route.params.filter, name: '', filterName: '' },
}
const { seo, total, cards, markName, modelName, markNameRu, paramFilterName, currentYear } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить ${markName} ${modelName} ${paramFilterName} ${currentYear} года в Москве у официального дилера: комплектации и цены на ${markNameRu} ${paramFilterName} 2021–${currentYear} – ГК АВТОДОМ`,
  description: `Цены на новые ${markName} ${modelName} ${paramFilterName}, новые мотоциклы ${markName} ${modelName} ${paramFilterName} в наличии. Приобретайте новые ${markName} ${modelName} ${paramFilterName} на привлекательных условиях у официального дилера АВТОДОМ`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
