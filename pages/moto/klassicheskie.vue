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
  bodyType: { code: 'body-type-is-heritage', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })
const seoDefault = {
  title: 'Купить классический мотоцикл в Москве',
  description: 'Продажа классических мотоциклов по выгодным ценам от официального дилера АВТОДОМ. Доставка по Москве и всей России. Фото и характеристики модельного ряда классических мотоциклов на сайте АВТОДОМ. Квалифицированное сервисное обслуживание. Звоните по телефону +7(495)153-60-47.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
