<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:description" :content="description" />
    <Meta name="og:title" :content="title" />
  </Head>
  <BrandsMainCatalog v-if="pageData" class="catalog">
    <template #header>
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
        <div
          v-if="isShowCredit || isShowGuaranty"
          class="catalog__services-buttons"
        >
          <UIBaseButton
            v-if="isShowCredit"
            :to="$route.path + 'credit/'"
            class="catalog__services-button"
            underline
            text="Кредит"
          />
          <UIBaseButton
            v-if="isShowGuaranty"
            :to="$route.path + 'guaranty/'"
            class="catalog__services-button"
            underline
            text="Гарантия"
          />
        </div>
      </div>
      <BrandsMicroMarkingAggregateOffer
        v-if="pageData.catCountAll > 0"
        :cat-count-all="pageData.catCountAll"
        :schema-min-price="schemaMinPrice"
      />
    </template>
    <template #list>
      <BrandsCard
        v-for="card in showedModels"
        :id="card.id"
        :key="card.id"
        :image="card.previewMedia"
        :title="card.nameEn"
        :qty="getQty(card)"
        :price-new="toPrice(card.catMinDispirceNew)"
        :price-used="toPrice(card.catMinDispriceUsed)"
        :url="`${$route.path}${card.code}/`"
        :link-new="linkToCatalog('new', card.modelId)"
        :link-used="linkToCatalog('used', card.modelId)"
        :type="activeSectionLabel"
        class="catalog__card"
      />
    </template>
    <LazyServicesBlock
      v-if="isShowServicesBlock"
      :cards="servicesCards"
      :is-show-service-card="isShowService"
      class="catalog__section"
    />
    <LazyFeedbackBlock form-id="form_equip_question" />
    <LazyBrandsParametersBlock
      :title="parametersBlockTitle"
      :mark-id="mark.id"
      :mark-code="mark.code"
      :mark-name-en="mark.nameEn"
      :mark-name-ru="mark.nameRu"
      :car-types="carTypes"
      :car-type-code="carType.code"
      class="catalog__section"
    />
    <BrandsAbout
      v-if="pageData.staticPages"
      :static-page-id="pageData.staticPages"
    />
    <BrandsVideo
      v-if="videos && videos.length"
      :title="`Видео про ${mark.nameRu}`"
      :videos="videos"
    />
    <PressBlock
      :title="`Акции и Новости ${pageData.nameRu}`"
      :mark-id="pageData.brandsMark.id"
      :mark-code="pageData.brandsMark.code"
    />
    <DealersBlock
      class="catalog__dealers"
      is-show-button-see-all
      :title="dealerBlockTitle"
      :mark-code="pageData.brandsMark.code"
      :mark-name-en="pageData.brandsMark.nameEn"
    />
    <LazyServicePanel />
    <LazyFormPanelFeedbackService />
    <LazyFormPanelTestDrive v-if="pageData" :mark-code="pageData.brandsMark.code" />
  </BrandsMainCatalog>
  <UILoader v-else />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'
import { useFormStore } from '../../../store/form'
import useFetchVideo from '../../../components/Brands/hooks/useFetchVideo'
import { getModels } from '@/api/routes/brands'
import { helpers } from '@/components/Brands/mixins'
import { brands } from '@/components/Services/mixins'
import {
  getMarks as getMarksTradeIn,
} from '@/components/TradeIn/asyncDataFunc'

