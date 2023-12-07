<template>
  <ContactsMainLayout
    :title="h1"
    :dealers="dealers"
    :filter="filter"
  />
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getDealers as getDealersPath, getFilter as getFilterPath } from '../../api/routes/dealer'

definePageMeta({
  middleware: 'city-contacts',
})

const { domain } = useHoldingStore()
const { $getSeo, $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
const route = useRoute()
const seo = await $getSeo(route.path)

const getFilter = async () => {
  const res = await $fetchClient(getFilterPath())

  if (!$hasErrorResponse(res)) {
    return res
  }

  return null
}

const getVehicleType = (filter) => {
  if (filter) {
    const routePath = route.path
    const routeQuery = route.query
    const found = filter.vehicleTypes?.find(
      item =>
        routePath.includes(item.code) ||
            routeQuery.vehicleType === item.code,
    )
    return found?.code ?? ''
  }
  return ''
}

const getDealers = async (vehicleType) => {
  const options = {
    query: {
      ...(vehicleType && { vehicle_type: vehicleType }),
    },
  }
  const res = await $fetchClient(getDealersPath(), options)

  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res?.data ?? null
  }
}

const filter = await getFilter()
const vehicleType = getVehicleType(filter)
const dealers = await getDealers(vehicleType)

const seoDefault = {
  h1: 'Дилерские центры',
  avtodom: {
    title: 'Дилерские центры АВТОДОМ',
    description: 'Адреса дилерских центров Автодом. Продажа новых и б/у автомобилей и мотоциклов | Сервисное обслуживание | Оценка и покупка. Выберите свой дилерский центр!',
  },
  asc: {
    title: 'Дилерские центры в Москве | ГК АвтоСпецЦентр',
    description: 'Дилерские центры в Москве. Продажа автомобилей у проверенных дилеров в Москве от группы компаний АвтоСпецЦентр. Купить автомобиль с гарантией.',
  },
}

const h1 = seo?.seoH1 || seoDefault.h1
const title = seo?.seoTitle || seoDefault[domain].title
const description = seo?.seoDescription || seoDefault[domain].description

useHeadDefault({ title, description })
</script>
