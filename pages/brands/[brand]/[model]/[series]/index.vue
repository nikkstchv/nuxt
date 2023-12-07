<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:description" :content="description" />
    <Meta name="og:title" :content="title" />
  </Head>
  <BrandsMainCatalog v-if="pageData && seo" class="catalog">
    <template #header>
      <BrandsHeader
        class="catalog__header catalog__section"
        :title="h1"
        :logo="headerLogo"
        :direct-crumbs="directCrumbs"
        :description="description"
      />
      <BrandsMicroMarkingAggregateOffer
        v-if="pageData.catCountAll > 0"
        :cat-count-all="pageData.catCountAll"
        :schema-min-price="schemaMinPrice"
      />
    </template>
    <BrandsSeriesBlock
      v-if="seriesInfoData"
      :model-info-data="seriesInfoData"
      :car-type-code="carType.code"
      :mark-code="mark.code"
      :model-code="model.code"
      :series-code="series.code"
      :body-type-code="bodyType.code"
      :generation-code="generation.code"
      :image="pageData.previewMedia"
    />
    <ServicesBlock
      v-if="isShowServicesBlock"
      :cards="servicesCards"
      :is-show-service-card="isShowService"
      class="catalog__section"
    />
    <OnSaleBlock
      :title="`${getFullName('En')} в наличии`"
      :transport-type="carType.code"
      :mark-code="mark.code"
      :model-code="model.code"
      :generation-code="generation.code"
      :body-type-code="bodyType.code"
      :link-see-all="linkSeeAll"
    />
    <BrandsAbout
      v-if="pageData.staticPages"
      :static-page-id="pageData.staticPages"
    />
    <BrandsVideo
      v-if="videos && videos.length"
      :title="`Видео про ${getFullName('Ru')}`"
      :videos="videos"
    />
    <BrandsSeriesModificationsBlock
      :title="`Модификация ${getFullName('Ru')}`"
      :transport-type-code="carType.code"
      :mark-code="mark.code"
      :model-code="model.code"
      :generation-code="generation.code"
      :body-type-code="bodyType.code"
      :mark-id="mark.id"
      :model-id="model.id"
      :generation-id="generation.id"
      :series-id="series.id"
      class="catalog__section"
    />
    <BrandsSeriesEquipmentsBlock
      :title="`Комплектации ${getFullName('Ru')}`"
      :transport-type-code="carType.code"
      :mark-code="mark.code"
      :model-code="model.code"
      :generation-code="generation.code"
      :body-type-code="bodyType.code"
      :mark-id="mark.id"
      :model-id="model.id"
      :generation-id="generation.id"
      :series-id="series.id"
      is-seo-title
      class="catalog__section"
    />
    <DealersBlock
      class="catalog__dealers"
      is-show-button-see-all
      :mark-code="mark.code"
      :mark-name-en="mark.nameEn"
    />
    <LazyFormPanelTestDrive :mark-code="mark.code" />
    <LazyFormPanelStock />
    <LazyServicePanel />
  </BrandsMainCatalog>
  <UILoader v-else class="catalog__loader" />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { getSeries, getSeriesInfo } from '@/api/routes/brands'
import { useFormStore } from '@/store/form'
import { useHoldingStore } from '@/store/holding'
import useFetchVideo from '@/components/Brands/hooks/useFetchVideo'
import { helpers } from '@/components/Brands/mixins'
import { brands } from '@/components/Services/mixins'
import {
  getMarks as getMarksTradeIn,
  getModels as getModelsTradeIn,
  getModel as getModelTradeIn,
} from '@/components/TradeIn/asyncDataFunc'

