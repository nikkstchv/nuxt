<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark && initData.mark.code"
    :mark-name="initData.mark && initData.mark.name"
    :ext-color-group="initData.extColorGroup.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
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
  mark: { code: 'mercedes-benz', name: '' },
  extColorGroup: { code: 'black', name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить Мерседес чёрного цвета с пробегом в ${location}, цены на чёрные Mercedes-Benz – ${holdingName}`,
  description: `Цены на чёрные Mercedes-Benz с пробегом в ${location}. Продажа подержанных Mercedes-Benz чёрного цвета. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
