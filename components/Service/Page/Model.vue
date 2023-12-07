<template>
  <div class="service-brand">
    <div class="service-brand__container">
      <ServiceBlockTypeOfWorks
        v-if="typeOfWorks?.length"
        :type-of-works="typeOfWorks"
      />
      <ServiceBanner />
      <ServiceBlockModels
        v-if="showedModels?.length"
        :models="showedModels"
        :title="`Другие обслуживаемые модели ${markName}`"
      />
    </div>
    <ServiceBlockActions
      title="Спецпредложения сервиса"
      class="service-brand__actions"
      :mark-code="markCode"
    />
    <DealersBlock
      is-show-button-see-all
      class="service-brand__dealers"
      :mark-code="markCode"
      :mark-name-en="markName"
    />
  </div>
</template>

<script setup>
const props = defineProps({
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
  typeOfWorks: {
    type: Array,
    required: true,
    default: () => [],
  },
  models: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const { params } = useRoute()
const showedModels = props.models?.filter(model => params.code2 !== model.modelCode)
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
