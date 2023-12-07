<template>
  <div class="service-brand">
    <div class="service-brand__container">
      <ServiceBlockModels v-if="models?.length" :models="models" :service-type-code="code2" />
      <ServiceServices
        v-if="serviceTypeList?.length"
        :service-type-list="serviceTypeList"
        title="Другие услуги"
      />
    </div>
    <ServiceBlockActions
      title="Спецпредложения сервиса"
      class="service-brand__actions"
    />
    <DealersBlock
      is-show-button-see-all
      class="service-brand__dealers"
    />
  </div>
</template>

<script setup>
defineProps({
  markName: {
    type: String,
    required: true,
    default: '',
  },
  markCode: {
    type: String,
    required: true,
    default: '',
  },
  serviceTypeList: {
    type: Array,
    required: true,
    default: () => [],
  },
})
provide('componentIs', 'span')
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-brand {
  &__container {
    @include indentsMainHorizontal;

    display: grid;
    grid-gap: 50px;
  }

  &__actions,
  &__dealers {
    margin-top: 50px;
  }
}
</style>
