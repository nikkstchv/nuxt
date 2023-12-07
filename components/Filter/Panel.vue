<template>
  <UIBaseOverlay :is-open="isOpenFilter" @click="onCloseFilter">
    <UISidePanel
      class="filters__side-panel"
      :is-open="isOpenFilter"
      @onClose="onCloseFilter"
    >
      <form v-if="isOpenFilter" ref="filters" class="filters">
        <header class="filters__header">
          <p class="filters__title">
            Фильтры
          </p>
          <IconClose class="filters__close" @click="onCloseFilter" />
        </header>
        <section
          class="filters__main"
          :class="{ filters__main_disable: !isInitFilter || isLoading }"
        >
          <FilterItem
            v-for="(value, name) in getTypeTCAndCondition"
            v-show="isOnlyOneValue(value)"
            :key="name"
            :disable="!checkEmptyFilter(value)"
            class="filters__item"
            :style="{ order: !checkEmptyFilter(value) && 1 }"
            :model="form[name]"
            :accordion="{ label: allData.schema[name] }"
            :checkboxes-list="value"
            :form-item-name="name"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItem
            class="filters__item"
            :model="form.mark"
            :accordion="{ label: allData.schema.mark }"
            :checkboxes-list="allData.mark"
            form-item-name="mark"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItemGrouped
            class="filters__item"
            :disable="form.mark.length === 0"
            :model="form.model"
            :accordion="{ label: allData.schema.model }"
            :checkboxes-list="allData.model"
            form-item-name="model"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItemGrouped
            class="filters__item"
            :disable="form.model.length === 0"
            :model="form.generation"
            :accordion="{ label: allData.schema.generation }"
            :checkboxes-list="allData.generation"
            form-item-name="generation"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItemGrouped
            class="filters__item"
            :disable="form.model.length === 0"
            :model="form.modification"
            :accordion="{ label: allData.schema.modification }"
            :checkboxes-list="allData.modification"
            form-item-name="modification"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItemGrouped
            class="filters__item"
            :disable="form.model.length === 0"
            :model="form.equipment"
            :accordion="{ label: allData.schema.equipment }"
            :checkboxes-list="allData.equipment"
            form-item-name="equipment"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />
          <FilterItem
            v-for="(value, name) in getSortedData"
            v-show="isOnlyOneValue(value)"
            :key="name"
            :disable="!checkEmptyFilter(value)"
            class="filters__item"
            :style="{ order: !checkEmptyFilter(value) && 1 }"
            :model="form[name]"
            :accordion="{ label: allData.schema[name] }"
            :checkboxes-list="value"
            :form-item-name="name"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />

          <UIBaseAccordion
            v-show="checkEmptyFilter(allData.engineVolume)"
            label="Объем двигателя"
            is-expand
          >
            <FilterItemInputsRange
              :values="[form.engineVolumeMin, form.engineVolumeMax]"
              :min="allData.engineVolume.base[0]"
              :max="allData.engineVolume.base[1]"
              form-item-name="engineVolume"
              :placeholders="[`От`, `До`]"
              placeholder-unit="см³"
              :clear="clear"
              :is-parse-str="true"
              @setFormData="setFormData"
            />
          </UIBaseAccordion>
          <UIBaseAccordion
            v-show="checkEmptyFilter(allData.horsePower)"
            class="filters__accordion"
            label="Мощность л.с."
            is-expand
          >
            <FilterItemInputsRange
              :values="[form.horsePowerMin, form.horsePowerMax]"
              :min="allData.horsePower.base[0]"
              :max="allData.horsePower.base[1]"
              form-item-name="horsePower"
              :placeholders="[`От`, `До`]"
              placeholder-unit="л.c."
              :clear="clear"
              :is-parse-str="true"
              @setFormData="setFormData"
            />
          </UIBaseAccordion>
          <UIBaseAccordion
            v-show="checkEmptyFilter(allData.year)"
            class="filters__accordion"
            label="Год выпуска"
            is-expand
          >
            <FilterItemInputsRange
              :values="[form.yearMin, form.yearMax]"
              :min="allData.year.base[0]"
              :max="allData.year.base[1]"
              form-item-name="year"
              :placeholders="[`От`, `До`]"
              :clear="clear"
              @setFormData="setFormData"
            />
          </UIBaseAccordion>
          <UIBaseAccordion
            v-if="isShowTotalTrip"
            class="filters__accordion"
            label="Пробег"
            is-expand
          >
            <FilterItemInputsRange
              :values="[form.totalTripMin, form.totalTripMax]"
              :min="allData.totalTrip.base[0]"
              :max="allData.totalTrip.base[1]"
              form-item-name="totalTrip"
              :placeholders="[`От`, `До`]"
              placeholder-unit="км"
              :clear="clear"
              :is-parse-str="true"
              @setFormData="setFormData"
            />
          </UIBaseAccordion>

          <FilterItem
            v-for="(value, name) in getCityData"
            v-show="isOnlyOneValue(value)"
            :key="name"
            :disable="!checkEmptyFilter(value)"
            class="filters__item"
            :style="{ order: !checkEmptyFilter(value) && 1 }"
            :model="form[name]"
            :accordion="{ label: allData.schema[name] }"
            :checkboxes-list="value"
            :form-item-name="name"
            @setFormData="setFormData"
            @clearFormData="clearFormData"
          />

          <template v-for="(value, name) in filteredCheckbox">
            <FilterItem
              v-if="
                !(
                  (name === 'intColorGroup' || name === 'intMaterial') &&
                  ['cars/used', 'moto/used'].some((path) =>
                    $route.path.includes(path)
                  )
                )
              "
              v-show="isOnlyOneValue(value)"
              :key="name"
              :disable="!checkEmptyFilter(value)"
              class="filters__item"
              :style="{ order: !checkEmptyFilter(value) && 1 }"
              :model="form[name]"
              :accordion="{ label: allData.schema[name] }"
              :checkboxes-list="value"
              :form-item-name="name"
              @setFormData="setFormData"
              @clearFormData="clearFormData"
            />
          </template>

          <UIBaseAccordion label="Цена" is-expand class="filters__accordion">
            <FilterItemInputsRange
              :values="[form.dispriceMin, form.dispriceMax]"
              :min="allData.disprice.base[0] / 100"
              :max="allData.disprice.base[1] / 100"
              form-item-name="disprice"
              :placeholders="[`От`, `До`]"
              placeholder-unit="₽"
              :clear="clear"
              :is-parse-str="true"
              @setFormData="setFormData"
            />
          </UIBaseAccordion>
        </section>
        <footer class="filters__footer">
          <UIBaseButton
            :disable="hasData"
            primary
            large
            text="Применить"
            @click="onCloseFilter"
          />
          <UIBaseButton
            :disable="hasData"
            secondary
            large
            text="Сбросить"
            type="reset"
            @click="handleClearData"
          />
        </footer>
      </form>
    </UISidePanel>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useFilterStore } from '@/store/filter'
