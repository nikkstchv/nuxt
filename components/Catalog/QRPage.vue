<template>
  <main ref="top" class="detail qr-page">
    <client-only>
      <div class="detail__main" :class="{ detail__main_sold: isSold }">
        <header class="detail__header header">
          <div class="header__left">
            <UIBackButton
              v-if="showBackward"
              class="detail__back-button"
              :direct-path="pathBackQr"
              :style-qr="sizeQr"
            />
            <div v-if="!isSold" class="header__labels">
              <UIIndicator
                v-if="car.statusForWeb"
                :type="car.statusForWeb"
                class="header__status"
              />
              <UILabel
                v-for="label in specialAndCustomLabels"
                :key="label.name"
                :name="label.name"
                :type="label.type"
                :description="label.description"
                class="header__label"
              />
            </div>
            <h1 class="header__title" @click="onOpenSearch">
              {{ h1 }}
            </h1>
            <DetailQrBuyBlock v-if="!isSold" class="header__sale" />
          </div>

          <div class="header__right">
            <div v-if="isReserved" class="header__reserved reserved">
              <p class="reserved__text">
                Данный {{ typeOfTransportReserved }} уже забронирован другим
                покупателем. Получите выгодное предложение на похожий
                {{ typeOfTransportReserved }}.
              </p>
              <UIBaseButton
                secondary-light
                large
                text="Получить предложение"
                @click="onOpenFormPanel"
              />
            </div>
            <template v-if="!isSold && !isReserved">
              <div class="header__qr qr">
                <QrCode
                  class="qr__image"
                  :value="`${location}/catalog/${car.id}/`"
                  color="#ffffff"
                  :size="120"
                  bg-color="#474450"
                />
                <p class="qr__text">
                  Отсканируйте QR для <br>
                  бронирования ТС
                </p>
              </div>
              <UIBaseButton
                secondary
                large
                class="header__button"
                text="Получить предложение"
                @click="onOpenFormPanel"
              />
            </template>
          </div>
        </header>
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
                  class="detail__icon-header"
                  @openInterier="handleShowModal('Interier', true)"
                  @openExterior="handleShowModal('Exterior', true)"
                />
              </template>
              <section class="detail__image-section">
                <DetailQrHeader
                  :show-interier-btn="hasImagesPanorama"
                  :show-exterior-btn="hasVideoPanorama"
                  class="detail__image-header"
                  @openInterier="handleShowModal('Interier', true)"
                  @openExterior="handleShowModal('Exterior', true)"
                />
                <DetailSwSlider
                  v-if="formattedMedia"
                  class="detail__slider"
                  name="tags"
                  :disable="isSold"
                  :images="formattedMedia"
                  :is-show-footnote="isNewCar"
                  @onOpenGallery="!isSold && onOpenGallery()"
                />
                <GalleryDefault v-if="!isSold" :media="galleryMedia" />
                <DetailQrSoldBlock
                  v-if="isSold"
                  class="detail__sold"
                  :class="{ detail__sold_single: images.length === 1 }"
                  :transport-type="carType"
                />
              </section>
            </div>
          </section>
        </div>
      </div>

      <section :class="['detail__section', 'detail__section_characteristics']">
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
              <span class="detail__list-item-value">
                {{ item.value }}
              </span>
            </li>
          </ul>

          <ul class="detail__list detail__list_car">
            <li
              v-for="item in removeEmpty(mainInfoCar)"
              :key="item.name"
              class="detail__list-item"
            >
              {{ item.name }}
              <span class="detail__list-item-value">
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
                  Object.keys(removeEmptyCharacteristics(groupedCharacteristic))
                    .length
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
      <LazySimilarDetailBlock
        is-qr
        is-show
        :mark-code="car.codes.mark"
        :mark-name-en="mark"
        :model-name-en="model"
        :model-code="car.codes.model"
        :condition-code="car.codes.conditionFilter"
        :car-type-code="carType"
        :dealer-code="car.codes.dealerCode"
        :exclude="car.id"
        :disprice="car.disprice"
        :swiper-buttons="swiperButtons"
        class="detail__on-sale"
      />
      <LazyUIBaseOverlay />
      <LazyFormPanelGetOffer :calltouch-widget-sale-id="calltouchWidgetSaleId" />
      <LazyFormPanelInsurance />
      <LazyFormPanelTradeIn
        :dealer-id="car.technicalInfo.dealerId"
        form-id="form_tradeIn_catalog"
      />
      <LazyFormPanelCreditCatalog :dealer-id="car.technicalInfo.dealerId" />
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
    </client-only>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useGalleryStore } from '../../store/gallery'
