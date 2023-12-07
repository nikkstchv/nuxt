<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
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
}
const { seo, total, cards, markName, modelName, modelNameRu, markNameRu, currentYear } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить ${markName} ${modelName} ${currentYear} года в Москве у официального дилера: модельный ряд и цены на ${markNameRu} ${modelNameRu} 2021–${currentYear} – ГК АВТОДОМ`,
  description: `Цены на новые ${markName} ${modelName} в Москве, новые мотоциклы ${markName} ${modelName} в наличии. Приобретайте новые ${markName} ${modelName} на привлекательных условиях у официального дилера в АВТОДОМ`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