export default defineNuxtComponent({
  name: 'PageBrandsModelSeries',
  mixins: [helpers, brands],
  async asyncData () {
    const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
    const fetchUtils = {
      $fetchClient,
      $errorResponseCatch,
      $hasErrorResponse,
    }
    const route = useRoute()
    const { params, path } = route
    const fetchSeries = async () => {
      const { brand, model, series } = params
      const resPageData = await $fetchClient(
        getSeries(brand, model, series),
      )

      if ($hasErrorResponse(resPageData)) {
        $errorResponseCatch(resPageData)
      } else {
        return resPageData
      }
      return null
    }
    const fetchSeriesInfo = async (brandsSeriesId) => {
      if (brandsSeriesId) {
        const resSeriesInfo = await $fetchClient(
          getSeriesInfo(brandsSeriesId),
        )

        if ($hasErrorResponse(resSeriesInfo)) {
          $errorResponseCatch(resSeriesInfo)
        } else {
          return resSeriesInfo
        }
      }
      return null
    }

    const seo = await $getSeo(path)
    const pageData = await fetchSeries()
    const seriesId = pageData?.brandsSeries?.id
    const seriesInfoData = await fetchSeriesInfo(seriesId)
    const optionsVideo = {
      query: {
        series_id: seriesId,
      },
    }
    const videos = await useFetchVideo({
      options: optionsVideo,
      $fetchClient,
      $hasErrorResponse,
    })
    const dataModels = { ...fetchUtils, markCode: params.brand }
    const dataModel = { ...dataModels, modelCode: params.model }
    const tradeInMarks = await getMarksTradeIn(fetchUtils)
    const resModels = await getModelsTradeIn(dataModels)
    const tradeInModel = await getModelTradeIn(dataModel)
    const tradeInModels = resModels?.model

    return {
      seo,
      pageData,
      seriesInfoData,
      videos,
      tradeInMarks,
      tradeInModels,
      tradeInModel,
    }
  },
  setup () {
    useHeadDefault()
  },
  data () {
    return {
      sectionButtons: [
        {
          label: 'Все',
          isActive:
              this.$route.query.section === 'Новые' || !this.$route.query.section,
        },
        {
          label: 'Новые',
          isActive: this.$route.query.section === 'Новые',
        },
        {
          label: 'С пробегом',
          isActive: this.$route.query.section === 'С пробегом',
        },
      ],
    }
  },
  computed: {
    h1 () {
      const defaultH1 = this.seoDefault?.h1 ?? ''
      return this.seo?.seoH1 || defaultH1
    },
    title () {
      const defaultTitle = this.seoDefault?.title ?? ''
      return this.seo?.seoTitle || defaultTitle
    },
    description () {
      const defaultDescription = this.seoDefault?.description ?? ''
      return this.seo?.seoDescription || defaultDescription
    },
    directCrumbs () {
      const defaultBreadcrumb = this.lastCrumb ?? ''
      const breadcrumb = this.seo?.seoBreadcrumb || defaultBreadcrumb

      return ['', this.mark.nameEn, this.model.nameEn, breadcrumb]
    },
    lastCrumb () {
      if (this.series && this.generation) {
        return `${this.series?.nameEn} ${this.generation?.nameEn}`
      }
      return ''
    },
    refs () {
      return this.pageData?.refs
    },
    carType () {
      return this.refs?.carType[0] ?? ''
    },
    mark () {
      return this.refs?.mark[0] ?? ''
    },
    model () {
      return this.refs?.model[0] ?? ''
    },
    generation () {
      return this.refs?.generation[0] ?? ''
    },
    series () {
      return this.refs?.series[0] ?? ''
    },
    bodyType () {
      return this.refs?.bodyType[0] ?? ''
    },
    headerLogo () {
      return this.mark?.logo ?? ''
    },
    seoDefault () {
      return this.pageData?.seo ?? ''
    },
    previewMedia () {
      return this.pageData?.previewMedia
    },
    linkSeeAll () {
      let params = '?'

      const hasCommercial = this.hasCommercial(this.carType.code)
      const carTypeCode = hasCommercial ? 'commercial' : this.carType.code

      if (this.mark && this.mark.code) {
        params += `&mark=${this.mark.code}`
      }
      if (this.model && this.model.code) {
        params += `&model=${this.model.code}`
      }
      if (this.bodyType && this.bodyType.code) {
        params += `&bodyType=${this.bodyType.code}`
      }
      if (this.generation && this.generation.code) {
        params += `&generation=${this.generation.code}`
      }

      return `/${carTypeCode}/${params}`
    },
    ...mapState(useHoldingStore, ['holdingName']),
  },
  methods: {
    hasCommercial (code) {
      return ['commercial', 'trucks'].includes(code)
    },
    onOpenFormTestDrivePanel () {
      this.onOpenFormPanel('isOpenTestDrive')
    },
    getFullName (lang) {
      if (this.mark && this.model && this.series && this.generation) {
        const mark = this.mark[`name${lang}`]
        const model = this.model[`name${lang}`]
        const generation = this.generation[`name${lang}`]
        const series = this.series[`name${lang}`]
        const text = {
          Ru: `${mark} ${series} ${model} ${generation}`,
          En: `${mark} ${model} ${generation} ${series}`,
        }

        return text[lang]
      }
      return ''
    },
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.catalog {
  &__section {
    @include indentsMainHorizontal;
  }

  &__loader {
    padding-top: 50px;
  }

  &__micro-marking {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  &__card {
    padding-top: 20px;

    &::after {
      @include mq(0, $bp-small-medium) {
        position: absolute;
        top: 0;
        height: 1px;
        content: '';
        border-top: 1px solid var(--grayMediumLight);
      }
    }

    &::before {
      @include mq(0, $bp-small-medium) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        content: '';
        border-bottom: 1px solid var(--grayMediumLight);
      }
    }

    @media (max-width: $bp-small-medium) {
      padding-bottom: 25px;

      &:nth-child(odd) {
        padding-right: 14px;
        border-right: 1px solid var(--grayMediumLight);
      }

      &:nth-child(even) {
        padding-left: 14px;
        border-right: 1px solid transparent;
      }
    }
  }

  &__list {
    $bp-big-small: 1600px;

    width: auto !important;
    border-top: none;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      row-gap: 20px;
      column-gap: 59px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      row-gap: 30px;
      column-gap: 42px;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      column-gap: 87px;
    }

    @include mq($bp-medium-big) {
      row-gap: 40px;
      column-gap: 68px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    @include mq($bp-big-small) {
      column-gap: 94px;
    }
  }
}
</style>
