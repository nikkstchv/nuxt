<template>
  <main class="service-page-code3">
    <UISimplePageHeader
      class="service-page-code3__header"
      :title="h1"
      :direct-crumbs="directCrumbs"
    />
    <section
      v-if="staticPage?.length"
      class="service-page-code3__html"
      v-html="staticPage"
    />
    <ServicePageModelSection
      v-if="section === 'section'"
      :models="models"
      :service-type-list="serviceTypeList"
      :mark-code="code"
      :mark-name="markName"
    />
    <ServicePageServices
      v-if="section === 'services'"
      :service-type-list="serviceTypeList"
      :mark-code="code"
    />
    <LazyServicePanel />
  </main>
</template>

<script setup>
import routes from '@/api/routes/service'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
const { params } = useRoute()
const { code, code2, code3 } = params
const model = await $fetchClient(routes.getModelServices(code, code2, code3))
const staticPageId = model?.data?.staticPagesId
const staticPageContent = model?.data?.staticContent
const staticPage = await useGetStaticPageService({
  staticPageId,
  staticPageContent,
})

if ($hasErrorResponse(model)) {
  $errorResponseCatch(model)
}

const serviceTypeList = model.serviceTypeList
const models = model.childList
const section = model.section
const seo = model.data
const refs = model.refs
const code2Crumb = (() => {
  switch (section) {
    case 'services':
      return refs?.service[0]?.nameRu ?? ''
    case 'section':
      return seo?.modelName ?? ''
    default:
      return ''
  }
})()
const markName = seo?.markName ?? ''
const seoBreadcrumb = seo?.seoBreadcrumb ?? ''
const directCrumbs = ['', markName, code2Crumb, seoBreadcrumb]
const h1 = seo?.seoH1
const title = seo?.seoTitle ?? ''
const description = seo?.seoDescription ?? ''

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-page-code3 {
  @include indentsMainVertical;

  &__header {
    @include indentsMainHorizontal;
  }

  &__html {
    @include indentsMainHorizontal;

    @import 'assets/styles/components/Static/html-style';

    margin-bottom: 50px;
  }
}
</style>
