<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
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
  transportType: { code: 'commercial', name: '' },
}
const { seo, total, cards, currentYear, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  asc: {
    title: `Новые коммерческие автомобили: купить коммерческие авто 2021-${currentYear} года в автосалонах официального дилера в Москве | ${holdingName}`,
  },
  avtodom: {
    title: `Легкий коммерческий транспорт купить в Москве и Санкт-Петербурге: новые и бу - ${holdingName}`,
  },
  description: `Купить новые коммерческие авто по доступным ценам в автосалонах официального дилера в Москве ${holdingName}. Предоставляем индивидуальное предложение при продаже коммерческих авто 2021-${currentYear} года, цены на все комплектации доступнее чем когда-либо!`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
