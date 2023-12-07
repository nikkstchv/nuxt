<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:description" :content="description" />
    <Meta name="og:title" :content="title" />
  </Head>
  <UIBody v-if="pageDataBrand">
    <UISimplePageHeader :title="h1" :direct-crumbs="directCrumbs" />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeft
          title="Онлайн-запись на сервис"
          @onButtonClick="onOpenServicePanel(markCode)"
        />
      </template>
      <template #body>
        <section
          v-if="pageDataGuaranty"
          class="detail__section"
          v-html="pageDataGuaranty.description"
        />
        <DetailText v-else>
          {{ guarantyText }}
        </DetailText>
      </template>
    </DetailMain>
  </UIBody>
  <UILoader v-else class="detail__loader" />
</template>

<script setup>
import { useFormStore } from '@/store/form'
import { getModels, getStaticPage } from '@/api/routes/brands'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const route = useRoute()
const { params, path } = route
const { onOpen: onOpenPanel, setInitData } = useFormStore()
let pageDataGuaranty = null
const pageDataBrand = await $fetchClient(getModels(params.brand))
const refs = pageDataBrand?.refs
const mark = refs?.mark[0] || ''
const markCode = mark?.code || ''
const markNameEn = mark?.nameEn || ''
const markNameRu = mark?.nameRu || ''
const guarantyTime = pageDataBrand?.guarantyTime
const guarantyTrip = pageDataBrand?.guarantyTrip

if ($hasErrorResponse(pageDataBrand)) {
  $errorResponseCatch(pageDataBrand)
}
if (pageDataBrand.viewGuaranty === '0') {
  throw createError({ statusCode: 404, fatal: true })
} else if (pageDataBrand?.creditStaticPagesId !== '0') {
  const res = await $fetchClient(getStaticPage(pageDataBrand?.guarantyStaticPagesId))
  if (!$hasErrorResponse(res)) {
    pageDataGuaranty = res
  }
}

// seo

const seo = await $getSeo(path)
const defaultH1 = `Гарантия на ${markNameEn}`
const defaultTitle = `Гарантия на ${markNameEn} ${guarantyTime} ${guarantyTrip}`
const defaultDescription = `На автомобили/мотоциклы ${markNameEn} предоставляется гарантия ${guarantyTime} ${guarantyTrip}. Гарантия на запасные части ${markNameRu}. Что является гарантийным случаем? Подробнее на официальном сайте avtodom.ru`
const h1 = seo?.seoH1 || defaultH1 || ''
const title = seo?.seoTitle || defaultTitle || ''
const description = seo?.seoDescription || defaultDescription || ''
const breadcrumb = seo?.seoBreadcrumb || markNameEn || ''
const vehicleTypes = pageDataBrand?.vehicleTypes?.map(vehicleType => vehicleType.toLowerCase())?.join(', ') ?? ''
const guarantyText = `На новые ${vehicleTypes} ${markNameEn}, приобретенные у официальных дилеров,
      предоставляется гарантия качества на срок ${pageDataBrand.guarantyTime} ${pageDataBrand.guarantyTrip}.
      Гарантия действительна в течение всего указанного срока согласно условиям производителя, указанным в сервисной книжке.
      По вопросам гарантийного ремонта ${markNameEn} вы можете обратиться в сервисный центр официального дилера ${markNameEn},
      оставив заявку на сайте.`
const directCrumbs = ['', markNameEn, breadcrumb]

// methods

const setInitDataMark = (markCode) => {
  if (markCode) {
    setInitData({ ...(markCode && { markCode }) })
  }
}
const onOpenServicePanel = (markCode) => {
  setInitDataMark(markCode)
  onOpenPanel('isOpenService')
}
</script>

<style lang="scss" scoped>
.detail {
  &__section {
    @import 'assets/styles/components/Brands/html-style';
  }
}
</style>