import { useFormStore } from '../../store/form'
import { useResizeStore } from '../../store/resize'
import { getDealer } from '@/api/routes/dealer'
import { getModels } from '@/api/routes/brands'

export default {
  name: 'CatalogQrPage',
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
  data: () => ({
    location: '',
    optionGroups: {},
    imagesURL: null,
    equipmentTab: null,
    activeEquipmentItemIndex: 0,
    isShowInterierModal: false,
    isShowExteriorModal: false,
    isShowExpandDescription: false,
    dealer: null,
    modelLinks: null,
    tapInterval: null,
    timerCounter: 0,
    refreshPageInterval: null,
    swiperButtons: false,
    sizeQr: 'custom',
    showBackward: false,
    pathBackQr: '',
  }),
  computed: {
    typeOfTransportReserved () {
      switch (this.car.typeOfTransport) {
        case '1':
          return 'автомобиль'
        case '2':
          return 'мотоцикл'
        default:
          return 'автомобиль'
      }
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
      return !this.isBaseEquipment ? this.technicalInfo?.equipment : ''
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

    isReserved () {
      return this.car.statusForWeb === 'В резерве'
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
    directPathBackQr () {
      return useCookie('detailQrPath')
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
    groupedCharacteristics () {
      const {
        body,
        engine,
        performanceIndicators,
        suspensionAndBrakes,
        transmissionAndControl,
      } = this.car

      const characteristicsGroup = {
        body,
        suspensionAndBrakes,
        transmissionAndControl,
        engine,
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
      return [
        this.technicalInfoData('engineCapacity'),
        this.technicalInfoData('engineType'),
        this.technicalInfoData('gearBoxType'),
        this.technicalInfoData('wheelDriveType'),
        this.technicalInfoData('dealer'),
      ]
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
        this.technicalInfo?.equipment === 'Базовая' ||
        this.technicalInfo?.equipment === 'Base'
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
    ...mapState(useHoldingStore, ['isAvtodom', 'isAsc']),
  },
  async mounted () {
    const { $fetchClient } = useNuxtApp()
    window.scrollTo(0, 0)
    this.setEquipmentTab()
    this.dealer = await this.getDealer()
    this.refreshPage()
    this.startTimeout()
    this.scrollBehavior()
    this.windowSizeChange()
    this.location = this.isAvtodom
      ? 'https://avtodom.ru'
      : 'https://www.ascgroup.ru'
    const res = await $fetchClient(getModels(this.car.codes.mark))
    if (res?.childList?.length) {
      this.modelLinks = this.getModels(res.childList)
    }
  },
  beforeUnmount () {
    clearInterval(this.refreshPageInterval)
  },
  methods: {
    scrollBehavior () {
      setTimeout(() => {
        this.$refs.top.scrollIntoView()
      }, 1000 * 120)
    },
    startTimeout () {
      setTimeout(() => {
        this.pathBackQr = useCookie('detailQrPath')
        this.showBackward = this.$route.path !== this.pathBackQr
        this.timer = setTimeout(() => {
          if (this.pathBackQr !== this.$route.path) {
            this.$router.push(this.pathBackQr)
          }
        }, 60 * 1000 * 2)
        this.addTouchListeners()
      }, 800)
    },

    addTouchListeners () {
      document.addEventListener('click', this.resetTimeout)
      document.addEventListener('touchstart', this.resetTimeout)
      document.addEventListener('touchmove', this.resetTimeout)
      document.addEventListener('touchend', this.resetTimeout)
    },
    removeTouchListeners () {
      document.addEventListener('click', this.resetTimeout)
      document.removeEventListener('touchstart', this.resetTimeout)
      document.removeEventListener('touchmove', this.resetTimeout)
      document.removeEventListener('touchend', this.resetTimeout)
    },
    resetTimeout () {
      clearTimeout(this.timer)
      this.startTimeout()
    },
    refreshPage () {
      this.refreshPageInterval = setInterval(
        this.refreshPage,
        60 * 60 * 1000 * 4,
      )
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
        href: `/brands/${mark}/${model.code}`,
      }))
    },
    async getDealer () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getDealer(this.car.codes.dealerCode))
      if (!$hasErrorResponse(res)) {
        return res
      }
      return null
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
    },
    onCloseAdditionalPopup () {
      this.$refs['additional-popup']?.onClose()
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
    handleShowModal (name, boolean) {
      this[`isShow${name}Modal`] = boolean
    },
    setEquipmentTab () {
      if (this.isIssetBaseOptions && !this.isIssetAdditionalOptions) {
        this.equipmentTab = 'base'
      } else if (!this.isIssetBaseOptions && this.isIssetAdditionalOptions) {
        this.equipmentTab = 'additional'
      }
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
        if (!withoutSchema[item]) {
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
          if (item?.value) { return item }
        })
      }
      return null
    },
    ...mapActions(useGalleryStore, {
      onOpenGallery: 'onOpen',
      onOpenFormPanel: 'form/onOpen',
    }),
    ...mapActions(useFormStore, {
      onOpenFormPanel: 'onOpen',
    }),
    ...mapActions(useResizeStore, ['windowSizeChange']),
  },
}
</script>

