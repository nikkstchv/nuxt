<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
    :disprice="initData.disprice.code"
  />
</template>

<script setup>
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  middleware: 'city',
})

const initData = {
  transportType: { code: 'cars', name: '' },
  condition: { code: 'used', name: '' },
  disprice: { code: 'price-do-700000', name: '' },
}
const { seo, total, cards, holdingName } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить авто до 700000 с пробегом в Москве  – ${holdingName}`,
  description: `Автомобили до 700000 с пробегом в Москве. Продажа подержанных авто до 700000. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
