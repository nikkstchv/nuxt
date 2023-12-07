<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
    :body-type="initData.bodyType.code"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const initData = {
  transportType: { code: 'moto', name: '' },
  bodyType: { code: 'body-type-is-tricycle', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })
const seoDefault = {
  title: 'Трицикл - купить в Москве и Московской области недорого',
  description: 'Продажа трициклов в Москве и по России недорого от официального дилера АВТОДОМ. Каталог взрослых трициклов в наличии по выгодным ценам. Звоните по телефону +7(495)153-60-47.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
