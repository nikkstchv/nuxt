<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
    :engine-volume="initData.engineVolume.code"
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
  engineVolume: { code: '140-and-150', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })
const seoDefault = {
  title: 'Купить мотоцикл 150 кубов в Москве по выгодной цене',
  description: 'Продажа мотоциклов 150 кубов по выгодным ценам от официального дилера АВТОДОМ. Доставка по Москве и всей России. Фото и характеристики модельного ряда мотоциклов 150 кубов на сайте. Квалифицированное сервисное обслуживание. Звоните по телефону +7(495)153-60-47.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
