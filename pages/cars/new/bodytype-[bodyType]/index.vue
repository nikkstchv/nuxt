<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
    :body-type-name-ru="bodyTypeNameRu"
  />
</template>

<script setup>
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  middleware: 'city',
})

const route = useRoute()
const { params } = useRoute()
const initData = {
  transportType: { code: 'cars', name: '' },
  condition: { code: 'new', name: '' },
  'body-type': { code: `body-type-is-${params.bodyType}`, name: '' },
}
const { seo, total, cards, filterData } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const bodyTypeNameRu = filterData?.bodyType[0]?.nameRu || ''
const bodyTypeNameRuSeo = bodyTypeNameRu?.toLowerCase() || ''
const seoDefault = {
  avtodom: {
    title: `Купить новый ${bodyTypeNameRuSeo} в Москве и Санкт-Петербурге у официального дилера - АВТОДОМ`,
    description: `Цены на новые ${bodyTypeNameRuSeo} в наличии. Продажа новых ${bodyTypeNameRuSeo} в Москве от официального дилера АВТОДОМ.`,
  },
  asc: {
    title: `Купить новый ${bodyTypeNameRuSeo} в Москве у официального дилера - АвтоСпецЦентр`,
    description: `Цены на новые ${bodyTypeNameRuSeo} в наличии. Продажа новых ${bodyTypeNameRuSeo} в Москве от официального дилера АвтоСпецЦентр`,
  },
}
const catalogHead = useCatalogHead(seoDefault, seo)
useHeadDefault(catalogHead)
</script>
