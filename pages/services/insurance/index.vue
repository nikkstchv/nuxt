<template>
  <UIBody>
    <UISimplePageHeader :title="h1" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft
          :title="h1"
          @onButtonClick="onOpenInsurancePanel"
        />
      </template>
      <template #body>
        <div
          v-if="staticPageInfo"
          class="detail__html"
          v-html="staticPageInfo"
        />
      </template>
    </DetailMain>
    <FormPanelInsurance />
  </UIBody>
</template>

<script setup>
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const route = useRoute()
const { $getSeo } = useNuxtApp()
const { onOpen: onOpenFormPanel } = useFormStore()
const onOpenInsurancePanel = () => onOpenFormPanel('isOpenInsurance')
const staticPageOptions = { staticPageId: '12275' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  h1: 'Страхование',
  title: 'Страхование – АВТОДОМ',
  description: 'Страховая защита для вашего автомобиля и имущества. Договор страхования будет оформлен непосредственно в нашем дилерском центре. При выезде из автосалона Ваш автомобиль будет уже застрахован',
}
const h1 = seo.seoH1 || defaultSeo.h1
const title = seo.seoTitle || defaultSeo.title
const description = seo.seoDescription || defaultSeo.description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
.detail {
  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
