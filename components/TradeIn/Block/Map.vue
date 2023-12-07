<template>
  <section class="map-block">
    <TradeInTitle class="map-block__title">
      Выбор дилерского центра
    </TradeInTitle>
    <UIBaseSelectInput
      v-if="optionsCity.length > 1"
      v-model="city"
      :options="optionsCity"
      class="map-block__select"
      fly-placeholder="Город"
      @onSetSelect="setCity"
    />
    <client-only>
      <LazyYandexMaps
        class="map-block__map"
        :coords="activeCity.coords"
        :placemarks="placemarks"
      />
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'TradeInBlockMap',
  props: {
    dealers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data () {
    return {
      city: 'Москва',
      optionsCity: [
        {
          coords: [55.7522, 37.6156],
          name: 'Москва',
          code: 'msk',
          isActive: true,
        },
        {
          coords: [59.93863, 30.31413],
          name: 'Санкт-Петербург',
          code: 'spb',
          isActive: false,
        },
        {
          coords: [45.04484, 38.97603],
          name: 'Краснодар',
          code: 'krasnodar',
          isActive: false,
        },
      ],
    }
  },
  computed: {
    activeCity () {
      return this.optionsCity.find(city => city.isActive)
    },
    dealersMapItems () {
      return this.dealers
        .map((dealer) => {
          return {
            id: dealer.id,
            coords: Object.values(dealer.coordinates),
            name: dealer.nameRu,
            address: dealer.address,
            timeTable: dealer.timeTable[0]?.time,
            phone: dealer.phone,
            city: dealer.city,
          }
        })
        .filter(dealer => dealer.city === this.city)
    },
    placemarks () {
      return this.dealersMapItems.map((item) => {
        return {
          coords: item.coords,
          balloon: {
            name: item.name,
            address: item.address,
            time: item.timeTable,
            phone: item.phone,
          },
          markerId: item.id,
          clusterName: '1',
        }
      })
    },
  },
  created () {
    this.optionsCity = this.optionsCity.filter((city) => {
      return this.dealers.find(dealer => dealer.cityCode === city.code)
    })
  },
  methods: {
    setCity (value) {
      this.city = value
      this.optionsCity = this.optionsCity.map(city => ({ ...city, isActive: city.name === value }))
    },
  },
}
</script>

<style scoped lang="scss">
.map-block {
  display: grid;
  grid-gap: 20px;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-small) {
    grid-gap: 25px;
  }

  @include mq($bp-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  @include mq($bp-big) {
    grid-gap: 50px;
  }

  &__select {
    width: 100%;
    max-width: 300px;
    margin: auto;

    @include mq($bp-big) {
      max-width: 377px;
    }
  }

  &__map {
    height: 600px;
  }
}
</style>
