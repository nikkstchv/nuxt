<template>
  <main class="detail">
    <div class="detail__main" :class="{ detail__main_sold: isSold }">
      <UIBreadcrumbs
        class="detail__breadcrumbs"
        :direct-crumbs="directCrumbs"
        :direct-path="directPath"
      />
      <header class="detail__header">
        <h1 class="detail__title" @click="onOpenSearch">
          {{ h1 }}
          <span class="detail__car-id">/ {{ carId }}</span>
        </h1>
        <UIShareIconWithPopup
          class="detail__share"
          :url="`${host}${$route.fullPath}?utm_source=share`"
          :text="shareText"
        />
      </header>
      <UIBackButton
        v-if="!isSold"
        class="detail__back-button"
        :direct-path="directPathBack"
      />
      <DetailAside
        v-if="!isSold"
        class="detail__aside"
        :labels="specialAndCustomLabels"
        :status-for-web="car.statusForWeb"
      />
      <div class="detail__main-info">
        <section
          class="detail__section"
          :class="{ detail__section_sold: isSold }"
        >
          <div class="detail__container">
            <template v-if="!isSold">
              <CardHeader
                :id="car.id"
                :type-of-transport="car.typeOfTransport"
                :show-interier-btn="hasImagesPanorama"
                :show-exterior-btn="hasVideoPanorama"
                :exponea-item-data="exponeaItemData"
                class="detail__icon-header"
                @openInterier="handleShowModal('Interier', true)"
                @openExterior="handleShowModal('Exterior', true)"
              />
              <template v-if="!isDesktop">
                <section v-if="car.statusForWeb" class="detail__head">
                  <UIIndicator
                    class="detail__status"
                    :type="car.statusForWeb"
                  />
                </section>
                <div v-if="specialAndCustomLabels" class="detail__labels">
                  <client-only>
                    <UILabel
                      v-for="label in specialAndCustomLabels"
                      :key="label.name"
                      :name="label.name"
                      :type="label.type"
                      :description="label.description"
                      class="detail__label"
                    />
                  </client-only>
                </div>
              </template>
            </template>
            <section class="detail__image-section">
              <CardHeader
                v-if="!isSold"
                :id="car.id"
                :type-of-transport="car.typeOfTransport"
                :show-interier-btn="hasImagesPanorama"
                :show-exterior-btn="hasVideoPanorama"
                :exponea-item-data="exponeaItemData"
                class="detail__image-header"
                @openInterier="handleShowModal('Interier', true)"
                @openExterior="handleShowModal('Exterior', true)"
              />
              <div v-if="!isHammerLoaded" class="detail__preloader-slider">
                <div class="swiper-lazy-preloader" />
              </div>
              <DetailSlider
                v-else-if="formattedMedia && isHammerLoaded"
                class="detail__slider"
                :disable="isSold"
                :images="formattedMedia"
                :is-show-footnote="isNewCar"
                @onOpenGallery="!isSold && onOpenGallery()"
              />
              <GalleryDefault v-if="!isSold" :media="galleryMedia" />
              <DetailSoldBlock
                v-if="isSold"
                class="detail__sold"
                :class="{ detail__sold_single: images.length === 1 }"
                :label="carId"
                :transport-type="carType"
              />
            </section>
          </div>
        </section>

        <div v-if="car.description" class="detail__special-description">
          <p
            ref="detailSpecialDescription"
            class="detail__special-description-html"
            :class="{
              'detail__special-description-html_expand': isExpandDescription,
            }"
            v-html="car.description"
          />
          <UIBaseButton
            v-if="isShowExpandDescription"
            txt
            @click="handleExpandDescription"
          >
            {{ isExpandDescription ? 'Свернуть' : 'Показать еще' }}
          </UIBaseButton>
        </div>

        <DetailBuyBlock v-if="!isSold" class="detail__sale" />

        <section
          :class="[
            'detail__section',
            'detail__section_characteristics',
            { 'detail__section_no-pt': !isSold },
          ]"
        >
          <div class="detail__description">
            <ul class="detail__list detail__list_dealer">
              <li
                v-for="item in removeEmpty(mainInfoDealer)"
                :key="item.name"
                class="detail__list-item"
                :class="{
                  'detail__list-item_var-type': item.name === 'Возвратный НДС',
                }"
              >
                {{ item.name }}
                <UIInfoIconWithPopup
                  v-if="item.name === 'Возвратный НДС'"
                  class="detail__info-icon"
                >
                  Можно вернуть часть денежных средства с уплаты налога при
                  покупке ТС
                </UIInfoIconWithPopup>
                <span
                  v-else-if="item.name === 'Пробег'"
                  class="detail__list-item-value"
                >
                  {{ formatTotalTrip(item.value) }}
                </span>
                <span v-else class="detail__list-item-value">
                  {{ item.value }}
                </span>
              </li>
            </ul>

            <ul class="detail__list detail__list_car">
              <li
                v-for="item in removeEmpty(mainInfoCar)"
                :key="item.name"
                class="detail__list-item"
                :class="{
                  'detail__list-item_engine': item.name === 'Двигатель',
                  'detail__list-item_engine_volume':
                    item.name === 'Объем двигателя',
                  'detail__list-item_engine_type':
                    item.name === 'Тип двигателя',
                }"
              >
                {{ item.name }}
                <span
                  v-if="item.name === 'Дилерский центр'"
                  class="detail__list-item-value detail__list-item-value_link"
                  @click="onOpenMap"
                >
                  {{ item.value }}
                </span>
                <nuxt-link
                  v-else-if="hasShowLink(item.name)"
                  :to="getLink(item.name)"
                  class="detail__list-item-value detail__list-item-value_link"
                >
                  {{ item.value }}
                </nuxt-link>
                <span v-else class="detail__list-item-value">
                  {{ item.value }}
                </span>
              </li>
            </ul>

            <ul class="detail__list detail__list_exterior">
              <li
                v-for="item in removeEmpty(mainInfoExterior)"
                :key="item.name"
                class="detail__list-item"
              >
                {{ item.name }}
                <span class="detail__list-item-value">{{ item.value }} {{ item.code }}</span>
              </li>
            </ul>

            <ul class="detail__list detail__list_interior">
              <li
                v-for="item in removeEmpty(mainInfoInterior)"
                :key="item.name"
                class="detail__list-item"
              >
                {{ item.name }}
                <span class="detail__list-item-value">{{ item.value }} {{ item.code }}</span>
              </li>
            </ul>
          </div>

          <div v-if="!isAllEmptyOptions" class="detail__equipment">
            <p class="detail__title-section">
              Комплектация {{ markRu }} {{ modelRu }} {{ generation }}
              {{ modification }} {{ manufactureYear }}
            </p>

            <div
              v-if="isIssetAdditionalOptions && isIssetBaseOptions"
              class="detail__tabs"
            >
              <div class="detail__tabs-wrap">
                <button
                  v-for="(item, index) in equipmentTabs"
                  :key="index"
                  :class="[
                    'detail__tab',
                    {
                      detail__tab_active: equipmentTab === item.slug,
                      detail__tab_hide: hasHideEquipmentTab(item.name),
                    },
                  ]"
                  @click="handleClickEquipmentTab(item.slug)"
                >
                  <span>{{ item.name }}</span>
                </button>
                <UIInfoIconWithPopup
                  ref="additional-popup"
                  class="detail__info-icon"
                >
                  Дополнительные опции в списке отмечены знаком
                  <span class="detail__info-icon-circle" />
                  <UIBaseButton
                    v-if="!additionalInfoPopupAccept"
                    secondary-light
                    large
                    class="detail__info-button"
                    @click="handleAdditionalPopup"
                  >
                    Понятно
                  </UIBaseButton>
                </UIInfoIconWithPopup>
              </div>
            </div>

            <div class="detail__equipment-list">
              <DetailEquipmentItem
                v-for="(item, key, index) in groupedEquipment"
                :key="key"
                :item="item"
                :group-name="key"
                :active-tab="equipmentTab"
                :active-index="activeEquipmentItemIndex"
                :item-index="index"
                class="detail__equipment-item"
                @setActiveItemIndex="activeEquipmentItemIndex = index"
              />
            </div>
          </div>

          <CatalogBlockDealer
            v-if="dealer"
            class="detail__dealer"
            :dealer="dealer"
            :car-type="car.codes.carType"
          />

          <div class="detail__characteristics">
            <p class="detail__title-section">
              Характеристики {{ markRu }} {{ modelRu }} {{ generation }}
              {{ modification }} {{ manufactureYear }}
            </p>
            <DetailCarDrawings
              :width="blueprint.length"
              :height="blueprint.height"
              :width-front="blueprint.width"
              :front-view="blueprint.frontView"
              :side-view="blueprint.sideView"
              :ground-clearance="blueprint.groundClearance"
              class="detail__drawings"
            />
            <div class="detail__other-info-characteristics">
              <template
                v-for="(
                  groupedCharacteristic, groupedCharacteristicName
                ) in groupedCharacteristics"
              >
                <ul
                  v-if="
                    Object.keys(
                      removeEmptyCharacteristics(groupedCharacteristic)
                    ).length
                  "
                  :key="groupedCharacteristicName"
                  class="detail__list detail__list-characteristic"
                >
                  <p class="detail__subtitle">
                    {{ car.schema[groupedCharacteristicName] }}
                  </p>
                  <li
                    v-for="(
                      characteristic, characteristicName
                    ) in removeEmptyCharacteristics(groupedCharacteristic)"
                    :key="characteristicName"
                    class="detail__list-item detail__list-item_characteristic"
                  >
                    {{ groupedCharacteristic.schema[characteristicName] }}
                    <span
                      class="detail__list-item-value detail__list-item-value_characteristic"
                    >{{ characteristic }}</span>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </section>
      </div>

      <SimilarBlock
        v-if="isSold"
        :mark-code="car.codes.mark"
        :model-code="car.codes.model"
        :condition-code="car.codes.conditionFilter"
        :car-type-code="carType"
        :body-type="car.codes.bodyWorkType"
        :disprice="car.disprice"
        class="detail__similar"
      />
    </div>

    <BrandsVideo
      v-if="videos?.length"
      :title="`Видео про ${mark} ${model}`"
      :videos="videos"
    />

    <section v-if="!isSold" ref="onSaleBlockRef" class="detail__footer">
      <LazySimilarDetailBlock
        :is-show="isShowOnSaleBlock"
        :mark-code="car.codes.mark"
        :mark-name-en="mark"
        :model-name-en="model"
        :model-code="car.codes.model"
        :condition-code="car.codes.conditionFilter"
        :car-type-code="carType"
        :dealer-code="car.codes.dealerCode"
        :exclude="car.id"
        :disprice="car.disprice"
        class="detail__on-sale"
      />

      <CatalogBlockLinks
        v-if="isOwnBrand && modelLinks"
        :title="`Модели ${mark}`"
        :links="modelLinks"
      />
    </section>

    <client-only>
      <LazyFormPanelTradeIn
        :dealer-id="car.technicalInfo.dealerId"
        form-id="form_tradeIn_catalog"
      />
      <LazyFormPanelCreditCatalog :dealer-id="car.technicalInfo.dealerId" />
      <LazyFormPanelInsurance />
      <LazyPayPanel :calltouch-widget-sale-id="calltouchWidgetSaleId" />
      <LazyFormPanelGetOffer :calltouch-widget-sale-id="calltouchWidgetSaleId" />
      <LazyDetailMapPanel
        v-if="car && dealer"
        :dealer="dealer"
        :holding-id="car.holdingId"
      />
      <LazyDetailInterierModal
        v-if="isShowInterierModal"
        :images="imagesPanorama"
        @close="handleShowModal('Interier', false)"
      />
      <LazyDetailExteriorModal
        v-if="isShowExteriorModal"
        :images="videoPanorama"
        @close="handleShowModal('Exterior', false)"
      />
      <LazySearchPanel ref="panel" is-detail-qr />
      <LazyFormPanelHistory v-if="!isNewCar" />
    </client-only>

    <div
      itemscope
      itemtype="http://schema.org/Product"
      class="detail__micro-marking"
    >
      <span itemprop="brand">{{ mark }}</span>
      <span itemprop="model">{{ model }}</span>
      <span itemprop="name">{{ title }}</span>
      <nuxt-img
        v-if="images[0]?.source"
        itemprop="image"
        alt="главное изображение транспортного средства"
        :src="images[0].source.url"
      />
      <span itemprop="description">{{ description }}</span>
      <span itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <meta itemprop="priceCurrency" content="RUB">
        <span itemprop="price">{{ schemaPrice }}</span>
        <link itemprop="availability" href="http://schema.org/InStock">
      </span>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useResizeStore } from '../../store/resize'
