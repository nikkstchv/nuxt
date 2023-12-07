<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
    :engine-types="engineTypes"
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
  middleware: 'city',
})

const { holdingName, isAsc, isAvtodom } = useHoldingStore()
const route = useRoute()
const initData = {
  condition: { code: 'new', name: '' },
  transportType: { code: 'atv', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
}
const { seo, total, cards, markName, markNameRu, modelName, modelNameRu, engineTypes, currentYear } = await useInitCatalog({ initData })

const getTitle = () => {
  let title
  const query = route.query
  let engineType = query?.engineType ?? null
  let bodyType = query?.bodyType ?? null
  let bodyTypeName = 'Квадроциклы'

  if (engineType) {
    engineType = Array.isArray(engineType) ? engineType[0] : engineType
  }
  if (bodyType) {
    bodyType = Array.isArray(bodyType) ? bodyType[0] : bodyType
    if (bodyType !== 'quad-bike') {
      bodyTypeName = 'Багги'
    }
  }

  if (isAsc && engineType) {
    const currentEngineType = engineTypes.find(item =>
      item.labels.includes(engineType),
    )?.values

    title = `${bodyTypeName}${markName ? ` ${markName}` : ''}${
        modelName ? ` ${modelName}` : ''
    }${
        currentEngineType && currentEngineType[0]
            ? ` ${currentEngineType[0]}`
            : ''
    } в Москве у официального дилера${
        markName ? ` ${markName}` : ''
    } АвтоСпецЦентр`
  } else if (isAvtodom) {
    title = `Новый квадроцикл ${markName} ${modelName} 2022 - ${currentYear} года купить в Москве – АВТОДОМ`
  } else {
    title = `Купить ${markName} ${modelName} 2022 года в Москве у официального дилера: модельный ряд и цены на ${markNameRu} ${modelNameRu} 2021–2022 – ГК ${holdingName}`
  }

  return title
}

const getDescription = () => {
  let description
  const query = route.query
  let engineType = query?.engineType ?? null
  if (engineType) {
    engineType = Array.isArray(engineType) ? engineType[0] : engineType
  }

  if (isAsc && engineType) {
    const currentEngineType = engineTypes.find(item =>
      item.labels.includes(engineType),
    )?.values

    description = `Цены на${markName ? ` ${markName}` : ''}${
        modelName ? ` ${modelName}` : ''
    }${
        currentEngineType && currentEngineType[0]
            ? ` ${currentEngineType[0]}`
            : ''
    } в наличии на привлекательных условиях у официального дилера АвтоСпецЦентр`
  } else if (isAvtodom) {
    description = `⭐ Цены на новые квадроциклы ${markName} ${modelName} в Москве. Приобретайте новые ${markName} ${modelName} на привлекательных условиях у официального дилера АВТОДОМ.`
  } else {
    description = `Цены на новые ${markName} ${modelName} в Москве, новые квадроциклы ${markName} ${modelName} в наличии. Приобретайте новые ${markName} ${modelName} на привлекательных условиях у официального дилера в ${holdingName}`
  }

  return description
}

const title = getTitle()
const description = getDescription()
const seoDefault = {
  title,
  description,
}

const seoNew = ref(seo)

watch(route, async () => {
  const { seo } = await useInitCatalog({ initData })
  seoNew.value = seo

  const catalogHead = useCatalogHead(seoDefault, seoNew.value)

  useHeadDefault(catalogHead)
})

const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
