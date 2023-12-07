<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark && initData.mark.code"
    :mark-name="initData.mark && initData.mark.name"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
    :year="initData.year.code"
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
  mark: { code: 'kia', name: '' },
  year: { code: ['2015', '2015'], name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить Kia 2015 года с пробегом в ${location}, цены на б/у Kia 2015 года – ${holdingName}`,
  description: `Цены на Kia 2015 года с пробегом в ${location}. Продажа подержанных Kia 2015 года. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
