<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark && initData.mark.code"
    :mark-name="markName"
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
  condition: { code: 'used', name: '', nameRu: '' },
  transportType: { code: 'cars', name: '', nameRu: '' },
  mark: { code: route.params.mark, name: '', nameRu: '' },
}
const { seo, total, cards, markName, markNameRu, location, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить ${markName} с пробегом: цены на б/у ${markNameRu} в ${location} – ${holdingName}`,
  description: `Цены на ${markName} с пробегом в ${location}, ${total} б/у авто ${markName} в наличии. Продажа подержанных ${markNameRu}. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
