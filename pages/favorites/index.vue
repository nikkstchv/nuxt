<template>
  <MainCatalog class="catalog">
    <template #header>
      <FavoritesHeader
        ref="header"
        :content-range="contentRange"
        class="favorites__header"
        :class="[
          'favorites__header',
          { favorites__header_hide: !hasSomeCards },
        ]"
        :sections="sections"
        :on-change-sections="onChangeSections"
        @removeAll="removeAll"
      />
    </template>
    <template v-if="!loading" #list>
      <CatalogCard
        v-for="item in cards[activeSection]"
        :id="item.id"
        :key="item.id"
        :images="item.images"
        :mark="item.mark"
        :model="item.model"
        :generation="item.generation"
        :modification="item.modification"
        :color="item.color"
        :is-active="item.isActive"
        :is-new="item.isNew === 'Новый'"
        :equipment="item.equipment"
        :status-for-web="item.statusForWeb"
        :labels="item.labels"
        :description="[
          item.isNew,
          item.manufactureYear,
          item.isNew !== 'Новый' ? formatTotalTrip(item.totalTrip) : '',
        ]"
        :count-options="item.countOptions"
        :credit="item.credit"
        :price="item.disprice"
        :default-price="item.price"
        :type-of-transport="item.typeOfTransport"
        :holding-id="item.holdingId"
        :has-panorama="item.hasPanorama"
        :has-video-panorama="item.hasVideoPanorama"
        :all-data="item"
        class="favorites__card"
      />
    </template>
    <transition v-if="loading" name="fade">
      <UILoader />
    </transition>
    <div v-if="hasEmpty(activeSection) && !loading" class="favorites__no-cards">
      <h2 class="favorites__main-title">
        Нет {{ typeOfTransportName.noItem[activeSection] }} в избранном
      </h2>
      <UIBaseButton
        :to="`/${activeSection}/`"
        primary
        text="Перейти в каталог"
      />
    </div>
  </MainCatalog>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useFavoritesStore } from '../../store/favorites'
import { getCardShort } from '@/api/routes/catalog'

