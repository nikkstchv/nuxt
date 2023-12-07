<template>
  <DetailMain class="about">
    <template #aside>
      <MediaContactsCard is-detail class="about__card" />
    </template>
    <template #body>
      <section
        v-if="staticPageInfo"
        class="about__html"
        v-html="staticPageInfo"
      />
    </template>
  </DetailMain>
</template>

<script setup>
definePageMeta({
  layout: 'english',
})

const route = useRoute()
const { $getSeo } = useNuxtApp()
const staticPageOptions = { staticPageId: '12026' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  title: 'About the company',
  description: 'The AVTODOM company was founded on December 21, 1992. Today it is an automobile holding specializing in sales and maintenance of Luxury and Premium segment cars',
}
const title = seo.seoTitle || defaultSeo.title
const description = seo.seoDescription || defaultSeo.description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
.about {
  &__card {
    @include mq($bp-medium-big) {
      max-width: 377px;
    }
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
