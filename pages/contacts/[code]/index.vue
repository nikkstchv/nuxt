<template>
  <ContactsMainLayout
    :title="h1"
    :dealers="dealers"
    :filter="filter"
  />
</template>

<script setup>
import { getDealers as getDealersPath, getFilter as getFilterPath } from '@/api/routes/dealer'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  middleware: 'city-contacts',
})

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const { holdingName } = useHoldingStore()
const route = useRoute()
const { params, path } = route

const getFoundItem = (name, filter) => {
  return filter[name]?.find(item => item.code === params.code)
}
const getDealers = async (options) => {
  const res = await $fetchClient(getDealersPath(), options)

  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res?.data ?? null
  }
}

const getFilter = async () => {
  const { data } = await useAsyncData('getFilter', () => $fetchClient(getFilterPath()))
  const res = data.value
  if (!$hasErrorResponse(res)) {
    return res
  }
}

const getCitiesString = (cities) => {
  const wordDeclension = (word) => {
    const last = word.slice(-1)
    const vowelLetter = ['а', 'о', 'и', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я']
    const isLastVowelLetter = vowelLetter.includes(last)
    if (isLastVowelLetter) {
      return word.slice(0, -1) + 'e'
    } else {
      return word + 'e'
    }
  }

  const unique = new Set(cities.map(city => wordDeclension(city)))
  const uniqueString = [...unique].join(', ')

  return uniqueString.replace(/,\s(.*)$/, ' и $1')
}

const handleWrongCode = (mark, vehicleType) => {
  if (!mark && !vehicleType) {
    throw createError({ statusCode: 404, fatal: true })
  }
}

const seo = await $getSeo(path)
const filter = await getFilter()
const vehicleType = getFoundItem('vehicleTypes', filter)
const mark = getFoundItem('marks', filter)
handleWrongCode(mark, vehicleType)
const options = {
  query: {
    ...(mark && { brand_code: mark.code }),
    ...(vehicleType && { vehicle_type: vehicleType.code }),
  },
}
const dealers = await getDealers(options)

const cities = computed(() => {
  if (dealers) {
    const cities = dealers.map(dealer => dealer.city)
    return getCitiesString(cities)
  }
  return ''
})

const h1 = seo?.seoH1 || `Дилерские центры ${mark?.value || ''}`
const title = seo?.seoTitle || `Дилерские центры ${mark?.value || ''} в ${cities.value} | ${holdingName}`
const description = seo?.seoDescription || `Официальные дилерские центры ${mark?.value || ''} компании ${holdingName} в ${cities.value}. Контакты и карта проезда на сайте.`

useHeadDefault({ title, description })
</script>
