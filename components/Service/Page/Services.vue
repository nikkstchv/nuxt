<template>
  <div class="service-page-services">
    <div class="service-page-services__container">
      <ServiceBlockServices
        v-if="showedServices"
        :service-type-list="showedServices"
        title="Другие услуги"
      />
    </div>

    <ServiceBlockActions
      title="Спецпредложения сервиса"
      class="service-page-services__actions"
      :mark-code="markCode"
    />

    <DealersBlock
      is-show-button-see-all
      class="service-page-services__dealers"
      :mark-code="markCode"
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
  serviceTypeList: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const { params } = useRoute()
const showedServices = props.serviceTypeList?.filter(services => params.code2 !== services.code)

</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-page-services {
  &__container {
    @include indentsMainHorizontal;
  }

  &__dealers,
  &__actions {
    margin-top: 60px;
  }
}
</style>
