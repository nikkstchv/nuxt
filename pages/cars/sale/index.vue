<template>
  <CatalogMainLayout
    is-sellout
    :type-of-transport="[initData.transportType.code]"
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
  sellout: { code: 'true', name: '' },
  inStock: { code: '1', name: '' },
}

const { seo, total, cards, holdingName } = await useInitCatalog({ initData })
const seoDefault = {
  avtodom: {
    title: `Скоро в продаже: Б/у автомобили в Москве – ГК ${holdingName}`,
    description: `Распродажа автомобилей в ${holdingName}`,
  },
  asc: {
    title: `Распродажа автомобилей в Москве от официального Дилера ${holdingName}`,
    description: `Распродажа автомобилей по привлекательным ценам. Приобретайте автомобили по распродаже в ${holdingName}`,
  },
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
