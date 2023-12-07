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
      :title="`${isAvtodom ? 'Новые модели' : 'Новые'} ${markNameEn} ${modelNameEn} в кредит`"
      condition="new"
      :mark-code="markCode"
      :model-code="modelCode"
      :link-see-all="linkSeeAllOnSaleBlock({ condition: 'new', markCode, modelCode, carTypes })"
    />
    <OnSaleBlock
      slider-name="on-sale-used-block"
      class="detail__section"
      is-seo-title
      :title="`${markNameEn} ${modelNameEn} с пробегом в кредит`"
      condition="used"
      :mark-code="markCode"
      :model-code="modelCode"
      :link-see-all="linkSeeAllOnSaleBlock({ condition: 'used', markCode, modelCode, carTypes })"
    />
    <LazyServicePanel />
  </div>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { getGenerations, getStaticPage } from '@/api/routes/brands'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const route = useRoute()
const { isAvtodom, isAsc, holdingName } = useHoldingStore()
const { params, path } = route
const pageDataModel = await $fetchClient(getGenerations(params.brand, params.model))
const refs = pageDataModel?.refs
const mark = refs?.mark[0] || ''
const model = refs?.model[0] || ''
const markNameEn = mark?.nameEn || ''
const modelNameEn = model?.nameEn || ''
const markCode = mark?.code || ''
const modelCode = model?.code || ''
const carTypes = refs?.carType.map(item => item.code) || ''
let pageDataCredit = null

// seo
const seo = await $getSeo(path)

const getTitle = () => {
  if (pageDataModel) {
    if (isAsc) {
      return `${markNameEn} ${modelNameEn} в кредит - Подобрать ${markNameEn} ${modelNameEn} и получить кредитное предложение онлайн от ГК ${holdingName}`
    } else if (isAvtodom) {
      return `Купить ${markNameEn} ${modelNameEn} в кредит - Выгодные кредитные программы на автокредитование новых и подержанных ${markNameEn} ${modelNameEn} от ГК Автодом`
    }
  }
  return ''
}
const getDescription = () => {
  if (pageDataModel) {
    if (isAsc) {
      return `Кредитные предложения онлайн на новые и подержанные ${markNameEn} ${modelNameEn}! Автокредит на ${markNameEn} ${modelNameEn} от официального дилера ГК ${holdingName}!`
    } else if (isAvtodom) {
      return `✔ Выгодные условия кредитования но новые и подержанные ${markNameEn} ${modelNameEn}! ✔ Автокредит на ${markNameEn} ${modelNameEn} от официального дилера Автодом!`
    }
  }
  return ''
}
const defaultH1 = `${markNameEn} ${modelNameEn} в кредит`
const defaultTitle = getTitle()
const defaultDescription = getDescription()
const defaultBreadcrumb = 'Кредит'
const h1 = seo?.seoH1 || defaultH1 || ''
const title = seo?.seoTitle || defaultTitle || ''
const description = seo?.seoDescription || defaultDescription || ''
const breadcrumb = seo?.seoBreadcrumb || defaultBreadcrumb
const directCrumbs = ['', markNameEn, modelNameEn, breadcrumb]
const creditText = `Купить ${markNameEn} ${modelNameEn} в кредит у официального дилера ${markNameEn} ${holdingName} вы можете воспользовавшись кредитными программами ${markNameEn}. Специалисты кредитного отдела ${markNameEn} подберут для вас выгодные условия для покупки автомобиля/мотоцикла в кредит и помогут отправить онлайн заявку на одобрение в банки партнеров. Для связи со специалистом отправьте заявку на покупку ${markNameEn} в кредит, использую форму заявки ниже. Специалист кредитного отдела ${markNameEn} свяжется с вами в ближайшее время и расскажет о выгодных предложениях покупки автомобиля ${markNameEn} ${modelNameEn} в кредит.`

if ($hasErrorResponse(pageDataModel)) {
  $errorResponseCatch(pageDataModel)
}

if (pageDataModel.viewCredit === '0') {
  throw createError({ statusCode: 404, fatal: true })
} else if (pageDataModel.creditStaticPagesId !== '0') {
  pageDataCredit = await $fetchClient(getStaticPage(pageDataModel?.creditStaticPagesId))
}

// methods

const linkSeeAllOnSaleBlock = ({ condition, markCode, modelCode, carTypes }) => {
  const hasFreightTransport = ['commercial', 'trucks', 'fleet'].includes(carTypes[0])
  if (hasFreightTransport) {
    return '/commercial/'
  }
  switch (carTypes[0]) {
    case 'car':
      return `/cars/${condition}/${markCode}/${modelCode}/`
    case 'moto':
      return `/moto/${condition}/${markCode}/${modelCode}/`
    case 'atv':
      return `/atv/${condition}/${markCode}/${modelCode}/`
    default:
      return `/cars/${condition}/${markCode}/${modelCode}/`
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
