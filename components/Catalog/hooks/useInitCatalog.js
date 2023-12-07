import cloneDeep from 'lodash/cloneDeep'
import { getCards } from '~/api/routes/catalog'
import { useCityStore } from '~/store/city'
import { useHoldingStore } from '~/store/holding'

export default async function ({ initData }) {
  const { $getCurrentYear } = useNuxtApp()
  const { declensionCity } = useCityStore()
  const { holdingName } = useHoldingStore()
  const currentYear = $getCurrentYear()
  const location = declensionCity.p
  const route = useRoute()
  const { query } = route
  const [, transportType, condition] = route.path.split('/')
  const isCommercial = transportType === 'commercial'
  const additionalTransportType = { transportType: ['trucks'] }
  const isAddAdditionalData = isCommercial && !condition
  const additionalData = isAddAdditionalData ? additionalTransportType : {}
  const driveTypes = {
    передний: 'с передним приводом',
    полный: 'с полным приводом',
    задний: 'с задним приводом',
    'полный подключаемый': 'с полным подключаемым приводом',
  }
  const engineTypes = [
    {
      labels: ['бензиновый', 'petrol'],
      values: ['с бензиновым двигателем', 'бензиновые'],
    },
    { labels: ['гибридный', 'hybrid'], values: ['гибрид', 'гибридные'] },
    { labels: ['дизельный', 'diesel'], values: ['с дизелем', 'дизельные'] },
    {
      labels: ['электрический', 'electric'],
      values: ['с электродвигателем', 'электрические'],
    },
    {
      labels: ['бензиновый, электрический', 'petrol-electric'],
      values: ['гибрид', 'гибридные'],
    },
    {
      labels: ['бензиновый, газ', 'petrol-gas'],
      values: ['гибрид газ-бензин', 'гибридные на газу'],
    },
  ]

  const getRefsName = (filterName) => {
    const additionalFilters = {
      'engine-type': 'engineType',
      'drive-type': 'driveType',
      'gear-type': 'gearType',
      'body-type': 'bodyType',
    }

    return additionalFilters[filterName] || filterName
  }

  const getCleanedObject = (object) => {
    const clone = cloneDeep(object)
    for (const key in clone) {
      if (!clone[key]) {
        delete clone[key]
      }
    }

    return clone
  }

  const getInitFilterData = ({ query, initData, additionalData }) => {
    const mainFilters = [
      'mark',
      'model',
      'condition',
      'transportType',
      'exclusive',
      'sellout',
      'inStock',
      'vatType',
      'sale',
    ]
    const { sort, noCity, ...restQuery } = query
    const citiesCode = ['msk', 'spb', 'krasnodar']
    const isElectro = initData?.engineType?.code?.includes('electric') && initData?.engineType?.code?.includes('hybrid')
    const otherCitiesCode = citiesCode.filter(code => code !== noCity) ?? []
    const initSort = sort ?? 'popular-desc'
    const initFilterData = {
      sort: initSort,
      ...(noCity && { city: otherCitiesCode }),
      ...restQuery,
    }
    for (const key in initData) {
      if (mainFilters.includes(key)) {
        const hasAdditionalData = additionalData && additionalData[key]
        initFilterData[key] = [
          initData[key].code,
          ...(hasAdditionalData ? additionalData[key] : []),
        ]
      } else if (key.includes('price')) {
        const [, code] = initData[key].code.split('-do-')
        const max = parseInt(code) * 100
        initFilterData.disprice = [0, max]
        initData.disprice.code = [0, max]
      } else if (key.includes('engineVolume')) {
        const [min, max] = initData[key].code.split('-and-')
        initFilterData.engineVolume = [min, max]
        initData.engineVolume.code = [min, max]
      } else if (key.includes('year')) {
        initFilterData.year = initData[key].code
      } else if (key.includes('extColorGroup')) {
        initData[key].name = 'Цвет кузова'
        initFilterData[key] = [initData[key].code]
      } else if (key.includes('bodyType')) {
        const [name, code] = initData[key].code.split('-is-')
        const codes = code.split('&')
        const filterName = getRefsName(name)
        initData[key].name = filterName
        initData[key].code = codes
        initFilterData[filterName] = codes
      } else if (key.includes('engineType')) {
        const [name, code] = initData[key].code.split('-is-')
        const codes = code.split('&')
        const filterName = getRefsName(name)
        initData[key].name = filterName
        initData[key].code = codes
        initFilterData[filterName] = isElectro && !query.engineType ? codes : query?.engineType
      } else {
        const [name, code] = initData[key].code.split('-is-')
        const filterName = getRefsName(name)
        initData[key].filterName = name
        initData[key].name = filterName
        initData[key].code = code
        initFilterData[filterName] = code
      }
    }

    // удаляет undefined
    return getCleanedObject(initFilterData)
  }

  const getInitData = (filterData, initData) => {
    if (filterData) {
      const newInitData = cloneDeep(initData)
      for (const key in newInitData) {
        let keyFound = key
        if (key === 'filter') {
          keyFound = newInitData[key].name
        }
        const found =
          filterData[keyFound]?.find(
            item => item.code === newInitData[key].code,
          ) ?? ''

        if (found) {
          newInitData[key] = found
        }
      }
      return newInitData
    }
    return null
  }

  const getRefs = async (initData) => {
    const { $fetchClient } = useNuxtApp()
    const page = route.query.page ?? '1'
    const url = btoa(route.fullPath)
    const query = { ...initData, url }
    const options = { query }
    const res = await $fetchClient(getCards(16, page), options)
    const resData = res?.data

    return {
      filterData: resData?.responseRefs ?? null,
      cards: resData?.data ?? [],
      total: resData?.total ?? '0',
      seo: resData?.seo ?? {},
    }
  }

  const initFilterData = getInitFilterData({
    query,
    initData,
    additionalData,
  })
  const { cards, filterData, total, seo } = await getRefs(initFilterData)
  const formattedInitData = getInitData(filterData, initData)
  const markName = formattedInitData?.mark?.name ?? ''
  const markNameRu = formattedInitData?.mark?.nameRu ?? ''
  const modelName = formattedInitData?.model?.name ?? ''
  const modelNameRu = formattedInitData?.model?.nameRu ?? ''
  const paramFilterName = formattedInitData?.filter?.nameRu ?? ''

  return {
    total,
    cards,
    seo,
    formattedInitData,
    driveTypes,
    engineTypes,
    markName,
    markNameRu,
    modelName,
    modelNameRu,
    paramFilterName,
    location,
    holdingName,
    currentYear,
    filterData,
  }
}
