<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
  </Head>
  <CatalogQRPage
    :key="car.id"
    :car="car"
    :title="title"
    :description="description"
    :h1="h1"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useCarStore } from '../../../store/car'
import { useHoldingStore } from '../../../store/holding'
import { getCard } from '@/api/routes/catalog'

export default defineNuxtComponent({
  name: 'DetailQR',
  layout: 'clear',
  setup () {
    definePageMeta({
      layout: 'clear',
    })
  },
  async asyncData () {
    const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
    const { add: transportAddInStore } = useCarStore()
    const { params } = useRoute()
    let carData = null

    try {
      const car = await $fetchClient(getCard(params.id))
      if ($hasErrorResponse(car)) {
        $errorResponseCatch(car)
      } else {
        carData = car.data
        transportAddInStore(carData)
      }
    } catch (e) {
      if (e?.response?.status === 410) {
        carData = e.response.data.data

        transportAddInStore(carData)
      }

      return
    }

    return { car: carData }
  },
  computed: {
    title () {
      if (this.car.status === '3') {
        return `${
          this.car.codes.carType === 'moto' ? 'Мото' : 'Авто'
        } продано: ${this.mark} ${this.model} - ID: ${this.carId}`
      } else if (this.isNewCar) {
        return `Купить ${this.mark} ${this.model} ${this.modification} ${this.equipment} ${this.exteriorColorGroup} новый / ${this.carId} в наличии по цене ${this.disprice} руб в ${this.holdingName} - официальный дилер ${this.markRu}`
      } else {
        return `Купить ${this.mark} ${this.model} ${this.manufactureYear}, ${this.modification} ${this.exteriorColorGroup} с пробегом ${this.totalTripWithUnit} / ${this.carId} по цене от ${this.disprice} руб в ${this.holdingName} - официальный дилер ${this.markRu} в Москве`
      }
    },
    description () {
      if (this.car.status === '3') {
        return `${
          this.car.codes.carType === 'moto' ? 'Мото' : 'Авто'
        } продано: ${this.mark} ${this.model} ${
          this.manufactureYear
        } г. - ID: ${this.carId}, приобрести ${
          this.car.codes.carType === 'moto' ? 'мотоцикл' : 'автомобиль'
        } от официального дилера ${this.holdingName}`
      } else if (this.isNewCar) {
        return `${this.mark} ${this.model} ${this.modification} ${this.equipment} по цене от ${this.disprice} руб. в наличии и на заказ в ${this.holdingName} - официальный дилер ${this.markRu} в Москве | ${this.carId}`
      } else {
        return `${this.mark} ${this.model} ${this.modification} ${this.equipment} ${this.exteriorColorGroup} по цене от ${this.disprice} руб. в наличии в ${this.holdingName} - официальный дилер ${this.markRu} в Москве | ${this.carId}`
      }
    },
    h1 () {
      return `${this.mark} ${this.model} ${this.manufactureYear} ${this.modification} ${this.equipment} ${this.exteriorColorGroup}`
    },
    carId () {
      return this.car.carId
    },
    mark () {
      return this.car.mark
    },
    markRu () {
      return this.car.markNameRu ?? ''
    },
    model () {
      return this.car.model
    },
    manufactureYear () {
      return this.technicalInfo?.manufactureYear
    },
    modification () {
      return this.car.modification
    },
    equipment () {
      return !this.isBaseEquipment ? this.technicalInfo.equipment : ''
    },
    serie () {
      return this.car.serie
    },
    totalTrip () {
      return this.car.totalTrip
    },
    totalTripWithUnit () {
      return `${this.totalTrip.toLocaleString('ru-RU')} км`
    },
    generation () {
      return this.car.generation
    },
    disprice () {
      return this.$toLocalPrice(this.car.disprice)
    },
    exteriorColorGroup () {
      return this.technicalInfo?.exteriorColorGroup
    },
    isNewCar () {
      return this.technicalInfo?.isNew === 'Новый'
    },
    technicalInfo () {
      return this.car.technicalInfo
    },
    isBaseEquipment () {
      return (
        this.technicalInfo.equipment === 'Базовая' ||
        this.technicalInfo.equipment === 'Base'
      )
    },
    ...mapState(useHoldingStore, ['holdingName']),
  },
})
</script>
