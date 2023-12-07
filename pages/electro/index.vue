<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :engine-type="initData.engineType.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import { useHoldingStore } from '@/store/holding'

const route = useRoute()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const engineTypes = ['electric', 'hybrid'].join('&')
const initData = {
  transportType: { code: 'cars', name: '' },
  engineType: { code: `engine-type-is-${engineTypes}`, name: '' },
}

const { seo, total, cards, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Каталог электромобилей в наличии в Москве и Санкт-Петербурге - ${holdingName}`,
  description: `Продажа новых и поддержанных электромобилей в Москве от официального дилера ${holdingName}. Каталог электромобилей в наличии`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
