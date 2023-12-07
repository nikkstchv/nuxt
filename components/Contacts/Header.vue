<template>
  <div class="contacts-header">
    <UIBreadcrumbs
      class="contacts-header__breadcrumbs"
      :direct-crumbs="directCrumbs"
    />
    <header class="contacts-header__title-container">
      <h1 class="contacts-header__title">
        {{ title }}
      </h1>
    </header>
    <section class="contacts-header__buttons-container">
      <header class="contacts-header__buttons">
        <section class="contacts-header__buttons-slider">
          <template v-if="isAvtodom">
            <UIBaseSelect
              label="Все города"
              :options="optionsCities"
              class="contacts-header__select"
              @onSetSelect="onSetOptionsCities"
            />
            <UIBaseSelect
              label="Тип ТС"
              :options="optionsVehicleTypes"
              class="contacts-header__select"
              @onSetSelect="onSetOptionsVehicleTypes"
            />
          </template>
          <UIBaseSelect
            label="Марка"
            :options="optionsMarks"
            class="contacts-header__select"
            @onSetSelect="onSetOptionsMarks"
          />
        </section>
      </header>
      <section class="contacts-header__links">
        <UIBaseButton
          class="contacts-header__link"
          underline
          text="Показать центры на карте"
          @click="onOpenMap"
        />
      </section>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '@/store/holding'
import { useMapStore } from '@/store/map'
import { useCityStore } from '@/store/city'

