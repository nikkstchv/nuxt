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
  condition: { code: 'used', name: '' },
  transportType: { code: 'atv', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
}
const { seo, total, cards, markName, modelName, engineTypes, markNameRu, modelNameRu } = await useInitCatalog({ initData })

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

    title = `${bodyTypeName} с пробегом${
        markName ? ` ${markName}` : ''
    }${modelName ? ` ${modelName}` : ''}${
        currentEngineType && currentEngineType[0]
            ? ` ${currentEngineType[0]}`
            : ''
    } в Москве у официального дилера: комплектации и цены на б/у${
        currentEngineType && currentEngineType[1]
            ? ` ${currentEngineType[1]}`
            : ''
    }${markName ? ` ${markName}` : ''} в АвтоСпецЦентр`
  } else if (isAvtodom) {
    title = `Квадроциклы ${markName} ${modelName} с пробегом в Москве, купить квадроциклы ${markName} ${modelName} б/у – АВТОДОМ`
  } else {
    title = `Купить ${markName} ${modelName} с пробегом: цены на б/у квадроциклы ${markNameRu} ${modelNameRu} в Москве – ${holdingName}`
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

    description = `Цены на поддержанные${
        markName ? ` ${markName}` : ''
    }${modelName ? ` ${modelName}` : ''}${
        currentEngineType && currentEngineType[0]
            ? ` ${currentEngineType[0]}`
            : ''
    } в наличии на привлекательных условиях у официального дилера АвтоСпецЦентр`
  } else if (isAvtodom) {
    description = `⭐ Продажа подержанных квадроциклов ${markName} ${modelName} в Москве. Приобретайте б/у квадроциклы ${markName} ${modelName} на привлекательных условиях в АВТОДОМ.`
  } else {
    description = `Цены на ${markName} ${modelName} с пробегом в Москве, подержанные квадроциклы ${markName} ${modelName} в наличии. Приобретайте б/у ${markName} ${modelName} квадроциклы на привлекательных условиях в компании ${holdingName}`
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