import { useCityStore } from '@/store/city'

export default {
  name: 'FilterPanel',
  props: {
    isLoading: {
      type: Boolean,
      require: true,
      default: false,
    },
    isElectro: {
      type: Boolean,
      require: true,
      default: false,
    },
    electroEngineTypes: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data () {
    return {
      // данные формы (выбранные чекбоксы, записывается value)
      form: {
        bodyType: [],
        city: [],
        condition: [],
        driveType: [],
        engineType: [],
        equipment: [],
        extColor: [],
        extColorGroup: [],
        gearType: [],
        generation: [],
        hasPhoto: [],
        id: [],
        inStock: [],
        intColor: [],
        intColorGroup: [],
        intMaterial: [],
        location: [],
        mark: [],
        model: [],
        modification: [],
        orderType: [],
        owners: [],
        engineVolume: [],
        engineVolumeMin: '',
        engineVolumeMax: '',
        horsePower: [],
        horsePowerMin: '',
        horsePowerMax: '',
        year: [],
        yearMin: '',
        yearMax: '',
        transportType: [],
        totalTripMin: '',
        totalTripMax: '',
        disprice: [],
        dispriceMin: '',
        dispriceMax: '',
        creditMonthPayment: [],
        creditMin: '',
        creditMax: '',
        pts: [],
        special: [],
        totalTrip: [],
        usedType: [],
        certificateCode: [],
        vatType: [],
        demo: [],
      },
      isOnceSyncForm: false,
      clear: false,
    }
  },
  computed: {
    isShowTotalTrip () {
      return this.allData.totalTrip.base.some(totalTrip => totalTrip > 0)
    },
    hasData () {
      const form = { ...this.form }

      return Object.values(form).every((item) => {
        return item.length === 0
      })
    },
    getTypeTCAndCondition () {
      const isMainLevelPath = this.$route.path.match(
        /\/(cars|moto|atv|commercial|electro)\/$/,
      )
      if (this.allData && isMainLevelPath) {
        const condition = [...this.allData.condition]
        return {
          ...(condition && { condition }),
        }
      }
      return null
    },
    getCityData () {
      if (this.allData) {
        return {
          city: [...this.allData.city],
          location: [...this.allData.location],
        }
      }
      return null
    },
    getSortedData () {
      if (this.allData) {
        // оставляем в фильтре только значения гибрид и электрический в электрокарах
        const electroEngineTypesAllData = this.allData.engineType.filter(item => this.electroEngineTypes.includes(item.code))
        return {
          bodyType: [...this.allData.bodyType],
          gearType: [...this.allData.gearType],
          driveType: [...this.allData.driveType],
          engineType: this.isElectro ? electroEngineTypesAllData : [...this.allData.engineType],
        }
      }
      return null
    },
    filteredCheckbox () {
      if (this.allData) {
        if (!this.isOnceSyncForm) {
          this.syncQueryInForm()
        }

        const filteredFilters = { ...this.allData }

        delete filteredFilters.creditMonthPayment
        delete filteredFilters.totalTrip
        delete filteredFilters.intColor
        delete filteredFilters.extColor
        delete filteredFilters.condition
        delete filteredFilters.year
        delete filteredFilters.id
        delete filteredFilters.hasPhoto
        delete filteredFilters.schema
        delete filteredFilters.price
        delete filteredFilters.disprice
        delete filteredFilters.mark
        delete filteredFilters.model
        delete filteredFilters.generation
        delete filteredFilters.equipment
        delete filteredFilters.modification
        delete filteredFilters.usedType
        delete filteredFilters.transportType
        delete filteredFilters.bodyType
        delete filteredFilters.gearType
        delete filteredFilters.driveType
        delete filteredFilters.engineType
        delete filteredFilters.city
        delete filteredFilters.location
        delete filteredFilters.engineVolume
        delete filteredFilters.horsePower
        delete filteredFilters.special

        const array = Object.entries(filteredFilters)
        let extColorGroup = null

        array.find((item, i) => {
          if (item && item[0] === 'extColorGroup') {
            extColorGroup = item

            array.splice(i, 1)
            return true
          }

          return false
        })

        array.find((item, i) => {
          if (item && item[0] === 'intColorGroup') {
            array.splice(i, 0, extColorGroup)
            return true
          }
          return false
        })

        return Object.fromEntries(array)
      }
      return null
    },
    isOnlyOneValue () {
      return filter => filter.length > 0
    },
    ...mapState(useFilterStore, {
      isInitFilter: 'isInitFilter',
      filterData: 'filterData',
      allData: 'allData',
      isOpenFilter: 'isOpen',
    }),
    ...mapState(useCityStore, ['siteCityCode']),
    ...mapState(useHoldingStore, ['isAvtodom']),
  },
  watch: {
    'form.mark' () {
      this.removeModelIfEmptyMark()
    },
    filterData: {
      handler (filterData) {
        // вызвается для синхронизации query и данных формы
        this.clearAllFormData()
        this.removeModelIfEmptyMark()
        this.form = { ...this.form, ...filterData }
      },
      deep: true,
    },
    '$route.fullPath' (fullPath) {
      const isMainLevelPath = /\/$/.test(fullPath)
      if (isMainLevelPath && !this.filterData) {
        this.clearAllFormData()
      }
    },
  },
  beforeUnmount () {
    this.clearFilterData()
  },
  methods: {
    removeModelIfEmptyMark () {
      if (this.form.model?.length && this.allData?.model?.length) {
        this.form.model.forEach((model) => {
          const findModel = this.allData.model.find(
            modelData => modelData.code === model,
          )
          const findMark = this.allData?.mark?.find(
            markData => markData.id === findModel.markId,
          )
          const hasMark = this.form?.mark?.includes(findMark?.code)
          if (!hasMark) {
            this.form.model = this.form.model.filter(
              item => item !== findModel.code,
            )
            this.setFilterData()
          }
        })
      }
    },
    syncQueryInForm () {
      const routeQuery = this.$route.query

      this.form.dispriceMin = routeQuery.disprice
        ? routeQuery.disprice[0] / 100
        : ''
      this.form.dispriceMax = routeQuery.disprice
        ? routeQuery.disprice[1] / 100
        : ''
      this.form.engineVolumeMin = routeQuery.engineVolume
        ? routeQuery.engineVolume[0]
        : ''
      this.form.engineVolumeMax = routeQuery.engineVolume
        ? routeQuery.engineVolume[1]
        : ''
      this.form.horsePowerMin = routeQuery.horsePower
        ? routeQuery.horsePower[0]
        : ''
      this.form.horsePowerMax = routeQuery.horsePower
        ? routeQuery.horsePower[1]
        : ''
      this.form.yearMin = routeQuery.year ? routeQuery.year[0] : ''
      this.form.yearMax = routeQuery.year ? routeQuery.year[1] : ''
      this.form.totalTripMin = routeQuery.totalTrip
        ? routeQuery.totalTrip[0]
        : ''
      this.form.totalTripMax = routeQuery.totalTrip
        ? routeQuery.totalTrip[1]
        : ''

      Object.entries(this.allData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const checkedCheckboxes = value
            .filter(item => item.checked)
            .map(item => item.code)
          if (checkedCheckboxes && checkedCheckboxes.length > 0) {
            this.form[key] = checkedCheckboxes
          }
        }
      })

      this.isOnceSyncForm = true
    },
    filteredEmptyFilterData (data) {
      Object.keys(data).forEach(
        key => data[key]?.length === 0 && delete data[key],
      )
      return data
    },
    setFilterData () {
      const formData = { ...this.form }
      const filteredEmptyData = this.filteredEmptyFilterData(formData)

      if (!filteredEmptyData.mark) {
        delete filteredEmptyData.model
        delete filteredEmptyData.generation
        delete filteredEmptyData.modification
        delete filteredEmptyData.equipment
      }
      if (!filteredEmptyData.model) {
        delete filteredEmptyData.generation
        delete filteredEmptyData.modification
        delete filteredEmptyData.equipment
      }

      if (
        filteredEmptyData.dispriceMax === 0 &&
          filteredEmptyData.dispriceMin === 0
      ) {
        filteredEmptyData.disprice = [0, 0]
      } else if (
        filteredEmptyData.dispriceMax ||
          filteredEmptyData.dispriceMin
      ) {
        this.convertRange(filteredEmptyData, 'disprice', 'disprice', true)
      }

      // if (!this.hasEqual('creditMountPayment')) {
      //   if (filteredEmptyData.creditMax === 0) {
      //     filteredEmptyData.creditMonthPayment = [0, 0]
      //   } else if (filteredEmptyData.creditMax || filteredEmptyData.creditMin) {
      //     this.convertRange(
      //       filteredEmptyData,
      //       'creditMountPayment',
      //       'creditMonthPayment',
      //       true
      //     )
      //   }
      // }

      if (filteredEmptyData.totalTripMax === 0) {
        filteredEmptyData.totalTrip = [0, 0]
      } else if (
        filteredEmptyData.totalTripMax ||
          filteredEmptyData.totalTripMin
      ) {
        this.convertRange(filteredEmptyData, 'totalTrip', 'totalTrip')
      }

      if (filteredEmptyData.horsePower === 0) {
        filteredEmptyData.horsePower = [0, 0]
      } else if (
        filteredEmptyData.horsePowerMax ||
          filteredEmptyData.horsePowerMin
      ) {
        this.convertRange(filteredEmptyData, 'horsePower', 'horsePower')
      }

      if (filteredEmptyData.engineVolume === 0) {
        filteredEmptyData.engineVolume = [0, 0]
      } else if (
        filteredEmptyData.engineVolumeMax ||
          filteredEmptyData.engineVolumeMin
      ) {
        this.convertRange(filteredEmptyData, 'engineVolume', 'engineVolume')
      }

      if (filteredEmptyData.year === 0) {
        filteredEmptyData.year = [0, 0]
      } else if (filteredEmptyData.yearMax || filteredEmptyData.yearMin) {
        this.convertRange(filteredEmptyData, 'year', 'year')
      }

      delete filteredEmptyData.dispriceMax
      delete filteredEmptyData.dispriceMin
      delete filteredEmptyData.creditMax
      delete filteredEmptyData.creditMin
      delete filteredEmptyData.totalTripMax
      delete filteredEmptyData.totalTripMin
      delete filteredEmptyData.horsePowerMin
      delete filteredEmptyData.horsePowerMax
      delete filteredEmptyData.yearMin
      delete filteredEmptyData.yearMax
      delete filteredEmptyData.engineVolumeMin
      delete filteredEmptyData.engineVolumeMax

      this.setFilterDataOnStore(filteredEmptyData)
    },
    getIntPrice (price) {
      if (price) {
        return price.toString().replace(/\s₽/, '').split(' ').join('')
      }
      return 0
    },
    convertRange (formData, name, tableName, isPrice) {
      let minValue
      let maxValue
      if (isPrice) {
        minValue = this.getIntPrice(formData[`${name}Min`]) * 100
        maxValue = this.getIntPrice(formData[`${name}Max`]) * 100
      } else {
        minValue = formData[`${name}Min`] * 1
        maxValue = formData[`${name}Max`] * 1
      }

      const minFiltered = Math.trunc(
        parseInt(this.allData[tableName].filtered[0]),
      )
      const maxFiltered = Math.trunc(
        parseInt(this.allData[tableName].filtered[1]),
      )

      if (minValue && maxValue) {
        formData[tableName] = [minValue, maxValue]
      } else if (!minValue && maxValue === minFiltered) {
        formData[tableName] = [maxValue, maxValue]
      } else if (minValue === minFiltered && maxValue === 0) {
        formData[tableName] = [0, 0]
      } else if (minValue && !maxValue) {
        formData[tableName] = [minValue, this.allData[tableName].filtered[1]]
      } else if (!minValue && maxValue !== maxFiltered) {
        formData[tableName] = [0, maxValue]
      } else if (minValue > maxValue) {
        formData[tableName] = [minValue, maxValue]
      } else if (!minValue || (minValue === 0 && maxValue === maxFiltered)) {
        formData[tableName] = [minValue, maxValue]
      } else {
        formData[tableName] = [minValue, maxValue]
      }
    },
    handleClearData () {
      this.clear = true
      setTimeout(() => (this.clear = false), 1000)

      // this.clearFilterData()
      this.clearAllFormData()
      this.setFilterData()
    },
    setFormData ({ formItemName, value }) {
      this.form[formItemName] = value
      this.setFilterData()
    },
    clearFormData ({ formItemName }) {
      this.form[formItemName] = []
      this.setFilterData()
    },
    clearAllFormData () {
      for (const item in this.form) {
        const isString = typeof this.form[item] === 'string'
        const isNumber = typeof this.form[item] === 'number'
        const isCity = item === 'city'

        if (isCity && this.isAvtodom && this.siteCityCode) {
          this.form[item] = [this.siteCityCode]
        } else if (isString || isNumber) {
          this.form[item] = ''
        } else {
          this.form[item] = []
        }
      }
    },
    checkEmptyRange (data, name, tableName) {
      const min = 0
      const max = 1
      const isTableMin = name === [`${tableName}Min`]
      const numberOfRange = isTableMin ? min : max
      data[tableName] = []
      if (!data[name]) {
        data[tableName][numberOfRange] =
            this.allData[tableName].filtered[numberOfRange]
      } else {
        data[tableName][numberOfRange] = data[name]
      }
    },
    checkEmptyFilter (filter) {
      if (!filter) {
        return false
      } else if (filter?.length === 1) {
        return filter?.every(item => item.code)
      } else if (filter?.length === 0) {
        return false
      }
      return true
    },
    ...mapActions(useFilterStore, {
      onCloseFilter: 'onClose',
      clearFilterData: 'clearFilterData',
      clearAllFilterData: 'clearAllFilterData',
      setFilterDataOnStore: 'setFilterData',
    }),
  },
}
</script>

