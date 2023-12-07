<template>
  <CatalogDetailPage
    v-if="car"
    :car="car"
    :title="title"
    :description="description"
    :h1="h1"
  />
  <UILoader v-else />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { useCarStore } from '@/store/car'
import { getCard } from '@/api/routes/catalog'

const { holdingName, domain } = useHoldingStore()
const { add: transportAddToStore } = useCarStore()
const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $toLocalPrice } = useNuxtApp()
const route = useRoute()
const { id } = route.params

const trowError410 = () => { throw createError({ statusCode: 410, message: 'Gone', fatal: true }) }

const getTransport = async (id) => {
  const res = await $fetchClient(getCard(id)).catch((error) => {
    if (error.statusCode === 410) {
      trowError410()
    }
  })

  if (typeof res === 'string') {
    trowError410()
  }

  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    transportAddToStore(res.data)
    return res?.data
  }

  return null
}

const car = await getTransport(id)
const technicalInfo = car.technicalInfo
const firstImage = car.images[0]?.source?.url ?? ''
const carId = car.carId
const mark = car.mark
const markRu = car.markNameRu ?? ''
const model = car.model
const manufactureYear = technicalInfo?.manufactureYear
const modification = car.modification
const totalTrip = car.totalTrip
const status = car.status
const totalTripWithUnit = `${totalTrip.toLocaleString('ru-RU')} км`
const disprice = $toLocalPrice(car.disprice)
const exteriorColorGroup = technicalInfo?.exteriorColorGroup
const isNewCar = technicalInfo?.isNew === 'Новый'
const isBaseEquipment = technicalInfo.equipment === 'Базовая' ||
      technicalInfo.equipment === 'Base'
const equipment = !isBaseEquipment ? technicalInfo.equipment : ''

// seo

const h1 = `${mark} ${model} ${manufactureYear} ${modification} ${equipment} ${exteriorColorGroup}`
const title = (() => {
  if (status === '3') {
    return `${
          car.codes?.carType === 'moto' ? 'Мото' : 'Авто'
      } продано: ${mark} ${model} - ID: ${carId}`
  } else if (isNewCar) {
    return `Купить ${mark} ${model} ${modification} ${equipment} ${exteriorColorGroup} новый / ${carId} в наличии по цене ${disprice} руб в ${holdingName} - официальный дилер ${markRu}`
  } else {
    return `Купить ${mark} ${model} ${manufactureYear}, ${modification} ${exteriorColorGroup} с пробегом ${totalTripWithUnit} / ${carId} по цене от ${disprice} руб в ${holdingName} - официальный дилер ${markRu} в Москве`
  }
})()
const description = (() => {
  if (status === '3') {
    return `${
          car.codes?.carType === 'moto' ? 'Мото' : 'Авто'
      } продано: ${mark} ${model} ${
          manufactureYear
      } г. - ID: ${carId}, приобрести ${
          car.codes.carType === 'moto' ? 'мотоцикл' : 'автомобиль'
      } от официального дилера ${holdingName}`
  } else if (isNewCar) {
    return `${mark} ${model} ${modification} ${equipment} по цене от ${disprice} руб. в наличии и на заказ в ${holdingName} - официальный дилер ${markRu} в Москве | ${carId}`
  } else {
    return `${mark} ${model} ${modification} ${equipment} ${exteriorColorGroup} по цене от ${disprice} руб. в наличии в ${holdingName} - официальный дилер ${markRu} в Москве | ${carId}`
  }
})()
const seo = {
  htmlAttrs: {
    prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# product:http://ogp.me/ns/product#',
  },
  meta: [
    {
      hid: 'product:condition',
      name: 'product:condition',
      property: 'product:condition',
      content: car.codes.conditionFilter,
    },
    {
      hid: 'product:availability',
      name: 'product:availability',
      property: 'product:availability',
      content: status === '3' ? 'out of stock' : 'in stock',
    },
    {
      hid: 'product:price:amount',
      name: 'product:price:amount',
      property: 'product:price:amount',
      content: disprice,
    },
    {
      hid: 'product:price:currency',
      name: 'product:price:currency',
      property: 'product:price:currency',
      content: 'RUB',
    },
    {
      hid: 'product:retailer_item_id',
      name: 'product:retailer_item_id',
      property: 'product:retailer_item_id',
      content: carId,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      property: 'og:image',
      content: firstImage,
    },
    {
      hid: 'og:image:width',
      name: 'og:image:width',
      property: 'og:image:width',
      content: '200',
    },
    {
      hid: 'og:image:height',
      name: 'og:image:height',
      property: 'og:image:height',
      content: '200',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'product',
    },
    {
      hid: 'twitter:domain',
      name: 'twitter:domain',
      property: 'twitter:domain',
      content: domain,
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      property: 'twitter:site',
      content: holdingName,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      property: 'twitter:title',
      content: title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      property: 'twitter:description',
      content: description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      property: 'twitter:image',
      content: firstImage,
    },
    {
      hid: 'twitter:label1',
      name: 'twitter:label1',
      property: 'twitter:label1',
      content: 'Цена',
    },
    {
      hid: 'twitter:data1',
      name: 'twitter:data1',
      property: 'twitter:data1',
      content: `${disprice} руб.`,
    },
  ],
}

useHeadDefault({ title, description, htmlAttrs: seo.htmlAttrs, meta: seo.meta })
</script>
