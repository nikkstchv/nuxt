<template>
  <div class="selection">
    <section
      class="selection__main"
      :class="{
        selection__main_asc: isAsc,
        selection__main_avtodom: isAvtodom,
      }"
    >
      <div v-if="filterData" class="selection__wrapper">
        <component :is="isAsc ? 'p' : 'h1'" class="selection__title">
          {{ isAsc ? 'Автомобили и мототехника' : 'Автомобили и мотоциклы' }}
        </component>
        <p class="selection__subtitle">
          {{ isAsc ? 'для семьи и бизнеса' : 'премиум и люкс классa' }}
        </p>
        <UIBaseSelectButtons
          ref="typeButtons"
          class="selection__types"
          :buttons="typeButtons"
          @onChangeButtons="onChangeTypeButtons"
        />
        <UIBaseSelectButtons
          ref="tabButtons"
          class="selection__tabs"
          :buttons="tabButtons"
          @onChangeButtons="onChangeTabButtons"
        />
        <form class="selection__form">
          <template v-if="filterData">
            <MainSelectionItem
              class="selection__filter-item selection__filter-item_mark"
              placeholder="Марка"
              :model="form.mark"
              :checkboxes-list="filterDataMarks"
              form-item-name="mark"
              @setFormData="setFormData"
              @clearFormData="clearFormData"
            />
            <MainSelectionItem
              class="selection__filter-item selection__filter-item_model"
              placeholder="Модель"
              :model="form.model"
              :checkboxes-list="filterDataModels"
              :disable="!form.mark.length"
              form-item-name="model"
              @setFormData="setFormData"
              @clearFormData="clearFormData"
            />
            <FilterRangeSliderInput
              v-model.lazy.trim="form.priceMin"
              class="selection__filter-item selection__filter-item_price selection__filter-item_price_min"
              :placeholder="`от ${
                disprice[0] ? `${$toLocalPrice(disprice[0])} ₽` : ''
              }`"
              hide-clear
              :mask="true"
            />
            <FilterRangeSliderInput
              v-model.lazy.trim="form.priceMax"
              class="selection__filter-item selection__filter-item_price selection__filter-item_price_max"
              :placeholder="`до ${
                disprice[1] ? `${$toLocalPrice(disprice[1])} ₽` : ''
              }`"
              hide-clear
              :mask="true"
            />
            <UIBaseButton
              class="selection__button"
              primary
              @click="onSearch"
            >
              {{ rangePriceData }}
            </UIBaseButton>
            <MainSelectionFastFilters :list="fastFilters" class="selection__fast-filters" />
          </template>
        </form>
      </div>
      <UILoader v-else />
    </section>
    <MainSelectionServiceOnlineCard />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'
import { getMiniFilter } from '@/api/routes/catalog'
import { getPicker } from '@/api/routes/picker'

export default {
  name: 'MainSelectionBlock',
  data () {
    return {
      condition: 'new',
      type: 'cars',
      typeButtons: [
        {
          label: 'Автомобили',
          code: 'cars',
          isActive: true,
        },
        {
          label: 'Мотоциклы',
          code: 'moto',
          isActive: false,
        },
        {
          label: 'Квадроциклы',
          code: 'atv',
          isActive: false,
        },
        {
          label: 'Комм. транспорт',
          code: 'commercial',
          isActive: false,
        },
      ],
      tabButtonsDefault: [
        {
          label: this.$config.public.domain === 'avtodom' ? 'Новые модели' : 'Новые',
          code: 'new',
          isActive: true,
        },
        {
          label: 'С пробегом',
          code: 'used',
          isActive: false,
        },
      ],
      tabButtonsCommercial: [
        {
          label: 'Легковой',
          code: 'fleet',
          isActive: true,
        },
        {
          label: 'Грузовой',
          code: 'trucks',
          isActive: false,
        },
      ],
      form: {
        mark: [],
        model: [],
        priceMin: '',
        priceMax: '',
      },
      disprice: [null, null],
      filterData: null,
      pickerData: null,
    }
  },
  computed: {
    minDefaultPrice () {
      return this.filterData.disprice.base[0]
    },
    rangePriceData () {
      let maxPrice = 0
      let minDefPrice = 0

      if (this.minDefaultPrice) {
        minDefPrice = this.minDefaultPrice.slice(
          0,
          this.minDefaultPrice.length - 2,
        )
      }

      if (this.form.priceMax) {
        maxPrice = this.form.priceMax.replace(/ /g, '')
      }

      if (Number(minDefPrice) > Number(maxPrice) && maxPrice !== 0) {
        return `Таких ${this.setTitleCarType} нет`
      }
      return `Показать ${this.filterData.total}  ${this.typeOfTransport}`
    },
    fastFilters () {
      const array = this.pickerData?.[this.type]?.[this.condition] ?? []

      return array.slice(0, 3).sort((a, b) => a.sort > b.sort)
    },
    filterDataMarks () {
      return this.filterData?.mark ?? []
    },
    filterDataModels () {
      return this.filterData?.model ?? []
    },
    isCommercialType () {
      return this.type === 'commercial'
    },
    typeOfTransport () {
      const total = this.filterData.total
      const aliases = {
        cars: ['автомобиль', 'автомобиля', 'автомобилей'],
        moto: ['мотоцикл', 'мотоцикла', 'мотоциклов'],
        atv: ['квадроцикл', 'квадроцикла', 'квадроциклов'],
        commercial: [
          'комм. транспорт',
          'комм. транспорта',
          'комм. транспортов',
        ],
      }
      return this.$declOfNum(total, aliases[this.type])
    },
    setTitleCarType () {
      const carTitles = {
        cars: 'автомобилей',
        moto: 'мотоциклов',
        atv: 'квадроциклов',
        commercial: 'транспортов',
      }
      return carTitles[this.type]
    },
    tabButtons () {
      return this.isCommercialType
        ? this.tabButtonsCommercial
        : this.tabButtonsDefault
    },
    transportType () {
      return this.condition === 'trucks' || this.condition === 'fleet' ? this.condition : this.type
    },
    ...mapState(useHoldingStore, ['isAsc', 'isAvtodom']),
  },
  watch: {
    type (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.handleOnChange()
        this.clearForm()
      }
    },
    condition (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.handleOnChange()
        this.clearForm()
      }
    },
    'form.mark' (newValue, oldValue) {
      if (newValue.length !== oldValue.length) {
        this.form.model = []
      }
    },
    form: {
      async handler () {
        const priceMin = this.form.priceMin ?? this.disprice[0]
        const priceMax = this.form.priceMax ?? this.disprice[1]
        const priceMinQuery = this.getFormattedPrice(priceMin)
        const priceMaxQuery = this.getFormattedPrice(priceMax)
        const priceQuery = this.checkAndGetValidPrice(
          priceMinQuery,
          priceMaxQuery,
        )
          .replace('&', ' ')
          .replaceAll('disprice=', '')
          .split(' ')
        this.filterData = await this.getFilter({
          transportType: [this.transportType],
          ...(this.type !== 'commercial' && { condition: [this.condition] }),
          ...(this.form.mark.length && { mark: this.form.mark }),
          ...(this.form.model.length && { model: this.form.model }),
          ...(priceQuery.length === 2 && { disprice: priceQuery }),
        })
        this.setDisprice()
      },
      deep: true,
    },
  },
  async mounted () {
    const initData = await this.fetchInitData()
    this.typeButtons = this.typeButtons.filter((button) => {
      return initData?.transportType.find((item) => {
        const isEqualCode = item.code === button.code
        if (this.isAvtodom && item.code !== 'atv') {
          return isEqualCode
        } else if (this.isAsc && item.code !== 'moto') {
          return isEqualCode
        }
        return false
      })
    })
    await this.handleOnChange()
    this.pickerData = await this.getPicker()
  },
  methods: {
    async handleOnChange () {
      this.filterData = await this.fetchOnChange()
      const hasAllCondition = this.checkCondition(this.filterData)

      if (!hasAllCondition) {
        this.setTabButtons()
      }

      if (this.filterData.total === '0') {
        this.condition = 'used'
      }
      this.setDisprice()
    },

    async fetchOnChange () {
      return await this.getFilter({
        transportType: [this.transportType],
        ...(this.type !== 'commercial' && { condition: [this.condition] }),
      })
    },
    async fetchInitData (data) {
      return await this.getFilter(data)
    },
    async getPicker () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getPicker())
      if (!$hasErrorResponse(res)) {
        return res
      }
    },
    setTabButtonsDefault () {
      this.tabButtonsDefault = this.tabButtonsDefault.map((button) => {
        return { ...button, isActive: this.condition === button.code }
      })
    },
    setTabButtons () {
      this.tabButtons = this.tabButtons.filter((button) => {
        return this.filterData.condition.find((item) => {
          return item.code === button.code && item.count > 0
        })
      })
    },
    checkCondition (filterData) {
      return filterData.condition.every(item => item.count > 0)
    },
    setDisprice () {
      this.disprice = this.filterData.disprice.filtered.map((disprice) => {
        if (disprice === '0') {
          return ''
        }
        return disprice
      })
    },
    clearForm () {
      const defaultForm = {
        mark: [],
        model: [],
        priceMin: '',
        priceMax: '',
      }
      if (!useIsEqual(defaultForm, this.form)) {
        this.form = defaultForm
      }
    },
    onChangeTabButtons () {
      const activeButton = this.$refs.tabButtons.getActiveButton()
      this.condition = activeButton.code
      if (!this.isCommercialType) {
        this.setTabButtonsDefault()
      }
    },
    onChangeTypeButtons () {
      const activeButton = this.$refs.typeButtons.getActiveButton()
      this.type = activeButton.code
      if (this.isCommercialType) {
        this.onChangeTabButtons()
      }
    },
    getFormattedPrice (price) {
      const newPrice = parseInt(price.replaceAll(/\s/g, ''))
      return newPrice * 100
    },
    getCheckboxQueryString (name) {
      let queryString = ''

      if (this.form[name]?.length > 1 || this.isCommercialType) {
        queryString = this.form[name]
          .map((item) => {
            return `${name}=${item}`
          })
          .join('&')
      } else {
        queryString = this.form[name][0] ?? ''
      }

      return queryString
    },
    getCheckboxQuery () {
      const markParam = this.form.mark?.length === 1 && !this.isCommercialType
      const modelParam = this.form.model?.length === 1 && !this.isCommercialType
      const markString = this.getCheckboxQueryString('mark')
      const modelString = this.getCheckboxQueryString('model')

      return {
        markInfo: {
          isParamMark: markParam,
          stringMark: markString,
        },
        modelInfo: {
          isParamModel: modelParam,
          stringModel: modelString,
        },
      }
    },
    checkAndGetValidPrice (min, max) {
      let newMin = min
      let newMax = max
      const dispriceMin = this.disprice[0]
      const dispriceMax = this.disprice[1]

      if (min && max) {
        if (min > max) {
          newMax = dispriceMax
          newMin = dispriceMax
        }
      } else if (min && !max) {
        newMax = dispriceMax
      } else if (!min && max) {
        newMin = dispriceMin
      } else {
        return ''
      }

      if (min < dispriceMin || min > dispriceMax) {
        newMin = dispriceMin
      }
      if (max > dispriceMax || max < dispriceMin) {
        newMax = dispriceMax
      }
      if (max > newMax) {
        newMax = max
      }

      return [`disprice=${newMin}`, `disprice=${newMax}`].join('&')
    },
    onSearch () {
      const condition = this.condition
      const priceMin = this.form.priceMin
      const priceMax = this.form.priceMax
      const { markInfo, modelInfo } = this.getCheckboxQuery()
      const { isParamMark, stringMark } = markInfo
      const { isParamModel, stringModel } = modelInfo
      const priceMinQuery = this.getFormattedPrice(priceMin)
      const priceMaxQuery = this.getFormattedPrice(priceMax)
      const priceQuery = this.checkAndGetValidPrice(
        priceMinQuery,
        priceMaxQuery,
      )
      const price = priceQuery ? '&' + priceQuery : ''

      let carType = this.type
      let urlWithQuery
      let model = ''

      if (this.form.mark.length && this.condition !== 'trucks') {
        const selectedCarType = this.filterData.mark.find(
          item => item.code === this.form.mark[0],
        )

        if (selectedCarType) {
          carType = selectedCarType.carType
        }
      }

      if (isParamModel && stringModel) {
        model = '&model=' + stringModel
      } else if (stringModel) {
        model = '&' + stringModel
      }

      if (isParamMark && isParamModel) {
        urlWithQuery = `/${carType}/${condition}/${stringMark}/${stringModel}/?${price}`
      } else if (isParamMark) {
        urlWithQuery = `/${carType}/${condition}/${stringMark}/?${stringModel}${price}`
      } else {
        urlWithQuery = `/${carType}/${condition}/?${stringMark}${model}${price}`
      }

      const urlWithQueryCommercial = `/${carType}/${condition}/?${stringMark}${model}${price}`
      const urlWithQueryCommercialFleet = `/${carType}/fleet/?${stringMark}${model}${price}`

      if (this.isCommercialType && (condition === 'new' || condition === 'used')) {
        this.$router.push(urlWithQueryCommercialFleet)
      } else if (this.isCommercialType) {
        this.$router.push(urlWithQueryCommercial)
      } else {
        this.$router.push(urlWithQuery)
      }
    },
    setData (formItemName) {
      return (value) => {
        const found = this[`${formItemName}FilterData`].find(
          item => item.id === value,
        )
        this.setFormData({ value: found.id, formItemName })
      }
    },
    setFormData ({ formItemName, value }) {
      this.form[formItemName] = value
    },
    clearFormData ({ formItemName }) {
      this.form[formItemName] = []
    },
    async getFilter (data) {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const requestOptions = { method: 'POST', body: data }
      const res = await $fetchClient(getMiniFilter(), requestOptions)
      if (!$hasErrorResponse(res)) {
        return res
      }
    },
    onOpenServicePanel () {
      this.onOpenPanel('isOpenService')
    },
    ...mapActions(useFormStore, {
      onOpenPanel: 'onOpen',
    }),
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.selection {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-big) {
    grid-gap: 40px;
    margin-top: 30px;
    margin-right: 146px;
    margin-left: 146px;
  }

  @include mq($bp-big) {
    grid-template-columns: 1fr;
    grid-auto-flow: column;
  }

  &__main {
    @include indentsMainHorizontalMargin;

    position: relative;
    min-height: 502px;
    padding-top: 30px;
    padding-right: 15px;
    padding-bottom: 40px;
    padding-left: 15px;
    margin-top: 20px;
    background: rgba(var(--blackLight-rgba), 50%);
    border-radius: 8px;

    @include mq($bp-super-small) {
      padding-top: 40px;
      padding-bottom: 40px;
      margin-top: 30px;
    }

    @include mq($bp-small-medium) {
      padding-bottom: 60px;
    }

    @include mq($bp-small) {
      padding-right: 40px;
      padding-left: 40px;
    }

    @include mq($bp-medium-big) {
      padding-top: 50px;
    }

    @include mq($bp-big) {
      padding-top: 60px;
      margin-top: 0;
      margin-right: 0;
      margin-left: 0;
    }

    &_avtodom {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        content: '';
        background-color: var(--blackLight);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 8px;

        @include mq($bp-small) {
          background-image: url('assets/images/main/selection/main-avtodom.jpg');
        }
      }
    }

    &_asc {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        content: '';
        background-color: var(--blackLight);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 8px;

        @include mq($bp-small) {
          background-image: url('assets/images/main/selection/main-asc.jpg');
        }
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    margin: auto;

    @include mq($bp-small) {
      max-width: 450px;
    }

    @include mq($bp-big) {
      max-width: 1160px;
    }
  }

  &__title {
    @include h3;

    margin-bottom: 3px;
    color: white;
    text-align: center;

    @include mq($bp-small-medium) {
      margin-bottom: 5px;
    }

    @include mq($bp-small) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__subtitle {
    @include label_small;

    margin-bottom: 15px;
    color: white;
    text-align: center;

    @include mq($bp-small-medium) {
      @include h4;

      font-weight: 600;
    }

    @include mq($bp-small) {
      @include h3;

      font-weight: 600;
    }

    @include mq($bp-medium) {
      margin-bottom: 20px;
    }
  }

  .selection &__types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    width: 100% !important;
    margin-bottom: 30px;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 8px !important;

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
    }

    @include mq($bp-big) {
      max-width: 510px;
      margin: 0 auto 50px;
    }

    & :deep(.select-buttons__button) {
      justify-content: center;
      width: 100%;
      color: white;
      background-color: transparent;
      border-radius: 0 !important;
    }

    & :deep(.select-buttons__button:nth-child(3)) {
      @media (max-width: $bp-small) {
        grid-column-start: 1;
        grid-column-end: 4;
      }
    }

    & :deep(.select-buttons__button_active) {
      color: var(--black);
      background-color: var(--grayLight);
    }

    & :deep(.select-buttons__button_active:hover) {
      cursor: default;
      background-color: var(--grayLight);
    }

    & :deep(.select-buttons__button:not(.select-buttons__button_active):hover) {
      background: rgb(13 10 25 / 60%);
    }
  }

  &__tabs {
    display: flex;
    margin-bottom: -1px;
  }

  &__form {
    display: grid;
    grid-template-areas:
      'mark mark'
      'model model'
      'price-min price-max'
      'fast-filters fast-filters'
      'button button';
    grid-auto-flow: column;
    grid-gap: 2px;
    align-items: center;

    @include mq($bp-big) {
      grid-template-areas:
        'mark mark model model price-min price-max'
        'fast-filters fast-filters fast-filters fast-filters button button';
      grid-gap: 16px 1px;
    }

    @include mq($bp-super-big) {
      grid-template-areas:
        'mark model price-min price-max button'
        'fast-filters fast-filters fast-filters fast-filters fast-filters';
      grid-gap: 16px 1px;
    }
  }

  &__filter-item {
    width: 100%;

    & :deep(.select-input__icon-arrow) {
      top: 18px;
    }

    &_mark {
      grid-area: mark;

      & :deep(.input > .input__area) {
        border-radius: 0 8px 0 0;

        @include mq($bp-big) {
          border-radius: 0 0 0 8px;
        }
      }
    }

    &_model {
      grid-area: model;
    }

    &_price {
      & :deep(.input__area) {
        padding: 18px 10px 18px 16px !important;
      }

      &_min {
        grid-area: price-min;

        & :deep(.input__area) {
          border-radius: 0 0 0 8px !important;

          @include mq($bp-big) {
            border-radius: 0 !important;
          }
        }
      }

      &_max {
        grid-area: price-max;

        & :deep(.input__area) {
          border-radius: 0 0 8px !important;

          @include mq($bp-big) {
            border-radius: 0 8px 8px 0 !important;
          }
        }
      }
    }
  }

  &__fast-filters {
    grid-area: fast-filters;
  }

  .selection &__button {
    grid-area: button;
    width: 100%;
    height: 60px;
    margin: 20px 0 0;
    border-radius: 8px;

    @include mq($bp-big) {
      margin: 0;
    }

    @include mq($bp-super-big) {
      margin: 0 0 0 10px;
    }

    &:not(:disabled) {
      color: white;
      white-space: nowrap;
      background-color: var(--neonBlue) !important;
    }
  }

  & :deep(.select-buttons__container) {
    grid-gap: 0;
    width: fit-content;
    overflow: hidden;
    background: rgb(13 10 25 / 40%);
    border-radius: 8px 8px 0 0;
  }

  & :deep(.select-buttons__button) {
    padding: 10px 18px;
    font-weight: 600;
    line-height: 21px;
    color: white;
    background-color: transparent;
    border-radius: 8px 8px 0 0;
  }

  & :deep(.select-buttons__button_active) {
    color: var(--black);
    background-color: var(--grayLight);
  }

  & :deep(.select-buttons__button_active:hover) {
    cursor: default;
    background-color: var(--grayLight);
  }

  & :deep(.select-buttons__button:not(.select-buttons__button_active):hover) {
    background: rgb(13 10 25 / 60%);
  }

  & :deep(.input__area) {
    padding: 18px 40px 18px 16px;
    border: 1px solid white;
    border-radius: 0;
  }

  & :deep(.input__area::placeholder) {
    color: var(--grayDark);
  }

  & :deep(.input__area:disabled) {
    opacity: 1;
  }

  & :deep(.input__area:disabled::placeholder) {
    color: var(--grayMediumLight);
  }
}
</style>
