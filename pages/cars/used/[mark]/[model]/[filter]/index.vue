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

const { holdingName, isAsc, isAvtodom } = useHoldingStore()
const route = useRoute()
const initData = {
  condition: { code: 'used', name: '' },
  transportType: { code: 'cars', name: '' },
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
  let paramFilterNameLocal = paramFilterName || ''

  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const seoFilters = ['body-type', 'drive-type', 'engine-type']

  if (isAsc && currentFilter && seoFilters.includes(currentFilter)) {
    // если страница: тип кузова | тип привода | тип двигателя
    if (currentFilter === seoFilters[0]) {
      if (paramFilterNameLocal) {
        paramFilterNameLocal += paramFilterNameLocal.endsWith('к') ? 'и' : 'ы'
      }

      title = `${paramFilterNameLocal}${
          markName ? ` ${markName}` : ''
      }${
          modelName ? ` ${modelName}` : ''
      } с пробегом: цены на б/у автомобили в Москве – продажа автомобилей, модельный ряд и цены | АвтоСпецЦентр`
    } else if (currentFilter === seoFilters[1]) {
      let currentDriveType = ''
      if (paramFilterNameLocal) {
        currentDriveType = driveTypes[paramFilterNameLocal.toLowerCase()]
      }

      title = `${markName || ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом${
          currentDriveType ? ` ${currentDriveType}` : ''
      } в Москве, цены на б/у автомобили в Москве – продажа автомобилей, модельный ряд и цены | АвтоСпецЦентр`
    } else if (currentFilter === seoFilters[2]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterNameLocal) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterNameLocal.toLowerCase()),
        )?.values
      }

      title = `${markName || ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом${
          currentEngineType && currentEngineType[0]
              ? ` ${currentEngineType[0]}`
              : ''
      } в Москве, цены на б/у${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      } автомобили в Москве – продажа автомобилей, модельный ряд и цены | АвтоСпецЦентр`
    }
  } else if (
    isAvtodom &&
      currentFilter &&
      seoFilters.includes(currentFilter)
  ) {
    if (currentFilter === seoFilters[0]) {
      title = `Купить${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
      } с пробегом: цены на б/у${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
      }`
    } else if (currentFilter === seoFilters[1]) {
      title = `${
          paramFilterName ? `${paramFilterName} привод` : ''
      }${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом: цены на б/у${
          paramFilterName
              ? ` ${paramFilterName.toLowerCase()} привод`
              : ''
      }${modelName ? ` ${modelName}` : ''}`
    } else if (currentFilter === seoFilters[2]) {
      let currentEngineType = ''
      if (paramFilterNameLocal) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterNameLocal.toLowerCase()),
        )?.values
      }
      title = `${
          currentEngineType && currentEngineType[1]
              ? ` ${capitalizeFirstLetter(currentEngineType[1])}`
              : ''
      }${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом: цены на б/у${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      }${modelName ? ` ${modelName}` : ''}`
    }

    title += ` в Москве – ${holdingName}`
  } else {
    title = `Купить ${markName} ${modelName} ${paramFilterName} с пробегом: цены на б/у автомобили ${markNameRu} ${modelNameRu} ${paramFilterName} в Москве – ГК ${holdingName}`
  }

  return title
}

const getDescription = () => {
  let description = ''
  const { filter } = route.params
  let paramFilterNameLocal = paramFilterName || ''

  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const ascSeoFilters = ['body-type', 'drive-type', 'engine-type']

  if (
    isAsc &&
      currentFilter &&
      ascSeoFilters.includes(currentFilter)
  ) {
    // если страница: тип кузова | тип привода | тип двигателя
    if (currentFilter === ascSeoFilters[0]) {
      if (paramFilterNameLocal) {
        paramFilterNameLocal += paramFilterNameLocal.endsWith('к') ? 'и' : 'ы'
      }

      description = `${paramFilterNameLocal}${
          markName ? ` ${markName}` : ''
      }${
          modelName ? ` ${modelName}` : ''
      } с пробегом. Продажа б/у автомобилей${
          markName ? ` ${markName}` : ''
      }${
          modelName ? ` ${modelName}` : ''
      } в Москве. Цены на автомобили на сайте официального дилера АвтоСпецЦентр. Купить проверенные машины с пробегом в наличии`
    } else if (currentFilter === ascSeoFilters[1]) {
      let currentDriveType = ''
      if (paramFilterNameLocal) {
        currentDriveType = driveTypes[paramFilterNameLocal.toLowerCase()]
      }

      description = `${markName || ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом${
          currentDriveType ? ` ${currentDriveType}` : ''
      }. Продажа б/у автомобилей${
          markName ? ` ${markName}` : ''
      }${
          modelName ? ` ${modelName}` : ''
      } в Москве. Цены на автомобили на сайте официального дилера АвтоСпецЦентр.`
    } else if (currentFilter === ascSeoFilters[2]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterNameLocal) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterNameLocal.toLowerCase()),
        )?.values
      }

      description = `Цены на${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } с пробегом${
          currentEngineType && currentEngineType[0]
              ? ` ${currentEngineType[0]}`
              : ''
      }. Продажа б/у автомобилей${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''} в Москве. Подержанные${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      } автомобили на сайте официального дилера АвтоСпецЦентр.`
    }
  } else {
    description = `Цены на ${markName} ${modelName} ${paramFilterName} с пробегом в Москве, подержанные автомобили ${markName} ${modelName} ${paramFilterName} в наличии. Приобретайте б/у ${markName} ${modelName} ${paramFilterName} автомобили на привлекательных условиях в компании ${holdingName}`
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
