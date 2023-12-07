<template>
  <SkeletonCatalogCard v-if="props.isTradeInComponent === false" />
  <ServicesFormTradeIn
    v-else
    class="trade-in-card"
  />
</template>
<script setup>
const props = defineProps({
  isTradeInComponent: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang='scss' scoped>
.trade-in-card {
  :deep(.services-form-trade-in__image) {
    align-self: stretch;

    @include mq($bp-super-small) {
      max-width: 156px;
    }

    @include mq($bp-small-medium) {
      max-width: 176px;
    }

    @include mq($bp-small) {
      max-width: 140px;
    }

    @include mq($bp-medium-big) {
      max-width: 156px;
    }

    @include mq($bp-big) {
      max-width: 176px;
    }
  }

  :deep(.services-form-trade-in__title) {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;

      max-width: 240px;
    }
  }

  :deep(.services-form-trade-in__button) {
    max-width: 100%;
  }

  :deep(.services-form-trade-in__input) {
    max-width: 100%;
  }

}
</style>
