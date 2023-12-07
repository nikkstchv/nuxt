<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :engine-type="initData.engineType.code"
    :mark-name="markName"
    :model-name="modelName"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const route = useRoute()

const engineTypes = ['electric', 'hybrid'].join('&')
const initData = {
  condition: { code: 'new', name: '' },
  transportType: { code: 'cars', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
  engineType: { code: `engine-type-is-${engineTypes}`, name: '' },
}

const { seo, total, cards, markName, modelName, markNameRu, modelNameRu, holdingName, currentYear } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить новый ${markName} ${modelName} 2022-${currentYear} в Москве и Санкт-Петербурге у официального дилера: Цены электромобили ${markNameRu} ${modelNameRu} в наличии - ${holdingName}`,
  description: `Цены на новые ${markName} ${modelName} 2022-${currentYear} года в Москве, новые электромобили ${markName} ${modelName} в наличии. Продажа новых электромобилей ${markNameRu} ${modelNameRu} на привлекательных условиях в кредит с гарантией у официального дилера в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
