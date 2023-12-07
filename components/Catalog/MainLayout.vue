<template>
  <main class="catalog" itemscope itemtype="http://schema.org/Product">
    <FilterHeader
      class="catalog__header"
      :loading="loading"
      :content-range="contentRange"
      :fast-filter="fastFilter"
      :direct-crumbs="directCrumbs"
      :sort="sort"
      :on-set-sort="onSetSort"
      :title="title"
      :is-exclusive="isExclusive"
      :is-sellout="isSellout"
      :static-page-info-sale="staticPageInfoSale"
    />
    <div v-if="hasCards" class="catalog__list">
      <div
        v-for="(item, i) in cardsWithTradeIn"
        :key="item.id ?? i"
        class="catalog__item"
      >
        <CatalogTradeInCard
          v-if="item.isTradeInComponent && !loading"
          :is-trade-in-component="item.isTradeInComponent"
        />

        <CatalogCard
          v-else
          :id="item.id ?? i.toString()"
          :images="item.images ?? []"
          :mark="item.mark ?? ''"
          :model="item.model ?? ''"
          :generation="item.generation ?? ''"
          :modification="item.modification ?? ''"
          :color="item.color"
          :is-active="item.isActive"
          :is-new="item.isNew === 'Новый'"
          :equipment="item.equipment ?? ''"
          :status-for-web="item.statusForWeb"
          :labels="item.labels ?? []"
          :description="
            !useIsEmpty(item)
              ? [
                isAvtodom && item.isNew === 'Новый' ? '' : item.isNew,
                item.manufactureYear,
                item.isNew !== 'Новый' ? formatTotalTrip(item.totalTrip) : '',
              ]
              : []
          "
          :count-options="item.isNew === 'Новый' ? item.countOptions : '0'"
          :credit="item.credit"
          :price="item.disprice ?? ''"
          :default-price="item.price ?? ''"
          :type-of-transport="item.typeOfTransport"
          :holding-id="item.holdingId"
          :has-panorama="item.hasPanorama"
          :has-video-panorama="item.hasVideoPanorama"
          :all-data="item"
        />
      </div>
    </div>
    <client-only>
      <CatalogBlockOtherCity
        v-if="isLastPage && !noCity && isAvtodom"
        class="catalog__block"
        :title="`${slicedTitle} в другом городе`"
        :link-see-all="linkSeeAllOtherCityBlock"
        :cities="otherCityCodes"
        :fetch-data="getInitFilterDataOnFetch(getInitFilterData(formatFilterData($route.query)))"
      />
    </client-only>
    <div
      v-show="!loading && hasCards"
      class="catalog__micro-marking"
      itemtype="http://schema.org/AggregateOffer"
      itemscope
      itemprop="offers"
    >
      <meta :content="total" itemprop="offerCount">
      <meta :content="lowPrice" itemprop="lowPrice">
      <meta content="RUB" itemprop="priceCurrency">
      <link itemprop="availability" href="http://schema.org/InStock">
    </div>
    <PaginationMain
      v-if="!loading"
      class="catalog__pagination"
      :class="{ catalog__pagination_hide: !isInitFilter }"
      :current-page="currentPage"
      :page-count="pageCount"
      @nextPage="pageChangeHandle('next')"
      @middlePage="pageChangeHandle"
      @previousPage="pageChangeHandle('previous')"
      @loadPage="pageChangeHandle"
    />
    <section
      v-if="!hasCards && !loading && isInitCatalog"
      class="catalog__not-found"
    >
      <div class="catalog__title-container">
        <p class="catalog__title">
          Транспортные средства {{ isAvtodom ? 'в выбранном городе ' : '' }}не найдены
        </p>
        <p class="catalog__subtitle">
          Измените настройки поиска и попробуйте снова
        </p>
      </div>
      <CatalogBlockOtherCity
        v-if="isAvtodom && !hasCards"
        class="catalog__block"
        is-check-fatal-error
        :title="`${title} в другом городе`"
        :link-see-all="linkSeeAllOtherCityBlock"
        :cities="otherCityCodes"
        :fetch-data="getInitFilterDataOnFetch(getInitFilterData(formatFilterData($route.query)))"
      />
      <CatalogBlockUsed
        v-else
        class="catalog__block"
        :title="`${getTypeOfTransport.name} c пробегом`"
        :link-see-all="`/${getTypeOfTransport.code}/used/`"
        :transport-type-code="getTypeOfTransport.code"
      />
    </section>
    <client-only>
      <LazyFormPanelTradeIn form-id="form_tradeIn" />
      <LazyFormPanelCredit form-id="form_credit" />
      <LazyFormPanelInsurance />
      <FilterPanel :is-loading="loading" :is-electro="isElectro" :electro-engine-types="electroEngineTypes" />
    </client-only>
    <CatalogBlockServicesLinks
      v-if="mark || model"
      :title="servicesLinks.title"
      :links="servicesLinks.links"
    />
    <section v-if="catalogBlock || carsUsedLinks" class="catalog__all-links">
      <client-only>
        <CatalogBlockOtherLinks
          v-if="catalogBlock"
          class="catalog__all-links-item catalog__all-links-item_other-links"
          :list="catalogBlock.list"
          :title="catalogBlock.title"
        />
      </client-only>
      <div
        v-if="catalogBlock && carsUsedLinks"
        class="catalog__all-links-line"
      />
      <client-only>
        <CatalogBlockLinks
          v-if="carsUsedLinks"
          class="catalog__all-links-item catalog__all-links-item_links"
          :links="carsUsedLinks.links"
          :title="carsUsedLinks.title"
        />
      </client-only>
    </section>
    <section
      v-if="staticPageInfo"
      class="catalog__html"
      v-html="staticPageInfo"
    />
    <UILoader v-if="loading" />
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '@/store/holding'
import { useFilterStore } from '@/store/filter'
import { useBrandsStore } from '@/store/brands'
import { useFormStore } from '@/store/form'
import { useCityStore } from '@/store/city'
import {
  getStaticPage as getStaticPagePath,
  getModels as getModelsPath,
} from '@/api/routes/brands'
import { getCards, getFilters } from '@/api/routes/catalog'
import { getDealers as getDealersPath } from '@/api/routes/dealer'
import serviceRoutes from '@/api/routes/service'
import { sort } from '@/components/Catalog/mixins'
import 'vue-skeletor/dist/vue-skeletor.css'

