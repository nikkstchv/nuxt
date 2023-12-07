<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
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
    title: `Каталог ${bodyTypeNameRuSeo} в наличии в Москве и Санкт-Петербурге - АВТОДОМ`,
    description: `Продажа новых и поддержанных ${bodyTypeNameRuSeo} в Москве от официального дилера АВТОДОМ. Каталог ${bodyTypeNameRuSeo} в наличии`,
  },
  asc: {
    title: `Каталог ${bodyTypeNameRuSeo} в наличии в Москве - АвтоСпецЦентр`,
    description: `Продажа новых и поддержанных ${bodyTypeNameRuSeo} в Москве от официального дилера АвтоСпецЦентр. Каталог ${bodyTypeNameRuSeo} в наличии`,
  },
}
const catalogHead = useCatalogHead(seoDefault, seo)
useHeadDefault(catalogHead)
</script>
