<template>
  <UIBody>
    <UISimplePageHeader :title="h1" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft
          :title="h1"
          text="Наши лизинговые программы, специально разработанные для клиентов компании АВТОДОМ"
          @onButtonClick="onOpenForm"
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
    <FormPanelLeasing />
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
const { onOpen: onOpenForm } = useFormStore()
const staticPageOptions = { staticPageId: '13776' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  h1: 'Лизинг',
  title: 'Лизинг – АВТОДОМ',
  description: 'Предлагаем вам использовать лизинговые программы, специально разработанные для клиентов компании АВТОDОМ - юридических лица и индивидуальных предпринимателей',
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
