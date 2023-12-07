<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :mark-name="markName"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seoNew"
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

const route = useRoute()
const initData = {
  condition: { code: 'new', name: '', nameRu: '' },
  transportType: { code: 'moto', name: '', nameRu: '' },
  mark: { code: route.params.mark, name: '', nameRu: '' },
}
const { seo, total, cards, markName, markNameRu } = await useInitCatalog({ initData })

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const seoDefault = {
  title: `Купить мотоцикл ${markName} (${markNameRu}) по выгодной цене от официального дилера`,
  description: `Продажа мотоциклов ${markName} по выгодным ценам от официального дилера АВТОДОМ. Доставка по Москве и всей России. Фото и характеристики модельного ряда мотоциклов ${markNameRu} на сайте АВТОДОМ. Квалифицированное сервисное обслуживание. Звоните по телефону +7(495)153-60-47.`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
