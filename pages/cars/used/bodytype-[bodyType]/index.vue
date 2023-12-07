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
  condition: { code: 'used', name: '' },
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
    title: `Купить ${bodyTypeNameRuSeo} c пробегом в Москве и Санкт-Петербурге: ${total} бу автомобилей - АВТОДОМ`,
    description: `Цены на ${bodyTypeNameRuSeo} с пробегом, подержанные ${bodyTypeNameRuSeo} в наличии. Приобретайте б/у ${bodyTypeNameRuSeo} на привлекательных условиях в компании АВТОДОМ.`,
  },
  asc: {
    title: `Купить ${bodyTypeNameRuSeo} c пробегом в Москве: ${total} бу автомобилей - АвтоСпецЦентр`,
    description: `Цены на ${bodyTypeNameRuSeo} с пробегом, подержанные ${bodyTypeNameRuSeo} в наличии. Приобретайте б/у ${bodyTypeNameRuSeo} на привлекательных условиях в компании АвтоСпецЦентр`,
  },
}
const catalogHead = useCatalogHead(seoDefault, seo)
useHeadDefault(catalogHead)
</script>
