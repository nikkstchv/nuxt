<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:description" :content="description" />
    <Meta name="og:title" :content="title" />
  </Head>
  <BrandsMainCatalog v-if="pageData" class="catalog">
    <template v-if="showedGenerations" #header>
      <BrandsHeader
        all-button
        class="catalog__header catalog__section"
        :title="h1"
        :logo="headerLogo"
        :direct-crumbs="directCrumbs"
        :description="description"
      />
      <div class="catalog__buttons-container catalog__section">
        <UIBaseSelectButtons
          ref="sectionButtons"
          class="catalog__header-buttons"
          :buttons="getSectionButtons()"
          @onChangeButtons="onChangeSectionButtons"
        />
        <div v-if="isShowCredit" class="catalog__services-buttons">
          <UIBaseButton
            :to="$route.path + 'credit/'"
            class="catalog__services-button"
            underline
            text="Кредит"
          />
        </div>
      </div>
      <BrandsMicroMarkingAggregateOffer
        v-if="pageData.catCountAll > 0"
        :cat-count-all="pageData.catCountAll"
        :schema-min-price="schemaMinPrice"
      />
    </template>
    <template v-if="showedGenerations">
      <BrandsModelBlock
        v-if="pageData.childList.length"
        :generations="showedGenerations"
      />
      <ServicesBlock
        v-if="isShowServicesBlock"
        :cards="servicesCards"
        :is-show-service-card="isShowService"
        class="catalog__section"
      />
      <OnSaleBlock
        :title="`${mark.nameEn} ${pageData.nameEn} в наличии`"
        :transport-type="carTypes"
        :mark-code="mark.code"
        :model-code="model.code"
        :link-see-new="getLinkSee('new')"
        :link-see-used="getLinkSee('used')"
      />
      <FeedbackBlock form-id="form_equip_question" />
      <BrandsAbout
        v-if="pageData.staticPages"
        :static-page-id="pageData.staticPages"
      />
      <BrandsVideo
        v-if="videos && videos.length"
        :title="`Видео про ${mark.nameEn} ${pageData.nameEn}`"
        :videos="videos"
      />
      <PressBlock
        :title="`Акции и Новости ${mark.nameRu} ${model.nameRu}`"
        :mark-id="mark.id"
        :mark-code="pageData.brandsMark.code"
      />
      <DealersBlock
        class="catalog__dealers"
        :mark-code="mark.code"
        :mark-name-en="mark.nameEn"
        is-show-button-see-all
      />
      <LazyBrandsModelOtherModelsBlock
        class="catalog__section"
        :title="`Другие модели ${mark.nameRu}`"
        :model-id="pageData.brandsModel.id"
        :mark-id="mark.id"
      />
    </template>

    <LazyFormPanelFeedbackService />
    <LazyServicePanel />
    <LazyFormPanelTestDrive :mark-code="mark.code" />
  </BrandsMainCatalog>
  <UILoader v-else class="catalog__loader" />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import {
  getMarks as getMarksTradeIn,
  getModels as getModelsTradeIn,
  getModel as getModelTradeIn,
} from '@/components/TradeIn/asyncDataFunc'
import { useCityStore } from '@/store/city'
import { useFormStore } from '@/store/form'
import useFetchVideo from '@/components/Brands/hooks/useFetchVideo'
import { useHoldingStore } from '@/store/holding'
import { getGenerations, getVideo } from '@/api/routes/brands'
import { helpers } from '@/components/Brands/mixins'
import { brands } from '@/components/Services/mixins'

