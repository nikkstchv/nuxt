<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

const route = useRoute()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const initData = {
  transportType: { code: 'moto', name: '' },
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
  title: 'Купить мотоцикл в Москве недорого с доставкой по России',
  description: 'Продажа новых и поддержанных мотоциклов в Москве и по России от официального дилера АВТОДОМ. Каталог мотоциклов в наличии по выгодным ценам. Звоните по телефону +7(495)153-60-47.',
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
