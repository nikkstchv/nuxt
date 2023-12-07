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
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'

const route = useRoute()

definePageMeta({
  middleware: 'city',
})

const { holdingName } = useHoldingStore()
const initData = {
  transportType: { code: 'atv', name: '' },
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
  asc: {
    title: `Купить квадроцикл в Москве у официального дилера – ${holdingName}`,
  },
  avtodom: {
    title: 'Квадроциклы в Москве у официального дилера – АВТОДОМ',
  },
  description: `Продажа новых и поддержанных квадроциклов в Москве от официального дилера ${holdingName}. Каталог квадроциклов в наличии`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
