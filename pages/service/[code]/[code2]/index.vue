<template>
  <main class="service-page-code2">
    <UISimplePageHeader
      class="service-page-code2__header"
      :title="h1"
      :direct-crumbs="directCrumbs"
    />
    <section
      v-if="staticPage?.length"
      class="service-page-code2__html"
      v-html="staticPage"
    />

    <ServiceBlockMarks
      v-if="model?.refs?.mark.length > 1"
      :brands="model.refs.mark"
      :code="code"
      :code2="code2"
      class="service__container"
    />

    <ServicePageModel
      v-if="section === 'model'"
      :mark-code="code"
      :mark-name="markName"
      :models="models"
      :type-of-works="typeOfWorksModel"
    />
    <ServicePageBrandSection
      v-if="section === 'section'"
      :mark-code="code"
      :models="models"
      :service-type-list="typeOfWorksModel"
      :type-of-works="typeOfWorks"
      :mark-name="markName"
    />
    <ServicePageWorkSection
      v-if="section === 'service'"
      :mark-code="code"
      :service-type-list="typeOfWorksModel"
      :mark-name="markName"
    />
    <LazyServicePanel />
  </main>
</template>

<script setup>
import routes from '@/api/routes/service'
import { useHoldingStore } from '@/store/holding'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const { isAsc, isAvtodom } = useHoldingStore()

const { params, path } = useRoute()
const { code, code2 } = params
const brand = await $fetchClient(routes.getBrand(code))
const model = await $fetchClient(routes.getModel(code, code2))
const staticPageId = model?.data?.staticPagesId
const staticPageContent = model?.data?.staticContent
const staticPage = await useGetStaticPageService({
  staticPageId,
  staticPageContent,
})

if ($hasErrorResponse(model)) {
  $errorResponseCatch(model)
}

const typeOfWorks = brand?.refs?.service?.filter(
  typeOfWork => typeOfWork.code !== code2,
)

const typeOfWorksModel = model.serviceTypeList
const models = model.childList
const section = model.section
const serviceName = model.refs?.service[0].nameRu

const seoService = await $getSeo(path)
const seoDefault = {
  seoTitle: `${serviceName} в автосервисе в Москве, цены | ${isAsc ? 'АвтоСпецЦентр' : ''}${isAvtodom ? 'Автодом' : ''}`,
  seoH1: serviceName,
  seoDescription: `${serviceName} автомобилей от официального дилера в Москве. Онлайн запись. Профессиональные услуги, гарантия качества, доступные цены.`,
  seoBreadcrumb: serviceName,
}

const seo = model.data
const markName = seo?.markName || brand.refs?.service[0].nameRu
const title = seo?.seoTitle || seoService?.seoTitle || seoDefault.seoTitle
const h1 = seo?.seoH1 || seoService?.seoH1 || seoDefault.seoH1
const description = seo?.seoDescription || seoService?.seoDescription || seoDefault.seoDescription
const seoBreadcrumb = seo?.seoBreadcrumb || seoService?.seoBreadcrumb || seoDefault.seoBreadcrumb
const directCrumbs = ['', markName, seoBreadcrumb]

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service {
  &__container {
    @include indentsMainHorizontal;

    padding-bottom: 60px;
  }
}

.service-page-code2 {
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
