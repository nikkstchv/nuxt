<template>
  <UIBody class="yandex-split">
    <UISimplePageHeader has-back-button :title="h1" :direct-crumbs="directCrumbs" />
    <DetailMain>
      <template #body>
        <section
          v-if="staticPageInfo"
          class="yandex-split__html"
          v-html="staticPageInfo"
        />
      </template>
    </DetailMain>
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const { isAvtodom, holdingName } = useHoldingStore()
const { $getSeo } = useNuxtApp()
const { path } = useRoute()
const staticPageOptions = { staticPageId: isAvtodom ? '12498' : '12497' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seoDefault = {
  h1: 'Яндекс Сплит',
  title: `Оплата частями: Яндекс Сплит - ${holdingName}`,
  description: `Оплата частями: Яндекс Сплит - ${holdingName}`,
}
const seo = await $getSeo(path)
const h1 = seo?.seoH1 || seoDefault.h1 || ''
const breadcrumb = seo?.seoBreadcrumb || h1 || ''
const directCrumbs = ['', breadcrumb]
const title = seo?.seoTitle || seoDefault.title || ''
const description = seo?.seoDescription || seoDefault.description || ''

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
.yandex-split {
  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
