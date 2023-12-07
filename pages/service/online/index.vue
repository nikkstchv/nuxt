<template>
  <UIBody>
    <UISimplePageHeader :title="h1" />
    <DetailMain class="detail">
      <template #body>
        <ServiceOnlineLayout
          ref="serviceOnline"
          is-open
          is-page
          @submit="setData"
        />
      </template>
    </DetailMain>

    <LazyServiceFormPopup
      :user-phone="form?.userPhone"
      :user-email="form?.userEmail"
      :user-name="form?.userName"
      :user-comment="form?.userComment"
      :user-mark="form?.userMark"
      :user-model="form?.userModel"
      :user-date-time="form?.userDateTime"
      :dealer="form?.dealer"
      :client-guid="form?.guid"
      :additional-info="form?.additionalInfo"
      :route-key="form?.routeKey"
      @end="clearData()"
    />
    <LazyFormPanelFeedbackService />
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const { $getSeo } = useNuxtApp()
const { holdingName } = useHoldingStore()
const route = useRoute()
const serviceOnline = ref()
const form = ref(null)
const seo = await $getSeo(route.path)
const h1 = seo.seoH1 || 'Онлайн запись на сервис'
const title = seo.seoTitle || `Онлайн запись на сервис ${holdingName}`
const description = seo.seoDescription || `Онлайн запись на сервис ${holdingName}`

const setData = (data) => {
  form.value = data
}
const clearData = () => {
  form.value = null
  serviceOnline.value.clearData()
}

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
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
