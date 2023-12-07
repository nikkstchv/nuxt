<template>
  <header
    class="header"
    :class="{
      header_sticky: isStickyNavigation,
      header_asc: isAsc,
    }"
  >
    <div class="header__content">
      <div class="header__top">
        <button v-if="!isAsc" class="header__geo" @click="onOpenCityPanel">
          <IconNav class="header__geo-icon" />
          {{ definiteCity }}
        </button>
        <nav class="header__navigation header__navigation_top">
          <section class="header__navigation-left header__navigation-left_top">
            <nuxt-link
              v-for="item in navigationTop"
              :key="item.name"
              :to="item.link"
            >
              {{ item.name }}
            </nuxt-link>
          </section>
          <section
            class="header__navigation-right header__navigation-right_top"
          >
            <button class="header__navigation-item">
              <IconPhone class="header__navigation-item-icon" />
              <a :href="`tel:${holdingPhone}`">{{ holdingPhone }}</a>
            </button>
            <nuxt-link
              v-if="!isAsc"
              class="header__navigation-item"
              to="/en/about/"
            >
              <IconWorld class="header__navigation-item-icon" />
              EN
            </nuxt-link>
          </section>
        </nav>
      </div>
      <section class="header__middle" @mouseleave="onClosePopupNavigation">
        <nuxt-link
          v-if="isAsc"
          to="/"
          class="header__logo-container"
          @mouseenter="onClosePopupNavigation"
        >
          <IconLogoASC class="header__logo header__logo_asc" />
          <IconLogoASCBest class="header__logo" />
        </nuxt-link>
        <nuxt-link
          v-else
          to="/"
          class="header__logo header__logo_avtodom"
          @mouseenter="onClosePopupNavigation"
        >
          <IconLogoABTODOM />
        </nuxt-link>
        <nav class="header__navigation header__navigation_middle">
          <section
            class="header__navigation-left header__navigation-left_middle"
          >
            <component
              :is="item.link === '/catalog/' ? 'HeaderButton' : 'router-link'"
              v-for="item in navigation"
              :key="item.name"
              :to="item.link === '/catalog/' ? '' : item.link"
              class="header__navigation-link"
              :class="{
                'header__navigation-link_active': isActiveNavigation(item.link),
                'header__navigation-link_disable': item.link === '/catalog/',
              }"
              @click="onClosePopupNavigation"
              @mouseenter="
                item.link !== '/actions/'
                  ? onOpenPopupNavigation(item.link)
                  : onClosePopupNavigation()
              "
            >
              {{ item.name }}
            </component>
          </section>
          <section
            class="header__navigation-right header__navigation-right_middle"
          >
            <nuxt-link
              v-show="isShowIconCompare"
              class="header__button-icon header__button-icon_compare"
              to="/compare/"
            >
              <div class="header__icon-count">
                {{ countCompare }}
              </div>
              <IconCompare class="header__icon header__icon_compare" />
            </nuxt-link>
            <nuxt-link
              v-show="isShowIconFavorite"
              class="header__button-icon header__button-icon_favorites"
              to="/favorites/"
            >
              <div class="header__icon-count">
                {{ countFavorite }}
              </div>
              <IconHeart not-active class="header__icon header__icon_heart" />
            </nuxt-link>
            <SearchMain class="header__button-icon" />
            <UIBaseButton
              big
              class="header__button-service"
              text="Запись на сервис"
              @click="onGoToService"
            />
            <LkLogInButton
              v-if="isAvtodom"
              class="header__button-login header__button-icon_desktop"
            >
              Вход
            </LkLogInButton>
            <IconBurger
              v-if="!isOpenNavBar"
              class="header__button header__button-burger"
              @click="onOpenNavBar"
            />
            <IconClose
              v-else
              class="header__button header__button-close"
              @click="onCloseNavBar"
            />
          </section>
        </nav>
        <div
          v-show="isShowNavigationPopup"
          class="header__popup"
          :class="{ header__popup_asc: isAsc }"
          @mouseleave="onClosePopupNavigation"
        >
          <div
            v-for="(navigationPopupItem, key) in navigationPopupItems"
            :key="key"
            class="header__popup-list"
            :class="{
              'header__popup-list_hide': hoveredNavigation !== key,
              'header__popup-list_asc': isAsc,
              'header__popup-list_avtodom': isAvtodom,
              'header__popup-list_catalog': hoveredNavigation === 'catalog',
              'header__popup-list_brands': hoveredNavigation === 'brands',
              'header__popup-list_accessories':
                hoveredNavigation === 'accessories',
            }"
          >
            <div
              v-for="item in navigationPopupItem"
              :key="item.name"
              class="header__popup-item"
              :class="{
                'header__popup-item_services':
                  isAsc && item.name === 'Продать авто',
              }"
            >
              <nuxt-link
                :to="item.link"
                class="header__popup-link"
                @click="onClosePopupNavigation"
              >
                {{ item.name }}
              </nuxt-link>
              <div v-if="item.children" class="header__popup-children">
                <nuxt-link
                  v-for="children in item.children"
                  :key="children.name"
                  :to="children.link"
                  class="header__popup-link header__popup-link_small"
                  @click="onClosePopupNavigation"
                >
                  {{ children.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="isShowNavigationPopup"
          class="header__overlay header__overlay_open"
        />
      </section>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '../../store/favorites'
import { useCompareStore } from '../../store/compare'
import { useBrandsStore } from '../../store/brands'
import { useCityStore } from '../../store/city'
import { useNavBarStore } from '@/store/navBar'
import { useHoldingStore } from '@/store/holding'

import avtodomNavigationPopupItems from '@/components/Header/data/avtodom.js'
import ascNavigationPopupItems from '@/components/Header/data/asc.js'

const route = useRoute()
const router = useRouter()
const navBarStore = useNavBarStore()
const cityStore = useCityStore()
const { onOpen: onOpenCityPanel } = cityStore
const { definiteCity } = storeToRefs(cityStore)
const { getBrands } = useBrandsStore()
const { isAsc, isAvtodom, holdingPhone } = useHoldingStore()
const { onOpen: onOpenNavBar, onClose: onCloseNavBar } = navBarStore
const { isOpen: isOpenNavBar } = storeToRefs(navBarStore)

const navigation = [
  {
    name: 'Каталог',
    link: '/catalog/',
  },
  {
    name: 'Бренды',
    link: '/brands/',
  },
  {
    name: 'Услуги',
    link: '/services/',
  },
  {
    name: 'Сервис',
    link: '/service/',
  },
  {
    name: 'Акции',
    link: '/actions/',
  },
]

const navigationTop = [
  {
    name: 'Новости',
    link: '/news/',
  },
  {
    name: 'Дилерские центры',
    link: '/contacts/',
  },
  {
    name: 'О компании',
    link: '/about/',
  },
]

const navigationPopupItems = isAsc ? ascNavigationPopupItems : avtodomNavigationPopupItems

const isStickyNavigation = ref(false)
const lastScrollTop = ref(0)
// const search = ref('')
const isShowNavigationPopup = ref(false)
const hoveredNavigation = ref(null)
const favoriteStore = useFavoritesStore()
const compareStore = useCompareStore()
const favoriteCars = computed(() => favoriteStore.favoriteCars)
const favoriteMoto = computed(() => favoriteStore.favoriteMoto)
const favoriteAtv = computed(() => favoriteStore.favoriteAtv)
const favoriteJetSki = computed(() => favoriteStore.favoriteJetSki)
const compareCars = computed(() => compareStore.compareCars)
const compareMoto = computed(() => compareStore.compareMoto)
const compareAtv = computed(() => compareStore.compareAtv)
const compareJetSki = computed(() => compareStore.compareJetSki)
const compareCarsLocal = ref([])
const compareMotoLocal = ref([])
const compareAtvLocal = ref([])
const compareJetSkiLocal = ref([])
const favoriteCarsLocal = ref([])
const favoriteMotoLocal = ref([])
const favoriteAtvLocal = ref([])
const favoriteJetSkiLocal = ref([])

// Computed
const compareMotoLocalLength = computed(() => compareMotoLocal.value?.length ?? 0)
const compareCarsLocalLength = computed(() => compareCarsLocal.value?.length ?? 0)
const compareAtvLocalLength = computed(() => compareAtvLocal.value?.length ?? 0)
const compareJetSkiLocalLength = computed(() => compareJetSkiLocal.value?.length ?? 0)
const favoriteCarsLocalLength = computed(() => favoriteCarsLocal.value?.length ?? 0)
const favoriteMotoLocalLength = computed(() => favoriteMotoLocal.value?.length ?? 0)
const favoriteAtvLocalLength = computed(() => favoriteAtvLocal.value?.length ?? 0)
const favoriteJetSkiLocalLength = computed(() => favoriteJetSkiLocal.value?.length ?? 0)

const isShowIconCompare = computed(() => {
  const hasCars = compareCarsLocalLength.value > 0
  const hasMoto = isAvtodom && compareMotoLocalLength.value > 0
  const hasAtv = compareAtvLocalLength.value > 0
  const hasJetSki = compareJetSkiLocalLength.value > 0
  return hasCars || hasMoto || hasAtv || hasJetSki
})

const isShowIconFavorite = computed(() => {
  const hasCars = favoriteCarsLocalLength.value > 0
  const hasMoto = isAvtodom ? favoriteMotoLocalLength.value > 0 : false
  const hasAtv = favoriteAtvLocalLength.value > 0
  const hasJetSki = favoriteJetSkiLocalLength.value > 0

  return hasCars || hasMoto || hasAtv || hasJetSki
})

const countCompare = computed(() => {
  let count = 0

  count += compareCarsLocalLength.value

  if (isAvtodom) {
    count += compareMotoLocalLength.value
    count += compareJetSkiLocalLength.value
  }

  count += compareAtvLocalLength.value

  return count
})

const countFavorite = computed(() => {
  let count = 0

  count += favoriteCarsLocalLength.value

  if (isAvtodom) {
    count += favoriteMotoLocalLength.value
    count += favoriteJetSkiLocalLength.value
  }

  count += favoriteAtvLocalLength.value

  return count
})
// <!-- Computed -->

// Watch

watch(favoriteCars, (value) => {
  favoriteCarsLocal.value = value
})
watch(favoriteMoto, (value) => {
  favoriteMotoLocal.value = value
})
watch(favoriteAtv, (value) => {
  favoriteAtvLocal.value = value
})
watch(favoriteJetSki, (value) => {
  favoriteJetSkiLocal.value = value
})
watch(compareCars, (value) => {
  compareCarsLocal.value = value
})
watch(compareMoto, (value) => {
  compareMotoLocal.value = value
})
watch(compareAtv, (value) => {
  compareAtvLocal.value = value
})
watch(compareJetSki, (value) => {
  compareJetSkiLocal.value = value
})

// <!-- Watch -->

// Methods
const isActiveNavigation = (link) => {
  const inclidesCatalogLinks = ['cars', 'moto', 'commercial', 'atv', 'jet-ski', 'electro']
  const firstLevelPath = route?.path?.split('/')[1]
  const firstLevelLink = link?.split('/')[1]
  const isEqualMainLink = firstLevelLink === firstLevelPath
  const isEqualCatalogLink = inclidesCatalogLinks.includes(firstLevelPath) && firstLevelLink === 'catalog'

  return isEqualMainLink || isEqualCatalogLink
}

const getFormattedBrands = (brands) => {
  return brands?.map(brand => ({
    name: brand.nameEn,
    link: `/brands/${brand.code}/`,
  }))
}

const onGoToService = () => router.push('/service/online/')

const onStickyNavigation = () => {
  isStickyNavigation.value = window.scrollY < lastScrollTop.value
  lastScrollTop.value = window.scrollY
}

const onOpenPopupNavigation = (link) => {
  hoveredNavigation.value = link.slice(1, link.length - 1)
  isShowNavigationPopup.value = true
  window.addEventListener('scroll', onClosePopupNavigation)
}

const onClosePopupNavigation = () => {
  isShowNavigationPopup.value = false
  hoveredNavigation.value = null
  window.removeEventListener('scroll', onClosePopupNavigation)
}

const getNavigationPopupItemsBrands = async () => {
  const brands = await getBrands()
  return getFormattedBrands(brands)
}

// <!-- Methods -->

navigationPopupItems.brands = await getNavigationPopupItemsBrands()

onMounted(() => {
  window.addEventListener('scroll', onStickyNavigation)

  compareCarsLocal.value = JSON.parse(localStorage.getItem('compareCars')) ?? []
  if (isAvtodom) {
    compareMotoLocal.value = JSON.parse(localStorage.getItem('compareMoto')) ?? []
    compareJetSkiLocal.value = JSON.parse(localStorage.getItem('compareJetSki')) ?? []
  }
  compareAtvLocal.value = JSON.parse(localStorage.getItem('compareAtv')) ?? []
  favoriteCarsLocal.value = JSON.parse(localStorage.getItem('favoriteCars')) ?? []
  favoriteMotoLocal.value = JSON.parse(localStorage.getItem('favoriteMoto')) ?? []
  favoriteJetSkiLocal.value = JSON.parse(localStorage.getItem('favoriteJetSki')) ?? []
  favoriteAtvLocal.value = JSON.parse(localStorage.getItem('favoriteAtv')) ?? []
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onStickyNavigation)
})

</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.header {
  position: sticky;
  top: 0;
  z-index: 3;
  width: 100vw;
  padding-top: 10px;
  background: white;
  transition: top 0.3s ease;

  @include mq($bp-medium) {
    height: 99px;
  }

  @include mq($bp-medium-big) {
    top: -34px;
    grid-gap: 10px;
  }

  &_sticky {
    top: 0;
  }

  &_asc {
    .header__top {
      grid-template-columns: 1fr;
    }

    .header__middle {
      grid-template-columns: auto 1fr;
    }
  }

  &__content {
    display: grid;
    grid-gap: 10px;

    @include mq($bp-medium-big) {
      top: -30px;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__top {
    @include indentsMainHorizontal;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    justify-content: space-between;

    @include mq($bp-medium) {
      display: grid;
      grid-template-columns: 140px 1fr;
      grid-gap: 70px;
      justify-content: flex-start;
    }
  }

  &__middle {
    @include indentsMainHorizontal;

    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    padding-bottom: 10px;
    margin-bottom: -1px;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-medium) {
      grid-template-columns: 140px 1fr;
      grid-gap: 70px;
      place-items: flex-start;
      justify-content: initial;
      padding-bottom: 0;
    }
  }

  &__start {
    display: flex;
  }

  &__geo {
    @include text_medium_regular;

    display: flex;
    grid-gap: 2px;
    align-items: center;
    overflow: hidden;
    color: var(--grayDolphin);
    white-space: nowrap;

    .header &-icon {
      width: 18px;
      height: 18px;

      & :deep(.icon__path) {
        stroke: var(--grayDolphin);
      }
    }
  }

  &__search {
    display: none;

    @include mq($bp-medium) {
      display: block;
      order: 1;
      width: 100%;
      max-width: 501px;
      margin-top: 15px;
    }

    @include mq($bp-big) {
      max-width: 925px;
    }
  }

  &__logo {
    &-container {
      display: flex;
      grid-gap: 15px;
      align-items: center;
    }

    &_avtodom {
      display: flex;
      align-items: center;
      width: 110px;
      height: 30px;

      @include mq($bp-medium) {
        margin: 10px 0;
      }

      @include mq($bp-medium-big) {
        width: 140px;
        height: 39px;
        margin: 0;
      }

      & :deep(.icon) {
        height: 100%;
      }
    }
  }

  &__navigation {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    align-items: center;
    width: 100%;

    @include mq($bp-small-medium) {
      grid-gap: 30px;
    }

    @include mq($bp-medium) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 0;
      align-self: center;
      height: 100%;
    }

    &-right {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 10px;
      align-items: center;
      justify-self: flex-end;
      width: max-content;

      .header_asc & {
        @include mq($bp-medium) {
          padding-top: 0;
        }
      }

      &_top {
        grid-gap: 30px;
        align-items: center;

        &_asc {
          justify-self: flex-start;

          @include mq($bp-medium) {
            justify-self: flex-end;
          }
        }
      }
    }

    &-left {
      display: none;

      @include mq($bp-medium) {
        @include text_medium_small;

        display: grid;
        grid-auto-flow: column;
        grid-gap: 20px;
        align-items: center;
        justify-self: flex-start;
        width: max-content;
      }

      @include mq($bp-big) {
        grid-gap: 25px;
      }

      &_top {
        @include text_small_medium;

        color: var(--grayDolphin);
      }
    }

    &_top {
      @include mq($bp-medium) {
        padding-top: 3px;
      }
    }

    &_middle {
      @include mq($bp-medium) {
        align-items: flex-start;
      }
    }

    &-item {
      @include text_medium_regular;

      display: flex;
      grid-gap: 5px;
      align-items: center;
      color: var(--grayDolphin);

      &_lang {
        display: none;

        @include mq($bp-medium) {
          display: flex;
        }
      }

      .header &-icon {
        width: 18px;
        height: 18px;

        & :deep(.icon__path) {
          stroke: var(--grayDolphin);
        }
      }

      &-phone {
        min-width: 120px;
      }
    }

    &-link {
      position: relative;
      display: block;
      padding-top: 11px;
      padding-bottom: 26px;

      &:hover {
        &::after {
          position: absolute;
          bottom: 0;
          display: block;
          width: 100%;
          height: 3px;
          content: '';
          background-color: var(--grayMediumLight);
        }
      }

      &_active {
        &::after {
          position: absolute;
          bottom: 0;
          display: block;
          width: 100%;
          height: 3px;
          content: '';
          background-color: var(--royalBlue) !important;
        }
      }

      &_disable {
        cursor: default;
      }
    }
  }

  &__icon {
    @include mq($bp-medium) {
      width: 35px;
      height: 35px;
      padding: 5px;
    }

    &:hover {
      @include mq($bp-medium) {
        background: var(--grayLight);
        border-radius: 100px;

        & :deep(.icon__path) {
          stroke: var(--black);
        }
      }
    }

    .header &_heart {
      @include mq($bp-medium) {
        width: 35px;
        height: 35px;
        padding: 7px;
      }
    }

    .header &_compare {
      @include mq($bp-medium) {
        width: 35px;
        height: 35px;
        padding: 5px;
      }
    }

    &-wrapper {
      position: relative;
      cursor: pointer;
    }

    &-count {
      position: absolute;
      top: 0;
      right: 0;
      display: grid;
      place-items: center;
      width: 18px;
      height: 18px;
      font-size: 8px;
      font-weight: bold;
      line-height: 8px;
      color: white;
      letter-spacing: -0.1px;
      pointer-events: none;
      background-color: var(--error);
      border-radius: 82px;
    }
  }

  &__breadcrumbs {
    padding-top: 5px;
  }

  &__button {
    &-login {
      display: none !important;
      margin-left: 20px;

      @include mq($bp-medium-big) {
        display: flex !important;
      }
    }

    &-service {
      @include text_small_medium;

      display: none;
      padding: 8px 16px;
      border-radius: 4px;

      @include mq($bp-medium-big) {
        display: grid;
      }
    }

    &-close {
      width: 35px;
      height: 35px;
      padding: 5.5px;

      @include mq($bp-medium-big) {
        display: none;
      }
    }

    &-burger {
      z-index: 2;
      justify-self: flex-start;
      width: 35px;
      height: 35px;
      padding: 5.5px;

      @include mq($bp-medium-big) {
        display: none;
      }
    }

    &-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .header &_desktop {
        display: none;

        @include mq($bp-medium) {
          display: flex;
        }
      }

      .header &_favorites {
        display: none;

        @include mq($bp-medium-big) {
          display: flex;
        }
      }

      .header &_compare {
        display: none;

        @include mq($bp-medium-big) {
          display: flex;
        }
      }
    }

    &-back {
      margin-right: 60px;

      @include mq($bp-big) {
        margin-right: 53px;
      }

      &_top {
        @media (max-width: $bp-medium-big) {
          display: none !important;
        }
      }

      &_middle {
        @include mq($bp-medium-big) {
          display: none !important;
        }
      }
    }
  }

  &__popup {
    position: absolute;
    top: 99px;
    left: 0;
    z-index: 5;
    display: block;
    align-items: center;
    justify-items: center;
    width: 100%;
    min-height: 300px;
    padding-bottom: 30px;
    background-color: white;
    border-top: 1px solid var(--grayMediumLight);
    transition: opacity 0.3s ease-in-out;

    &_asc {
      top: 99px;
      height: 350px;
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(max-content, 250px));
      row-gap: 18px;
      column-gap: 50px;
      max-width: 1500px;
      height: fit-content;
      padding-top: 30px;
      padding-right: 32px;
      padding-left: 260px;

     .header &_hide {
        display: none;
        visibility: hidden;
        opacity: 0;
      }

      &_asc {
        @include mq($bp-medium-big) {
          padding-left: 330px;
        }

        @include mq($bp-big) {
          padding-left: 395px;
        }
      }

      &_avtodom {
        @include mq($bp-medium-big) {
          padding-left: 291px;
        }

        @include mq($bp-big) {
          padding-left: 356px;
        }
      }

      &_catalog {
        display: flex;
        flex-wrap: wrap;
        row-gap: 50px;
        column-gap: 5%;

        @include mq($bp-big) {
          flex-wrap: nowrap;
        }
      }

      &_brands {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1200px;

        @include mq($bp-big) {
          grid-template-columns: repeat(5, 1fr);
        }
      }

      &_accessories {
        grid-template-columns: repeat(3, max-content);
      }
    }

    &-item {
      display: grid;
      grid-gap: 18px;
      align-content: flex-start;

      &_services {
        grid-row: 1/9;
      }
    }

    &-children {
      display: grid;
      grid-gap: 8px;
    }

    &-link {
      @include label;

      width: fit-content;
      color: var(--blackLight);

      &:hover {
        color: var(--black);
      }

      &_small {
        @include text_medium_regular;

        color: var(--grayDolphin);
      }
    }
  }

  &__overlay {
    position: fixed;
    top: 200px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    pointer-events: none;
    visibility: hidden;
    background: rgb(0 0 0 / 14%);
    opacity: 0;
    transition: all 0.2s ease;

    &_open {
      pointer-events: all;
      visibility: visible;
      opacity: 1;
    }
  }
}

.header__navigation-left_middle {
  & .header__navigation-link_active {
    cursor: default;
  }

  & .header__navigation-link_active::after {
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 3px;
    content: '';
    background-color: var(--royalBlue) !important;
  }
}
</style>
