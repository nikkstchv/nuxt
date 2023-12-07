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
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

definePageMeta({
  middleware: 'city',
})

const route = useRoute()
const initData = {
  condition: { code: 'used', name: '' },
  transportType: { code: 'cars', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
}
const { seo, total, cards, markName, modelName, markNameRu, modelNameRu, location, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить ${markName} ${modelName} с пробегом: цены на б/у ${markNameRu} ${modelNameRu} в ${location} – ${holdingName}`,
  description: `Цены на ${markName} ${modelName} с пробегом в ${location}, ${total} б/у авто ${markName} ${modelName} в наличии. Продажа подержанных ${markNameRu} ${modelNameRu}. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