export default {
  name: 'ContactsHeader',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Дилерские центры',
    },
    dealers: {
      type: Array,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
    activeMark: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isOpenSelect: false,
    timeToClose: false,
    optionsCities: null,
    optionsVehicleTypes: null,
    optionsMarks: null,
  }),
  computed: {
    markName () {
      const foundMark = this.optionsMarks?.find(
        mark => mark.code === this.paramCode,
      )
      return foundMark ? foundMark.name : ''
    },
    directCrumbs () {
      if (this.markName && this.markName !== 'Все марки') {
        return ['', this.markName]
      }
      return []
    },
    routeQuery () {
      return this.$route.query
    },
    paramCode () {
      return this.$route.params.code
    },
    hasSomeVehicleTypes () {
      const found = this.filter.vehicleTypes.find(
        item => item.code === this.paramCode,
      )
      return (this.routeQuery?.vehicleType !== 'all' && this.routeQuery?.vehicleType) || found
    },
    ...mapState(useHoldingStore, ['isAvtodom']),
    ...mapState(useCityStore, ['siteCityCode']),
  },
  created () {
    this.optionsCities = this.initCities()
    this.optionsVehicleTypes = this.initVehicleTypes()
    this.optionsMarks = this.initMarks()
  },
  methods: {
    findAndSetSort (items, name) {
      const active = this.findIsActive(items)
      if (active) {
        this.onSetSort({ [name]: active.code })
      }
    },
    findIsActive (items) {
      return items.find(item => item.isActive)
    },
    createOptionsItems (items, activeCode) {
      return [...items].map(item => ({
        ...(item.code && { code: item.code }),
        ...(item.value ? { name: item.value } : { name: item }),
        isActive: activeCode === item.code,
      }))
    },
    initCities () {
      const cityCode = this.routeQuery.city
      const items = this.createOptionsItems(this.filter.cities, cityCode)
      const allCityName = 'Все города'
      const allCity = { name: allCityName, isActive: !cityCode, code: 'all' }

      items.forEach((item) => {
        if (item.code === cityCode) {
          item.isActive = true
        }
      })

      return [allCity, ...items]
    },
    initVehicleTypes () {
      const vehicleTypeCode = this.routeQuery.vehicleType
      const defaultVehicleType = {
        name: 'Все типы ТС',
        isActive: !this.hasSomeVehicleTypes,
        code: 'all',
      }
      const vehicleTypes = this.filter.vehicleTypes.map(({ value, code }) => {
        const isParam = this.paramCode?.includes(code)
        return {
          name: value,
          code,
          isActive: vehicleTypeCode === code || isParam,
        }
      })
      return [defaultVehicleType, ...vehicleTypes]
    },
    initMarks () {
      let filtered
      if (this.hasSomeVehicleTypes) {
        const unique = new Set(
          this.dealers.map(dealer => dealer.mark?.nameEn),
        )
        filtered = this.filter.marks.filter((mark) => {
          return unique.has(mark.value)
        })
      }

      const items = this.createOptionsItems(filtered ?? this.filter.marks)

      items.forEach((item) => {
        if (this.activeMark === item.code) {
          item.isActive = true
        }
      })

      const hasActiveMark = this.findIsActive(items)
      const defaultMark = { name: 'Все марки', isActive: !hasActiveMark, code: 'all' }

      return [defaultMark, ...items]
    },
    onSetOptionsCities (sort) {
      this.optionsCities = sort

      this.findAndSetSort(sort, 'city')
    },
    onSetOptionsVehicleTypes (sort) {
      const { code } = this.findIsActive(sort)
      const path = code !== 'all' ? `/contacts/${code}/` : '/contacts/'
      const vehicleType = code !== 'all' ? code : undefined
      const query = {
        ...this.routeQuery,
        vehicleType: this.activeMark ? vehicleType : undefined,
      }

      this.onPushRoute({ path, query })
    },
    onSetOptionsMarks (sort) {
      this.optionsMarks = sort
      const { name, code } = this.findIsActive(sort)
      const activeCity = this.findIsActive(this.optionsCities)
      const path = name === 'Все марки' ? '/contacts/' : `/contacts/${code}/`
      const vehicleType = this.findIsActive(this.optionsVehicleTypes)?.code ?? ''
      const hasActiveVehicleType = vehicleType && vehicleType !== 'all'
      const query = {
        ...(hasActiveVehicleType && { vehicleType }),
        city: activeCity?.code || this.routeQuery.city,
      }

      this.onPushRoute({ path, query })
    },
    onSetSort (sort) {
      this.$emit('onSetSort', sort)
    },
    onPushRoute (route) {
      this.$emit('onSetLoading', true)
      this.$router.push(route)
    },
    ...mapActions(useMapStore, {
      onOpenMap: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
.contacts-header {
  display: grid;

  &__buttons-container {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 20px;

    @include mq($bp-small-medium) {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__button {
    position: relative;
  }

  &__buttons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    justify-content: space-between;
    white-space: nowrap;

    @include mq($bp-super-small) {
      grid-gap: 15px;
    }

    &-slider {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 10px;

      @include mq($bp-small) {
        grid-gap: 15px;
      }
    }
  }

  &__links {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;

    @include mq($bp-small) {
      align-self: flex-end;
      justify-self: flex-end;
    }

    @include mq($bp-medium) {
      align-self: center;
    }

    & :deep(.button) {
      @include text_medium_small;
    }

    @media (max-width: $bp-small-medium) {
      grid-gap: 21px;
      align-self: center;

      & :deep(.button) {
        @include text_small_medium;
      }
    }
  }

  &__link {
    width: max-content;

    &_no-select {
      cursor: default;
      user-select: none;
    }
  }

  &__title-container {
    margin-bottom: 15px;

    @include mq($bp-medium-big) {
      margin-bottom: 20px;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h2;
    }

    @include mq($bp-medium) {
      @include h1;
    }
  }

  &__subtitle {
    @include text_medium_bold;

    padding-top: 5px;

    @include mq($bp-small-medium) {
      @include h5;

      padding-top: 10px;
    }

    @include mq($bp-medium) {
      @include h3;

      padding-top: 15px;
    }
  }

  &__breadcrumbs {
    margin-bottom: 15px;
  }

  &__icon {
    margin-left: 10px;
  }

  &__icon-arrow {
    width: 18px;
    height: 18px;
  }
}
</style>