import { useGalleryStore } from '../../store/gallery'
import { useCarStore } from '../../store/car'
import { useMapStore } from '../../store/map'
import { getModels } from '../../api/routes/brands'
import useFetchVideo from '@/components/Brands/hooks/useFetchVideo'
import { getDealer } from '@/api/routes/dealer'

export default defineNuxtComponent({
  name: 'CatalogDetailPage',
  props: {
    car: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    h1: {
      type: String,
      required: true,
      default: '',
    },
  },
  data () {
    return {
      isDesktop: false,
      optionGroups: {},
      imagesURL: null,
      isHammerLoaded: false,
      equipmentTab: null,
      activeEquipmentItemIndex: 0,
      isShowOnSaleBlock: false,
      onSaleBlockObserver: null,
      isExpandDescription: false,
      isShowInterierModal: false,
      isShowExteriorModal: false,
      additionalInfoPopupAccept: false,
      isShowExpandDescription: false,
      dealer: null,
      modelLinks: null,
      tapInterval: null,
      timerCounter: 0,
      videos: null,
    }
  },
  computed: {
    host () {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.host
    },
    equipmentTabs () {
      const all = { name: 'Все', slug: null }
      const base = { name: 'Базовые', slug: 'base' }
      const additional = {
        name: 'Дополнительные',
        slug: 'additional',
      }

      return [all, base, additional]
    },
    calltouchWidgetSaleId () {
      return this.dealer?.calltouchWidgetSaleId ?? ''
    },
    schemaPrice () {
      return this.disprice.replace(/\s/g, '')
    },
    firstImage () {
      return this.images[0]?.source?.url ?? ''
    },
    carId () {
      return this.car.carId
    },
    mark () {
      return this.car.mark
    },
    markRu () {
      return this.car.markRu
    },
    model () {
      return this.car.model
    },
    modelRu () {
      return this.car.modelRu
    },
    manufactureYear () {
      return this.technicalInfo?.manufactureYear
    },
    modification () {
      return this.car.modification
    },
    equipment () {
      return !this.isBaseEquipment ? this.technicalInfo.equipment : ''
    },
    serie () {
      return this.car.serie
    },
    totalTrip () {
      return this.car.totalTrip
    },
    totalTripWithUnit () {
      return `${this.totalTrip.toLocaleString('ru-RU')} км`
    },
    generation () {
      return this.car.generation
    },
    ownersCount () {
      const number = this.car.ownersCount
      return +number || 0
    },
    ptsType () {
      switch (this.car.ptsType) {
        case 'original':
          return 'Оригинал'
        case 'electronic':
          return 'ЭПТС'
        default:
          return null
      }
    },
    disprice () {
      return this.$toLocalPrice(this.car.disprice)
    },
    exteriorColorGroup () {
      return this.technicalInfo?.exteriorColorGroup
    },
    shareText () {
      const { disprice } = this.car
      const totalTripText =
          this.totalTrip > 0 ? `с пробегом ${this.totalTripWithUnit}` : ''
      const manufactureYearText = this.totalTrip > 0 ? this.manufactureYear : ''
      const dispriceText = this.$toLocalPrice(disprice)
      return `Купить ${this.mark} ${this.model} ${this.generation} ${this.serie} ${this.modification} ${this.equipment} ${manufactureYearText} по цене ${dispriceText} руб. ${totalTripText}
      `
    },
    specialAndCustomLabels () {
      if (this.car.labels) {
        const labels = []
        const isAvtodomWithAsc = this.car.holdingId === '2' && this.isAvtodom
        const isAscWithAvtodom = this.car.holdingId === '1' && this.isAsc

        const verifiedPartnerLabel = {
          code: 'verified-partner',
          description: '',
          name: isAvtodomWithAsc ? 'АвтоСпецЦентр' : 'Автодом',
          sort: 500,
          type: 'custom',
        }

        if (isAvtodomWithAsc || isAscWithAvtodom) {
          labels.push(verifiedPartnerLabel)
        }
        this.car.labels.forEach((label) => {
          switch (label.type) {
            case 'special':
              labels.push(this.getFormattedLabel(label))
              break
            case 'custom':
              labels.unshift(label)
              break
          }
        })
        return labels.length ? labels : null
      }
      return null
    },
    isSold () {
      return !this.car.isActive
    },
    isAllEmptyOptions () {
      return !this.car.options?.length ?? null
    },
    carType () {
      return this.car.codes.carType
    },
    hasCommercial () {
      return ['trucks', 'fleet', 'commercial'].includes(this.carType)
    },
    directCrumbs () {
      if (this.hasCommercial) {
        return ['', '', this.h1]
      }
      return ['', '', this.mark, this.model, this.h1]
    },
    directPath () {
      const { conditionFilter, mark, model } = this.car.codes
      const defaultPath = `/${this.carType}/${conditionFilter}/${mark}/${model}/${this.carId}/`
      const jetSkiPath = `/${this.carType}/${conditionFilter}/${this.carId}/`
      const commercialTrucksPath = `/commercial/trucks/${this.h1}/`
      const commercialFleetPath = `/commercial/fleet/${this.h1}/`
      switch (this.carType) {
        case 'commercial':
          return commercialFleetPath
        case 'fleet':
          return commercialFleetPath
        case 'trucks':
          return commercialTrucksPath
        case 'jet-ski':
          return jetSkiPath
        default:
          return defaultPath
      }
    },
    directPathBack () {
      return this.directPath.replace(/[^/]*\/?$/, '')
    },
    isNewCar () {
      return this.technicalInfo?.isNew === 'Новый'
    },
    images () {
      return this.car.images
    },
    imagesPanorama () {
      return this.car.imagesPanorama
    },
    videoPanorama () {
      return this.car.videoPanorama
    },
    hasImagesPanorama () {
      return !!this.imagesPanorama.length
    },
    hasVideoPanorama () {
      return !!this.videoPanorama.length
    },
    formattedMedia () {
      if (this.car.images) {
        return this.getFormattedMedia()
      }
      return null
    },
    galleryMedia () {
      return this.formattedMedia?.flat().map(item => ({
        imageUrl: item.source.source.url,
        videoUrl: item.videoUrl,
      }))
    },
    blueprint () {
      return this.car.blueprint
    },
    technicalInfo () {
      return this.car.technicalInfo
    },
    engine () {
      return this.car.engine
    },
    totalTripInfoData () {
      return (
        this.totalTrip &&
          this.totalTrip > 0 && {
          name: 'Пробег',
          value: this.totalTripWithUnit,
        }
      )
    },
    technicalInfoData () {
      return this.createDataItem.bind(null, this.technicalInfo)
    },
    engineData () {
      return this.createDataItem.bind(null, this.engine)
    },
    groupedCharacteristics () {
      const {
        body,
        engine: engineCharacteristic,
        performanceIndicators,
        suspensionAndBrakes,
        transmissionAndControl,
        battery,
      } = this.car

      const excludeEngineValues = ['chargingTime', 'batteryCapacity', 'powerReserve']
      const filteredEngine = Object.fromEntries(
        Object
          .entries(engineCharacteristic)
          .filter(([key]) => !excludeEngineValues.includes(key)),
      )
      const filteredEngineSchema = Object.fromEntries(
        Object
          .entries(engineCharacteristic.schema)
          .filter(([key]) => !excludeEngineValues.includes(key)),
      )
      filteredEngine.schema = filteredEngineSchema
      const engine = filteredEngine

      const characteristicsGroup = {
        body,
        suspensionAndBrakes,
        transmissionAndControl,
        engine,
        battery,
        performanceIndicators,
      }

      this.removeEmptyCharacteristicsGroup(characteristicsGroup)

      return characteristicsGroup
    },
    mainInfoDealer () {
      const arr = [this.technicalInfoData('manufactureYear')]

      // Пробег, только в used
      if (!this.isNewCar) {
        arr.push(this.totalTripInfoData)

        // ПТС и кол-во по ПТС
        if (this.ptsType) {
          arr.push({ name: 'ПТС', value: this.ptsType })
        }
        if (this.ownersCount > 0) {
          arr.push({
            name: 'Кол-во владельцев по ПТС',
            value: this.car.ownersCount,
          })
        }
      }

      // Поколение
      arr.push({
        name: 'Поколение',
        value: this.generation,
      })
      // Тип кузова
      arr.push(
        this.technicalInfoData('bodyworkType'),
        this.technicalInfoData('modification'),
      )
      // Комплектация
      if (!this.isBaseEquipment) {
        arr.push(this.technicalInfoData('equipment'))
      }

      if (this.car.vatType) {
        arr.push({ name: 'Возвратный НДС', value: this.car.vatType })
      }

      return arr
    },
    mainInfoCar () {
      const arr = [
        this.technicalInfoData('engineCapacity'),
        this.technicalInfoData('engineType'),
        this.engineData('enginePower'),

      ]

      if (this.technicalInfoData('engineType').value === 'Электрический' ||
          this.technicalInfoData('engineType').value === 'Гибридный') {
        arr.push(
          this.engineData('enginePowerKvt'),
          this.engineData('powerReserve'),
        )
      }

      arr.push(
        this.technicalInfoData('gearBoxType'),
        this.technicalInfoData('wheelDriveType'),
        this.technicalInfoData('dealer'),
      )

      return arr
    },
    mainInfoInterior () {
      return [
        this.technicalInfoData('interiorMaterial'),
        {
          ...this.technicalInfoData('interiorColor'),
          code: this.technicalInfo.interiorImporterCode
            ? `(code: ${this.technicalInfo.interiorImporterCode})`
            : '',
        },
      ]
    },
    mainInfoExterior () {
      return [
        this.technicalInfoData('exteriorColorGroup'),
        {
          ...this.technicalInfoData('exteriorColor'),
          code: this.technicalInfo.exteriorImporterCode
            ? `(code: ${this.technicalInfo.exteriorImporterCode})`
            : '',
        },
      ]
    },
    isBaseEquipment () {
      return (
        this.technicalInfo.equipment === 'Базовая' ||
          this.technicalInfo.equipment === 'Base'
      )
    },
    groupedEquipment () {
      return this.car.options.reduce((acc, item) => {
        if (!acc[item.optionGroup]) {
          acc[item.optionGroup] = []
        }

        acc[item.optionGroup].push(item)

        return acc
      }, {})
    },
    isIssetAllOptions () {
      return this.isIssetBaseOptions && this.isIssetAdditionalOptions
    },
    isIssetBaseOptions () {
      return !!this.car.options.find(item => item.standardOption === 1)
    },
    isIssetAdditionalOptions () {
      return !!this.car.options.find(item => item.standardOption === 0)
    },
    isOwnBrand () {
      return this.car.ownBrand === '1'
    },
    exponeaItemData () {
      /* eslint-disable camelcase */
      const {
        id,
        mark: brand,
        model,
        modification,
        generation,
        serie: series,
        carId: article_number,
        price: priceRaw,
        disprice: dispriceRaw,
        labels: labelsRaw,
        statusForWeb: status,
        totalTrip: total_trip,
      } = this.car
      const {
        isNew,
        manufactureYear: year,
        exteriorColorGroup: color_ext,
        equipment,
      } = this.technicalInfo
      const condition = isNew === 'Новый' ? 'new' : 'used'
      const type = 'vehicle'
      const currentUrl = `${this.fullDomainWithProtocol}${this.$route.fullPath}`
      const itemUrl = `${this.fullDomainWithProtocol}/catalog/${id}/`
      const source = 'web_app'
      const label = labelsRaw.map(label => label.name)
      const category_1 = this.carType
      const category_2 = condition
      const category_3 = brand
      const price = this.getFormattedPrice(priceRaw)
      const disprice = this.getFormattedPrice(dispriceRaw)
      return {
        id,
        type,
        condition,
        brand,
        model,
        generation,
        series,
        modification,
        equipment,
        price,
        disprice,
        year,
        item_url: itemUrl,
        event_url: currentUrl,
        source,
        label,
        status,
        total_trip,
        color_ext,
        article_number,
        category_1,
        category_2,
        category_3,
      }
    },
    exponeaItemDataView () {
      const {
        id,
        mark: brand,
        model,
        modification,
        generation,
        discounts: discountsRaw,
        carId: article_number,
        price: priceRaw,
        disprice: dispriceRaw,
        labels: labelsRaw,
        statusForWeb: status,
        totalTrip: total_trip,
        options,
        images,
        serie: series,
        imagesPanorama,
        videoPanorama,
        interiorColorGroup: color_int,
        codes,
      } = this.car
      const { mark: brand_code, model: model_code } = codes
      const {
        isNew,
        manufactureYear: year,
        dealerId: dealer_id,
        dealer: dealer_name,
        exteriorColorGroup: color_ext,
        equipment,
      } = this.technicalInfo
      const condition = isNew === 'Новый' ? 'new' : 'used'
      const type = 'vehicle'
      const currentUrl = `${this.fullDomainWithProtocol}${this.$route.fullPath}`
      const source = 'web_app'
      const label = labelsRaw.map(label => label.name)
      const category_1 = this.carType
      const category_2 = condition
      const category_3 = brand
      const price = this.getFormattedPrice(priceRaw)
      const disprice = this.getFormattedPrice(dispriceRaw)
      const { base, additional } = options.reduce(
        (sum, cur) => {
          if (cur.standardOption === 1) {
            sum.base += 1
          } else {
            sum.additional += 1
          }
          return sum
        },
        { additional: 0, base: 0 },
      )
      const count_options = { base, additional, total: options.length }
      const photos = images.reduce((sum, cur) => {
        const imageType = cur.imageType.toLowerCase()
        if (!sum[imageType]) {
          sum[imageType] = 1
        } else {
          sum[imageType] += 1
        }

        return sum
      }, {})
      const count_photos = {
        exterior: photos?.exterior ?? 0,
        interior: photos?.interior ?? 0,
        detail: photos?.detail ?? 0,
        total: images.length,
      }
      const panoramas = imagesPanorama.reduce((sum, cur) => {
        const imageType = cur.imageType.toLowerCase()
        if (!sum[imageType]) {
          sum[imageType] = 1
        } else {
          sum[imageType] += 1
        }

        return sum
      }, {})
      const count_panorama = {
        exterior: panoramas?.exterior ?? 0,
        interior: panoramas?.interior ?? 0,
        total: imagesPanorama.length,
      }
      const count_video = videoPanorama.length
      return {
        id,
        type,
        condition,
        brand,
        model,
        generation,
        series,
        modification,
        equipment,
        price,
        disprice,
        year,
        discounts: [discountsRaw],
        item_url: currentUrl,
        event_url: currentUrl,
        source,
        label,
        status,
        count_options,
        count_photos,
        count_panorama,
        count_video,
        dealer_id,
        dealer_name,
        total_trip,
        color_ext,
        color_int,
        article_number,
        category_1,
        category_2,
        category_3,
        brand_code,
        model_code,
      }
      /* eslint-enable camelcase */
    },
    ...mapState(useHoldingStore, ['isAvtodom', 'isAsc', 'fullDomainWithProtocol']),
    ...mapState(useResizeStore, ['windowWidth']),

  },
  watch: {
    windowWidth (windowWidth) {
      this.isDesktop = windowWidth > 899
    },
  },

  async mounted () {
    this.hammerInit()
    this.windowWidth = this.windowSizeChangeResize()
    this.addEventListenerResize()
    this.isDesktop = this.windowWidth > 899
    this.setEquipmentTab()
    !this.isSold && this.loadingObserver()
    this.checkBtnExpandDescription()
    this.additionalInfoPopupAccept = this.getAdditionalInfoOnLocalStorage()
    this.dealer = await this.getDealer()
    await this.fetchModelLinks()
    this.handleGoogleAnalytics()
    this.$exponeaItem('view', this.exponeaItemDataView)
    await this.getVideos()
  },
  beforeUnmount () {
    this.removeEventListenerResize()
    if (this.onSaleBlockObserver) {
      this.onSaleBlockObserver.disconnect()
    }
  },
  methods: {
    async getVideos () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()

      const optionsVideo = {
        query: {
          seriesId: this.car.seriesId,
        },
      }

      const videos = await useFetchVideo({
        options: optionsVideo,
        $fetchClient,
        $hasErrorResponse,
      })

      this.videos = videos
    },
    async fetchModelLinks () {
      const { $fetchClient } = useNuxtApp()
      const res = await $fetchClient(getModels(this.car.codes.mark))
      if (res?.childList?.length) {
        this.modelLinks = this.getModels(res.childList)
      }
    },
    onOpenSearch () {
      if (this.hasFiveTap()) {
        this.$refs.panel.open()
      }
    },
    hasFiveTap () {
      this.timerCounter++
      if (this.timerCounter >= 5) {
        this.stopTracking()
        return true
      } else if (!this.tapInterval) {
        this.startTracking()
      }
      return false
    },
    startTracking () {
      this.tapInterval = setInterval(this.stopTracking, 5000)
    },
    stopTracking () {
      this.timerCounter = 0
      this.tapInterval = null
      clearInterval(this.tapInterval)
    },
    getFormattedPrice (price) {
      return (price / 100).toFixed(2)
    },
    getModels (models) {
      const { mark } = this.car.codes
      return models.map(model => ({
        label: `${this.mark} ${model.nameEn}`,
        href: `/brands/${mark}/${model.code}/`,
      }))
    },
    hasShowLink (name) {
      if (this.carType !== 'jet-ski') {
        return name === 'Тип двигателя' || name === 'Привод'
      }
      return null
    },
    getLink (type) {
      const { conditionFilter, mark, model, engineType, wheelDriveType } =
          this.car.codes
      const commercials = ['commercial', 'trucks']
      const commercial = commercials.find(item => item === this.carType)
      const transportType = commercial || 'default'
      const divider = commercial ? '=' : '-is-'
      const schema = {
        'Тип двигателя': commercial ? 'engineType' : 'engine-type',
        Привод: commercial ? 'driveType' : 'drive-type',
      }
      const filter = {
        'Тип двигателя': `${schema[type]}${divider}${engineType}`,
        Привод: `${schema[type]}${divider}${wheelDriveType}`,
      }
      const link = {
        default: `/${this.carType}/${conditionFilter}/${mark}/${model}/${filter[type]}/`,
        commercial: `/commercial/?mark=${mark}&model=${model}&${filter[type]}`,
        trucks: `/commercial/trucks/?mark=${mark}&model=${model}&${filter[type]}`,
      }

      return link[transportType]
    },
    handleGoogleAnalytics () {
      const googleAnalyticsData = this.getGoogleAnalyticsData()
      this.onAddGoogleAnalyticsData(googleAnalyticsData)
      this.initGoogleAnalytics(googleAnalyticsData)
    },
    getGoogleAnalyticsData () {
      const condition =
        this.car.conditionFilter === 'new' ? 'Новый' : 'С пробегом'
      const price = parseInt(this.schemaPrice)
      const locationId = this.dealer?.locationId ?? ''
      return {
        currency: 'RUB',
        value: price, // Цена заказа (авто) без скидок (без пробелов)
        items: [
          {
            item_name: this.h1, // Полное Название авто
            affiliation: this.isAvtodom ? 'Автодом' : 'АвтоСпецЦентр',
            item_id: this.carId, // Артикул товара (<unique_id>)
            price, // Цена авто без скидок (без пробелов)
            location_id: locationId, // Местоположение, связанное с товаром. Лучше id Google для связи с гугл картами в аналитиксе
            item_brand: this.mark, // Брэнд авто
            item_category: condition, // Категория товара
            item_variant: this.modification, // Модификация авто (modification_id)
            quantity: 1,
          },
        ],
      }
    },
    initGoogleAnalytics (data) {
      const body = {
        ecommerce: data,
        event: 'GAEventEC',
        eCategory: 'eEC',
        eAction: 'view_item',
        eLabel: '',
      }
      this.$gtm.trackEvent(body)
    },
    async getDealer () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getDealer(this.car.codes.dealerCode))

      if (!$hasErrorResponse(res)) {
        return res
      }
      return null
    },
    hammerInit () {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.rel = 'nofollow'
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js'
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        this.isHammerLoaded = true
      }
    },
    getFormattedLabel (label) {
      const isExclusive = label.code === 'exclusive'
      if (isExclusive) {
        const asc = 'ascgroup.ru'
        const avtodom = 'avtodom.ru'
        return {
          ...label,
          name: `Эксклюзивно на ${this.isAsc ? asc : avtodom}`,
        }
      }
      return label
    },
    checkBtnExpandDescription () {
      if (this.car?.description) {
        const el = this.$refs.detailSpecialDescription
        this.isShowExpandDescription = el.scrollHeight > el.offsetHeight
      }
    },
    hasHideEquipmentTab (name) {
      switch (name) {
        case 'Все':
          return !this.isIssetAllOptions
        case 'Базовые':
          return !this.isIssetBaseOptions
        case 'Дополнительные':
          return !this.isIssetAdditionalOptions
      }
    },
    handleAdditionalPopup () {
      this.onCloseAdditionalPopup()
      this.setAdditionalInfoOnLocalStorage()
    },
    onCloseAdditionalPopup () {
      this.additionalInfoPopupAccept = true
    },
    setAdditionalInfoOnLocalStorage () {
      localStorage.setItem('additionalInfoPopupAccept', 'true')
    },
    getAdditionalInfoOnLocalStorage () {
      return !!localStorage.getItem('additionalInfoPopupAccept')
    },
    handleExpandDescription () {
      this.isExpandDescription = !this.isExpandDescription
    },
    handleClickEquipmentTab (slug) {
      this.equipmentTab = slug
      if (!slug) {
        this.activeEquipmentItemIndex = 0
        return
      }

      let i = 0
      for (const key in this.groupedEquipment) {
        const acitveItem = this.groupedEquipment[key].find((item) => {
          const isBase = item.standardOption === 1
          const isAdditional = item.standardOption === 0
          const hasName = item.optionName

          if (
            (slug === 'base' && isBase && hasName) ||
            (slug === 'additional' && isAdditional && hasName)
          ) {
            this.activeEquipmentItemIndex = i
            return true
          }
          return false
        })

        if (acitveItem) {
          break
        }
        i++
      }
    },
    loadingObserver () {
      const target = this.$refs.onSaleBlockRef
      const options = { rootMargin: '500px' }
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isShowOnSaleBlock = true
            observer.unobserve(entry.target)
          }
        })
      }

      this.onSaleBlockObserver = new IntersectionObserver(callback, options)

      if (target) {
        this.onSaleBlockObserver.observe(target)
      }
    },

    setEquipmentTab () {
      if (this.isIssetBaseOptions && !this.isIssetAdditionalOptions) {
        this.equipmentTab = 'base'
      } else if (!this.isIssetBaseOptions && this.isIssetAdditionalOptions) {
        this.equipmentTab = 'additional'
      }
    },
    handleShowModal (name, boolean) {
      this[`isShow${name}Modal`] = boolean
    },
    removeEmptyCharacteristicsGroup (characteristicsGroup) {
      for (const characteristicGroup in characteristicsGroup) {
        const characteristic = Object.values(
          characteristicsGroup[characteristicGroup],
        ).slice(1)
        const isEmptyCharacteristicsGroup = characteristic.every(
          item => item === '' || item === 0,
        )
        if (isEmptyCharacteristicsGroup) {
          delete characteristicsGroup[characteristicGroup]
        }
      }
    },
    removeEmptyCharacteristics (path) {
      const newObj = {
        ...path,
      }

      const withoutSchema = this.removeSchema(newObj)

      for (const item in withoutSchema) {
        if (!withoutSchema[item] || withoutSchema[item] === '0') {
          delete withoutSchema[item]
        }
      }

      return withoutSchema
    },
    removeSchema (obj) {
      delete obj.schema

      return obj
    },
    getFormattedVideo () {
      return this.car.video.map((item) => {
        const sourceVideo = {
          source: { ...item.source, url: item.videoUrlPreview },
        }
        return {
          url: item.videoUrlPreview,
          source: sourceVideo,
          isVideo: true,
          videoUrl: item.videoUrl,
        }
      })
    },
    getFormattedImages () {
      return this.images.map((item, index) => {
        return {
          url: item?.source?.url,
          index,
          source: item,
          isVideo: false,
          videoUrl: '',
        }
      })
    },
    getFormattedMedia () {
      const formattedVideo = this.getFormattedVideo()
      const images = this.getFormattedImages()

      const firstImage = images[0]
      const restImages = images.slice(1)

      const urls = [firstImage, ...formattedVideo, ...restImages].map(
        (item, index) => ({ ...item, index }),
      )

      return this.groupImages(urls)
    },
    groupImages (arr) {
      const res = []
      while (arr.length > 0) {
        res.push(arr.splice(0, 3))
      }
      return res
    },
    createDataItem (path, name) {
      return {
        value: path[name] ?? '',
        name: path?.schema[name] ?? '',
      }
    },
    removeEmpty (array) {
      if (array) {
        // eslint-disable-next-line array-callback-return
        return array.filter((item) => {
          if (item?.value && item?.value !== '0') { return item }
        })
      }
      return null
    },
    ...mapActions(useGalleryStore, {
      onOpenGallery: 'onOpen',
    }),
    ...mapActions(useCarStore, {
      onAddGoogleAnalyticsData: 'onAddGoogleAnalyticsData',
    }),
    ...mapActions(useMapStore, {
      onOpenMap: 'onOpen',
    }),
    ...mapActions(useResizeStore, {
      windowSizeChangeResize: 'windowSizeChange',
      addEventListenerResize: 'addEventListener',
      removeEventListenerResize: 'removeEventListener',
    }),
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;

  @include mq($bp-medium) {
    padding-right: 50px;
  }

  @include mq($bp-medium-big) {
    padding-right: 81px;
  }

  @include mq($bp-big) {
    padding-right: 146px;
  }

  &__main {
    display: grid;
    grid-template-areas:
      'breadcrumbs  breadcrumbs'
      'header header'
      'back-button .'
      'main main'
      'footer footer';
    grid-auto-flow: column;
    align-content: flex-start;
    justify-self: center;

    @include mq($bp-medium) {
      grid-template-areas:
        'breadcrumbs  breadcrumbs'
        'header header'
        'back-button .'
        'main aside'
        'footer footer';
      grid-template-columns: auto 330px;
      grid-gap: 0 20px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 0 50px;
    }

    @include mq($bp-big) {
      grid-template-columns: auto 400px;
      grid-gap: 0 110px;
    }

    &_sold {
      grid-template-areas:
        'breadcrumbs breadcrumbs'
        'header header'
        'main main'
        'similar similar';

      @include mq($bp-medium, $bp-medium-big) {
        grid-template-columns: 1fr;
        grid-gap: 0;
        padding-right: 0;
      }

      @include mq($bp-medium-big) {
        grid-template-areas:
          'breadcrumbs  breadcrumbs'
          'header  header'
          'main similar';
      }

      & .detail__section {
        padding-top: 15px !important;

        @include mq($bp-medium, $bp-medium-big) {
          padding: 30px 50px;
        }
      }

      & .detail__description {
        @include mq($bp-medium) {
          margin-bottom: 50px;
        }
      }

      & :deep(.slider__group) {
        padding-right: 0;
      }
    }
  }

  &__share {
    align-self: center;
    justify-self: flex-end;
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px 5px;
    margin-bottom: 15px;
  }

  &__special-description {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    padding: 25px 20px;
    margin: 0 15px 30px;
    background-color: var(--grayLight);
    border-radius: 12px;

    @include mq($bp-small-medium) {
      padding: 30px;
      margin: 0 20px 40px;
    }

    @include mq($bp-small) {
      margin: 0 32px 40px;
    }

    @include mq($bp-medium) {
      margin-right: 0;
      margin-left: 50px;
    }

    @include mq($bp-medium-big) {
      padding: 40px;
      margin-left: 81px;
    }

    @include mq($bp-big) {
      margin-left: 146px;
    }

     & :deep(.detail__special-description-html) {
        @include text_medium_regular;

        max-height: 250px;
        overflow: hidden;
        word-break: break-word;
        white-space: pre-line;

        @include mq($bp-small-medium) {
          max-height: 174px;
        }
      }

     & :deep(.detail__special-description-html_expand) {
      max-height: initial;
    }
  }

  &__breadcrumbs {
    @include indentsMainHorizontal;

    grid-area: breadcrumbs;
    padding-top: 15px;
    margin-bottom: 15px;
  }

  &__similar {
    @media (width <= 1100px) {
      @include indentsMainHorizontal;
    }

    position: sticky;
    top: 150px;
    grid-area: similar;
    height: fit-content;
    margin-bottom: 100px;
  }

  &__back-button {
    @include indentsMainHorizontal;

    grid-area: back-button;
    margin-left: -3px;
  }

  &__sold {
    margin-top: 30px;

    @include mq($bp-small-medium) {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 350px;
      margin-top: 0;
      transform: translate(-50%, -55%);
    }

    @include mq($bp-medium) {
      transform: translate(-90%, -55%);
    }

    @include mq($bp-medium-big) {
      width: 400px;
      transform: translate(-50%, -55%);
    }

    @include mq($bp-big) {
      transform: translate(-83%, -65%);
    }

    @include mq(1500px) {
      transform: translate(-90%, -55%);
    }

    @include mq(1700px) {
      transform: translate(-100%, -55%);
    }

    &_single {
      @include mq($bp-small-medium) {
        transform: translate(-50%, -55%);
      }
    }
  }

  &__main-info {
    grid-area: main;
    width: 100%;

    @include mq($bp-medium) {
      padding-right: 20px;
    }
  }

  &__aside {
    grid-area: aside;
  }

  &__image {
    object-fit: contain;
  }

  &__image-section {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    @include mq($bp-big) {
      min-height: 400px;
    }
  }

  &__preloader-slider {
    height: 300px;

    @include mq($bp-big) {
      height: 620px;
    }
  }

  &__subtitle {
    @include label_small;
    @include overflow-text;

    margin-bottom: 5px;

    @include mq($bp-super-small) {
      @include label;
    }

    @include mq($bp-small-medium) {
      @include label_small;
    }

    @include mq($bp-small) {
      @include text_big_bold;

      margin-bottom: 10px;
    }

    @include mq($bp-medium) {
      @include h4;
    }

    &_option {
      @include mq($bp-medium) {
        margin-bottom: 25px;
      }
    }
  }

  &__button {
    margin-bottom: 15px;
  }

  &__indication {
    width: 12px;
    height: 12px;
    background-color: var(--valid);
    border-radius: 50%;
  }

  &__header {
    display: flex;
    grid-area: header;
    grid-gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding-right: 15px;
    padding-left: 15px;
    margin-bottom: 25px;

    @include mq($bp-small) {
      padding-right: 32px;
      padding-left: 32px;
      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      padding-right: 0;
      padding-left: 50px;
    }

    @include mq($bp-medium-big) {
      padding-left: 81px;
      margin-bottom: 30px;
    }

    @include mq($bp-big) {
      padding-left: 146px;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-small) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__title-section {
    @include text_big_bold;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-small) {
      @include h3;
    }
  }

  &__dealer {
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-small) {
      margin-bottom: 60px;
    }
  }

  &__head {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    margin-bottom: 15px;

    @include mq($bp-small) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium) {
      display: none;
    }
  }

  &__list {
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 15px;

    @include mq($bp-small-medium) {
      grid-gap: 10px;
    }

    &-characteristic {
      display: inline-block;
      width: 100%;
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid-column;
      padding-bottom: 30px;

      @include mq($bp-small-medium) {
        padding-bottom: 40px;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }

    &_option {
      @include mq($bp-medium) {
        grid-gap: 15px;
      }
    }

    &_indent {
      margin-bottom: 40px;

      @include mq($bp-small) {
        margin-bottom: 60px;
      }

      @include mq($bp-medium) {
        margin-bottom: 100px;
      }
    }
  }

  &__list-group {
    margin-bottom: 10px;

    @include mq($bp-medium) {
      margin-bottom: 25px;
    }
  }

  .detail &__icon-header {
    height: fit-content;

    @include mq($bp-medium) {
      display: none;
    }
  }

  &__list-title {
    @include text_small_medium;

    padding-bottom: 2px;
    margin-bottom: 20px;
    color: var(--blackLight);
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-medium) {
      @include text_medium_regular;

      margin-bottom: 25px;
    }
  }

  &__list-item {
    @include text_small_regular;

    display: grid;
    grid-template-columns: 9fr 10fr;
    grid-auto-flow: column;
    margin-bottom: 15px;
    color: var(--grayDark);

    @include mq($bp-small-medium) {
      margin-bottom: 10px;
    }

    @include mq($bp-small) {
      @include text_medium_regular;
    }

    @include mq($bp-medium) {
      grid-template-columns: 2fr 3fr;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &_engine {
      @include mq($bp-small) {
        display: none;
      }
    }

    &_characteristic {
      @media (max-width: $bp-medium) {
        @include text_small_regular;
      }
    }

    &_engine_type,
    &_engine_volume {
      @media (max-width: $bp-small) {
        display: none;
      }
    }

    &_var-type {
      grid-template-columns: max-content max-content 1fr;
      grid-gap: 10px;
    }

    &_option {
      @include text_small_medium;
      @include overflow-text;

      grid-template-columns: 25% auto;
      align-items: flex-start;
      justify-content: flex-start;
      word-break: break-word;

      @include mq($bp-super-small) {
        grid-template-columns: 21% auto;
      }

      @include mq($bp-small) {
        grid-template-columns: 14% auto;
      }

      @include mq($bp-medium) {
        grid-template-columns: 16.5% auto;
      }

      @include mq($bp-big) {
        grid-template-columns: 12.3% auto;
      }

      &_single {
        grid-template-columns: auto !important;

        & .detail__list-item-value {
          padding-left: 0 !important;
        }
      }
    }

    &-value {
      @include text_small_medium;
      @include overflow-text;

      padding-left: 10px;
      color: var(--black);
      text-align: end;

      @include mq($bp-medium) {
        @include text_medium_regular;
      }

      &_option {
        text-align: start;
      }

      &_link {
        justify-self: flex-end;
        width: fit-content;
        padding: 0;
        color: var(--neonBlue);
        cursor: pointer;
        background: transparent;
        border-radius: 0;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--royalBlue);
            background: transparent;
          }
        }
      }

      &_characteristic {
        @include mq($bp-medium) {
          @include text_small_medium;
        }
      }
    }
  }

  .detail &__image-header {
    display: none;
    justify-content: space-between;
    margin-bottom: 7px;

    @include mq($bp-medium) {
      display: flex;
    }

    & :deep(.icon__button) {
      opacity: 1;
    }
  }

  &__description {
    display: grid;
    grid-gap: 10px;
    margin-bottom: 50px;

    @include mq($bp-super-small) {
      margin-bottom: 60px;
    }

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 51px;
    }

    @include mq($bp-medium) {
      row-gap: 40px;
      column-gap: 5%;
      margin-bottom: 70px;
    }

    @include mq($bp-medium-big) {
      row-gap: 50px;
    }

    @include mq($bp-big) {
      column-gap: 9%;
    }
  }

  &__other-info-characteristics {
    row-gap: 30px;
    column-gap: 30px;
    column-count: 1;

    @include mq($bp-small-medium) {
      column-count: 2;
      column-gap: 30px;
    }

    @include mq($bp-small) {
      column-gap: 50px;
    }

    @include mq($bp-medium) {
      column-gap: 5%;
    }

    @include mq($bp-big) {
      column-gap: 9.5%;
    }
  }

  &__section {
    padding: 25px 15px 20px;

    @include mq($bp-super-small) {
      padding: 25px 15px 30px;
    }

    @include mq($bp-small-medium) {
      padding: 30px 20px;
    }

    @include mq($bp-small) {
      padding: 40px 32px;
    }

    @include mq($bp-medium) {
      padding: 30px 0 35px 50px;
    }

    @include mq($bp-medium-big) {
      padding: 30px 0 35px 81px;
    }

    @include mq($bp-big) {
      padding: 27px 0 35px 146px;
    }

    &_no-pt {
      @include mq($bp-medium) {
        padding-top: 0;
      }
    }
  }

  &__sale {
    @include mq($bp-medium) {
      display: none !important;
    }
  }

  &__car-id {
    padding-left: 4px;
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    color: var(--grayDolphin);
    white-space: nowrap;

    @include mq($bp-small-medium) {
      font-size: 22px;
      line-height: 24px;
    }

    @include mq($bp-medium) {
      font-size: 24px;
      line-height: 28px;
    }

    @include mq($bp-medium-big) {
      padding-left: 6px;
      font-size: 26px;
      line-height: 30px;
    }
  }

  &__micro-marking {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  .detail {
    &__footer {
      z-index: 2;
      display: flex;
      flex-direction: column;
      grid-area: footer;
      grid-gap: 60px;
      margin-bottom: 60px;

      @include mq($bp-small) {
        grid-gap: 80px;
        max-width: calc(100vw - 32px);
        padding: 0 0 0 32px;
      }

      @include mq($bp-medium) {
        max-width: calc(100vw - 50px);
        padding: 0 0 0 50px;
      }

      @include mq($bp-medium-big) {
        max-width: calc(100vw - 81px);
        padding: 0 0 0 81px;
      }

      @include mq($bp-big) {
        max-width: calc(100vw - 146px);
        padding: 0 0 0 146px;
      }

      @include mq($bp-super-big) {
        max-width: calc(1920px - 146px);
      }
    }

    &__on-sale {
      @include mq($bp-small) {
        padding: 0;
      }
    }
  }

  &__info {
    &-button {
      @include text_medium_small;

      margin-top: 10px;
    }

    &-icon {
      display: flex;

      & :deep(.icon) {
        width: 17px;
        height: 17px;
      }

      &-circle {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: var(--neonBlue);
        border-radius: 50%;

        @include mq($bp-small) {
          width: 8px;
          height: 8px;
        }
      }
    }
  }

  &__equipment {
    margin-bottom: 60px;

    @include mq($bp-small) {
      margin-bottom: 70px;
    }

    .detail__title-section {
      margin-bottom: 25px;

      @include mq($bp-small) {
        margin-bottom: 30px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
    }
  }

  &__tabs {
    display: grid;
    align-items: flex-start;
    margin: 0 -15px 25px;

    @include mq($bp-small) {
      margin: 0 -15px 30px;
    }

    &-wrap {
      display: flex;
      flex-wrap: wrap;
      row-gap: 15px;
      align-items: center;
      padding: 0 15px;
    }
  }

  &__tab {
    @include text_small_super;

    padding: 9px 20px;
    margin-right: 10px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    background: var(--grayLight);
    border-radius: 20px;

    @include mq($bp-small-medium) {
      margin-right: 15px;
      font-size: 14px;
      line-height: 18px;
    }

    &:last-child {
      margin-right: 0;
    }

    &_active {
      color: white;
      background: var(--blackLight);
    }

    &_hide {
      display: none;
    }
  }

  &__characteristics {
    margin-bottom: 35px;

    .detail__title-section {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 65px;
    }
  }

  &__drawings {
    margin-bottom: 30px;

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }
  }

  & :deep(.play-button__icon) {
    transform: translateX(1px);
  }
}
</style>