export default defineNuxtComponent({
  name: 'PageBrandsModel',
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
    const pageData = await $fetchClient(
      getGenerations(params.brand, params.model),
    )

    if ($hasErrorResponse(pageData)) {
      $errorResponseCatch(pageData)
    }

    const seo = await $getSeo(path)
    const optionsVideo = {
      query: { modelId: pageData?.brandsModel?.id },
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
      otherModels: null,
      activeSectionLabel: this.$route.query.section,
      sectionButtons: [
        {
          label: 'Все',
          isActive:
              this.$route.query.section ===
              (this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые') ||
              !this.$route.query.section,
        },
        {
          label: this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые',
          isActive:
              this.$route.query.section ===
              (this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые'),
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
      const defaultBreadcrumb = this.pageData?.nameEn ?? ''
      const breadcrumb = this.seo?.seoBreadcrumb || defaultBreadcrumb

      return ['', this.mark?.nameEn, breadcrumb]
    },
    formattedGenerations () {
      return (
        this.pageData?.childList.reduce((sum, series) => {
          const generation = this.pageData.refs.generation.find(
            generation => generation.id === series.generationId,
          )
          if (!sum[generation.nameRu]) {
            sum[generation.nameRu] = {
              ...generation,
              series: [],
            }
          }

          const isActiveSeries = sum[generation.nameRu].series?.length === 0

          const seriesInfo = {
            label: series.nameRu,
            isActive: isActiveSeries,
            ...series,
          }

          sum[generation.nameRu].series.push(seriesInfo)

          return sum
        }, {}) ?? null
      )
    },
    showedGenerations () {
      if (this.formattedGenerations) {
        const allGenerations = Object.values(this.formattedGenerations)
        const newGenerations = this.getFilteredGenerations(
          allGenerations,
          'New',
        )
        const usedGenerations = this.getFilteredGenerations(
          allGenerations,
          'Used',
        )

        switch (this.activeSectionLabel) {
          case 'Все':
            return allGenerations
          case this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые':
            return newGenerations
          case 'С пробегом':
            return usedGenerations
          default:
            return allGenerations
        }
      }
      return null
    },
    refs () {
      return this.pageData?.refs
    },
    carTypes () {
      return this.refs?.carType?.map(carType => carType.code)
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
    headerLogo () {
      return this.mark?.logo ?? ''
    },
    seoDefault () {
      return this.pageData?.seo ?? ''
    },
    firstImageBrands () {
      return this.pageData?.childList?.[0]?.previewMedia
    },
    ...mapState(useCityStore, ['declensionCity']),
    ...mapState(useHoldingStore, ['holdingName']),
  },
  methods: {
    async fetchVideos () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const body = { modelId: this.model.id }
      const res = await $fetchClient(getVideo(body))
      if (!$hasErrorResponse(res)) {
        this.videos = res.video
      }
    },
    hasFleetOrTruck (code) {
      return ['fleet', 'trucks'].includes(code)
    },
    getLinkSee (condition) {
      const carTypeCode = this.carType?.code
      const isCommercial = carTypeCode === 'commercial'
      const isFleetOrTruck = this.hasFleetOrTruck(carTypeCode)
      const isAllCommercials = isCommercial || isFleetOrTruck
      const carTypeCodeString = isAllCommercials ? 'commercial' : carTypeCode
      const secondParam = isAllCommercials ? carTypeCode : condition
      const mark = this.mark?.code || ''
      const model = this.model?.code || ''
      const markAndModelParams = `${mark}/${model}/`
      const query = `?mark=${mark}&model=${model}`
      const secondParamString = !isCommercial ? secondParam + '/' : ''
      const restString = isAllCommercials ? query : markAndModelParams

      return `/${carTypeCodeString}/${secondParamString}${restString}`
    },
    getFilteredGenerations (allGenerations, conditionName) {
      const condition = `catCount${conditionName}`
      return useCloneDeep(allGenerations).filter((generation) => {
        const hasSeries = this.hasSeries(conditionName)
        if (hasSeries) {
          generation.series = generation.series.filter(
            series => series[condition] !== '0',
          )
        }

        return generation?.series?.length > 0
      })
    },
    hasSeries (conditionName) {
      const condition = `catCount${conditionName}`
      return this.pageData?.childList?.some(
        series => series[condition] !== '0',
      )
    },
    getSectionButtons () {
      const hasUsed = this.hasSeries('Used')
      const hasNew = this.hasSeries('New')
      return [
        {
          label: 'Все',
          isActive:
              this.$route.query.section === 'Все' || !this.$route.query.section,
        },
        hasNew && {
          label: this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые',
          isActive:
              this.$route.query.section ===
              (this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые'),
        },
        hasUsed && {
          label: 'С пробегом',
          isActive: this.$route.query.section === 'С пробегом',
        },
      ].filter(Boolean)
    },
    setQuery () {
      const restQuery = this.$route.query ?? {}

      this.$router.push({
        query: {
          ...restQuery,
          section: `${this.activeSectionLabel}`,
        },
      })
    },
    onChangeSectionButtons () {
      const activeButton = this.$refs.sectionButtons.getActiveButton()
      this.activeSectionLabel = activeButton.label
      this.setQuery()
    },
    onOpenFormTestDrivePanel () {
      this.onOpenFormPanel('isOpenTestDrive')
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
  &__buttons-container {
    @include indentsMainHorizontal;

    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    @media screen and (width <= 369px) {
      grid-gap: 10px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      margin-bottom: 50px;
    }
  }

  .catalog &__select-buttons {
    width: fit-content;
  }

  &__loader {
    padding-top: 50px;
  }

  &__header-buttons {
    @media screen and (width <= 369px) {
      grid-gap: 8px;
    }

    & :deep(.select-button) {
      @media screen and (width <= 369px) {
        padding: 9.5px 15px;
      }
    }
  }

  &__services-buttons {
    display: flex;
    grid-gap: 30px;
  }

  &__services-button {
    @include text_medium_small;

    @media screen and (width <= 369px) {
      font-size: 12px;
    }
  }

  &__section {
    @include indentsMainHorizontal;
  }

  &__micro-marking {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
