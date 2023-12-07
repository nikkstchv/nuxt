<template>
  <UIBody class="insuranceAndCredit">
    <UISimplePageHeader has-back-button :title="h1" />
    <DetailMain>
      <template #aside>
        <div class="insuranceAndCredit__aside">
          <DetailAsideLeft
            title="Кредитование"
            text="Выгодные условия и лучшие предложения банков по автокредитованию"
            @onButtonClick="onOpenCreditPanel"
          />
          <DetailAsideLeft
            title="Страхование"
            @onButtonClick="onOpenInsurancePanel"
          />
        </div>
      </template>
      <template #body>
        <section
          v-if="staticPageInfo"
          class="insuranceAndCredit__html"
          v-html="staticPageInfo"
        />
      </template>
    </DetailMain>
    <FormPanelCredit form-id="form_credit" />
    <FormPanelInsurance />
  </UIBody>
</template>

<script setup>
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'

definePageMeta({
  validate: () => {
    const { isAsc } = useHoldingStore()
    return isAsc
  },
})

const route = useRoute()
const { $getSeo } = useNuxtApp()
const { onOpen: onOpenFormPanel } = useFormStore()
const onOpenInsurancePanel = () => onOpenFormPanel('isOpenInsurance')
const onOpenCreditPanel = () => onOpenFormPanel('isOpenCredit')
const staticPageOptions = { staticPageId: '12271' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  h1: 'Страхование и автокредиты',
  title: 'Страхование | Автокредит | КАСКО и ОСАГО | финансовые услуги | ГК АвтоСпецЦентр',
  description: 'Застраховать автомобиль | Оформить КАСКО и ОСАГО | Получить кредит на машину. Финансовые услуги от официального дилера ГК АвтоСпецЦентр в Москве.',
}
const h1 = seo.seoH1 || defaultSeo.h1
const title = seo.seoTitle || defaultSeo.title
const description = seo.seoDescription || defaultSeo.description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
.insuranceAndCredit {
  &__aside {
    display: grid;
    grid-gap: 40px;
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
