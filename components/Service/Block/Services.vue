<template>
  <section class="service-block-services">
    <p class="service-block-services__title">
      {{ title }}
    </p>
    <div class="service-block-services__container">
      <ul class="service-block-services__list">
        <ServiceServicesItem
          v-for="services in serviceTypeList"
          :key="services.code"
          :name="services.nameRu"
          :code="services.code"
          :price="services.price"
        />
      </ul>
      <ServiceBanner class="service-block-services__banner" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    require: false,
    default: 'Услуги',
  },
  serviceTypeList: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.service-block-services {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__container {
    position: relative;
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium-big) {
      grid-template-columns: 2fr minmax(390px, 1fr);
    }
  }

  &__banner {
    position: sticky;
    top: 120px;
    height: fit-content;

    & :deep(.service-online__title) {
      @include mq($bp-medium-big) {
        @include h3;
      }
    }
  }

  &__title {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
}
</style>
