<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    is-vat
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

definePageMeta({
  middleware: 'city',
})

const initData = {
  transportType: { code: 'cars', name: '' },
  vatType: { code: 'true', name: '' },
}
const { seo, total, cards, holdingName } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить автомобиль с возвратным НДС для юридических лиц в Москве: цены на автомобили для юридических лиц – ГК ${holdingName}`,
  description: `Цены на автомобили с возвратным НДС для юридических лиц, автомобили с возвратным НДС для юридических лиц в наличии. Приобретайте автомобили на привлекательных условиях в компании ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
