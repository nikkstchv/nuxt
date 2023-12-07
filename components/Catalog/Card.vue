<template>
  <SkeletonCatalogCard v-if="!images.length" />
  <div v-else class="card">
    <CardHeader
      v-if="!isQr"
      :id="id"
      :type-of-transport="typeOfTransport"
      class="card__header"
      :exponea-item-data="exponeaItemData"
      :agree-remove="agreeRemove()"
    />
    <nuxt-link class="card__link-wrapper" :to="link || `/catalog/${id}/`">
      <div
        ref="imageContainer"
        class="card__image-container"
        @mouseenter="loadHoverImage"
      >
        <div v-if="hasPanorama || hasVideoPanorama" class="card__360">
          360°
        </div>
        <section class="card__image-wrapper">
          <div
            class="card__image-item card__image-item_active card__image-item_left"
          >
            <div class="card__image-holder">
              <nuxt-img
                v-if="mainImage"
                ref="mainImage"
                class="card__image card__image_main"
                sizes="sm:100vw s:50vw mb:30vw sb:20vw"
                :src="mainImage"
                :alt="altMainImage"
                loading="lazy"
              />
            </div>
            <div
              class="card__image-pagination"
              :style="{ opacity: !isShowHoverPhoto && '0 !important' }"
            />
          </div>
          <div
            v-if="isShowHoverPhoto"
            class="card__image-item card__image-item_right"
          >
            <div class="card__image-holder">
              <img
                ref="hoverImage"
                class="card__image card__image_main"
                :alt="altHoverImage"
              >
            </div>
            <div class="card__image-pagination" />
          </div>
        </section>
      </div>
      <span class="card__status">{{ isActive ? 'Новинка' : '' }}</span>
      <p class="card__title">
        {{ mark }} {{ model }}
      </p>
      <p v-if="generation" class="card__generation">
        {{ generation }}
      </p>
      <p class="card__description">
        {{ arrayOfValuesToString(description) }}
      </p>
      <p class="card__modification">
        <span>{{ color }}</span>
        <br>
        <span>{{ modification }}</span>
        <br>
        <span
          class="card__equipment card__item"
          :class="{
            card__item_hide: isBaseEquipment && countOptions === '0',
          }"
        >{{ isBaseEquipment ? '' : equipment }}
          <span
            :class="{ card__item_hide: countOptions === '0' }"
            class="card__additional card__item"
          >
            {{ descriptionOptions }}
          </span></span>
      </p>
    </nuxt-link>
    <!--    <p v-if="credit > 0" class="card__credit card__item">-->
    <!--      {{ `от ${toPrice(credit, true)}  ₽/мес.` }}-->
    <!--    </p>-->
    <UIIndicator
      class="card__indicator card__item"
      :class="{ card__item_hide: !isShowIndicator }"
      :type="statusForWeb"
    />
    <div
      class="card__default-price-wrapper card__item"
      :class="{ card__item_hide: !isShowDefaultPrice }"
    >
      <p class="card__default-price">
        {{ `${toPrice(defaultPrice, true)}` }}
      </p>
      <p class="card__percent">
        -{{ percent }}%
      </p>
    </div>
    <p v-if="price > 0" class="card__price">
      {{ `${isShowDefaultPrice ? 'от ' : ''}${toPrice(price, true)} ₽` }}
    </p>
    <div
      class="card__labels card__item"
      :class="{ card__item_hide: !specialAndCustomLabels }"
    >
      <UILabel
        v-for="label in specialAndCustomLabels"
        :key="label.name"
        :name="label.name"
        :type="label.type"
        class="card__label"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'

