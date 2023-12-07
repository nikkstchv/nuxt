<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
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
  year: { code: ['2012', '2012'], name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить авто 2012 года с пробегом в ${location}, цены на б/у автомобили 2012 года – ${holdingName}`,
  description: `Цены на автомобили 2012 года с пробегом в ${location}. Продажа подержанных авто 2012 года. Автомобили на привлекательных условиях в кредит с гарантией в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
