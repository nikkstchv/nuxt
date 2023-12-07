<template>
  <main class="garage">
    <!--    <GarageSlider v-if="cards" :cards="cards" />-->
    <ul v-if="cards" class="garage__list">
      <GarageCard
        v-for="card in cards"
        :key="card.id"
        :image="card.image"
        :title="card.title"
        :modification="card.modification"
        :year="card.year"
        :run="card.run"
        :color="card.color"
        :vin="card.vin"
        :state-number="card.stateNumber"
        @onOpenGaragePanel="onOpenGaragePanel"
      />
    </ul>
    <UIBaseButton
      class="garage__button"
      primary
      @click="onOpenGaragePanel"
    >
      Добавить автомобиль
      <IconPlus />
    </UIBaseButton>
    <GaragePanel />
  </main>
</template>

<script>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

export default {
  name: 'LkGarage',
  data: () => ({
    cards: [
      {
        id: 1,
        image:
          'https://avtodom.ru/upload/iblock/775/775e5533892122f0f772ec8abe86e265.png',
        title: 'LAND ROVER RANGE ROVER EVOQUE',
        modification: '40d 3.0d AT 4WD (340 л.с.)',
        year: '2020',
        run: '97 630 км',
        color: 'Красный',
        vin: 'JH4DB1550NS00****',
        stateNumber: 'К 700 РВ 197',
      },
      {
        id: 2,
        image:
          'https://avtodom.ru/upload/iblock/9f8/9f8fc5a18d485465472699c2ecc5dec1.png',
        title: 'BMW X4',
        modification: '40d 3.0d AT 4WD (340 л.с.)',
        year: '2021',
        run: '15 000 км',
        color: 'Черный',
        vin: 'JH4DB1550NS00****',
        stateNumber: 'X 444 ХХ 777',
      },
    ],
  }),
  // methods: {
  //   ...mapMutations({
  //     onOpenGaragePanel: 'garage/onOpen',
  //   }),
  // },
}
</script>

<style lang="scss" scoped>
.garage {
  display: block;
  padding: 30px 0;
  overflow: hidden;

  &__list {
    display: grid;
    grid-gap: 40px;
    height: fit-content;
    margin-bottom: 60px;

    @include mq($bp-small) {
      grid-gap: 50px;
      margin-bottom: 80px;
    }
  }

  &__button {
    & :deep(.icon__path) {
      stroke: white;
    }
  }
}
</style>
