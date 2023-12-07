<template>
  <div class="item">
    <h2 class="item__title">
      {{ title }}
    </h2>
    <p class="item__number">
      Гос. номер: <span class="item__number-value">{{ carNumber }}</span>
    </p>
    <ul class="item__list">
      <ServiceRecommendationsListItem
        v-for="(recommendation, index) in recommendations"
        :id="index"
        :key="index"
        :label="recommendation.label"
        :active="recommendation.active"
        @handleActiveRecommendation="handleActiveRecommendation"
        @deleteRecommendation="deleteRecommendation"
      />
    </ul>
    <UIBaseButton
      class="item__button"
      text="Записаться на сервис"
      primary
      :disable="!someActiveRecommendations"
      @click="onOpenServicePanel"
    />
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useFormStore } from '../../store/form'

export default {
  name: 'ServiceRecommendationsItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    carNumber: {
      type: String,
      required: true,
    },
    recommendations: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    recommendationsLocal () {
      return [...this.recommendations]
    },
    someActiveRecommendations () {
      return this.recommendations.some(item => item.active)
    },
  },
  methods: {
    deleteRecommendation (index) {
      this.recommendationsLocal.splice(index, 1)

      this.setRecommendations(this.recommendationsLocal, this.recommendations)
      this.$emit('onOpenPopup')
    },
    handleActiveRecommendation (index) {
      const recommendation = this.recommendationsLocal[index]

      recommendation.active = !recommendation.active

      this.setRecommendations(this.recommendationsLocal)
    },
    setRecommendations (recommendations, recommendationsPrev) {
      this.$emit(
        'setRecommendations',
        this.id,
        recommendations,
        recommendationsPrev,
      )
    },
    onOpenServicePanel () {
      this.onOpenPanel('isOpenService')
    },
    ...mapActions(useFormStore, {
      onOpenPanel: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;

  &__title {
    @include h5;

    margin-bottom: 15px;

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      margin-left: 20px;
    }
  }

  &__number {
    @include text_medium_bold;

    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-left: 20px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }

    &-value {
      font-weight: 400;
    }
  }

  &__list {
    display: grid;
    grid-gap: 10px;
    height: fit-content;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }
  }

  &__button {
    @include mq($bp-medium-big) {
      margin-left: 20px;
    }
  }
}
</style>
