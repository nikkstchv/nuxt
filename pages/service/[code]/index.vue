<template>
  <main class="service-page-code">
    <UISimplePageHeader
      class="service-page-code__header"
      :title="h1"
      :direct-crumbs="directCrumbs"
    />
    <template v-if="section === 'section'">
      <section
        v-if="staticPage?.length"
        class="service-page-code__html"
        v-html="staticPage"
      />
      <ServicePageSection
        :brands="brands"
        :code="code"
        :service-type-list="serviceTypeList"
      />
    </template>

    <ServicePageBrand
      v-if="section === 'brand'"
      :mark-name="markName"
      :type-of-works="typeOfWorks"
      :brands="brands"
      :models="models"
      :mark-code="code"
    />

    <LazyServicePanel />
  </main>
</template>

<script setup>
import routes from '@/api/routes/service'

const { $fetchClient, $getSeo, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
const { params, path } = useRoute()
const { code } = params
const brand = await $fetchClient(routes.getBrand(code))

if ($hasErrorResponse(brand)) {
  $errorResponseCatch(brand)
}

const brands = brand.refs.mark
const models = brand.childList
const staticPageId = brand?.data?.staticPagesId
const staticPageContent = brand?.data?.staticContent
const staticPage = await useGetStaticPageService({
  staticPageId,
  staticPageContent,
})
const serviceTypeList = brand?.serviceTypeList

const section = brand.section
const seoBrand = brand.data
const seoService = await $getSeo(path)
const seo = section === 'section' ? seoService : seoBrand
const seoBreadcrumb = seo?.seoBreadcrumb ?? ''
const markName = brand?.refs?.mark[0]?.nameEn ?? ''
const typeOfWorks = brand?.refs?.service ?? []
const h1 = seo?.seoH1
const title = seo?.seoTitle ?? ''
const description = seo?.seoDescription ?? ''
const crumb = seoBreadcrumb || title || ''
const directCrumbs = ['', crumb]

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-page-code {
  @include indentsMainVertical;

  &__header {
    @include indentsMainHorizontal;
  }

  &__html {
    @include indentsMainHorizontal;

    @import 'assets/styles/components/Detail/html-style';

    margin-bottom: 50px;
  }
}
</style>