export default defineNuxtComponent({
  name: 'PageBrands',
  mixins: [helpers, brands],
  async asyncData () {
    const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
    const fetchUtils = {
      $fetchClient,
      $errorResponseCatch,
      $hasErrorResponse,
    }
    const route = useRoute()
    const { params } = route
    let activeSectionLabel = route.query.section
    try {
      const seo = await $getSeo(route.path)
      const res = await $fetchClient(getModels(params.brand))

      if ($hasErrorResponse(res)) {
        $errorResponseCatch(res)
      } else {
        const pageData = res

        if (
          pageData?.catCountAll === '0' &&
            pageData?.catCountNew === '0' &&
            pageData?.catCountUsed === '0'
        ) {
          activeSectionLabel = 'Все'
        }

        const optionsVideo = {
          query: {
            markId: pageData?.brandsMark?.id,
          },
        }
        const videos = await useFetchVideo({
          options: optionsVideo,
          $fetchClient,
          $hasErrorResponse,
        })
        const tradeInMarks = await getMarksTradeIn(fetchUtils)

        return {
          seo,
          pageData,
          activeSectionLabel,
          videos,
          tradeInMarks,
        }
      }
    } catch (error) {
      console.error(error)
    }
  },
  setup () {
    useHeadDefault()
  },
  data () {
    return {
      activeSectionLabel: 'В продаже',
      sectionButtons: [
        {
          label: 'В продаже',
          isActive:
              this.$route.query.section === 'В продаже' ||
              !this.$route.query.section,
        },
        {
          label: this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые',
          isActive: this.$route.query.section === 'Новые',
        },
        {
          label: 'С пробегом',
          isActive: this.$route.query.section === 'С пробегом',
        },
        {
          label: 'Все',
          isActive: this.$route.query.section === 'Все',
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
      const defaultBreadcrumb = this.mark?.nameEn ?? ''
      const breadcrumb = this.seo?.seoBreadcrumb || defaultBreadcrumb

      return ['', breadcrumb]
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
    headerLogo () {
      return this.pageData?.refs?.mark[0]?.logo ?? ''
    },
    parametersBlockTitle () {
      return `Выбор ${this.mark?.nameRu ?? ''} по параметрам`
    },
    dealerBlockTitle () {
      return `Дилерские центры ${this.mark.nameEn}`
    },
    seoDefault () {
      return this.pageData?.seo ?? ''
    },
    showedModels () {
      const childList = this.pageData?.childList
      const catCount = childList.filter(model => model.catCountAll > 0)
      const catNew = childList.filter(
        model => model.catMinDispirceNew !== '0',
      )
      const catUsed = childList.filter(
        model => model.catMinDispriceUsed !== '0',
      )
      if (!childList) { return [] }

      // Если нет в наличии показываем весь список
      if (!catCount.length) { return childList }

      // Фильтруем список
      switch (this.activeSectionLabel) {
        case 'В продаже':
          return catCount
        case this.isAvtodom ? 'Новые модели' : 'Новые':
          return catNew
        case 'С пробегом':
          return catUsed
        default:
          return childList
      }
    },
    ...mapState(useHoldingStore, ['holdingName', 'isAvtodom', 'fullDomainWithProtocol']),
  },

  mounted () {
    this.setActiveSectionLabel()
  },
  methods: {
    getModel (id) {
      return this.refs?.model?.find(model => model.id === id)
    },
    getCarTypeModel (id) {
      return this.refs?.carType.find(carType => carType.id === id)
    },
    hasCommercial (code) {
      return ['commercial', 'trucks'].includes(code)
    },
    linkToCatalog (condition, modelId) {
      const model = this.getModel(modelId)
      const carTypeModel = this.getCarTypeModel(model.idCarType)
      const carTypeModelCode = carTypeModel?.code
      const commercialCondition = condition ? `condition=${condition}&` : ''
      const hasCommercial = this.hasCommercial(carTypeModelCode)
      const carTypeCode = hasCommercial ? 'commercial' : carTypeModelCode
      const markCode = this.mark.code
      const modelCode = model?.code
      const urlWithCondition = `/${carTypeCode}/${condition}/${markCode}/${modelCode}/`
      const urlWithoutCondition = `/${carTypeCode}/?${commercialCondition}mark=${markCode}&model=${modelCode}`
      const urlCommercialWithoutCondition = `/${carTypeCode}/${carTypeModelCode}/?${commercialCondition}mark=${markCode}&model=${modelCode}`
      const urlJetSki = `/${carTypeCode}/${condition}/?mark=${markCode}&model=${modelCode}`

      if (hasCommercial) {
        return urlCommercialWithoutCondition
      } else if (carTypeCode === 'jet-ski') {
        return urlJetSki
      }

      switch (condition) {
        case 'new':
          return urlWithCondition
        case 'used':
          return urlWithCondition
        default:
          return urlWithoutCondition
      }
    },
    getQty (cardData) {
      switch (this.activeSectionLabel) {
        case 'Все':
          return cardData.catCountAll
        case this.isAvtodom ? 'Новые модели' : 'Новые':
          return cardData.catCountNew
        case 'С пробегом':
          return cardData.catCountUsed
        default:
          return cardData.catCountAll
      }
    },
    getSectionButtons () {
      return [
        this.pageData.catCountAll !== '0' && {
          label: 'В продаже',
          isActive:
              this.$route.query.section === 'В продаже' ||
              !this.$route.query.section,
        },
        this.pageData.catCountNew !== '0' && {
          label: this.isAvtodom ? 'Новые модели' : 'Новые',
          isActive:
              this.$route.query.section ===
              (this.isAvtodom ? 'Новые модели' : 'Новые'),
        },
        this.pageData.catCountUsed !== '0' && {
          label: 'С пробегом',
          isActive: this.$route.query.section === 'С пробегом',
        },
        (this.pageData.catCountAll !== '0' ||
            this.pageData.catCountNew !== '0' ||
            this.pageData.catCountUsed !== '0') && {
          label: 'Все',
          isActive: this.$route.query.section === 'Все',
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
    setActiveSectionLabel () {
      this.activeSectionLabel = this.$route.query.section
        ? this.$route.query.section
        : 'В продаже'
    },
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

    @include mq($bp-small-medium) {
      margin-bottom: 0;
    }
  }

  .catalog &__select-buttons {
    width: fit-content;
  }

  &__services-buttons {
    display: flex;
    grid-gap: 30px;
  }

  &__services-button {
    @include text_medium_small;
  }

  &__section {
    @include indentsMainHorizontal;
  }

  &__card {
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

  & :deep(.catalog__list) {
    $bp-big-small: 1600px;

    width: auto !important;
    margin-right: 15px;
    margin-left: 15px;
    border-top: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      row-gap: 20px;
      column-gap: 59px;
      padding-top: 20px;
      margin-right: 20px;
      margin-left: 20px;
      border-top: none;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      row-gap: 30px;
      column-gap: 42px;
      padding-top: 30px;
      margin-right: 32px;
      margin-left: 32px;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      column-gap: 87px;
      padding-top: 40px;
      margin-right: 50px;
      margin-left: 50px;
    }

    @include mq($bp-medium-big) {
      row-gap: 40px;
      column-gap: 68px;
      margin-right: 81px;
      margin-left: 81px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding-top: 30px;
      margin-right: 146px;
      margin-left: 146px;
    }

    @include mq($bp-big-small) {
      column-gap: 94px;
    }
  }
}
</style>
