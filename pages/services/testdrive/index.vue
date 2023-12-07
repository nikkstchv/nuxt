<template>
  <UIBody>
    <UISimplePageHeader :title="h1" />
    <DetailMain class="detail">
      <template #body>
        <ServicesTestDriveLayout
          ref="servicesTestDrive"
          is-open
          is-page
          @submit="setData"
        />
      </template>
    </DetailMain>

    <LazyServicesTestDrivePopup
      :user-phone="form?.userPhone"
      :user-email="form?.userEmail"
      :user-name="form?.userName"
      :user-comment="form?.userComment"
      :user-mark="form?.userMark"
      :user-model="form?.userModel"
      :user-generation="form?.userGeneration"
      :user-serie="form?.userSerie"
      :user-equipment="form?.userEquipment"
      :user-modification="form?.userModification"
      :user-date-time="form?.userDateTime"
      :dealer="form?.dealer"
      :client-guid="form?.guid"
      :additional-info="form?.additionalInfo"
      :route-key="form?.routeKey"
      @end="clearData()"
    />
  </UIBody>
</template>
<script setup>
import { useHoldingStore } from '@/store/holding.js'

const { $getSeo } = useNuxtApp()
const { holdingName } = useHoldingStore()
const servicesTestDrive = ref()
const route = useRoute()
const form = ref(null)
const seo = await $getSeo(route.path)
const h1 = seo.seoH1 || 'Запись на тест-драйв'
const title = seo.seoTitle || `Запись на тест-драйв ${holdingName}`
const description = seo.seoDescription || `Запись на тест-драйв ${holdingName}`

const setData = (data) => {
  form.value = data
}

const clearData = () => {
  form.value = null
  servicesTestDrive.value.clearData()
}

useHeadDefault({ title, description })
</script>

<style lang='scss' scoped>
.detail {
  & :deep(.main__body) {
    width: 100%;
    max-width: 100% !important;

    @include mq($bp-small) {
      width: initial;
    }
  }
}
</style>