<style lang="scss" scoped>
.filters {
  $width: 520px;

  display: grid;
  grid-template-rows: auto 1fr auto;
  padding-right: 60px;
  padding-left: 60px;

  @media (max-width: $width - 1) {
    padding-right: 24px;
    padding-left: 24px;
  }

  &__main {
    display: grid;
    grid-gap: 15px;
    align-content: flex-start;

    &_disable :deep(*) {
      color: var(--grayDark);
      pointer-events: none;
    }
  }

  &__title {
    @include h5;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__button {
    display: flex;
  }

  &__close {
    width: 24px;
    height: 24px;
  }

  &__accordion {
   & :deep(.accordion__label) {
      cursor: default;
    }

   & :deep(.accordion__icon) {
      display: none;
    }
  }

  &__header {
    position: sticky;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    order: -100;
    height: 40px;
    padding: 70px 0 20px;
    margin-bottom: 30px;
    background: white;

    @media (max-width: $width - 1) {
      padding: 40px 0 20px;
    }

    @include mq($bp-super-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 45px;
    }

    @include mq($bp-big) {
      margin-bottom: 50px;
    }
  }

  &__footer {
    position: sticky;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    place-items: center;
    order: 10000000000;
    height: 100px;
    padding: 30px 0;
    margin-bottom: 30px;
    background: white;

    @include mq($bp-small-medium) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 70px;
    }
  }
}
</style>
