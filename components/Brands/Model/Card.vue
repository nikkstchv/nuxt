<template>
  <div class="card">
    <div class="card__container">
      <p class="card__title">
        {{ title }}
      </p>
      <span v-if="year" class="card__year">{{ year }}</span>
      <UIBaseSelectButtons
        ref="selectButtons"
        class="card__select-buttons-container"
        :buttons="showedSeriesButtons"
        @onChangeButtons="onChangeSeries"
      />
      <span
        v-if="activeSection && activeSection.catMinDispirceNew !== '0'"
        class="card__price card__price_new"
        :class="{
          card__price_new_indent: activeSection.catMinDispriceUsed === '0',
        }"
      >Новые{{ isAvtodom ? ' модели' : '' }}: от
        {{ toPrice(activeSection.catMinDispirceNew) }} ₽</span>
      <span
        v-if="activeSection && activeSection.catMinDispriceUsed !== '0'"
        class="card__price card__price_used"
      >С пробегом: от {{ toPrice(activeSection.catMinDispriceUsed) }} ₽</span>
      <UIBaseButton v-if="cardLink" :to="cardLink" text="Смотреть" primary />
    </div>
    <!--    <div-->
    <!--      class="card__image swiper-lazy"-->
    <!--      :data-background="backgroundImage"-->
    <!--      :style="isSingle ? `background-image: url(${backgroundImage})` : ''"-->
    <!--      @click="update"-->
    <!--    >-->
    <!--      <div v-if="!isSingle" class="swiper-lazy-preloader" />-->
    <!--    </div>-->
    <div
      class="card__image"
      :style="`background-image: url(${backgroundImage})`"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'

import { useHoldingStore } from '../../../store/holding'
import { useResizeStore } from '../../../store/resize'

export default {
  name: 'BrandsModelCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      activeSectionLabel: '',
      imageBreakpoint: 1367,
    }
  },
  computed: {
    backgroundImage () {
      if (this.activeSection?.previewMedia) {
        if (this.windowWidth < this.imageBreakpoint && !this.isSingle) {
          return `${this.activeSection.previewMedia}?w=1080&op=resize&upscale=0`
        }

        return this.activeSection.previewMedia
      }
      return ''
    },
    showedSeriesButtons () {
      return this.series.map((item, index) => ({
        ...item,
        isActive: index === 0,
      }))
    },
    cardLink () {
      if (this.activeSection) {
        return `${this.$route.path}${this.activeSection?.code ?? ''}/`
      }
      return ''
    },
    activeSection () {
      return this.series.find(
        series => series.label === this.activeSectionLabel,
      )
    },
    ...mapState(useHoldingStore, ['isAvtodom']),
    ...mapState(useResizeStore, ['windowWidth']),
  },
  watch: {
    series () {
      if (!this.activeSection) {
        this.setDefaultActiveSectionLabel()
      }
    },
  },
  created () {
    this.activeSectionLabel = this.series[0]?.label ?? ''
  },
  methods: {
    setDefaultActiveSectionLabel () {
      this.activeSectionLabel = this.series[0]?.label
    },
    onChangeSeries () {
      const activeButton = this.$refs.selectButtons.getActiveButton()
      this.activeSectionLabel = activeButton.label
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  display: grid;
  grid-template-rows: max-content;
  height: 100%;

  @include mq($bp-big) {
    display: grid;
    grid-template-rows: none;
    grid-template-columns: 1fr 2fr;
    width: calc(1163px);
    min-height: 415px;
  }

  .card &__select-buttons-container {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  &__container {
    display: grid;
    grid-template-rows: max-content max-content 1fr;

    @include mq($bp-big) {
      padding: 25px;
      background-color: var(--grayLight);
    }
  }

  &__image {
    position: relative;
    grid-row-start: 1;
    padding-bottom: 60%;
    margin-bottom: 10px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    @include mq($bp-big) {
      grid-row-start: initial;
      padding-bottom: 0;
      margin-bottom: 0;
      background-color: var(--grayLight);
      background-position: right;
    }
  }

  &__title {
    @include h5;

    margin-bottom: 4px;
    font-weight: 700;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__year {
    @include text_medium_regular;

    margin-bottom: 15px;
    color: var(--grayDark);

    @include mq($bp-medium) {
      margin-bottom: 20px;
    }

    @include mq($bp-medium-big) {
      @include text_big_regular;
    }
  }

  &__link {
    width: fit-content;
  }

  &__price {
    color: var(--grayDark);

    &_new {
      margin-bottom: 4px;

      &_indent {
        margin-bottom: 20px;

        @include mq($bp-small-medium) {
          margin-bottom: 30px;
        }

        @include mq($bp-medium) {
          margin-bottom: 33px;
        }
      }
    }

    &_used {
      margin-bottom: 20px;

      @include mq($bp-small-medium) {
        margin-bottom: 30px;
      }

      @include mq($bp-medium) {
        margin-bottom: 33px;
      }
    }
  }

  & :deep(.select-buttons__button) {
    background-color: var(--grayMediumLight);
  }

  & :deep(.select-buttons__button_active) {
    background-color: var(--blackLight);
  }

  & :deep(.select-button__title) {
    @include text_small_medium;
  }
}
</style>
