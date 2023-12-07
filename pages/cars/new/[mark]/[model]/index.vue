<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
    :engine-types="engineTypes"
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
  condition: { code: 'new', name: '' },
  transportType: { code: 'cars', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
}

const { seo, total, cards, markName, modelName, markNameRu, modelNameRu, engineTypes, location, holdingName, currentYear } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Новые ${markName} ${modelName} 2022-${currentYear} года в наличии в ${location} - купить у официального дилера, цены – ${holdingName}`,
  description: `Цены на новые ${markName} ${modelName} 2022-${currentYear} года в ${location}, новые автомобили ${markName} ${modelName} в наличии. Продажа новых автомобилей ${markNameRu} ${modelNameRu} на привлекательных условиях в кредит с гарантией у официального дилера в ${holdingName}.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
