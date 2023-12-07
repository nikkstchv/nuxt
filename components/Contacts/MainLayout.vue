<template>
  <main class="contacts">
    <ContactsHeader
      class="contacts__header"
      :dealers="dealers"
      :filter="filter"
      :title="title"
      :active-mark="activeMark"
      @onSetSort="onSetSort"
      @onSetLoading="onSetLoading"
    />

    <ContactsBrandList v-if="hasSorted && showedDealers">
      <ContactsBrandItem
        v-for="(dealersList, name) in showedDealers"
        :key="name"
      >
        <nuxt-img
          v-if="hasLogo(dealersList)"
          :src="dealersList[0].mark.Logo"
          alt="Логотип марки авто"
          class="contacts__group-logo contacts__group-logo_desktop"
        />
        <div class="contacts__group-content">
          <ContactsBrandHeader>
            <nuxt-img
              v-if="hasLogo(dealersList)"
              :src="dealersList[0].mark.Logo"
              alt="Логотип марки авто"
              class="contacts__group-logo contacts__group-logo_mobile"
              sizes="sb:10vw"
            />
            <ContactsBrandTitle>{{ name }}</ContactsBrandTitle>
          </ContactsBrandHeader>
          <ul class="contacts__list">
            <li
              v-for="(dealer, index) in dealersList"
              :key="dealer.id"
              class="contacts__list-item"
              :style="{
                gridTemplateColumns: !dealer.photo[0] && '1fr',
              }"
            >
              <nuxt-img
                v-if="dealer.photo[0]"
                :src="dealer.photo[0]"
                alt="Дилерский центр"
                :loading="index > 2 ? 'lazy' : 'eager'"
                class="contacts__image"
                width="400"
                sizes="xs:70vw md:60vw b:28vw sb:400px"
                @click="$router.push(getDetailDealerLink(dealer.mark.code, dealer.code))"
              />

              <div class="contacts__item-wrapper">
                <div class="contacts__item-container">
                  <h3 class="contacts__item-title">
                    {{ dealer.nameRu }}
                  </h3>
                  <a
                    class="contacts__item-phone"
                    :href="`tel:${dealer.phone}`"
                  >{{ dealer.phone }}</a>
                </div>
                <ContactsDepartmentList class="contacts__department-list">
                  <ContactsDepartmentItem
                    v-for="timeTable in dealer.timeTable"
                    :key="timeTable.department"
                    :title="timeTable.department"
                    :time="timeTable.time"
                  />
                </ContactsDepartmentList>
                <div class="contacts__button-container">
                  <UIBaseButton
                    :to="getDetailDealerLink(dealer.mark.code, dealer.code)"
                    class="contacts__button contacts__button_secondary"
                    text="Подробнее о центре"
                    large
                    primary
                  />
                  <div class="contacts__navigation navigation">
                    <button
                      v-if="dealer.googleCardUrl"
                      class="navigation__button"
                      @click="onGoToNavigation(dealer.googleCardUrl)"
                    >
                      <img
                        class="dealer-block__icon"
                        src="@/assets/icons/google-point.svg"
                        alt="метка на карте google"
                      >
                    </button>
                    <button
                      v-if="dealer.yandexCardUrl"
                      class="navigation__button"
                      @click="onGoToNavigation(dealer.yandexCardUrl)"
                    >
                      <img
                        class="dealer-block__icon"
                        src="@/assets/icons/yandex-point.svg"
                        alt="метка на карте yandex"
                      >
                    </button>
                    <button
                      v-if="dealer.yanaviCardUrl"
                      class="navigation__button navigation__button--nav"
                      @click="onGoToNavigation(dealer.yanaviCardUrl)"
                    >
                      <img
                        class="dealer-block__icon"
                        src="@/assets/icons/yandex-navigation.svg"
                        alt="стрелка yandex навигации"
                      >
                    </button>
                    <button
                      v-if="dealer.twoGisCardUrl"
                      class="navigation__button"
                      @click="onGoToNavigation(dealer.twoGisCardUrl)"
                    >
                      <img
                        class="dealer-block__icon"
                        src="@/assets/icons/2gis.svg"
                        alt="стрелка 2gis навигации"
                      >
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </ContactsBrandItem>
    </ContactsBrandList>
    <UILoader v-else-if="loading" class="contacts__loader" />
    <h2 v-else class="contacts__title">
      Ничего не найдено
    </h2>
    <LazyContactsMapPanel
      v-if="dealersMapItems"
      :dealers-map-items="dealersMapItems"
    />
  </main>
