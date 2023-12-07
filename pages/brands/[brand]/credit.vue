<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:description" :content="description" />
    <Meta name="og:title" :content="title" />
  </Head>
  <div class="wrapper">
    <UIBody>
      <UISimplePageHeader :title="h1" :direct-crumbs="directCrumbs" />
      <DetailMain class="detail">
        <section
          v-if="pageDataCredit?.description"
          class="detail__content"
          v-html="pageDataCredit.description"
        />
        <DetailText v-else>
          {{ creditText }}
        </DetailText>
      </DetailMain>
    </UIBody>
    <CreditBlock
      class="detail__section"
      :brand="markNameEn"
      :brand-code="markCode"
    />
    <OnSaleBlock
      slider-name="on-sale-new-block"
      class="detail__section"
      is-seo-title
      :title="`${isAvtodom ? 'Новые модели' : 'Новые'} ${markNameEn} в кредит`"
      condition="new"
      :mark-code="markCode"
      :link-see-all="linkSeeAllOnSaleBlock({ condition: 'new', markCode, carTypes })"
    />
    <OnSaleBlock
      slider-name="on-sale-used-block"
      class="detail__section"
      is-seo-title
      :title="`${markNameEn} с пробегом в кредит`"
      condition="used"
      :mark-code="markCode"
      :link-see-all="linkSeeAllOnSaleBlock({ condition: 'used', markCode, carTypes })"
    />
    <ServicePanel />
  </div>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { getModels, getStaticPage } from '@/api/routes/brands'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const route = useRoute()
const { isAvtodom, isAsc, holdingName } = useHoldingStore()
const { params, path } = route
const pageDataBrand = await $fetchClient(getModels(params.brand))
let pageDataCredit = null

if ($hasErrorResponse(pageDataBrand)) {
  $errorResponseCatch(pageDataBrand)
}

const refs = pageDataBrand?.refs
const mark = refs?.mark[0] || ''
const markNameEn = mark?.nameEn || ''
const markCode = mark?.code || ''
const carTypes = refs?.carType.map(item => item.code) || ''

// seo

const seo = await $getSeo(path)
const defaultH1 = `${markNameEn} в кредит`
const defaultTitle = (() => {
  if (pageDataBrand) {
    if (isAsc) {
      return `${markNameEn} в кредит - Подобрать ${markNameEn} и получить кредитное предложение онлайн от ГК ${holdingName}`
    } else if (isAvtodom) {
      return `Купить ${markNameEn} в кредит - Выгодные кредитные программы на автокредитование новых и подержанных ${markNameEn} от ГК Автодом`
    }
  }
})()
const defaultDescription = (() => {
  if (pageDataBrand) {
    if (isAsc) {
      return `Кредитные предложения онлайн на новые и подержанные ${markNameEn}! Автокредит на ${markNameEn} от официального дилера ГК ${holdingName}!`
    } else if (isAvtodom) {
      return `✔ Выгодные условия кредитования но новые и подержанные ${markNameEn}! ✔ Автокредит на ${markNameEn} от официального дилера Автодом!`
    }
  }
})()
const h1 = seo?.seoH1 || defaultH1 || ''
const title = seo?.seoTitle || defaultTitle || ''
const description = seo?.seoDescription || defaultDescription || ''
const breadcrumb = seo?.seoBreadcrumb || markNameEn || ''
const directCrumbs = ['', markNameEn, breadcrumb]
const creditText = `Купить ${markNameEn} в кредит у официального дилера
            ${markNameEn} ${holdingName} вы можете воспользовавшись кредитными
            программами ${markNameEn}. Специалисты кредитного отдела
            ${markNameEn} подберут для вас выгодные условия для покупки
            автомобиля/мотоцикла в кредит и помогут отправить онлайн заявку на
            одобрение в банки партнеров. Для связи со специалистом отправьте
            заявку на покупку ${markNameEn} в кредит, использую форму заявки ниже.
            Специалист кредитного отдела ${markNameEn} свяжется с вами в ближайшее
            время и расскажет о выгодных предложениях покупки автомобилей
            ${markNameEn} в кредит.`

if (pageDataBrand.viewCredit === '0') {
  throw createError({ statusCode: 404, fatal: true })
} else if (pageDataBrand.creditStaticPagesId !== '0') {
  pageDataCredit = await $fetchClient(getStaticPage(pageDataBrand?.creditStaticPagesId))
}

// methods

const linkSeeAllOnSaleBlock = ({ condition, markCode, carTypes }) => {
  const hasFreightTransport = ['commercial', 'trucks', 'fleet'].includes(carTypes[0])
  if (hasFreightTransport) {
    return '/commercial/'
  }
  switch (carTypes[0]) {
    case 'car':
      return `/cars/${condition}/${markCode}/`
    case 'moto':
      return `/moto/${condition}/${markCode}/`
    case 'atv':
      return `/atv/${condition}/${markCode}/`
    default:
      return `/cars/${condition}/${markCode}/`
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .detail {
    grid-template-areas:
    'body'
    'footer';

    @include mq($bp-medium-big) {
      grid-template-areas:
      'body'
      'footer';
      grid-template-columns: 1fr;
    }

    &__section {
      margin-bottom: 70px;
    }

    &__content {
      @import 'assets/styles/components/Brands/html-style';
    }
  }

  :deep(.body-page) {
    min-height: initial;
  }
}
</style>
