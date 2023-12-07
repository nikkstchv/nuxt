<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark && initData.mark.code"
    :engine-type="initData.engineType.code"
    :mark-name="markName"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
  middleware: 'city',
})

const route = useRoute()

const engineTypes = ['electric', 'hybrid'].join('&')
const initData = {
  condition: { code: 'used', name: '', nameRu: '' },
  transportType: { code: 'cars', name: '', nameRu: '' },
  mark: { code: route.params.mark, name: '', nameRu: '' },
  engineType: { code: `engine-type-is-${engineTypes}`, name: '' },
}

const { seo, total, cards, markName, markNameRu, holdingName } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить ${markName} с пробегом: Цены на ${markNameRu} бу в Москве и Санкт-Петербурге - ${holdingName}`,
  description: `Цены на ${markName} с пробегом в Москве, б/у электромобили ${markName} в наличии. Продажа подержанных ${markNameRu}. Электромобили на привлекательных условиях в кредит с гарантией в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