</template>

<script>
import { mapState } from 'pinia'
import { useCityStore } from '@/store/city'

export default defineNuxtComponent({
  name: 'ContactsMainLayout',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    dealers: {
      type: Array,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      grouped: null,
      sort: {
        city: this.$route.query?.city || 'all',
        vehicleTypes: this.filter.vehicleTypes?.find(item => item.code === this.$route.params.code)?.code || 'all',
        mark: this.filter.marks?.find(item => item.code === this.$route.params.code)?.code || 'all',
      },
      loading: true,
    }
  },
  computed: {
    vehicleType () {
      if (this.filter) {
        const params = this.$route.params
        const routeQuery = this.$route.query
        const found = this.filter.vehicleTypes?.find((item) => {
          return params.code === item.code || routeQuery.vehicleType === item.value
        })
        return found?.code ?? ''
      }
      return ''
    },
    hasLogo () {
      return (dealers) => {
        return dealers[0]?.mark?.Logo ?? false
      }
    },
    dealersMapItems () {
      return this.dealers.map((dealer) => {
        return {
          id: dealer.id,
          coords: Object.values(dealer.coordinates),
          name: dealer.nameRu,
          address: dealer.address,
          timeTable: dealer.timeTable[0]?.time,
          phone: dealer.phone,
        }
      })
    },
    hasSorted () {
      return Object.values(this.sorted).length > 0
    },
    isMark () {
      return this.filter.marks?.find(item => item.code === this.paramCode)
    },
    paramCode () {
      return this.$route.params.code
    },
    showedDealers () {
      if (this.isMark && this.sorted) {
        let markInMarks = null
        const dealers = Object.values(this.sorted).flat()
        const mainDealer = dealers?.find((dealer) => {
          const isDealerMark = dealer?.mark?.code === this.paramCode
          markInMarks = dealer.marks?.find(item => item.code === this.paramCode)

          return isDealerMark || markInMarks
        })

        if (!mainDealer && !markInMarks) { return null }

        const formattedDealers = dealers?.map(dealer => ({
          ...dealer,
          mark: markInMarks || mainDealer?.mark,
        }))
        const markNameEn = markInMarks?.nameEn || mainDealer.mark?.nameEn

        return { [markNameEn]: formattedDealers }
      }

      return this.sorted
    },
    activeMark () {
      return this.isMark?.code ?? ''
    },
    sorted () {
      if (this.dealers && this.sort) {
        const dealersGrouped = { ...this.dealersGrouped }
        const isDefaultCity = this.sort.city === 'all'
        const isDefaultMark = this.sort.mark === 'all'
        const isDefaultVehicleTypes = this.sort.vehicleTypes === 'all'
        const isNotDefault = !isDefaultCity || !isDefaultVehicleTypes || !isDefaultMark
        const sorts = [!isDefaultCity, !isDefaultMark, !isDefaultVehicleTypes]
        const sortsLength = sorts.filter(Boolean).length

        if (isNotDefault) {
          for (const dealer in dealersGrouped) {
            dealersGrouped[dealer] = dealersGrouped[dealer].filter((dealer) => {
              const hasCity = dealer.cityCode === this.sort.city
              const hasMark = dealer.marks?.find(item => item.code === this.sort.mark)
              const hasVehicleTypes = dealer.vehicleTypes?.find(type => type === this.vehicleType)
              const hasAll = hasCity && hasVehicleTypes && hasMark
              const hasCityAndVehicleTypes = hasCity && !!hasVehicleTypes
              const hasMarkAndVehicleTypes = hasMark && !!hasVehicleTypes
              const hasMarkAndCity = hasMark && hasCity

              switch (sortsLength) {
                case 1:
                  return hasCity || hasMark || hasVehicleTypes
                case 2:
                  return hasCityAndVehicleTypes || hasMarkAndVehicleTypes || hasMarkAndCity
                case 3:
                  return hasAll
                default:
                  return true
              }
            })
            if (dealersGrouped[dealer].length === 0) {
              delete dealersGrouped[dealer]
            }
          }
          return dealersGrouped
        }
      }

      return this.dealersGrouped
    },
    dealersGrouped () {
      return this.dealers?.reduce((sum, dealer) => {
        if (dealer.mark && !sum[dealer.mark.nameEn]) {
          sum[dealer.mark.nameEn] = []
        } else if (!dealer.mark && !sum['Автомобили с пробегом']) {
          sum['Автомобили с пробегом'] = []
        }

        if (dealer.marks?.length && !this.$route.params.code) {
          dealer.marks.forEach((mark) => {
            if (!sum[mark.nameEn]) {
              sum[mark.nameEn] = []
            }
            sum[mark.nameEn].push({ ...dealer, mark })
          })
        } else if (dealer.mark) {
          sum[dealer.mark.nameEn].push(dealer)
        } else {
          sum['Автомобили с пробегом'].push(dealer)
        }
        return sum
      }, {})
    },
    ...mapState(useCityStore, ['siteCityCode']),
  },
  watch: {
    dealers: {
      handler (value) {
        if (value) {
          this.loading = false
        }
      },
      immediate: true,
    },
    '$route.query.city' (city) {
      if (city) {
        this.sort = { ...this.sort, city }
      }
    },
  },
  methods: {
    onSetLoading (value) {
      this.loading = value
    },
    getDetailDealerLink (markCode, dealerCode) {
      return `/contacts/${markCode}/${dealerCode}/`
    },
    onGoToNavigation (url) {
      process.client && window.open(url, '_blank')
    },
    setQuery (sort) {
      const restQuery = this.$route.query ?? {}

      this.$router.push({
        query: {
          ...restQuery,
          ...sort,
        },
      })
    },
    onSetSort (sort) {
      this.sort = { ...this.sort, ...sort }
      if (sort.city && sort.city !== 'all') {
        this.setQuery(sort)
      } else {
        this.setQuery({ city: 'all' })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.contacts {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  display: grid;
  grid-gap: 30px;
  height: fit-content;

  @include mq($bp-small-medium) {
    grid-gap: 40px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 50px;
  }

  &__title {
    @include h2;

    padding-top: 20px;
  }

  &__group {
    &-title {
      @include h3;

      @include mq($bp-medium-big) {
        @include h2;
      }
    }

    &-logo {
      object-fit: contain;
      width: 40px;
      height: 40px;

      @include mq($bp-small-medium, $bp-medium-big) {
        width: 55px;
        height: 55px;
      }

      @include mq($bp-medium-big) {
        width: 62px;
        height: 62px;
      }

      &_mobile {
        @include mq($bp-medium-big) {
          display: none;
        }
      }

      &_desktop {
        display: none;

        @include mq($bp-medium-big) {
          position: sticky;
          top: 120px;
          display: block;
        }
      }
    }
  }

  &__list {
    display: grid;
    grid-gap: 50px;
    height: fit-content;

    &-item {
      display: grid;
      grid-gap: 25px;
      max-width: 1000px;

      @include mq($bp-small-medium) {
        grid-gap: 30px;
      }

      @include mq($bp-medium) {
        grid-template-columns: 40% 1fr;
        grid-gap: 40px;
      }
    }
  }

  &__image {
    position: relative;
    width: 100%;
    min-height: 200px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    cursor: pointer;

    @include mq($bp-medium) {
      object-fit: contain;
      object-position: top;
    }
  }

  &__item {
    &-wrapper {
      display: grid;
      grid-template-rows: max-content 1fr max-content;
      grid-gap: 20px;
      height: fit-content;

      @include mq($bp-small-medium) {
        grid-gap: 25px;
      }

      @include mq($bp-small) {
        width: 100%;
        max-width: 461px;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;
    }

    &-title {
      @include text_medium_bold;

      margin-bottom: 10px;
      font-weight: 700;

      @include mq($bp-small-medium, $bp-small) {
        @include h4;
      }
    }

    &-phone {
      @include text_medium_regular;

      display: block;
    }
  }

  &__button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    width: 100%;

    @include mq($bp-small) {
      flex-wrap: nowrap;
    }
  }

  &__navigation {
    display: flex;
    flex-grow: 1;
    gap: 10px;

    &.navigation {
      .navigation {
        &__button {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          max-width: 100%;
          min-height: 44px;
          background: var(--grayLight);
          border-radius: 6px;

          &-label {
            @include label_small;

            margin-left: 6px;
            color: var(--grayDolphin);
          }

          &--nav {
            @include mq($bp-small) {
              display: none;
            }
          }
        }
      }
    }
  }

  .contacts &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 44px;
    white-space: nowrap;

    @include mq(350px) {
      padding: 10px 20px;
    }

    @include mq($bp-small) {
      width: 70%;
    }
  }

  .contacts &__department-list {
    @include mq($bp-small) {
      width: 100%;
    }
  }

  &__loader {
    margin-top: 50px !important;
  }
}
</style>
