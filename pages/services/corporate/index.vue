<template>
  <UIBody>
    <UISimplePageHeader :title="h1" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft :title="h1" @onButtonClick="onOpenFormPanel" />
      </template>
      <template #body>
        <div
          v-if="staticPageInfo"
          class="detail__html"
          v-html="staticPageInfo"
        />
      </template>
    </DetailMain>
    <FormPanelCorporate />
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
const staticPageOptions = { staticPageId: '12301' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  h1: 'Корпоративным клиентам',
  title: 'Корпоративным клиентам – АВТОДОМ',
  description: 'Программы комплексного обслуживания корпоративных автопарков - весь спектр услуг: от гарантийного обслуживания и ремонта до предоставления внеочереднего сервиса и отчета о проведенных работах и использованных материалах',
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
