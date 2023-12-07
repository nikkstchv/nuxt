<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
    :param-filter-name="paramFilterName"
    :drive-types="driveTypes"
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

const { holdingName, isAsc } = useHoldingStore()
const route = useRoute()
const initData = {
  condition: { code: 'used', name: '' },
  transportType: { code: 'atv', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
  filter: {
    code: route.params.filter,
    name: '',
    filterName: '',
  },
}
const { seo, total, cards, markName, modelName, markNameRu, modelNameRu, paramFilterName, driveTypes, engineTypes } = await useInitCatalog({ initData })

const getTitle = () => {
  let title = ''
  const { filter } = route.params
  const query = route.query
  let bodyType = query?.bodyType ?? null
  let bodyTypeName = 'Квадроциклы'
  if (bodyType) {
    bodyType = Array.isArray(bodyType) ? bodyType[0] : bodyType
    if (bodyType !== 'quad-bike') {
      bodyTypeName = 'Багги'
    }
  }

  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const ascSeoFilters = ['drive-type', 'engine-type']

  if (
    isAsc &&
      currentFilter &&
      ascSeoFilters.includes(currentFilter)
  ) {
    if (currentFilter === ascSeoFilters[0]) {
      // drive-type
      let currentDriveType = ''
      if (paramFilterName) {
        currentDriveType = driveTypes[paramFilterName.toLowerCase()]
      }

      title = `${bodyTypeName} с пробегом${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''}${
          currentDriveType ? ` ${currentDriveType}` : ''
      } в Москве у официального дилера: комплектации и цены на б/у${
          markName ? ` ${markName}` : ''
      } в АвтоСпецЦентр`
    } else if (currentFilter === ascSeoFilters[1]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterName) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterName.toLowerCase()),
        )?.values
      }

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
    }
  } else {
    title = `Купить ${markName} ${modelName} ${paramFilterName} с пробегом: цены на б/у квадроциклы ${markNameRu} ${modelNameRu} ${paramFilterName} в Москве – ${holdingName}`
  }

  return title
}

const getDescription = () => {
  let description = ''
  const { filter } = route.params

  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const ascSeoFilters = ['drive-type', 'engine-type']

  if (
    isAsc &&
      currentFilter &&
      ascSeoFilters.includes(currentFilter)
  ) {
    if (currentFilter === ascSeoFilters[0]) {
      // drive-type
      let currentDriveType = ''
      if (paramFilterName) {
        currentDriveType = driveTypes[paramFilterName.toLowerCase()]
      }

      description = `Цены на поддержанные${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''}${
          currentDriveType ? ` ${currentDriveType}` : ''
      } в наличии на привлекательных условиях у официального дилера АвтоСпецЦентр`
    } else if (currentFilter === ascSeoFilters[1]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterName) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterName.toLowerCase()),
        )?.values
      }

      description = `Цены на поддержанные${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''}${
          currentEngineType && currentEngineType[0]
              ? ` ${currentEngineType[0]}`
              : ''
      } в наличии на привлекательных условиях у официального дилера АвтоСпецЦентр`
    }
  } else {
    description = `Цены на ${markName} ${modelName} ${paramFilterName} с пробегом в Москве, подержанные квадроциклы ${markName} ${modelName} ${paramFilterName} в наличии. Приобретайте б/у ${markName} ${modelName} ${paramFilterName} квадроциклы на привлекательных условиях в компании ${holdingName}`
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
