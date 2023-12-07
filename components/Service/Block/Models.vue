<template>
  <section class="service-brand-models">
    <p class="service-brand-models__title">
      {{ title }}
    </p>
    <div class="service-brand-models__list">
      <ServiceModelCard
        v-for="(model, index) in models"
        :key="index"
        :title="model.modelName"
        :url="getUrl(model, serviceTypeCode)"
      />
    </div>
  </section>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    required: false,
    default: 'Обслуживаем модели',
  },
  models: {
    type: Array,
    required: true,
  },
  serviceTypeCode: {
    type: String,
    required: false,
    default: '',
  },
})

const getUrl = ({ markCode, modelCode }, serviceTypeCode) => `/service/${markCode}/${modelCode}/${serviceTypeCode ? serviceTypeCode + '/' : ''}`
</script>

<style scoped lang="scss">
.service-brand-models {
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__title {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    row-gap: 20px;
    column-gap: 20px;
    width: 100%;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      row-gap: 30px;
      column-gap: 27px;
    }

    @include mq($bp-medium-big) {
      column-gap: 30px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      column-gap: 40px;
    }

    @include mq($bp-super-big) {
      grid-template-columns: repeat(auto-fit, minmax(377px, 1fr));
    }
  }
}
</style>
