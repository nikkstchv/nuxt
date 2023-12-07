<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
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
  transportType: { code: 'jet-ski', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: 'Гидроциклы в Москве у официального дилера – АВТОДОМ',
  description: 'Продажа новых и поддержанных гидроциклов в Москве от официального дилера АВТОДОМ. Каталог гидроциклов в наличии',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