<style lang="scss" scoped>
.detail.qr-page {
  .header {
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .arrow-button {
    &__title {
      margin-bottom: 32px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }

  .reserved {
    width: 400px;
  }
}

@mixin indentsMainHorizontal {
  padding-right: 100px;
  padding-left: 100px;
}

.detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;
  padding-top: 48px;

  &__header {
    margin-bottom: 25px;
  }

  &__back-button {
    margin-bottom: 32px;
  }

  .header {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 28px;

    &__title {
      @include h1;

      max-width: 90%;
    }

    &__sale {
      padding-top: 20px;
    }

    &__labels {
      display: flex;
      grid-gap: 8px;
      margin-bottom: 23px;
    }

    &__status {
      margin-right: 28px;
    }

    &__qr {
      margin-bottom: 24px;
    }
  }

  .reserved {
    max-width: 400px;
    padding: 20px;
    background-color: var(--black);
    border-radius: 10px;

    @include mq($bp-medium) {
      margin-top: 20px;
    }

    &__text {
      @include text_big_regular;

      margin-bottom: 20px;
      color: white;
    }
  }

  .qr {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 24px;
    align-items: center;
    width: max-content;

    &__image {
      width: 120px;
      height: 120px;
    }

    &__text {
      @include label;
    }
  }

  &__section {
    &_characteristics {
      @include indentsMainHorizontal;
    }
  }

  &__main {
    @include indentsMainHorizontal;

    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-self: center;

    &_sold {
      @include mq($bp-medium, $bp-medium-big) {
        grid-template-columns: 1fr;
        grid-gap: 0;
        padding-right: 0;
      }

      & .detail__section {
        padding-top: 10px !important;

        @include mq($bp-medium, $bp-medium-big) {
          padding: 30px 50px;
        }
      }

      & .detail__description {
        @include mq($bp-medium) {
          margin-bottom: 50px;
        }
      }
    }
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px 5px;
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

  &__sold {
    margin-top: 30px;

    @include mq($bp-small-medium) {
      position: absolute;
      top: 50%;
      left: 500px;
      z-index: 3;
      width: 350px;
      margin-top: 0;
      transform: translate(-400px, -60%);
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
  }

  &__aside {
    grid-area: aside;
  }

  &__image {
    object-fit: contain;
  }

  &__image-section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

  &__status {
    min-height: 18px;

    @include mq($bp-super-small) {
      @include label;

      min-height: 24px;
    }
  }

  &__indication {
    width: 12px;
    height: 12px;
    background-color: var(--valid);
    border-radius: 50%;
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

    &_characteristic {
      @media (max-width: $bp-medium) {
        @include text_small_regular;
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

  .detail &__on-sale {
    @include indentsMainHorizontal;

    margin-bottom: 100px;
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

  .detail &__drawings {
    grid-gap: 120px;
    margin-bottom: 30px;

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }
  }

  .detail &__slider {
    padding-bottom: 0;
    margin-bottom: 30px;
  }

  & :deep(.play-button__icon) {
    transform: translateX(1px);
  }
}
</style>
