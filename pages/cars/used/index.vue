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
  condition: { code: 'used', name: '' },
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
    title: `Купить авто c пробегом в ${location}: цены на б/у автомобили – ГК ${holdingName}`,
  },
  avtodom: {
    title: `Купить авто c пробегом в ${location}: ${total} б/у автомобилей – ${holdingName}`,
  },
  description: `Цены на автомобили с пробегом, подержанные автомобили в наличии. Приобретайте б/у автомобили на привлекательных условиях в компании ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
