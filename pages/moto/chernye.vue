<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :ext-color-group="initData.extColorGroup.code"
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
  transportType: { code: 'moto', name: '' },
  extColorGroup: { code: 'black', name: '' },
}
const { seo, total, cards } = await useInitCatalog({ initData })
const seoDefault = {
  title: 'Купить черный мотоцикл в Москве по выгодной цене',
  description: 'Продажа черных мотоциклов по выгодным ценам от официального дилера АВТОДОМ. Доставка по Москве и всей России. Фото и характеристики модельного ряда мотоциклов черного цвета на сайте АВТОДОМ. Квалифицированное сервисное обслуживание. Звоните по телефону +7(495)153-60-47.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
