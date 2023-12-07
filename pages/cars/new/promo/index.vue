<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    is-sale
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
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
  transportType: { code: 'cars', name: '' },
  condition: { code: 'new', name: '' },
  sale: { code: 'true', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })
const seoDefault = {
  title: 'Купить новый автомобиль со скидкой от официального дилера – ГК АВТОДОМ',
  description: 'Продажа автомобилей по акции у официального дилера Автодом Москва. Скидки на авто, спецпредложения на новинки в автосалонах официального дилера Автодом.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
