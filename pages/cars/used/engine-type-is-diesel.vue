<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
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
  'engine-type': { code: 'engine-type-is-diesel', name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить дизельные автомобили с пробегом – ГК ${holdingName}`,
  description: `Цены на автомобили с дизельным двигателем с пробегом в ${location}, авто в наличии. Приобретайте б/у транспорт на привлекательных условиях в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