export default {
  name: 'PageFavorites',
  layout: 'catalog',
  data () {
    return {
      cards: {
        cars: null,
        moto: null,
        atv: null,
        'jet-ski': null,
      },
      currentPage: this.$route.query.page ?? 1,
      activeSection: this.$route.query.section || 'cars',
      typeOfTransportName: {
        noItem: {
          cars: 'автомобилей',
          moto: 'мотоциклов',
          atv: 'квадроциклов',
          'jet-ski': 'гидроциклов',
        },
        en: {
          cars: 'Cars',
          moto: 'Moto',
          atv: 'Atv',
          'jet-ski': 'JetSki',
        },
        ru: {
          cars: 'Автомобили',
          moto: 'Мотоциклы',
          atv: 'Квадроциклы',
          'jet-ski': 'Гидроциклы',
        },
      },
      sections: [
        {
          label: 'Автомобили',
          slug: 'cars',
          isActive:
            this.$route.query.section === 'cars' || !this.$route.query.section,
        },
        {
          label: 'Квадроциклы',
          slug: 'atv',
          isActive: this.$route.query.section === 'atv',
        },
        ...(this.$config.public.domain === 'avtodom'
          ? [
              {
                label: 'Мотоциклы',
                slug: 'moto',
                isActive: this.$route.query.section === 'moto',
              },
              {
                label: 'Гидроциклы',
                slug: 'jet-ski',
                isActive: this.$route.query.section === 'jet-ski',
              },
            ]
          : []),
      ],
      loading: true,
      favoriteCarsLocal: [],
      favoriteMotoLocal: [],
      favoriteAtvLocal: [],
      favoriteJetSkiLocal: [],
    }
  },
  fetchOnServer: false,
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    }
  },

  computed: {
    title () {
      return 'Отмечайте понравившиеся предложения и они будут сохранены в "Избранном"'
    },
    description () {
      return `Отмечайте понравившееся и возращайтесь в удобное для вас время | ${this.holdingName}`
    },
    contentRange () {
      return this.cards.cars ? this.cards.cars.length : 0
    },
    hasSomeCards () {
      return Object.values(this.cards).some(
        section => section && section.length,
      )
    },
    ...mapState(useHoldingStore, {
      isAvtodom: 'isAvtodom',
      isAsc: 'isAsc',
      holdingName: 'holdingName',
    }),
    ...mapState(useFavoritesStore, {
      favoriteCars: 'favoriteCars',
      favoriteMoto: 'favoriteMoto',
      favoriteAtv: 'favoriteAtv',
      favoriteJetSki: 'favoriteJetSki',
    }),
  },
  watch: {
    favoriteCars (values) {
      this.favoriteCarsLocal = values
    },
    favoriteMoto (values) {
      this.favoriteMotoLocal = values
    },
    favoriteAtv (values) {
      this.favoriteAtvLocal = values
    },
    favoriteJetSki (values) {
      this.favoriteJetSkiLocal = values
    },
    cards: {
      handler () {
        this.sections[0].label = this.labelSection('cars')
        this.sections[1].label = this.labelSection('atv')

        if (this.isAvtodom) {
          this.sections[2].label = this.labelSection('moto')
          this.sections[3].label = this.labelSection('jet-ski')
        }
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted () {
    this.loading = true

    await this.fetchCards()
    // this.setInitIsActiveSections()

    this.loading = false
  },
  methods: {
    // setInitIsActiveSections () {
    //   for (const name in this.typeOfTransportName.en) {
    //     const typeOfTransportNameEn = this.typeOfTransportName.en[name]
    //     if (this[`favorite${typeOfTransportNameEn}Local`].length > 0) {
    //       const sections = this.sections.map((section) => {
    //         if (section.slug === name) {
    //           return {
    //             ...section,
    //             isActive: true,
    //           }
    //         }
    //         return {
    //           ...section,
    //           isActive: false,
    //         }
    //       })
    //       this.onChangeSections(sections)
    //       break
    //     }
    //   }
    // },
    onChangeSections (data) {
      const item = data.find(item => item.isActive)
      if (item) {
        this.sections.forEach((btn) => {
          btn.isActive = btn.slug === item.slug
        })

        this.activeSection = item.slug
        this.changeQuery(item.slug)
      }
    },
    labelSection (code) {
      const title = this.typeOfTransportName.ru[code]
      const isEmptySection = this.hasEmpty(code)
      const count = !isEmptySection ? this.cards[code].length : ''
      return `${title} ${count}`
    },
    hasEmpty (section) {
      return !this.cards[section]?.length
    },
    async fetchCards () {
      for (const code in this.typeOfTransportName.en) {
        const typeOfTransportCode = this.typeOfTransportName.en[code]
        this[`favorite${typeOfTransportCode}Local`] =
            JSON.parse(localStorage.getItem(`favorite${typeOfTransportCode}`)) ||
            []
        const favoriteItems = this[`favorite${typeOfTransportCode}Local`]
        const hasItems = favoriteItems?.length
        if (hasItems) {
          const raw = await this.getRawWithPromiseStatus(
            favoriteItems,
            getCardShort,
          )
          this.cards[code] = this.getArrayOfValuesData(raw)
        }
      }
    },
    removeAll () {
      this.cards.cars = []
      this.cards.moto = []
      this.cards.atv = []
      this.cards['jet-ski'] = []
    },
    getArrayOfValuesData (data) {
      return data.filter(item => item.value).map(item => item.value)
    },
    async getRawWithPromiseStatus (ids, route) {
      const { $fetchClient } = useNuxtApp()
      return await Promise.allSettled(
        ids.map(async (item) => {
          return await $fetchClient(route(item))
        }),
      ).catch((e) => {
        console.error(e)
      })
    },
    changeQuery (section) {
      this.$router.push({
        query: {
          section,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.favorites {
  &__header {
    &_hide :deep(.select-buttons) {
      opacity: 0;
    }
  }

  &__card {
    padding-bottom: 48px;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: '';
      background-color: var(--grayMediumLight);
    }

    &::before {
      position: absolute;
      left: 0;
      width: 100%;
      content: '';
      background-color: var(--grayMediumLight);
    }

    @include mq($bp-medium){
      &:nth-child(4n + 2)::after,
      &:nth-child(4n + 3)::after {
        right: -2.5rem;
        left: -2.5rem;
      }
    }

    @media (min-width: $bp-small) and (max-width: $bp-medium) {
      &:nth-child(3n + 2)::after {
        right: -1.75rem;
        left: -1.75rem;
      }
    }

    @media (max-width: $bp-small) {
      padding-bottom: 47px;

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

  &__no-cards {
    display: grid;
    place-items: center;
  }

  &__main-title {
    @include h5;

    padding: 70px 0 30px;
    text-align: center;
  }
}
</style>
