<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

const route = useRoute()

definePageMeta({
  middleware: 'city',
})

const initData = {
  transportType: { code: 'cars', name: '' },
  condition: { code: 'new', name: '' },
}

const { seo, total, cards, location, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  asc: {
    title: `Новые автомобили в наличии от официального дилера: цены на новые авто в ${location} – ГК ${holdingName}`,
  },
  avtodom: {
    title: `Новые автомобили в наличии купить в ${location} – официальный дилер ${holdingName}`,
  },
  description: `Цены на новые автомобили в наличии. Продажа новых автомобилей в ${location} от официального дилера ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
