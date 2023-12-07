<template>
  <div class="service-brand">
    <div class="service-brand__container">
      <ServiceBlockServices
        v-if="showedServices?.length"
        :service-type-list="showedServices"
        title="Услуги"
      />
      <ServiceBlockModels v-if="showedModels?.length" :models="showedModels" :service-type-code="code3" />
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
  markCode: {
    type: String,
    required: true,
    default: '',
  },
  markName: {
    type: String,
    required: true,
    default: '',
  },
  models: {
    type: Array,
    required: true,
    default: () => [],
  },
  serviceTypeList: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const { params } = useRoute()
const { code2, code3 } = params
const showedModels = props.models?.filter(model => code2 !== model.modelCode)
const showedServices = props.serviceTypeList?.filter(services => code3 !== services.code)
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
