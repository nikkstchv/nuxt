<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :engine-type="initData.engineType.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
  />
</template>

<script setup>
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import { useHoldingStore } from '@/store/holding'

const route = useRoute()

const { $declOfNum } = useNuxtApp()

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
  condition: { code: 'used', name: '' },
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

const aliasesCar = ['автомобиль', 'автомобиля', 'автомобилей']
const carText = $declOfNum(total, aliasesCar)
const seoDefault = {
  title: `Купить электромобиль c пробегом в Москве и в Санкт-Петербурге: ${total} бу ${carText} - ${holdingName}`,
  description: `Цены на электромобили с пробегом, подержанные электромобили в наличии. Приобретайте б/у электромобили на привлекательных условиях в компании ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
