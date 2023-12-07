<template>
  <main class="service-registration">
    <ServiceRecommendationsItem
      v-for="car in carsForRecommendations"
      :id="car.id"
      :key="car.id"
      :car-number="car.carNumber"
      :title="car.title"
      :recommendations="car.recommendations"
      @setRecommendations="setRecommendations"
      @onOpenPopup="onOpenPopup"
    />
    <UIPopup ref="popup">
      <template #body>
        <p class="service-registration__popup-text">
          Рекомендация удалена
        </p>
      </template>
      <template #footer>
        <UIBaseButton
          class="service-registration__popup-button"
          secondary-light
          large
          text="Отменить удаление"
          @click="returnRecommendations"
        />
      </template>
    </UIPopup>
  </main>
</template>

<script>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})

export default {
  name: 'LkServiceRecommendations',
  data: () => ({
    carsForRecommendationsPrevious: {
      id: null,
      recommendations: null,
    },
    carsForRecommendations: [
      {
        id: 1,
        title: 'BMW X4 40d 3.0d AT 4WD (340 л.с.)',
        carNumber: 'К 700 РВ 197',
        recommendations: [
          {
            label: 'Замена тормозных колодок',
            active: false,
          },
          {
            label: 'Замена свинцового противовеса с клеящейся пленкой',
            active: false,
          },
          {
            label: 'Замена масла',
            active: false,
          },
          {
            label: 'Замена авто',
            active: false,
          },
        ],
      },
      {
        id: 2,
        title: 'LAND ROVER RANGE ROVER EVOQUE 40d 3.0d AT 4WD (340 л.с.)',
        carNumber: 'К 700 РВ 198',
        recommendations: [
          {
            label: 'Замена тормозных колодок',
            active: false,
          },
          {
            label: 'Замена свинцового противовеса с клеящейся пленкой',
            active: false,
          },
          {
            label: 'Замена масла',
            active: false,
          },
          {
            label: 'Замена авто',
            active: false,
          },
        ],
      },
    ],
  }),
  methods: {
    onOpenPopup () {
      this.$refs.popup.open()
    },
    onClosePopup () {
      this.$refs.popup.close()
    },
    returnRecommendations () {
      const { id, recommendations } = this.carsForRecommendationsPrevious
      this.carsForRecommendations[id].recommendations = recommendations
      this.onClosePopup()
    },
    setRecommendations (id, recommendations, recommendationsPrev) {
      this.carsForRecommendations.some((el, index) => {
        if (el.id === id) {
          this.carsForRecommendationsPrevious.id = index
          this.carsForRecommendationsPrevious.recommendations =
            recommendationsPrev
          this.carsForRecommendations[index].recommendations = recommendations
          return true
        }
        return false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.service-registration {
  display: grid;
  grid-gap: 70px;
  max-width: 792px;
  height: fit-content;
  padding: 40px 0;

  @include mq($bp-small) {
    grid-gap: 80px;
  }

  @include mq($bp-medium) {
    padding: 50px 0;
  }

  &__popup-text {
    @include label;

    margin-bottom: 15px;
  }
}
</style>
