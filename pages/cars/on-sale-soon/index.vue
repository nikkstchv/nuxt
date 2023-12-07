<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    is-exclusive
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
  exclusive: { code: 'true', name: '' },
}

const { seo, total, cards, holdingName } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Скоро в продаже: Б/у автомобили в Москве – ГК ${holdingName}`,
  description: `Продажа новых и поддержанных автомобилей скоро в продаже в Москве от официального дилера ${holdingName}. Каталог автомобилей скоро в продаже`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
