<template>
  <main class="terms-of-use">
    <UISimplePageHeader has-back-button :title="h1" />
    <div
      v-if="staticPageInfo"
      class="terms-of-use__html"
      v-html="staticPageInfo"
    />
    <h2 v-else>
      Не удалось загрузить данные
    </h2>
  </main>
</template>

<script setup>
const route = useRoute()
const { $getSeo } = useNuxtApp()
const staticPageOptions = { staticPageId: '12116' }
const staticPageInfo = await useGetStaticPageService(staticPageOptions)
const seo = await $getSeo(route.path)
const defaultSeo = {
  h1: 'Пользовательское соглашение',
  title: 'Пользовательское соглашение в редакции от «05» ноября 2018 г | АВТОDОМ',
  description: 'Использование сервисов Сайта, а также все отношения между Вами и Компанией, связанные с использованиемсервисов Сайта, регулируются настоящим Соглашением и законодательством Российской Федерации',
}
const h1 = seo.seoH1 || defaultSeo.h1
const title = seo.seoTitle || defaultSeo.title
const description = seo.seoDescription || defaultSeo.description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.terms-of-use {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  &__html {
    @import 'assets/styles/components/Detail/html-style';

    & :deep(.terms-of-use__title) {
      @include h2;

      margin: 30px 0;
    }

    & :deep(.terms-of-use__subtitle) {
      @include h3;

      margin: 15px 0;
    }

    & :deep(p) {
      @include text_big_regular;
    }

    & :deep(li) {
      @include text_big_regular;
    }
  }
}
</style>