export default defineNuxtComponent({
  mixins: [sort],
  props: {
    typeOfTransport: {
      type: Array,
      required: false,
      default: () => [],
    },
    initCards: {
      type: Array,
      required: false,
      default: () => [],
    },
    initTotal: {
      type: String,
      required: false,
      default: '',
    },
    initSeo: {
      type: Object,
      required: false,
      default: () => {},
    },
    condition: {
      type: String,
      required: false,
      default: '',
    },
    mark: {
      type: String,
      required: false,
      default: '',
    },
    model: {
      type: String,
      required: false,
      default: '',
    },
    markName: {
      type: String,
      required: false,
      default: '',
    },
    modelName: {
      type: String,
      required: false,
      default: '',
    },
    paramFilterName: {
      type: String,
      required: false,
      default: '',
    },
    isVat: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExclusive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSellout: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSale: {
      type: Boolean,
      required: false,
      default: false,
    },
    driveTypes: {
      type: Object,
      default: () => {},
    },
    engineTypes: {
      type: Array,
      default: () => [],
    },
    bodyType: {
      type: Array,
      default: () => [],
    },
    bodyTypeNameRu: {
      type: String,
      required: false,
      default: '',
    },
    engineType: {
      type: Array,
      default: () => [],
    },
    disprice: {
      type: Array,
      default: () => [],
    },
    engineVolume: {
      type: Array,
      default: () => [],
    },
    year: {
      type: Array,
      default: () => [],
    },
    extColorGroup: {
      type: String,
      required: false,
      default: '',
    },
  },
  async setup () {
    const { $fetchClient, $hasErrorResponse } = useNuxtApp()
    const { path } = useRoute()
    const { domain } = useHoldingStore()
    const staticPagesIds = {
      asc: {
        '/cars/new/exeed/': 12312,
        '/cars/new/exeed/vx/': 12314,
        '/cars/new/exeed/txl/': 12315,
        '/cars/new/exeed/lx/': 12316,
        '/cars/used/exeed/': 12317,
        '/cars/used/exeed/vx/': 12318,
        '/cars/used/exeed/txl/': 12319,
        '/cars/used/exeed/lx/': 12320,
        '/cars/used/haval/': 12402,
        '/cars/used/haval/f7/': 12403,
        '/cars/used/haval/f7x/': 12404,
        '/cars/used/haval/jolion/': 12405,
        '/cars/new/haval/': 12406,
        '/cars/new/haval/dargo/': 12407,
        '/cars/new/haval/f7/': 12408,
        '/cars/new/haval/f7x/': 12409,
        '/cars/new/haval/h9/': 12410,
        '/cars/new/haval/jolion/': 12411,
        '/cars/new/chery/tiggo-8-pro-e-plus/': 12470,
        '/cars/new/chery/tiggo-8-pro-max/': 12471,
        '/cars/new/chery/tiggo-8-pro/': 12472,
        '/cars/new/kaiyi/e5/': 12474,
        '/cars/new/kaiyi/': 12473,
        '/cars/new/omoda/s5/': 12508,
        '/cars/new/omoda/c5/': 12507,
        '/cars/new/omoda/': 12506,
        '/cars/new/tank/500/': 13759,
        '/cars/new/tank/300/': 13758,
        '/cars/new/tank/': 13757,
        '/cars/new/chery/': 13763,
        '/cars/new/chery/tiggo-4-pro/': 13764,
        '/cars/new/chery/tiggo-7-pro/': 13765,
        '/cars/new/chery/tiggo-7-pro-max/': 13766,
        '/cars/used/chery/': 13767,
        '/cars/used/chery/tiggo-2/': 13768,
        '/cars/used/chery/tiggo-3/': 13769,
        '/cars/used/chery/tiggo-4/': 13770,
        '/cars/used/chery/tiggo-8-pro-max/': 13771,
      },
      avtodom: {
        '/cars/new/porsche/': 12380,
        '/cars/new/mercedes-benz/': 12381,
        '/cars/new/land-rover/': 12382,
        '/cars/new/bmw/': 12383,
        '/cars/new/audi/': 12384,
      },
    }

    const saleIds = {
      avtodom: '13807',
      asc: '13808',
    }

    const getStaticPage = async (staticPageId) => {
      if (staticPageId) {
        const res = await $fetchClient(getStaticPagePath(staticPageId))
        if (!$hasErrorResponse(res)) {
          return res.description
        }
      }

      return ''
    }

    const isSale = path.includes('/sale/')
    const staticPageIdSale = isSale && saleIds[domain]
    const staticPageId = staticPagesIds[domain][path] ?? ''
    const staticPageInfo = await getStaticPage(staticPageId)
    const staticPageInfoSale = await getStaticPage(staticPageIdSale)

    return {
      staticPageInfo,
      staticPageInfoSale,
    }
  },
  data () {
    return {
      cards: new Array(10).fill({}),
      currentPage: parseInt(useRoute().query.page) || 1,
      pageCount: 0,
      contentRange: 0,
      itemsPerPage: 16,
      pageLoad: 0,
      dataFetch: null,
      fastFilter: '',
      hasMarkDealers: null,
      hasModelBrands: null,
      intervalCompareResponseData: null,
      sort: null,
      hasBrandServices: null,
      loading: true,
      isInitCatalog: false,
      total: 0,
      staticPageInfo: '',
      title: '',
      directCrumbs: [],
      electroEngineTypes: ['electric', 'hybrid'],
      advantages: {
        avtodom: {
          title: 'Преимущества АВТОДОМ',
          cards: [
            {
              iconComponent: 'IconCarBoard',
              title: 'Непрерывное развитие',
              description:
                'Компания постоянно развивается, строит новые дилерские центры и пересматривает инфраструктуру существующих. Компания «АВТОДОМ» одна из первых в России предложила клиентам услуги по Выкупу автомобиля и принятия а/м в зачет стоимости нового.',
            },
            {
              iconComponent: 'IconCarGarage',
              title: 'Удобное расположение',
              description:
                'Дилерские центры в Москве, Санкт-Петербурге и Краснодаре расположены в местах, до которых Вы можете быстро и удобно добраться.',
            },
            {
              iconComponent: 'IconBriefcase',
              title: 'Ассортимент',
              description:
                'На сегодняшний день в портфеле компании тринадцать брендов: BMW, BMW Motorrad, MINI, Lamborghini, Mercedes Benz, smart, Porsche, Audi, Aurus, Volvo, Land Rover, Jaguar, Ducati и KTM. Также есть подержанные автомобили и коммерческий транспорт.',
            },
            {
              iconComponent: 'IconAwardAdvantages',
              title: 'Награды',
              description:
                'Дилерские центры АВТОДОМ получают награду «Лучший дилер по итогам года» несколько лет подряд.',
            },
            {
              iconComponent: 'IconHeartAdvantages',
              title: 'Услуги',
              description:
                'Компания АВТОДОМ предоставляет широкий спектр услуг: от гарантийного обслуживания до лизинга.',
            },
          ],
        },
        asc: {
          title: 'Преимущества АвтоСпецЦентр',
          cards: [
            {
              iconComponent: 'IconCarGarage',
              title: 'Удобное расположение',
              description:
                'Дилерские центры в Москве и Московской области расположены в местах, до которых Вы можете быстро и удобно добраться.',
            },
            {
              iconComponent: 'IconBriefcase',
              title: 'Ассортимент',
              description:
                'На сегодняшний день в портфеле компании бренды: BAIC, Belgee, Changan, Chery, Citroen, EXEED, FAW, Foton, Geely, GWM, Haval, Hyundai, Infiniti, Jetour, KAIYI, Kia, Mazda, Nissan, ORA, Skoda, TANK, Volkswagen. Также есть подержанные автомобили и коммерческий транспорт.',
            },
            {
              iconComponent: 'IconAwardAdvantages',
              title: 'Награды',
              description:
                'Победитель в номинации «Организация сервиса» среди автомобильных холдингов «Автодилер года – 2022».200 крупнейших частных компаний России (по версии Forbes 2021).400 крупнейших российских компаний (по версии журнала «Эксперт» 2021).500 крупнейших по выручке компаний России (по версии РБК 2021).',
            },
            {
              iconComponent: 'IconHeartAdvantages',
              title: 'Услуги',
              description:
                'Дилерские центры компании предлагают полный комплекс услуг, связанных с продажей, гарантийным и сервисным обслуживанием автомобилей, реализацией оригинальных запасных частей и аксессуаров, комиссионной торговле, а также дополнительные услуги, автокредитование и страхование.',
            },
          ],
        },
      },
      citiesCode: ['msk', 'spb', 'krasnodar'],
    }
  },
  computed: {
    getTypeOfTransport () {
      const [, typeOfTransport, condition] = this.$route.path.split('/')
      const cars = {
        name: this.isAvtodom && condition === 'new' ? 'Модели' : 'Автомобили',
        nameOtherLinks: this.isAvtodom && condition ? 'о марке' : 'об автомобиле',
        code: 'cars',
      }
      switch (typeOfTransport) {
        case 'cars':
          return cars
        case 'atv':
          return {
            name: 'Квадроциклы',
            nameOtherLinks: 'о квадроцикле',
            code: 'atv',
          }
        case 'moto':
          return {
            name: 'Мотоциклы',
            nameOtherLinks: 'о мотоцикле',
            code: 'moto',
          }
        case 'jet-ski':
          return {
            name: 'Гидроциклы',
            nameOtherLinks: 'о гидроцикле',
            code: 'jet-ski',
          }
        case 'commercial':
          return {
            name: 'Коммерческий транспорт',
            nameOtherLinks: 'о коммерческом транспорте',
            code: 'commercial',
          }
        case 'electro':
          return {
            name: 'Электромобили',
            nameOtherLinks: 'о электромобиле',
            code: 'electro',
          }
        default:
          return cars
      }
    },
    slicedTitle () {
      const shortTitle = this.title.replace(/ - страница №\d+/i, '')
      return shortTitle.trim()
    },
    isCars () {
      return this.getTypeOfTransport?.code === 'cars'
    },
    paramBodyType () {
      const params = this.$route.params
      return params.bodyType
    },
    cardsWithTradeIn () {
      const cards = [...this.cards]
      const { code: transportType } = this.getTypeOfTransport
      if (
        (transportType === 'cars' && this.condition === 'used') ||
        (transportType === 'electro' && this.condition === 'used')) {
        if (cards.length <= 4) {
          cards.push({ isTradeInComponent: true })
          return cards
        }
        if (cards.length > 4 && cards.length < 8) {
          cards.splice(3, 0, { isTradeInComponent: true })
          return cards
        }
        if (cards.length >= 8) {
          cards.splice(3, 0, { isTradeInComponent: true })
          cards.splice(cards.length - 3, 0, { isTradeInComponent: true })
          return cards
        }
      } else { return cards }
    },
    isElectro () {
      return this.$route.path.includes('/electro/')
    },
    noCity () {
      return this.$route.query.noCity
    },
    otherCityCodes () {
      return this.citiesCode.filter(code => code !== this.siteCityCode) ?? []
    },
    catalogBlock () {
      if (this.mark || this.model) {
        const { code: typeOfTransportCode, nameOtherLinks } =
            this.getTypeOfTransport
        const reversCondition = this.condition === 'new' ? 'used' : 'new'
        const condition = this.model ? this.condition : reversCondition
        const foundModel = this.hasModelBrands
          ? this.hasModelBrands.find(model => this.model === model.code)
          : null
        const foundBrand = this.brands.find(brand => this.mark === brand.code)
        const upperFirstLatterCondition = condition.replace(
          condition[0],
          condition[0].toUpperCase(),
        )
        const foundBrandInService = this.hasBrandServices
          ? this.hasBrandServices.find(brand => this.mark === brand.code)
          : null

        const avtodomModelText = this.isAvtodom ? ' модели' : ''
        const aboutLabelText =
            condition === 'new'
              ? `Новые${avtodomModelText} ${this.markName}`
              : `${this.markName} с пробегом`
        const countTransport = foundBrand
          ? foundBrand[`catCount${upperFirstLatterCondition}`]
          : 0
        const hasTransport = countTransport > 0
        const title = `Другие разделы ${this.markName}`
        const list = [
          ...(hasTransport || foundBrand || this.model
            ? [
                {
                  title: `Больше ${nameOtherLinks}:`,
                  links: [
                    ...(hasTransport || this.model
                      ? [
                          {
                            label: aboutLabelText,
                            href: `/${typeOfTransportCode}/${condition}/${this.mark}/`,
                          },
                        ]
                      : []),
                    ...(foundBrand
                      ? [
                          {
                            label: foundModel
                              ? `Комплектации и характеристики ${this.markName} ${this.modelName}`
                              : `Комплектации и характеристики ${this.markName}`,
                            href: foundModel
                              ? `/brands/${this.mark}/${this.model}/`
                              : `/brands/${this.mark}/`,
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          ...(foundBrand && this.hasMarkDealers
            ? [
                {
                  title: 'Дилерские центры:',
                  links: [
                    {
                      label: `Дилеры ${this.markName}${
                          this.isAsc ? ' в Москве' : ''
                      }`,
                      href: `/contacts/${this.mark}/`,
                    },
                  ],
                },
              ]
            : []),
          ...(foundBrand && foundBrandInService
            ? [
                {
                  title: 'Сервис:',
                  links: [
                    {
                      label: `Техническое обслуживание ${this.markName}`,
                      href: `/service/${this.mark}/to`,
                    },
                  ],
                },
              ]
            : []),
        ]
        if (!list.length) {
          return null
        }
        return { title, list }
      }

      return null
    },
    carsUsedLinks () {
      const allLinks = {
        bmw: [
          {
            label: 'BMW синего цвета с пробегом',
            href: '/cars/used/bmw/blue/',
          },
          {
            label: 'BMW чёрного цвета с пробегом',
            href: '/cars/used/bmw/black/',
          },
          {
            label: 'BMW белого цвета с пробегом',
            href: '/cars/used/bmw/white/',
          },
          { label: 'BMW с пробегом 2015 года', href: '/cars/used/bmw/2015/' },
        ],
        kia: [
          { label: 'Kia с пробегом 2014 года', href: '/cars/used/kia/2014/' },
          { label: 'Kia с пробегом 2015 года', href: '/cars/used/kia/2015/' },
        ],
        nissan: [
          {
            label: 'Nissan с пробегом 2012 года',
            href: '/cars/used/nissan/2012/',
          },
        ],
        'mercedes-benz': [
          {
            label: 'Mercedes-Benz с пробегом 2014 года',
            href: '/cars/used/mercedes-benz/2014/',
          },
          {
            label: 'Mercedes-Benz с пробегом 2015 года',
            href: '/cars/used/mercedes-benz/2015/',
          },
          {
            label: 'Mercedes-Benz чёрного цвета с пробегом',
            href: '/cars/used/mercedes-benz/black/',
          },
        ],
        audi: [
          {
            label: 'Audi чёрного цвета с пробегом',
            href: '/cars/used/audi/black/',
          },
        ],
        other: [
          {
            label: 'Автомобили с пробегом 2012 года',
            href: '/cars/used/2012/',
          },
          {
            label: 'Автомобили с пробегом 2014 года',
            href: '/cars/used/2014/',
          },
          {
            label: 'Автомобили с пробегом 2015 года',
            href: '/cars/used/2015/',
          },
          {
            label: 'Автомобили с пробегом до 300 000 руб.',
            href: '/cars/used/price-do-300000/',
          },
          {
            label: 'Автомобили с пробегом до 350 000 руб.',
            href: '/cars/used/price-do-350000/',
          },
          {
            label: 'Автомобили с пробегом до 400 000 руб.',
            href: '/cars/used/price-do-400000/',
          },
          {
            label: 'Автомобили с пробегом до 450 000 руб.',
            href: '/cars/used/price-do-450000/',
          },
          {
            label: 'Автомобили с пробегом до 500 000 руб.',
            href: '/cars/used/price-do-500000/',
          },
          {
            label: 'Автомобили с пробегом до 550 000 руб.',
            href: '/cars/used/price-do-550000/',
          },
          {
            label: 'Автомобили с пробегом до 600 000 руб.',
            href: '/cars/used/price-do-600000/',
          },
          {
            label: 'Автомобили с пробегом до 650 000 руб.',
            href: '/cars/used/price-do-650000/',
          },
          {
            label: 'Автомобили с пробегом до 700 000 руб.',
            href: '/cars/used/price-do-700000/',
          },
          {
            label: 'Автомобили с пробегом до 750 000 руб.',
            href: '/cars/used/price-do-750000/',
          },
          {
            label: 'Автомобили с пробегом до 800 000 руб.',
            href: '/cars/used/price-do-800000/',
          },
          {
            label: 'Автомобили с пробегом до 850 000 руб.',
            href: '/cars/used/price-do-850000/',
          },
          {
            label: 'Автомобили с пробегом до 900 000 руб.',
            href: '/cars/used/price-do-900000/',
          },
          {
            label: 'Автомобили с пробегом до 950 000 руб.',
            href: '/cars/used/price-do-950000/',
          },
          {
            label: 'Автомобили с пробегом до 1000 000 руб.',
            href: '/cars/used/price-do-1000000/',
          },
          {
            label: 'Автомобили с пробегом до 1100 000 руб.',
            href: '/cars/used/price-do-1100000/',
          },
        ],
      }
      const all = Object.values(allLinks).flat()
      const title = 'Популярные запросы'
      switch (this.$route.path) {
        case '/cars/used/bmw/': {
          const links = allLinks.bmw
          return { links, title }
        }
        case '/cars/used/kia/': {
          const links = allLinks.kia
          return { links, title }
        }
        case '/cars/used/audi/': {
          const links = allLinks.audi
          return { links, title }
        }
        case '/cars/used/nissan/': {
          const links = allLinks.nissan
          return { links, title }
        }
        case '/cars/used/mercedes-benz/': {
          const links = allLinks['mercedes-benz']
          return { links, title }
        }
        case '/cars/used/': {
          const links = all
          return { links, title }
        }
        default:
          return null
      }
    },
    lowPrice () {
      return this.initSeo?.lowPrice ?? ''
    },
    page () {
      return this.currentPage !== 1 ? `${this.currentPage}` : undefined
    },
    isLastPage () {
      return this.currentPage === this.pageCount
    },
    sortCurrent () {
      return this.activeSort !== 'popular-desc' ? this.activeSort : undefined
    },
    isOnceInitPage () {
      return this.pageLoad > 0
    },
    hasCards () {
      return this.cards?.length > 0
    },
    linkSeeAllOtherCityBlock () {
      const { path, query, fullPath } = this.$route
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { page, city, ...restQuery } = query
      const hasQuery = fullPath.includes('?')
      const queryWithNoCity = { ...restQuery, noCity: this.siteCityCode }
      const route = {
        path,
        query: queryWithNoCity,
      }

      return !this.noCity && hasQuery ? route : fullPath
    },
    linkSeeAllOnSaleBlock () {
      const condition = `${this.condition ? this.condition + '/' : ''}`
      const mark = `${this.mark ? this.mark + '/' : ''}`
      const typeOfTransport = this.typeOfTransport[0]
      const hasFreightTransport = this.typeOfTransport.some(item =>
        ['commercial', 'trucks', 'fleet'].includes(item),
      )
      if (hasFreightTransport) {
        return '/commercial/'
      }

      return `/${typeOfTransport}/${condition}${mark}`
    },
    mainLevelFullPath () {
      return /\/$/.test(this.$route.fullPath)
    },
    servicesLinks () {
      const title = 'Услуги'
      const links = [
        {
          label: 'Trade-in',
          href: '/services/trade-in/',
          iconComponent: 'IconCarTradeIn',
        },
        {
          label: this.isAvtodom ? 'Кредитование авто' : 'Страхование и кредитование авто',
          href: this.isAvtodom ? '/services/credit/' : '/services/insurance_and_credit/',
          iconComponent: this.isAvtodom ? 'IconCarCredit' : 'IconCarInsurance',
        },
      ]
      if (this.isAvtodom) {
        links.push({
          label: 'Страхование авто',
          href: '/services/insurance/',
          iconComponent: 'IconCarInsurance',

        })
      }
      return { links, title }
    },
    ...mapState(useFilterStore, ['filterData', 'allData', 'isInitFilter']),
    ...mapState(useHoldingStore, ['isAsc', 'isAvtodom', 'domain']),
    ...mapState(useBrandsStore, ['brands']),
    ...mapState(useCityStore, ['siteCityCode']),
  },
  watch: {
    initCards: {
      handler (initCards) {
        if (initCards) {
          // инциализация данных после смены роута или перезагрузки страницы
          // данные приходят запрашиваются с уровня страницы и приходят через пропсы
          this.initFirstCatalogData()
        }
      },
      immediate: true,
      deep: true,
    },
    filterData: {
      handler (filterDataArg, oldFilterDataArg) {
        const isEmptyFilterData = useIsEmpty(filterDataArg)
        const isEmptyOldFilterData = useIsEmpty(oldFilterDataArg)
        const isEqualFilterData = useIsEqual(filterDataArg, oldFilterDataArg)
        const isEmptyAll = isEmptyFilterData && isEmptyOldFilterData
        const isCompare =
            !this.intervalCompareResponseData &&
            (!isEmptyFilterData || isEmptyAll || !isEqualFilterData) &&
            oldFilterDataArg &&
            this.isOnceInitPage
        // если изменился фильтр, запускается процесс сравнения данных
        if (isCompare) {
          this.intervalCompareResponseData = setInterval(
            this.compareResponseData,
            500,
          )
        }
      },
      deep: true,
    },
    async '$route.query' (queryArg, queryOldArg) {
      const query = this.getCleanedObject(queryArg)
      const queryOld = this.getCleanedObject(queryOldArg)
      const isPageChange = queryOld.page !== query.page
      const isSortChange = queryOld.sort !== query.sort
      const isSortOrPageChange = isPageChange || isSortChange
      const isEqualQuery = useIsEqual(query, queryOld)
      const isDetail = this.$route.path.includes('/catalog/')
      const isChangeQuery = !this.loading && this.isOnceInitPage && !isEqualQuery && !isDetail

      if (isChangeQuery) {
        this.setStartSort()
        isPageChange && this.setPage(query?.page ?? 1)
        await this.fetchOnChange(isSortOrPageChange, true)
      }
    },
  },
  created () {
    this.title = this.getTitle()
    this.directCrumbs = this.getDirectCrumbs()
  },
  async mounted () {
    this.hasModelBrands = await this.getModels()
    this.hasMarkDealers = await this.getDealers()
    this.onMoveUp()
    this.setStartSort()
    this.hasBrandServices = await this.getServices()
    await this.fetchInitFilter()
    this.loading = false
    this.pageLoad++
  },
  updated () {
    this.title = this.getTitle()
  },
  beforeUnmount () {
    this.clearInterval()
    this.setInitFilter(false)
  },
  methods: {
    getDirectCrumbs () {
      const seoBreadcrumb = this.initSeo.seoBreadcrumb || ''
      const defaultBreadcrumbs = ['', '', this.markName, this.modelName, this.paramFilterName]
      const params = this.$route.path.split('/').filter(Boolean)
      const paramsLength = params?.length
      const indexToAdd = paramsLength - 1

      if (seoBreadcrumb) {
        defaultBreadcrumbs.splice(indexToAdd, 1, seoBreadcrumb)
      }

      return defaultBreadcrumbs
    },
    getTitle () {
      if (this.initSeo?.seoH1) {
        return this.initSeo.seoH1
      }

      const [, typeOfTransport, condition, mark, model, filter] =
          this.$route.path.split('/')
      const query = this.$route.query
      let engineType = query?.engineType ?? null
      if (engineType) {
        engineType = Array.isArray(engineType) ? engineType[0] : engineType
      }
      let bodyType = query?.bodyType ?? null
      let bodyTypeName = 'Квадроциклы'
      if (bodyType) {
        bodyType = Array.isArray(bodyType) ? bodyType[0] : bodyType
        if (bodyType !== 'quad-bike') {
          bodyTypeName = 'Багги'
        }
      }

      const { name: typeOfTransportName } = this.getTypeOfTransport
      const conditionName = this.getConditionName(condition)
      const isCommercial = typeOfTransport === 'commercial'
      let title = ''
      let paramFilterName = this.paramFilterName ? this.paramFilterName : ''

      const [currentFilter] = filter
        ? filter.split('-is-')
        : engineType
          ? ['engine-type']
          : bodyType
            ? ['body-type']
            : [null]
      const ascSeoFilters = ['body-type', 'drive-type', 'engine-type']
      if (
        this.isAsc &&
          (typeOfTransport === 'cars' || typeOfTransport === 'atv') &&
          (condition === 'new' || condition === 'used') &&
          mark &&
          model &&
          currentFilter &&
          ascSeoFilters.includes(currentFilter)
      ) {
        // если страница: тип кузова | тип привода | тип двигателя
        if (currentFilter === ascSeoFilters[0]) {
          // body-type
          if (typeOfTransport === 'atv') {
            title = `${bodyTypeName}${
                conditionName ? ` ${conditionName.toLowerCase()}` : ''
            }${this.markName ? ` ${this.markName}` : ''}${
                this.modelName ? ` ${this.modelName}` : ''
            }`
          } else {
            if (paramFilterName) {
              paramFilterName += paramFilterName.endsWith('к') ? 'и' : 'ы'
            }

            if (condition === 'new') {
              title = `Новые${
                  paramFilterName ? ` ${paramFilterName.toLowerCase()}` : ''
              }${this.markName ? ` ${this.markName}` : ''}${
                  this.modelName ? ` ${this.modelName}` : ''
              }`
            } else if (condition === 'used') {
              title = `${paramFilterName}${
                  this.markName ? ` ${this.markName}` : ''
              }${this.modelName ? ` ${this.modelName}` : ''} с пробегом`
            }
          }
        } else if (currentFilter === ascSeoFilters[1]) {
          // drive-type
          let currentDriveType = ''
          if (paramFilterName) {
            currentDriveType = this.driveTypes[paramFilterName.toLowerCase()]
          }
          if (condition === 'new') {
            title = 'Новые'
            if (typeOfTransport === 'atv') {
              title += ` ${bodyTypeName.toLowerCase()}`
            }
            title += `${this.markName ? ` ${this.markName}` : ''}${
                this.modelName ? ` ${this.modelName}` : ''
            }${currentDriveType ? ` ${currentDriveType}` : ''}`
          } else if (condition === 'used') {
            title = ''
            if (typeOfTransport === 'cars') {
              title = 'Автомобили с пробегом'
            } else if (typeOfTransport === 'atv') {
              title = `${bodyTypeName} с пробегом`
            }

            title += `${this.markName ? ` ${this.markName}` : ''}${
                this.modelName ? ` ${this.modelName}` : ''
            }${currentDriveType ? ` ${currentDriveType}` : ''}`
          }
        } else if (currentFilter === ascSeoFilters[2]) {
          // engine-type
          let currentEngineType = ''
          if (paramFilterName) {
            currentEngineType = this.engineTypes.find(item =>
              item.labels.includes(paramFilterName.toLowerCase()),
            )?.values
          } else if (engineType) {
            currentEngineType = this.engineTypes.find(item =>
              item.labels.includes(engineType),
            )?.values
          }

          if (condition === 'new') {
            title = 'Новые'
            if (typeOfTransport === 'atv') {
              title += ` ${bodyTypeName.toLowerCase()}`
            }

            title += `${this.markName ? ` ${this.markName}` : ''}${
                this.modelName ? ` ${this.modelName}` : ''
            }${
                currentEngineType && currentEngineType[0]
                    ? ` ${currentEngineType[0]}`
                    : ''
            }`
          } else if (condition === 'used') {
            title = ''
            if (typeOfTransport === 'cars') {
              title = 'Автомобили с пробегом'
            } else if (typeOfTransport === 'atv') {
              title = `${bodyTypeName} с пробегом`
            }

            title += `${this.markName ? ` ${this.markName}` : ''}${
                this.modelName ? ` ${this.modelName}` : ''
            }${
                currentEngineType && currentEngineType[0]
                    ? ` ${currentEngineType[0]}`
                    : ''
            }`
          }
        }
      } else if (this.isAvtodom && typeOfTransport === 'atv') {
        if (condition === 'used' && mark && !model) {
          title = `${typeOfTransportName}${
              this.markName ? ` ${this.markName}` : ''
          }${conditionName ? ` ${conditionName.toLowerCase()}` : ''}`
        } else {
          if (condition === 'new') {
            if (!mark) {
              title = `${conditionName ? conditionName + ' ' : ''}${
                  conditionName
                      ? typeOfTransportName.toLowerCase()
                      : typeOfTransport
              }`
            } else {
              title = typeOfTransportName
            }
          } else if (condition === 'used') {
            title = `${
                conditionName ? typeOfTransportName + ' ' : typeOfTransportName
            }${conditionName ? `${conditionName.toLowerCase()}` : ''}`
          } else {
            title = typeOfTransportName
          }

          title += `${this.markName ? ' ' + this.markName : ''}${
              this.modelName ? ' ' + this.modelName : ''
          }${this.paramFilterName ? ' ' + this.paramFilterName : ''}`
        }
      } else if (condition === 'new') {
        const isMotoMark = typeOfTransport === 'moto' && mark
        title = `${conditionName && !isMotoMark ? conditionName + ' ' : ''}${
            conditionName && !isMotoMark
                ? typeOfTransportName.toLowerCase()
                : typeOfTransportName
        }${this.markName ? ' ' + this.markName : ''}${
            this.modelName ? ' ' + this.modelName : ''
        }${this.paramFilterName ? ' ' + this.paramFilterName : ''}`

        if (this.isSale) {
          title = 'Акции и спецпредложения на автомобили'
        }
      } else if (condition === 'used') {
        title = `${
            conditionName ? typeOfTransportName + ' ' : typeOfTransportName
        }${conditionName ? conditionName.toLowerCase() : ''}${
            this.markName ? ' ' + this.markName : ''
        }${this.modelName ? ' ' + this.modelName : ''}${
            this.paramFilterName ? ' ' + this.paramFilterName : ''
        }`

        if (this.isAvtodom && typeOfTransport === 'jet-ski') {
          title = 'Гидроциклы'
        }

        if (this.isAvtodom && typeOfTransport === 'electro') {
          title = 'Электромобили в наличии'

          if (condition === 'new') {
            title = `Новые электромобили${this.markName ? ` ${this.markName}` : ''}${this.modelName ? ` ${this.modelName}` : ''}`
          } else if (condition === 'used') {
            title = `Электромобили с пробегом${this.markName ? ` ${this.markName}` : ''}${this.modelName ? ` ${this.modelName}` : ''}`
          }
        }

        if (typeOfTransport === 'cars') {
          if (mark === 'gear-type-is-automatic') {
            title = 'Авто с пробегом на автомате'
          } else if (mark === 'engine-type-is-diesel') {
            title = 'Дизельные авто с пробегом'
          } else if (mark === 'price-do-300000') {
            title = 'Автомобили с пробегом до 300 000 рублей'
          } else if (mark === 'price-do-350000') {
            title = 'Автомобили с пробегом до 350 000 рублей'
          } else if (mark === 'price-do-400000') {
            title = 'Автомобили с пробегом до 400 000 рублей'
          } else if (mark === 'price-do-450000') {
            title = 'Автомобили с пробегом до 450 000 рублей'
          } else if (mark === 'price-do-500000') {
            title = 'Автомобили с пробегом до 500 000 рублей'
          } else if (mark === 'price-do-550000') {
            title = 'Автомобили с пробегом до 550 000 рублей'
          } else if (mark === 'price-do-600000') {
            title = 'Автомобили с пробегом до 600 000 рублей'
          } else if (mark === 'price-do-650000') {
            title = 'Автомобили с пробегом до 650 000 рублей'
          } else if (mark === 'price-do-700000') {
            title = 'Автомобили с пробегом до 700 000 рублей'
          } else if (mark === 'price-do-750000') {
            title = 'Автомобили с пробегом до 750 000 рублей'
          } else if (mark === 'price-do-800000') {
            title = 'Автомобили с пробегом до 800 000 рублей'
          } else if (mark === 'price-do-850000') {
            title = 'Автомобили с пробегом до 850 000 рублей'
          } else if (mark === 'price-do-900000') {
            title = 'Автомобили с пробегом до 900 000 рублей'
          } else if (mark === 'price-do-950000') {
            title = 'Автомобили с пробегом до 950 000 рублей'
          } else if (mark === 'price-do-1000000') {
            title = 'Автомобили с пробегом до 1 000 000 рублей'
          } else if (mark === 'price-do-1100000') {
            title = 'Автомобили с пробегом до 1 100 000 рублей'
          } else if (mark === '2012') {
            title = 'Автомобили с пробегом 2012 года'
          } else if (mark === '2014') {
            title = 'Автомобили с пробегом 2014 года'
          } else if (mark === '2015') {
            title = 'Автомобили с пробегом 2015 года'
          } else if (mark === 'audi' && model === 'black') {
            title = 'Audi чёрного цвета с пробегом'
          } else if (mark === 'bmw') {
            if (model === '2015') {
              title = 'BMW с пробегом 2015 года'
            } else if (model === 'black') {
              title = 'BMW чёрного цвета с пробегом'
            } else if (model === 'blue') {
              title = 'BMW синего цвета с пробегом'
            } else if (model === 'white') {
              title = 'BMW белого цвета с пробегом'
            }
          } else if (mark === 'nissan' && model === '2012') {
            title = 'Nissan с пробегом 2012 года'
          } else if (mark === 'kia') {
            if (model === '2014') {
              title = 'Kia с пробегом 2014 года'
            } else if (model === '2015') {
              title = 'Kia с пробегом 2015 года'
            }
          } else if (mark === 'mercedes-benz') {
            if (model === '2015') {
              title = 'Mercedes-Benz с пробегом 2015 года'
            } else if (model === '2014') {
              title = 'Mercedes-Benz с пробегом 2014 года'
            } else if (model === 'black') {
              title = 'Mercedes-Benz черного цвета с пробегом'
            }
          }

          if (model === 'price-do-1000000') {
            title = 'Кроссоверы с пробегом до 1 000 000 рублей'
          } else if (model === 'price-do-2000000') {
            title = 'Внедорожники с пробегом до 2 000 000 рублей'
          } else if (model === 'price-do-3000000') {
            title = 'Внедорожники с пробегом до 3 000 000 рублей'
          } else if (model === 'price-do-1500000') {
            title = 'Внедорожники с пробегом до 1 500 000 рублей'
          }
        }
      } else if (typeOfTransport === 'moto') {
        title = 'Мотоциклы'

        if (condition === '125-kubov') {
          title = 'Мотоциклы 125 кубов'
        } else if (condition === '150-kubov') {
          title = 'Мотоциклы 150 кубов'
        } else if (condition === '200-kubov') {
          title = 'Мотоциклы 200 кубов'
        } else if (condition === '250-kubov') {
          title = 'Мотоциклы 250 кубов'
        } else if (condition === 'chernye') {
          title = 'Черные мотоциклы'
        } else if (condition === 'dorozhnye') {
          title = 'Дорожные мотоциклы'
        } else if (condition === 'vnedorozhnye') {
          title = 'Внедорожные мотоциклы'
        } else if (condition === 'turenduro') {
          title = 'Мотоциклы турэндуро'
        } else if (condition === 'tricycle') {
          title = 'Трициклы'
        } else if (condition === 'sport-bike') {
          title = 'Спортбайки'
        } else if (condition === 'krossovye') {
          title = 'Кроссовые мотоциклы'
        } else if (condition === 'klassicheskie') {
          title = 'Классические мотоциклы'
        } else if (condition === 'enduro') {
          title = 'Мотоциклы эндуро'
        }
      } else if (this.isVat && typeOfTransport === 'cars') {
        title = `${typeOfTransportName} с НДС для юридических лиц`
      } else if (isCommercial) {
        if (condition === 'bodytype-furgon') {
          title = 'Грузовые фургоны'
        } else if (condition === 'bodytype-microbus') {
          title = 'Микроавтобус с пробегом'
        } else if (condition === 'trucks') {
          title = 'Коммерческий грузовой транспорт'
        } else if (condition === 'fleet') {
          title = 'Коммерческий легковой транспорт'
        } else {
          title = typeOfTransportName
        }
      } else if (condition === 'electro') {
        title = 'Электромобили'
      } else if (this.isExclusive) {
        title = 'Эксклюзивно на сайте'
      } else if (this.isSellout) {
        title = 'Распродажа автомобилей'
      } else {
        title = typeOfTransportName
      }

      if (this.bodyTypeNameRu) {
        const titlesListWithY = {
          Кроссовер: 'Кроссоверы',
          Кабриолет: 'Кабриолеты',
          Минивэн: 'Минивэны',
          Пикап: 'Пикапы',
          Седан: 'Седаны',
          Универсал: 'Универсалы',
          Родстер: 'Родстеры',
          Компактвэн: 'Компактвэны',
          Фургон: 'Фургоны',
        }
        const titlesListWithI = {
          Внедорожник: 'Внедорожники',
          Лифтбек: 'Лифтбеки',
          Фастбэк: 'Фастбэки',
          Хэтчбек: 'Хэтчбеки',
        }
        // eslint-disable-next-line no-prototype-builtins
        const foundTitleWithY = titlesListWithY.hasOwnProperty(this.bodyTypeNameRu)
        // eslint-disable-next-line no-prototype-builtins
        const foundTitleWithI = titlesListWithI.hasOwnProperty(this.bodyTypeNameRu)
        if (condition === 'new') {
          if (foundTitleWithY) {
            title = `Новые ${titlesListWithY[this.bodyTypeNameRu].toLowerCase()}`
          } else if (foundTitleWithI) {
            title = `Новые ${titlesListWithI[this.bodyTypeNameRu].toLowerCase()}`
          } else if (this.bodyTypeNameRu === 'Тарга') {
            title = 'Новые тарги'
          } else {
            title = `Новые ${this.bodyTypeNameRu.toLowerCase()}`
          }
        } else if (condition === 'used') {
          if (foundTitleWithY) {
            title = `${titlesListWithY[this.bodyTypeNameRu]} с пробегом`
          } else if (foundTitleWithI) {
            title = `${titlesListWithI[this.bodyTypeNameRu]} с пробегом`
          } else if (this.bodyTypeNameRu === 'Тарга') {
            title = 'Тарги с пробегом'
          } else {
            title = `${this.bodyTypeNameRu} с пробегом`
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (foundTitleWithY) {
            title = `${titlesListWithY[this.bodyTypeNameRu]} в наличии`
          } else if (foundTitleWithI) {
            title = `${titlesListWithI[this.bodyTypeNameRu]} в наличии`
          } else if (this.bodyTypeNameRu === 'Тарга') {
            title = 'Тарги в наличии'
          } else {
            title = `${this.bodyTypeNameRu} в наличии`
          }
        }
      }

      return title
    },
    async getModels () {
      if (this.model) {
        const { $fetchClient, $hasErrorResponse } = useNuxtApp()

        const res = await $fetchClient(getModelsPath(this.mark))

        if (!$hasErrorResponse(res)) {
          return res?.childList ?? null
        }

        return null
      } else { return null }
    },
    async getDealers () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const options = {
        query: {
          ...(this.mark && { brand_code: this.mark }),
        },
      }
      const res = await $fetchClient(getDealersPath(), options)

      if (!$hasErrorResponse(res)) {
        return res?.data ?? null
      }

      return null
    },
    onMoveUp () {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
    },
    async getServices () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()

      const res = await $fetchClient(serviceRoutes.getAllBrands())

      if (!$hasErrorResponse(res)) {
        return res?.refs?.mark ?? null
      }
      return null
    },
    initFirstCatalogData () {
      this.cards = this.initCards ?? []
      this.total = this.initTotal ?? '0'
      this.contentRange = parseInt(this.initTotal)
      this.pageCount = Math.ceil(this.contentRange / this.itemsPerPage)
      this.loading = false
      this.isInitCatalog = true
    },
    async fetchInitFilter () {
      const query = this.$route.query
      const initFilterData = this.getInitFilterData(this.formatFilterData(query))
      this.dataFetch = initFilterData
      const filterDataOnFetch = this.getInitFilterDataOnFetch(initFilterData)
      this.setFilterData(initFilterData)
      await this.handleFetchFilter(filterDataOnFetch)
      this.setInitFilter(true)
    },
    async fetchOnChange (isChangePageOrSort = false, isQueryChange = false) {
      this.loading = true
      this.cards = new Array(10).fill({})

      try {
        const initFilterData = this.getInitFilterData(
          this.formatFilterData(this.$route.query),
        )
        const formattedFilterData = isQueryChange
          ? initFilterData
          : this.filterData
        this.dataFetch = formattedFilterData
        const isChangeRoute = isChangePageOrSort || isQueryChange
        const isCurrentRoute =
            formattedFilterData &&
            this.checkCurrentRoute(formattedFilterData, isChangeRoute)
        if (!this.intervalCompareResponseData && isCurrentRoute) {
          const filterDataOnFetch =
              this.getInitFilterDataOnFetch(formattedFilterData)
          if ((!isChangePageOrSort || this.noCity) && this.isInitFilter) {
            if (isQueryChange && !this.mainLevelFullPath) {
              this.setFilterData(formattedFilterData)
            }
            await this.handleFetchFilter(filterDataOnFetch)
          }
          if (process.client || this.isOnceInitPage) {
            this.cards = await this.getCards(filterDataOnFetch)
          }
          this.pageCount = Math.ceil(this.contentRange / this.itemsPerPage)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async handleFetchFilter (filterDataOnFetch) {
      try {
        const allData = await this.getFilters(filterDataOnFetch)
        this.setAllData(allData)
        this.setFastFilter(filterDataOnFetch)
        this.setInitFilter(true)
      } catch (e) {
        console.error(e)
      }
    },
    getFormFilterParam (filter) {
      const filters = ['engineType', 'driveType', 'bodyType', 'gearType']
      const findFilters = Object.entries(filter).filter(([key, _value]) =>
        filters.includes(key),
      )
      if (findFilters) {
        const hasOneFilter =
            findFilters?.length === 1 && findFilters[0][1]?.length === 1
        if (hasOneFilter) {
          const [[key, values]] = findFilters
          const value = values[0]
          return `${this.camelToKebabCase(key)}-is-${value}`
        }
      }

      return null
    },
    camelToKebabCase (str) {
      return str
        .split('')
        .map((letter, idx) => {
          return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter
        })
        .join('')
    },
    kebabToCamelCase (str) {
      return str.replace(/-./g, x => x[1].toUpperCase())
    },
    getFromUrlFilterParam () {
      const schema = {
        furgon: 'van',
      }
      const routeParam = this.$route.path
        .split('/')
        .find(item => item.includes('-is-'))
      // const routeParam = this.$route.params.filter

      if (routeParam) {
        const [paramFilterKey, paramFilterValue] = routeParam.split('-is-')
        const key = this.kebabToCamelCase(paramFilterKey)
        const value = schema[paramFilterValue] ?? paramFilterValue
        return { [key]: [value] }
      }

      return null
    },
    checkCurrentRoute (filter, isChangeRoute) {
      if (isChangeRoute) {
        // не менять роут если это изменение query
        return true
      }
      const pushRoute = this.pushRoute(filter)
      const filterParam = filter && this.getFormFilterParam(filter)
      const routePath = this.$route.path
      const conditions = filter.condition
      const marks = filter.mark
      const models = filter.model
      const bodyType = filter.bodyType
      const condition = routePath.includes('/new') ? 'new' : 'used'
      const conditionFilter = conditions ? conditions[0] : ''
      const mark = marks ? marks[0] : ''
      const model = models ? models[0] : ''
      const vatType = filter.vatType ? filter.vatType[0] : ''
      const exclusive = filter.exclusive ? filter.exclusive[0] : ''
      const sellout = filter.sellout ? filter.sellout[0] : ''
      const hasCondition = /\/(new|used)\//.test(routePath)
      const hasOneCondition = conditions && conditions.length === 1
      const hasOneMark = marks && marks.length === 1
      const hasOneModel = models && models.length === 1
      const { code: typeOfTransportCode } = this.getTypeOfTransport
      const isCommercial = ['truck', 'commercial'].includes(typeOfTransportCode)
      const routeWithTransportType = `/${typeOfTransportCode}/`
      const transportTypeWithConditionPath = `/${typeOfTransportCode}/${conditionFilter || condition}`
      const routeWithOnSaleSoon = `/${typeOfTransportCode}/on-sale-soon/`
      const routeWithCondition = `${transportTypeWithConditionPath}/`
      const routeWithSale = `/${typeOfTransportCode}/sale/`
      const routeWithBodyType = `/${typeOfTransportCode}/bodytype-${bodyType}/`
      const routeWithConditionBodyType = `${transportTypeWithConditionPath}/bodytype-${bodyType}/`
      const routeWithVat = '/cars/used/vat/'
      const routeWithMark = `${transportTypeWithConditionPath}/${mark}/`
      const routeWithModel = `${transportTypeWithConditionPath}/${mark}/${model}/`
      const routeWithFilter = `${transportTypeWithConditionPath}/${mark}/${model}/${filterParam}/`
      if ((hasCondition || conditionFilter) && !isCommercial) {
        if (
          this.isAsc &&
            hasOneMark &&
            hasOneModel &&
            (((this.isCars || typeOfTransportCode === 'atv') &&
                    filterParam &&
                    filterParam === 'engine-type-is-petrol') ||
                (typeOfTransportCode === 'atv' &&
                    filterParam &&
                    filterParam.includes('body-type')))
        ) {
          return pushRoute(routeWithModel)
        } else if (hasOneMark && hasOneModel && filterParam) {
          return pushRoute(routeWithFilter, 'filter')
        } else if (hasOneMark && hasOneModel) {
          return pushRoute(routeWithModel, 'model')
        } else if (hasOneMark) {
          return pushRoute(routeWithMark, 'mark')
        } else if (bodyType?.length === 1 && this.isCars) {
          return pushRoute(routeWithConditionBodyType)
        } else if (hasOneCondition) {
          return pushRoute(routeWithCondition, 'condition')
        } else if (vatType && this.isCars && condition === 'used') {
          return pushRoute(routeWithVat, 'vatType')
        } else {
          return pushRoute(`${transportTypeWithConditionPath}/`)
        }
      } else if (this.isCars && (bodyType || this.paramBodyType)) {
        if (bodyType?.length === 1) {
          return pushRoute(routeWithBodyType)
        } else if (this.paramBodyType) {
          return pushRoute(routeWithTransportType)
        }
      } else if (exclusive && this.isCars) {
        return pushRoute(routeWithOnSaleSoon, 'exclusive')
      } else if (sellout && this.isCars) {
        return pushRoute(routeWithSale, 'sellout')
      } else if (!conditionFilter) {
        return pushRoute(routePath, '', conditionFilter)
      } else {
        return pushRoute(routePath, '', !isCommercial)
      }
    },
    pushRoute (filter) {
      return (argPath, nextCurrentParam, hasConditionInPath = true) => {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          transportType: t,
          exclusive,
          sellout,
          vatType,
          condition,
          mark,
          model,
          engineType,
          bodyType,
          ...restFilter
        } = useCloneDeep(filter)
        const additionalFilters = [
          'engineType',
          'driveType',
          'gearType',
          'bodyType',
        ]

        const hasConditionInFilter = useHas(filter, 'condition')
        const hasMarkInFilter = useHas(filter, 'mark')
        const hasModelInFilter = useHas(filter, 'model')
        const hasVatTypeInFilter = useHas(filter, 'vatType')
        const hasExclusiveInFilter = useHas(filter, 'exclusive')
        const hasSelloutInFilter = useHas(filter, 'sellout')
        const hasBodyTypeInFilter = useHas(filter, 'bodyType')
        const isShowConditionQuery = hasConditionInFilter && !hasConditionInPath
        const isOneMark = mark?.length === 1
        const additionalFilterName = additionalFilters.find(item =>
          useHas(filter, item),
        )
        const isNotShowMarkQuery =
            hasMarkInFilter &&
            isOneMark &&
            (nextCurrentParam === 'mark' ||
                nextCurrentParam === 'model' ||
                nextCurrentParam === 'filter')
        const isNotShowModelQuery =
            hasModelInFilter &&
            model?.length === 1 &&
            (nextCurrentParam === 'model' || nextCurrentParam === 'filter')
        const isNotShowFilterQuery =
            restFilter[additionalFilterName]?.length === 1 &&
            nextCurrentParam === 'filter'
        const isNotShowVatType = hasVatTypeInFilter && nextCurrentParam === 'vatType'
        const isNotShowExclusive = hasExclusiveInFilter && nextCurrentParam === 'exclusive'
        const isNotShowSellout = hasSelloutInFilter && nextCurrentParam === 'sellout'
        const isNotShowBodyType = hasBodyTypeInFilter && bodyType?.length === 1
        const isOnlyElectroTypes = engineType?.every(item => ['electric', 'hybrid'].includes(item)) && engineType.length === 2
        const hasBodyTypeInRoutePath = argPath.split('/').find(item => item.slice(0, 9) === 'body-type')
        const isShowBodyTypeDependingOnShowMark = hasBodyTypeInRoutePath ? !hasBodyTypeInRoutePath && isNotShowMarkQuery : isNotShowMarkQuery

        const routeQuery = {
          ...restFilter,
          ...(isShowConditionQuery && { condition }),
          ...(!isNotShowMarkQuery && { mark }),
          ...(!isNotShowModelQuery && { model }),
          ...(additionalFilterName && {
            [additionalFilterName]: !isNotShowFilterQuery
              ? restFilter[additionalFilterName]
              : undefined,
          }),
          ...(!isNotShowVatType && { vatType }),
          ...(!isNotShowExclusive && { exclusive }),
          ...(!isNotShowSellout && { sellout }),
          ...(this.noCity && { noCity: this.noCity }),
          ...(!this.isElectro && engineType && { engineType }),
          ...(engineType && (this.isElectro && !isOnlyElectroTypes && engineType && { engineType })),
          ...((!isNotShowBodyType || isShowBodyTypeDependingOnShowMark || !this.isCars) && { bodyType }),
          ...(isNotShowBodyType && this.paramBodyType && !isNotShowMarkQuery && this.isCars && { bodyType: undefined }),
          ...(this.currentPage && { page: this.page }),
          ...(this.activeSort && { sort: this.sortCurrent }),
        }
        const clearedQuery = this.getCleanedObject(routeQuery)
        const route = {
          path: argPath,
          query: clearedQuery,
        }
        this.$router.push(route)
        return argPath === this.$route.path
      }
    },
    getInitFilterData (filter) {
      const cloneFilter = useCloneDeep(filter ?? {})
      // const condition = this.condition && [this.condition]
      const mark = this.mark && [this.mark]
      const model = this.model && [this.model]
      const vatType = this.isVat && ['true']
      const extColorGroup = this.extColorGroup && [this.extColorGroup]
      const disprice = this.disprice?.length && this.disprice
      const engineVolume = this.engineVolume?.length && this.engineVolume
      const bodyType = this.bodyType?.length && this.bodyType
      const engineType = this.engineType?.length && this.engineType
      const year = this.year?.length && this.year
      const exclusive = this.isExclusive && ['true']
      const sellout = this.isSellout && ['true']
      const inStock = this.isSellout && ['1']
      const sale = this.isSale && ['true']
      const city = this.isAvtodom && this.noCity && this.otherCityCodes
      const filterParam = this.getFromUrlFilterParam()
      return {
        ...cloneFilter,
        ...(mark && { mark }),
        ...(model && { model }),
        ...(vatType && { vatType }),
        ...(exclusive && { exclusive }),
        ...(sellout && { sellout }),
        ...(inStock && { inStock }),
        ...(sale && { sale }),
        ...(filterParam && filterParam),
        ...(engineVolume && { engineVolume }),
        ...(this.paramBodyType && this.isCars && { bodyType: [this.paramBodyType] }),
        ...(bodyType && { bodyType }),
        ...(disprice && { disprice }),
        ...(year && { year }),
        ...(extColorGroup && { extColorGroup }),
        ...(!this.isElectro && engineType && { engineType }),
        ...(engineType && (this.isElectro && cloneFilter.engineType ? { engineType: cloneFilter.engineType } : { engineType })),
        ...(city && { city }),
      }
    },
    rangeDataToString (name, filter) {
      return filter[name].map(item => item.toString())
    },
    getInitFilterDataOnFetch (filter) {
      const cloneFilter = useCloneDeep(filter)
      const condition = this.condition && [this.condition]
      const transportType = this.typeOfTransport
      const mark = this.mark && [this.mark]
      const model = this.model && [this.model]
      const vatType = this.isVat && ['true']
      const exclusive = this.isExclusive && ['true']
      const sellout = this.isSellout && ['true']
      const inStock = this.isSellout && ['1']
      const sale = this.isSale && ['true']
      const disprice = this.disprice?.length && this.disprice
      const engineVolume = this.engineVolume?.length && this.engineVolume
      const bodyType = this.bodyType?.length && this.bodyType
      const engineType = this.engineType?.length && this.engineType
      const year = this.year?.length && this.year
      const extColorGroup = this.extColorGroup && [this.extColorGroup]
      const city = this.isAvtodom && this.noCity && this.otherCityCodes
      const filterParam = this.getFromUrlFilterParam()
      const rangeData = [
        'creditMonthPayment',
        'disprice',
        'totalTrip',
        'year',
        'horsePower',
        'engineVolume',
      ]

      rangeData.forEach((item) => {
        if (cloneFilter && useHas(cloneFilter, item)) {
          cloneFilter[item] = this.rangeDataToString(item, cloneFilter)
        }
      })

      // удаляет undefined
      const cleaned = this.getCleanedObject(cloneFilter)

      return {
        ...cleaned,
        ...(condition && { condition }),
        ...(transportType && { transportType }),
        ...(mark && { mark }),
        ...(model && { model }),
        ...(vatType && { vatType }),
        ...(exclusive && { exclusive }),
        ...(sellout && { sellout }),
        ...(inStock && { inStock }),
        ...(sale && { sale }),
        ...(filterParam && filterParam),
        ...(disprice && { disprice }),
        ...(engineVolume && { engineVolume }),
        ...(bodyType && { bodyType }),
        ...(year && { year }),
        ...(extColorGroup && { extColorGroup }),
        ...(city && { city }),
        ...(!this.isElectro && engineType && { engineType }),
        ...(engineType && (this.isElectro && cloneFilter.engineType ? { engineType: cloneFilter.engineType } : { engineType })),
      }
    },
    async compareResponseData () {
      // сравнение данных фильтра прошлых и текущих , если отличие, то новый запрос
      const clearedDataFetch = this.getCleanedObject(this.dataFetch)
      const clearedFilterData = this.getCleanedObject(this.filterData)
      const isEmptyData =
        useIsEmpty(clearedDataFetch) && useIsEmpty(clearedFilterData)
      const isEqualData = useIsEqual(clearedDataFetch, clearedFilterData)
      if ((isEmptyData || !isEqualData) && !this.loading) {
        this.clearInterval()
        this.initPage()
        await this.fetchOnChange()
      } else if (!this.loading) {
        this.clearInterval()
      }
    },
    getCleanedObject (object) {
      if (object) {
        const clone = useCloneDeep(object)
        for (const key in clone) {
          if (!clone[key]) {
            delete clone[key]
          }
        }
        return clone
      }

      return {}
    },
    clearInterval () {
      clearInterval(this.intervalCompareResponseData)
      this.intervalCompareResponseData = null
    },
    setQuery () {
      const restQuery = this.$route.query ?? {}
      this.$router.push({
        query: {
          ...restQuery,
          ...(this.currentPage && { page: this.page }),
          ...(this.activeSort && { sort: this.sortCurrent }),
        },
      })
    },
    async getCards (data) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const url = btoa(this.$route.fullPath)
      const query = {
        ...data,
        url,
        sort: this.activeSort,
      }
      const options = { query }
      const res = await $fetchClient(getCards(this.itemsPerPage, this.currentPage), options)

      if ($hasErrorResponse(res)) {
        this.contentRange = 0
        this.total = 0
        return []
      } else {
        const dataBody = res?.data
        this.contentRange = parseInt(dataBody.total)
        this.total = dataBody.total
        this.isInitCatalog = true
        return dataBody.data
      }
    },
    initPage () {
      if (this.isOnceInitPage) {
        this.setPage(1)
      }
    },
    setPage (pageNumber) {
      this.currentPage = parseInt(pageNumber)
    },
    async getFilters (data = {}) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getFilters(), { query: data })
      if (!$hasErrorResponse(res)) {
        return res
      }
      return null
    },
    setFastFilter (filterData) {
      if (filterData) {
        let fastFilter = 'mark'
        const schema = {
          mark: 'mark',
          model: 'model',
          generation: 'generation',
          modification: 'modification',
          equipment: 'equipment',
        }
        const { mark, model, generation, modification, equipment } = filterData
        const filteredFilterData = {
          equipment,
          modification,
          generation,
          model,
          mark,
        }

        if (filteredFilterData.equipment) {
          fastFilter = schema.equipment
        } else if (filteredFilterData.modification) {
          fastFilter = schema.equipment
        } else if (filteredFilterData.generation) {
          fastFilter = schema.modification
        } else if (filteredFilterData.model) {
          if (
            this.allData.generation.filter(item => item.disabled === false)
              .length > 1
          ) {
            fastFilter = schema.generation
          } else {
            fastFilter = schema.modification
          }
        } else if (filteredFilterData.mark) {
          fastFilter = schema.model
        }

        this.fastFilter = fastFilter
      }
    },
    countOptions (options) {
      return options.filter(item => item.StandartOption === 0).length ?? null
    },
    getConditionName (condition) {
      switch (condition) {
        case 'new':
          return 'Новые'
        case 'used':
          return 'С пробегом'
        default:
          return ''
      }
    },
    pageChangeHandle (value) {
      // TODO перевести на pageChange в utils после перехода на script setup
      const intValue = parseInt(value)
      switch (value) {
        case 'next':
          this.currentPage += 1
          break
        case 'previous':
          this.currentPage -= 1
          break
        case 'middle':
          this.currentPage = intValue
          break
        default:
          this.currentPage = intValue
          break
      }
      this.setQuery()
    },
    onOpenInsurancePanel () {
      this.onOpenFormPanel('isOpenInsurance')
    },
    onOpenTradeInPanel () {
      this.onOpenFormPanel('isOpenTradeIn')
    },
    onOpenCreditPanel () {
      this.onOpenFormPanel('isOpenCredit')
    },
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
    ...mapActions(useFilterStore, [
      'setFilterData',
      'setAllData',
      'setInitFilter',
      'clearFilterData',
      'clearAllFilterData',
      'formatFilterData',
    ]),
  },
})
</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  width: 100%;
  height: fit-content;
  padding: 15px;
  overflow: hidden;

  @include mq($bp-super-small) {
    padding: 15px 15px 30px;
  }

  @include mq($bp-small) {
    grid-gap: 30px;
    padding: 15px 30px 30px;
  }

  @include mq($bp-medium) {
    padding: 15px 50px 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 15px 81px 40px;
  }

  @include mq($bp-big) {
    padding: 15px 146px 40px;
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    border-top: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      column-gap: 28px;
      border-top: none;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      column-gap: 40px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

  }

  &__item  {
    position: relative;
    display: flex;
    padding-bottom: 48px;
    background-color: white;
    border: 0 1px 1px 0 solid var(--blackLight);

    &::after  {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: '';
      background-color: var(--grayMediumLight);
    }

    &::before  {
      position: absolute;
      left: 0;
      width: 100%;
      content: '';
      background-color: var(--grayMediumLight);
    }

    &:nth-child(odd)  {
      @include mq($bp-small-medium, $bp-small) {
        padding-right: 14px;
        border-right: 1px solid var(--grayMediumLight);
      }
    }

    &:nth-child(even)  {
      @include mq($bp-small-medium, $bp-small) {
        padding-left: 14px;
        border-right: 1px solid transparent;
      }
    }

    &:nth-child(3n + 2)::after  {
      @include mq($bp-small, $bp-medium) {
        right: -1.75rem;
        left: -1.75rem;
      }
    }

    &:nth-child(4n + 2)::after  {
      @include mq($bp-medium) {
        right: -2.5rem;
        left: -2.5rem;
      }
    }

    &:nth-child(4n + 3)::after  {
      @include mq($bp-medium) {
        right: -2.5rem;
        left: -2.5rem;
      }
    }

    :deep(.services-form-trade-in){
      display: flex;
      flex-direction: column-reverse;
      align-self: center;
      justify-content: flex-start;
      width: 100%;
      padding: 42px 0 48px;
      border: none;
    }
  }

  &__block {
    padding: 0 !important;
  }

  &__title-container {
    display: flex;
    flex-direction: column;
    grid-gap: 16px;

    @include mq($bp-medium) {
      grid-gap: 20px;
    }
  }

  &__title {
    @include h5;

    color: var(--grayDolphin);
    text-align: center;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__subtitle {
    @include label_small;

    color: var(--grayDark);
    text-align: center;

    @include mq($bp-small-medium) {
      @include label;
    }
  }

  &__pagination {
    padding: 10px 0 60px;
    transition: opacity 0.2s ease;

    @include mq($bp-medium) {
      padding: 10px 0 100px;
    }

    &_hide {
      opacity: 0;
    }
  }

  &__not-found {
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
    padding-top: 30px;

    @include mq($bp-small-medium) {
      grid-gap: 80px;
    }

    @include mq($bp-medium-big) {
      padding-top: 60px;
    }
  }

  &__get-offer {
    margin: 0 -15px;

    @include mq($bp-small) {
      margin: 0 -30px;
    }

    @include mq($bp-medium) {
      margin: 0 -81px;
    }

    @include mq($bp-medium-big) {
      margin: 0 -146px;
    }
  }

  &__advantages {
    padding-bottom: 100px;
  }

  &__micro-marking {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

&__all-links {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    width: 100%;
    padding: 20px 0;

    @include mq($bp-small) {
      flex-direction: row;
      column-gap: 40px;
    }

    &-line {
      display: none;
      align-self: stretch;
      width: 1px;
      min-height: 100%;
      background-color: var(--grayMediumLight);

      @include mq($bp-small) {
        display: block;
      }
    }

    &-item{
      &_other-links {
        @include mq($bp-small) {
          flex: 1 1 fit-content;
        }
      }

      &_links {
        @include mq($bp-small) {
          flex: 1 1 100%;
        }
      }

    }

  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }
}
</style>
