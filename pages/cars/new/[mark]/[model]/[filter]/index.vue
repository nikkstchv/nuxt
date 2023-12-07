<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :mark="initData.mark.code"
    :model="initData.model.code"
    :mark-name="markName"
    :model-name="modelName"
    :param-filter-name="paramFilterNameLocal"
    :drive-types="driveTypes"
    :engine-types="engineTypes"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
  />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  middleware: 'city',
})

const { isAsc, isAvtodom } = useHoldingStore()
const route = useRoute()

const initData = {
  condition: { code: 'new', name: '' },
  transportType: { code: 'cars', name: '' },
  mark: { code: route.params.mark, name: '' },
  model: { code: route.params.model, name: '' },
  filter: {
    code: route.params.filter,
    name: '',
    filterName: '',
  },
}

const { seo, total, cards, markName, modelName, markNameRu, paramFilterName: paramFilterNameLocal, driveTypes, engineTypes, holdingName, currentYear } = await useInitCatalog({ initData })
const getTitle = () => {
  let title = ''
  const { filter } = route.params
  let paramFilterName = paramFilterNameLocal || ''
  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const seoFilters = ['body-type', 'drive-type', 'engine-type']

  if (isAsc && currentFilter && seoFilters.includes(currentFilter)) {
    // если страница: тип кузова | тип привода | тип двигателя
    if (currentFilter === seoFilters[0]) {
      if (paramFilterName) {
        paramFilterName += paramFilterName.endsWith('к') ? 'и' : 'ы'
      }

      title = `Новые${
          paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
      }${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } в Москве, продажа новых${
          markName ? ` ${markName}` : ''
      }, цены и комплектации у официального дилера АвтоСпецЦентр`
    } else if (currentFilter === seoFilters[1]) {
      let currentDriveType = ''
      if (paramFilterName) {
        currentDriveType = driveTypes[paramFilterName.toLowerCase()]
      }

      title = `Новые${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          currentDriveType ? ` ${currentDriveType}` : ''
      } в Москве, продажа новых${
          markName ? ` ${markName}` : ''
      }, цены и комплектации у официального дилера АвтоСпецЦентр`
    } else if (currentFilter === seoFilters[2]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterName) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterName.toLowerCase()),
        )?.values
      }

      title = `Новые${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          currentEngineType && currentEngineType[0]
              ? ` ${currentEngineType[0]}`
              : ''
      } в Москве, цены и комплектации на новые${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      } автомобили у официального дилера АвтоСпецЦентр`
    }
  } else if (
    isAvtodom &&
      currentFilter &&
      seoFilters.includes(currentFilter)
  ) {
    if (currentFilter === seoFilters[0]) {
      title = `Новые${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
      }`
    } else if (currentFilter === seoFilters[1]) {
      title = `Новые${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }${
          paramFilterName
              ? ` ${paramFilterName.toLowerCase()} привод`
              : ''
      }`
    } else if (currentFilter === seoFilters[2]) {
      let currentEngineType = ''
      if (paramFilterName) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterName.toLowerCase()),
        )?.values
      }
      title = `Новые${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      }${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }`
    }

    title += ` в наличии в Москве – официальный дилер ${holdingName}`
  } else {
    title = `Купить ${markName} ${modelName} ${
        paramFilterName
    } ${currentYear} года в Москве у официального дилера: комплектации и цены на ${
        markNameRu
    } ${paramFilterName} 2021–${currentYear} – ГК ${
        holdingName
    }`
  }

  return title
}

const getDescription = () => {
  let description = ''
  const { filter } = route.params
  let paramFilterName = paramFilterNameLocal || ''

  const [currentFilter] = filter ? filter.split('-is-') : [null]
  const ascSeoFilters = ['body-type', 'drive-type', 'engine-type']

  if (
    isAsc &&
      currentFilter &&
      ascSeoFilters.includes(currentFilter)
  ) {
    // если страница: тип кузова | тип привода | тип двигателя
    if (currentFilter === ascSeoFilters[0]) {
      if (paramFilterName) {
        paramFilterName += paramFilterName.endsWith('к') ? 'и' : 'ы'
      }

      description = `Цены на новые${
          paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
      }${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      }, новые автомобили${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } в наличии приобретайте на привлекательных условиях у официального дилера АвтоСпецЦентр`
    } else if (currentFilter === ascSeoFilters[1]) {
      let currentDriveType = ''
      if (paramFilterName) {
        currentDriveType = driveTypes[paramFilterName.toLowerCase()]
      }

      description = `Цены на новые${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''}${
          currentDriveType ? ` ${currentDriveType}` : ''
      }, новые автомобили${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } в наличии приобретайте на привлекательных условиях у официального дилера АвтоСпецЦентр`
    } else if (currentFilter === ascSeoFilters[2]) {
      // engine-type
      let currentEngineType = ''
      if (paramFilterName) {
        currentEngineType = engineTypes.find(item =>
          item.labels.includes(paramFilterName.toLowerCase()),
        )?.values
      }

      description = `Цены на новые${
          markName ? ` ${markName}` : ''
      }${modelName ? ` ${modelName}` : ''}${
          currentEngineType && currentEngineType[0]
              ? ` ${currentEngineType[0]}`
              : ''
      }, новые${
          currentEngineType && currentEngineType[1]
              ? ` ${currentEngineType[1]}`
              : ''
      } автомобили${markName ? ` ${markName}` : ''}${
          modelName ? ` ${modelName}` : ''
      } в наличии. Приобретайте новые${
          markName ? ` ${markName}` : ''
      }${
          modelName ? ` ${modelName}` : ''
      } на привлекательных условиях у официального дилера АвтоСпецЦентр`
    }
  } else {
    description = `Цены на новые ${markName} ${modelName} ${paramFilterName}, новые автомобили ${markName} ${modelName} ${paramFilterName} в наличии. Приобретайте новые ${markName} ${modelName} ${paramFilterName} на привлекательных условиях у официального дилера ${holdingName}`
  }

  return description
}

const title = getTitle()
const description = getDescription()
const seoDefault = {
  title,
  description,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
