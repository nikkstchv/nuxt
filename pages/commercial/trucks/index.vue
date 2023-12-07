<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

const route = useRoute()

definePageMeta({
  middleware: 'city',
})

const initData = {
  transportType: { code: 'trucks', name: '' },
}
const { seo, total, cards, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  asc: {
    title: `Коммерческий грузовой транспорт | Продажа коммерческих автомобилей | ${holdingName}`,
  },
  avtodom: {
    title: `Грузовой коммерческий транспорт купить в Москве и Санкт-Петербурге - ${holdingName}`,
  },
  description: `Продажа грузового коммерческого транспорта на сайте официального дилера ГК ${holdingName}. Подобрать коммерческий транспорт и купить онлайн, за наличные и в кредит.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