export default {
  name: 'CatalogCard',
  props: {
    link: {
      type: String,
      required: false,
      default: '',
    },
    images: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: null,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    modification: {
      type: String,
      required: true,
    },
    generation: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: '',
    },
    equipment: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    credit: {
      type: [Number, String],
      required: true,
      default: '',
    },
    price: {
      type: [Number, String],
      required: true,
    },
    defaultPrice: {
      type: [Number, String],
      required: true,
    },
    countOptions: {
      type: String,
      required: true,
      default: '0',
    },
    typeOfTransport: {
      type: String,
      required: false,
      default: '1',
    },
    statusForWeb: {
      type: String,
      required: true,
      default: '',
    },
    labels: {
      type: Array,
      required: true,
      default: null,
    },
    holdingId: {
      type: String,
      required: true,
      default: '1',
    },
    hasPanorama: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasVideoPanorama: {
      type: Boolean,
      required: false,
      default: false,
    },
    allData: {
      type: Object,
      required: false,
      default: () => {},
    },
    isQr: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    imageWidth: 0,
    sorted: null,
    isLoadHoverImage: false,
    imageContainer: null,
    isMobile: null,
    typeOfTransportName: {
      1: 'Автомобиль',
      2: 'Мотоцикл',
      3: 'Коммерческий транспорт',
      4: 'Квадроцикл',
    },
  }),
  computed: {
    exponeaItemData () {
      /* eslint-disable */
      if(!useIsEmpty(this.allData)) {
        const getFormattedPrice = price => (price / 100).toFixed(2)
        const {
          id,
          mark: brand,
          model,
          modification,
          equipment,
          generation,
          series,
          isNew,
          carType,
          carId: article_number,
          price: priceRaw,
          disprice: dispriceRaw,
          manufactureYear: year,
          labels: labelsRaw,
          statusForWeb: status,
          totalTrip: total_trip,
          color: color_ext,
        } = this.allData
        const condition = isNew === 'Новый' ? 'new' : 'used'
        const type = 'vehicle'
        const currentUrl = `https://${this.domain}${this.$route.fullPath}`
        const itemUrl = `https://${this.domain}/catalog/${id}/`
        const source = 'web_app'
        const label = labelsRaw?.map(label => label.name)
        const category_1 = carType
        const category_2 = condition
        const category_3 = brand
        const price = getFormattedPrice(priceRaw)
        const disprice = getFormattedPrice(dispriceRaw)
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
      }
      return {}
      /* eslint-enable */
    },
    percent () {
      const percent = Math.floor((this.price * 100) / this.defaultPrice)
      return 100 - percent
    },
    isShowDefaultPrice () {
      return this.defaultPrice > this.price && this.percent !== 0
    },
    isBaseEquipment () {
      return this.equipment === 'Базовая' || this.equipment === 'Base'
    },
    isShowIndicator () {
      return !!this.statusForWeb
    },
    descriptionOptions () {
      const additionalText = 'доп.'
      const optionText = this.$declOfNum(this.countOptions, [
        'опция',
        'опции',
        'опций',
      ])

      return `(+${this.countOptions} ${additionalText} ${optionText})`
    },
    isOnlyNoPhoto () {
      return this.images.length === 1
    },
    isShowHoverPhoto () {
      return !this.isOnlyNoPhoto && !this.isMobile
    },
    mainImage () {
      if (this.images.length) {
        return this.images[0]?.source?.url ?? ''
      }
      return ''
    },
    hoverImage () {
      if (this.images.length) {
        return this.images[1]
      }
      return ''
    },
    specialAndCustomLabels () {
      if (this.labels) {
        const labels = []
        const isAvtodomWithAsc = this.holdingId === '2' && this.isAvtodom
        const isAscWithAvtodom = this.holdingId === '1' && this.isAsc

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

        this.labels.forEach((label) => {
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
    altImageText () {
      if (this.description.length) {
        const manufactureYear = this.description[1]
        const condition = this.description[0].toLowerCase()
        const totalTrip = this.description[2] ? ' ' + this.description[2] : ''
        return `${this.mark} ${this.model} ${this.generation} ${this.modification} ${this.equipment} ${this.color} ${manufactureYear} ${condition}${totalTrip}`
      }
      return ''
    },
    altMainImage () {
      const transportName = this.typeOfTransportName[this.typeOfTransport]
      return `${transportName} ${this.altImageText}`
    },
    altHoverImage () {
      return `Интерьер ${this.altImageText}`
    },
    ...mapState(useHoldingStore, {
      isAvtodom: 'isAvtodom',
      isAsc: 'isAsc',
      domain: 'domain',
    }),
  },
  mounted () {
    this.isMobile = window.matchMedia('(max-width: 1400px)').matches
  },
  methods: {
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
    agreeRemove () {
      this.$emit('agreeRemove')
    },
    findHoverImgOnAngle (angle) {
      return this.images.find(img => img.angle === angle)
    },
    loadHoverImage () {
      if (
        this.hoverImage &&
          !this.isLoadHoverImage &&
          !this.isOnlyNoPhoto &&
          !this.isMobile &&
          this.$refs.hoverImage !== undefined
      ) {
        this.$refs.hoverImage.src = this.hoverImage.source.url
        this.isLoadHoverImage = true
      }
    },
    changeImageWidth () {
      if (this.images && this.images[0]?.source) {
        const widthEl = this.$refs.mainImage.offsetWidth
        const ratio = widthEl / this.images[0].source.width
        this.imageWidth = this.images[0].source.height * ratio
      }
    },
    arrayOfValuesToString (array) {
      return array
        .filter(Boolean)
        .filter(item => item !== '0')
        .join(' / ')
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border: 0 1px 1px 0 solid var(--blackLight);

  &:hover :deep(.card-header__heart) {
    opacity: 1;
  }

  &:hover :deep(.card-header__compare) {
    opacity: 1;
  }

  &__item {
    &_hide {
      cursor: default;
      user-select: none;
      opacity: 0;
    }
  }

  &__header {
    padding-top: 18px;
    margin-bottom: 15px;
  }

  &__link-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__image-container {
    position: relative;
    display: grid;
    place-items: center;
    align-items: center;
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0;

    @media (max-width: $bp-small) {
      margin-bottom: 0;
    }
  }

  &__image-wrapper {
    display: inline-flex;
    width: 100%;

    &:hover .card__image-pagination {
      background-color: var(--grayMediumLight);
      opacity: 1 !important;
    }
  }

  &__360 {
    @include text_medium_small;

    position: absolute;
    top: 17px;
    right: 10px;
    z-index: 1;
    padding: 4px 10px;
    pointer-events: none;
    background: white;
    border-radius: 4px;
    box-shadow: 0 20px 24px rgb(153 155 168 / 15%);
  }

  &__image-item {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    align-items: center;
    padding-top: 75%;

    &_left {
      justify-content: flex-end;
      padding-right: 5px;
    }

    &_right {
      justify-content: flex-start;
      padding-left: 5px;
    }

    &_active {
      & .card__image-holder {
        opacity: 1;
      }

      & .card__image {
        opacity: 1;
      }
    }

    &:hover .card__image-holder {
      opacity: 1 !important;
    }

    &:hover .card__image {
      opacity: 1 !important;
    }

    &:hover > .card__image-pagination {
      background-color: var(--grayDolphin);
    }
  }

  &__image-holder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
  }

  &__image-pagination {
    z-index: 1;
    width: 30px;
    height: 4px;
    margin-bottom: 12px;
    background-color: var(--grayMediumLight);
    border-radius: 1.5px;
    opacity: 0;
    transition: 0.1s;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 150px;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    background: white;
    opacity: 0;
    object-fit: contain;

    &_hover {
      opacity: 0;
    }
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px 5px;
    min-height: 28px;
    margin-top: 15px;
  }

  &__title {
    @include text_small_bold;

    overflow: hidden;
    text-overflow: ellipsis;

    @include mq($bp-small) {
      @include text_medium_bold;
    }
  }

  &__generation {
    @include text_medium_regular;

    color: var(--blackLight);
  }

  &__modification {
    @include text_small_regular;

    margin-bottom: 29px;
    color: var(--blackLight);

    @include mq($bp-small) {
      @include text_medium_regular;
    }
  }

  &__description {
    @include text_small_regular;

    padding-top: 10px;
    color: var(--blackLight);

    @include mq($bp-small) {
      @include text_medium_regular;
    }
  }

  &__default-price-wrapper {
    display: flex;
    grid-gap: 8px;
    margin-bottom: 2px;
  }

  &__default-price {
    @include text_small_regular;

    color: var(--grayDolphin);
    text-decoration-line: line-through;
    text-decoration-color: var(--orange);
  }

  &__percent {
    @include text_small_super;

    padding: 2px 4px;
    font-weight: 600;
    color: var(--royalBlue);
    background: rgba(var(--neonBlue-rgba), 0.07);
    border-radius: 4px;
  }

  &__price {
    @include h5;

    @include mq($bp-small) {
      @include h4;

      width: max-content;
      margin-right: 10px;
      white-space: nowrap;
    }
  }

  &__credit {
    @include text_small_regular;
  }

  &__indicator {
    min-height: 18px;
    margin-bottom: 15px;
  }

  &__status {
    @include label_small;

    margin-bottom: 5px;
    visibility: hidden;
    opacity: 0;
  }

  &__additional {
    @include text_small_regular;

    color: var(--grayDark);
  }
}
</style>
