<template>
  <UIBaseOverlay is-nav-bar :is-open="isOpenNavBar" @click="onCloseNavBar">
    <aside
      ref="navBar"
      class="navBar"
      :class="{
        navBar_asc: isAsc,
        navBar_avtodom: isAvtodom,
        navBar_open: isOpenNavBar,
        navBar_open_panel: isOpenFirstPanel || isOpenSecondPanel,
      }"
    >
      <section class="navBar__section navBar__section_top">
        <div
          class="navBar__header"
          :class="{navBar__header_asc: isAsc}"
        >
          <LkLogInButton
            v-if="isAvtodom"
            class="navBar__login-button"
            @click="onTotalCloseNavBar"
          >
            <template #after>
              Войти в личный кабинет
            </template>
          </LkLogInButton>
          <UIBaseButton
            big
            class="navBar__service-button"
            text="Запись на сервис"
            @click="handleServiceButton"
          />
        </div>
        <button
          v-for="(categoryInfo, categoryName) in category"
          :key="categoryName"
          class="navBar__item"
          :class="{ navBar__item_border_top: categoryName === 'catalog' }"
          @click="onClickCategoryButton(categoryInfo, 'first')"
        >
          {{ categoryInfo.name }}
          <IconArrow right class="navBar__item-icon" />
        </button>
      </section>
      <section class="navBar__section navBar__section_middle">
        <NavBarLink
          v-for="link in links"
          :key="link.href"
          :text="link.name"
          :href="link.href"
          small
          class="navBar__link"
          @click="onCloseNavBar"
        />
      </section>
      <section class="navBar__section navBar__section_bottom">
        <button
          v-if="definiteCity"
          class="navBar__button"
          @click="onClickCityButton"
        >
          <IconNav class="navBar__button-icon" />
          {{ definiteCity }}
        </button>
        <a :href="`tel:${holdingPhone}`" class="navBar__button">
          <IconPhone class="navBar__button-icon" />
          {{ holdingPhone }}
        </a>
        <nuxt-link
          v-show="isShowIconFavorite"
          class="navBar__button"
          to="/favorites/"
          @click="onTotalCloseNavBar"
        >
          <span class="navBar__button-count">
            {{ countFavorite }}
          </span>
          <IconHeart class="navBar__button-icon" />
          Избранное
        </nuxt-link>
        <nuxt-link
          v-if="isShowIconCompare"
          class="navBar__button"
          to="/compare/"
          @click="onTotalCloseNavBar"
        >
          <span class="navBar__button-count">
            {{ countCompare }}
          </span>
          <IconCompare />
          Сравнение
        </nuxt-link>
        <nuxt-link
          v-if="isAvtodom"
          class="navBar__button"
          to="/en/about/"
          @click="onClickEnButton"
        >
          <IconWorld class="navBar__button-icon" />
          EN
        </nuxt-link>
      </section>
      <div
        class="navBar__section navBar__panel navBar__panel_first"
        :class="{navBar__panel_open: isOpenFirstPanel}"
      >
        <button
          class="navBar__item navBar__item_open navBar__item_border_top"
          @click="onCloseCategory('first')"
        >
          <IconArrow left class="navBar__item-icon" />
          {{ firstLevelCategory && firstLevelCategory.name }}
        </button>
        <template v-if="firstLevelCategory">
          <template
            v-for="firstLevelCategoryInfo in category[firstLevelCategory.link]
              .children"
          >
            <button
              v-if="hasChildren(firstLevelCategoryInfo)"
              :key="firstLevelCategoryInfo.name"
              class="navBar__item"
              @click="onClickCategoryButton(firstLevelCategoryInfo, 'second')"
            >
              {{ firstLevelCategoryInfo.name }}
              <IconArrow right class="navBar__item-icon" />
            </button>
            <nuxt-link
              v-else
              :key="firstLevelCategoryInfo.name"
              :to="firstLevelCategoryInfo.link"
              class="navBar__item navBar__item_small"
              @click="onClickCategoryLink"
            >
              {{ firstLevelCategoryInfo.name }}
            </nuxt-link>
          </template>
        </template>
      </div>
      <div
        class="navBar__section navBar__panel navBar__panel_second"
        :class="{navBar__panel_open: isOpenSecondPanel}"
      >
        <button
          class="navBar__item navBar__item_open navBar__item_border_top"
          @click="onCloseCategory('second')"
        >
          <IconArrow left class="navBar__item-icon" />
          {{ secondLevelCategory && secondLevelCategory.name }}
        </button>
        <template v-if="secondLevelCategory">
          <nuxt-link
            v-for="secondLevelCategoryInfo in category[firstLevelCategory.link]
              .children[secondLevelCategory.link].children"
            :key="secondLevelCategoryInfo.name"
            :to="secondLevelCategoryInfo.link"
            class="navBar__item navBar__item_small"
            @click="onClickCategoryLink"
          >
            {{ secondLevelCategoryInfo.name }}
          </nuxt-link>
        </template>
      </div>
    </aside>
  </UIBaseOverlay>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { useNavBarStore } from '../../store/navBar'
import { useBrandsStore } from '../../store/brands'

import { useCityStore } from '../../store/city'
import LkLogInButton from '@/components/Lk/LogInButton.vue'
import NavBarLink from '@/components/NavBar/Link.vue'

import IconArrow from '@/components/Icon/Arrow.vue'
import IconNav from '@/components/Icon/Nav.vue'
import IconPhone from '@/components/Icon/Phone.vue'
import IconCompare from '@/components/Icon/Compare.vue'
import IconHeart from '@/components/Icon/Heart.vue'
import IconWorld from '@/components/Icon/World.vue'

export default {
  name: 'NavBarDefault',
  components: {
    LkLogInButton,
    NavBarLink,
    IconArrow,
    IconNav,
    IconPhone,
    IconCompare,
    IconHeart,
    IconWorld,
  },
  data: () => ({
    links: [
      { name: 'Новости', href: '/news/' },
      { name: 'Дилерские центры', href: '/contacts/' },
      { name: 'О компании', href: '/about/' },
    ],
    compareCarsLocal: null,
    compareMotoLocal: null,
    compareAtvLocal: null,
    favoriteCarsLocal: null,
    favoriteMotoLocal: null,
    favoriteAtvLocal: null,
    isOpenFirstPanel: false,
    isOpenSecondPanel: false,
    firstLevelCategory: null,
    secondLevelCategory: null,
  }),
  computed: {
    category () {
      const avtodom = {
        catalog: {
          name: 'Каталог',
          link: 'catalog',
          children: {
            cars: {
              name: 'Автомобили',
              link: 'cars',
              children: [
                { name: 'Все', link: '/cars/' },
                { name: 'Новые модели', link: '/cars/new/' },
                { name: 'Автомобили с пробегом', link: '/cars/used/' },
                { name: 'Электромобили', link: '/electro/' },
                {
                  name: 'C НДС для юр. лиц',
                  link: '/cars/vat/',
                },
                { name: 'Эксклюзивно на сайте', link: '/cars/on-sale-soon/' },
                { name: 'Распродажа', link: '/cars/sale/' },
              ],
            },
            electro: {
              name: 'Электромобили',
              link: 'electro',
              children: [
                { name: 'Все', link: '/electro/' },
                { name: 'Новые модели электромобилей', link: '/electro/new/' },
                { name: 'Электромобили с пробегом', link: '/electro/used/' },
              ],
            },
            moto: {
              name: 'Мотоциклы',
              link: 'moto',
              children: [
                { name: 'Все', link: '/moto/' },
                { name: 'Новые мотоциклы', link: '/moto/new/' },
                { name: 'Мотоциклы с пробегом', link: '/moto/used/' },
              ],
            },
            atv: {
              name: 'Квадроциклы',
              link: 'atv',
              children: [
                { name: 'Новые квадроциклы', link: '/atv/new/' },
                { name: 'Квадроциклы  с пробегом', link: '/atv/used/' },
              ],
            },
            commercial: {
              name: 'Коммерческий транспорт',
              link: 'commercial',
              children: [
                { name: 'Все', link: '/commercial/' },
                {
                  name: 'Легкий коммерческий транспорт',
                  link: '/commercial/fleet/',
                },
                {
                  name: 'Грузовой коммерческий транспорт',
                  link: '/commercial/trucks/',
                },
              ],
            },
            'jet-ski': {
              name: 'Гидроциклы',
              link: '/jet-ski/',
            },
          },
        },
        brands: {
          name: 'Бренды',
          link: 'brands',
          children: [],
        },
        services: {
          name: 'Услуги',
          link: 'services',
          children: [
            { name: 'Онлайн запись на тест-драйв', link: '/services/testdrive/' },
            {
              name: 'Техническое обслуживание и ремонт автомобилей',
              link: '/service/',
            },
            { name: 'Кредитование', link: '/services/credit/' },
            { name: 'Страхование', link: '/services/insurance/' },
            { name: 'Выкуп автомобилей', link: '/services/trade-in/' },
            { name: 'Лизинг', link: '/services/leasing/' },
            {
              name: 'Корпоративным клиентам',
              link: '/services/corporate/',
            },
            { name: 'Автодом Подписка', link: '/services/subscription/' },
            { name: 'Яндекс Сплит', link: '/services/yandex_split/' },
          ],
        },
        service: {
          name: 'Сервис',
          link: 'service',
          children: [
            { name: 'Онлайн запись на сервис', link: '/service/online/' },
            { name: 'Техническое обслуживание', link: '/service/to/' },
            { name: 'Кузовной ремонт', link: '/service/body-repair/' },
            { name: 'Детейлинг', link: '/service/detaling/' },
            { name: 'Установка дополнительного оборудования', link: '/service/optional/' },
            { name: 'Программа лояльности', link: '/service/loyalty-program/' },
            { name: 'Сезонный шиномонтаж', link: '/service/tire-service/' },
          ],
        },
        actions: {
          name: 'Акции',
          link: 'actions',
        },
      }
      const asc = {
        catalog: {
          name: 'Каталог',
          link: 'catalog',
          children: {
            cars: {
              name: 'Автомобили',
              link: 'cars',
              children: [
                { name: 'Все', link: '/cars/' },
                { name: 'Новые автомобили', link: '/cars/new/' },
                { name: 'Автомобили с пробегом', link: '/cars/used/' },
                {
                  name: 'C НДС для юр. лиц',
                  link: '/cars/vat/',
                },
                { name: 'Эксклюзивно на сайте', link: '/cars/on-sale-soon/' },
                { name: 'Распродажа', link: '/cars/sale/' },
              ],
            },
            atv: {
              name: 'Квадроциклы',
              link: 'atv',
              children: [
                { name: 'Новые квадроциклы', link: '/atv/new/' },
                { name: 'Квадроциклы  с пробегом', link: '/atv/used/' },
              ],
            },
            commercial: {
              name: 'Коммерческий транспорт',
              link: 'commercial',
              children: [
                { name: 'Все', link: '/commercial/' },
                {
                  name: 'Легкий коммерческий транспорт',
                  link: '/commercial/fleet/',
                },
                {
                  name: 'Грузовой коммерческий транспорт',
                  link: '/commercial/trucks/',
                },
              ],
            },
          },
        },
        brands: {
          name: 'Бренды',
          link: 'brands',
          children: [],
        },
        services: {
          name: 'Услуги',
          link: 'services',
          children: {
            testdrive: {
              name: 'Онлайн запись на тест-драйв',
              link: '/services/testdrive/',
            },
            service: {
              name: 'Техническое обслуживание и ремонт автомобилей',
              link: '/service/',
            },
            'trade-in': {
              name: 'Выкуп автомобилей с пробегом',
              link: '/services/trade-in/',
            },
            commercial: {
              name: 'Выкуп коммерческого транспорта',
              link: '/services/commercial/',
            },
            commission: {
              name: 'Комиссионные продажи',
              link: '/services/commission/',
            },
            credit: {
              name: 'Страхование и Кредит',
              link: '/services/insurance_and_credit/',
            },
            prolongatsiya: {
              name: 'Продление полисов ОСАГО и КАСКО',
              link: '/services/prolongatsiya/',
            },
            fleet: {
              name: 'Корпоративным клиентам',
              link: '/services/fleet/',
            },
            remote_settlement_losses: {
              name: 'Удаленное урегулирование убытков',
              link: '/services/remote_settlement_losses/',
            },
            pay: { name: 'Оплата и возврат', link: '/services/pay/' },
          },
        },
        service: {
          name: 'Сервис',
          link: 'service',
          children: [
            { name: 'Онлайн запись на сервис', link: '/service/online/' },
            { name: 'Техническое обслуживание', link: '/service/to/' },
            { name: 'Кузовной ремонт', link: '/service/body-repair/' },
            { name: 'Детейлинг', link: '/service/detaling/' },
            { name: 'Установка дополнительного оборудования', link: '/service/optional/' },
            { name: 'Запасные части и аксессуары', link: '/service/accessories/' },
            { name: 'Сезонный шиномонтаж', link: '/service/tire-service/' },
            { name: 'Яндекс Сплит', link: '/services/yandex_split/' },
          ],
        },
        actions: {
          name: 'Акции',
          link: 'actions',
        },
      }
      return this.isAsc ? asc : avtodom
    },
    isShowIconCompare () {
      // TODO вынести логику в script setup + добавить типы ТС
      const hasCars = this.compareCarsLocalLength > 0
      const hasMoto = this.isAvtodom ? this.compareMotoLocalLength > 0 : false
      const hasAtv = this.compareAtvLocalLength > 0
      return hasCars || hasMoto || hasAtv
    },
    isShowIconFavorite () {
      const hasCars = this.favoriteCarsLocalLength > 0
      const hasMoto = this.isAvtodom ? this.favoriteMotoLocalLength > 0 : false
      const hasAtv = this.favoriteAtvLocalLength > 0
      return hasCars || hasMoto || hasAtv
    },
    countCompare () {
      let count = 0

      count += this.compareCarsLocalLength

      if (this.isAvtodom) {
        count += this.compareMotoLocalLength
      }

      if (this.isAsc) {
        count += this.compareAtvLocalLength
      }

      return count
    },
    countFavorite () {
      let count = 0

      count += this.favoriteCarsLocalLength

      if (this.isAvtodom) {
        count += this.favoriteMotoLocalLength
      }

      if (this.isAsc) {
        count += this.favoriteAtvLocalLength
      }

      return count
    },
    compareMotoLocalLength () {
      return this.compareMotoLocal?.length ?? null
    },
    compareCarsLocalLength () {
      return this.compareCarsLocal?.length ?? null
    },
    compareAtvLocalLength () {
      return this.compareAtvLocal?.length ?? null
    },
    favoriteCarsLocalLength () {
      return this.favoriteCarsLocal?.length ?? null
    },
    favoriteMotoLocalLength () {
      return this.favoriteMotoLocal?.length ?? null
    },
    favoriteAtvLocalLength () {
      return this.favoriteAtvLocal?.length ?? null
    },
    ...mapState(
      useHoldingStore, ['isAsc', 'isAvtodom', 'holdingPhone'],
    ),
    ...mapState(
      useNavBarStore, { isOpenNavBar: 'isOpen' },
    ),
    ...mapState(useCityStore, {
      definiteCity: 'definiteCity',
    }),
  },
  watch: {
    async isOpenNavBar (isOpen) {
      if (isOpen) {
        this.setLocalStorageFavoriteAndCompareData()
        await this.setBrandsData()
        this.scrollToTop()
      } else {
        this.onCloseAllCategory()
      }
    },
    favoriteCars (value) {
      this.favoriteCarsLocal = value
    },
    favoriteMoto (value) {
      this.favoriteMotoLocal = value
    },
    favoriteAtv (value) {
      this.favoriteAtvLocal = value
    },
    compareCars (value) {
      this.compareCarsLocal = value
    },
    compareMoto (value) {
      this.compareMotoLocal = value
    },
    compareAtv (value) {
      this.compareAtvLocal = value
    },
  },
  methods: {
    async setBrandsData () {
      const { getBrands } = useBrandsStore()
      const brands = await getBrands()
      this.category.brands.children = this.getFormattedBrands(brands)
    },
    setLocalStorageFavoriteAndCompareData () {
      try {
        this.compareCarsLocal =
            JSON.parse(localStorage.getItem('compareCars')) ?? []
        this.compareMotoLocal =
            JSON.parse(localStorage.getItem('compareMoto')) ?? []
        this.compareAtvLocal =
            JSON.parse(localStorage.getItem('compareAtv')) ?? []
        this.favoriteCarsLocal =
            JSON.parse(localStorage.getItem('favoriteCars')) ?? []
        this.favoriteMotoLocal =
            JSON.parse(localStorage.getItem('favoriteMoto')) ?? []
        this.favoriteAtvLocal =
            JSON.parse(localStorage.getItem('favoriteAtv')) ?? []
      } catch (e) {}
    },
    handleServiceButton () {
      this.$router.push('/service/online/')
      this.onTotalCloseNavBar()
    },
    getFormattedBrands (brands) {
      return brands?.map(brand => ({
        name: brand.nameEn,
        link: `/brands/${brand.code}`,
      }))
    },
    onClickEnButton () {
      this.onTotalCloseNavBar()
    },
    onClickCityButton () {
      this.onTotalCloseNavBar()
      this.onOpenCityPanel()
    },
    hasChildren (category) {
      return Object.prototype.hasOwnProperty.call(category, 'children')
    },
    onTotalCloseNavBar () {
      this.onCloseNavBar()
      this.onCloseAllCategory()
      this.clearAllCategory()
    },
    onClickCategoryLink () {
      this.onTotalCloseNavBar()
    },
    onClickCategoryButton (category, name) {
      if (this.hasChildren(category)) {
        name === 'first'
          ? (this.firstLevelCategory = category)
          : (this.secondLevelCategory = category)
        this.onOpenPanel(name)
      } else {
        this.onCloseNavBar()
        this.$router.push('/' + category.link + '/')
      }
    },
    onCloseCategory (name) {
      this.onClosePanel(name)
      this.clearCategory(name)
    },
    onCloseAllCategory () {
      this.onClosePanel('first')
      this.onClosePanel('second')
    },
    onOpenPanel (name) {
      this.scrollToTop()
      name === 'first'
        ? (this.isOpenFirstPanel = true)
        : (this.isOpenSecondPanel = true)
    },
    onClosePanel (name) {
      name === 'first'
        ? (this.isOpenFirstPanel = false)
        : (this.isOpenSecondPanel = false)
    },
    clearCategory (name) {
      name === 'first'
        ? (this.firstLevelCategory = null)
        : (this.secondLevelCategory = null)
    },
    clearAllCategory () {
      this.firstLevelCategory = null
      this.secondLevelCategory = null
    },
    scrollToTop () {
      this.$refs.navBar.scrollTop = 0
    },
    ...mapActions(useNavBarStore, {
      onCloseNavBar: 'onClose',
    }),
    ...mapActions(useCityStore, {
      onOpenCityPanel: 'onOpen',
    }),
  },
}
</script>

<style lang="scss" scoped>
@mixin indents {
  padding-right: 15px;
  padding-left: 15px;

  @include mq($bp-small-medium) {
    padding-right: 20px;
    padding-left: 20px;
  }

  @include mq($bp-small) {
    padding-right: 32px;
    padding-left: 32px;
  }
}

@mixin indentsWithoutIcon {
  padding-right: 20px;
  padding-left: 20px;

  @include mq($bp-small-medium) {
    padding-right: 25px;
    padding-left: 25px;
  }

  @include mq($bp-small) {
    padding-right: 37px;
    padding-left: 37px;
  }

  @include mq($bp-medium) {
    padding-right: 55px;
  }
}

.navBar {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 5;
  width: 100%;
  margin-right: -100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: none;
  background: white;
  transition: margin-right 0.5s;
  will-change: margin-right;

  @include mq($bp-small) {
    width: 480px;
    margin-right: -480px;
  }

  &_avtodom {
    height: calc(100% - 87px);

    @include mq($bp-medium) {
      height: calc(100% - 100px);
    }

    .navBar__panel {
      top: 198px;

      @include mq($bp-small-medium) {
        top: 159px;
      }

      @include mq($bp-medium) {
        top: 172px;
      }
    }

    .navBar__section_middle {
      @include mq($bp-medium) {
        padding-top: 20px;
      }
    }
  }

  &_asc {
    height: calc(100% - 98px);
    padding-top: 0;

    @include mq($bp-medium) {
      height: calc(100% - 100px);
    }

    .navBar__panel {
      top: 170px;

      @include mq($bp-medium) {
        top: 172px;
      }
    }

    .navBar__section_middle {
      @include mq($bp-medium) {
        padding-top: 30px;
      }
    }
  }

  &_open {
    margin-right: 0;

    &_panel {
      overflow: hidden;
    }
  }

  &__section {
    display: grid;

    &_top {
      margin-bottom: 30px;

      @include mq($bp-medium) {
        margin-bottom: 0;
      }
    }

    &_middle {
      @include indentsWithoutIcon;

      grid-gap: 24px;
      padding-bottom: 30px;
      border-bottom: 1px solid var(--grayMediumLight);

      @include mq($bp-medium-big) {
        display: none;
      }
    }

    &_bottom {
      @include indents;

      grid-gap: 24px;
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }

  &__panel {
    position: fixed;
    right: 0;
    z-index: 4;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    padding-bottom: 200px;
    margin-right: -100%;
    overflow: auto;
    overscroll-behavior-y: none;
    background: white;
    transition: margin-right 0.5s;
    will-change: margin-right;

    @include mq($bp-small) {
      width: 480px;
      margin-right: -480px;
    }

    &_open {
      margin-right: 0;
    }
  }

  &__header {
    @include indents;

    display: grid;
    grid-template-areas: 'login' 'service';
    grid-gap: 15px;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;

    @include mq($bp-small-medium) {
      grid-template-areas: 'login service';
      align-items: center;
    }

    &_asc {
      display: flex;
    }
  }

  &__login-button {
    @include text_big_regular;

    grid-area: login;
  }

  &__service-button {
    @include text_medium_small;

    grid-area: service;
    padding: 12px 14px;
    border-radius: 4px;
  }

  &__item {
    @include indentsWithoutIcon;
    @include label;

    display: flex;
    grid-gap: 15px;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--grayMediumLight);

    &_open {
      justify-content: flex-start;
      background-color: var(--grayLight);
    }

    &_border_top {
      border-top: 1px solid var(--grayMediumLight);
    }

    &-icon {
      width: 24px;
      height: 24px;
    }

    &_small {
      @include text_big_regular;
    }
  }

  &__button {
    @include text_big_regular;

    position: relative;
    display: flex;
    grid-gap: 20px;
    align-items: center;

    & :deep(.icon__path) {
      stroke: var(--black);
    }

    .navBar &-icon {
      width: 30px;
      height: 30px;

      & :deep(.icon__path) {
        stroke: var(--black);
      }
    }

    &-count {
      position: absolute;
      top: 0;
      left: 15px;
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

  &__logo {
    width: 130px;
    height: 19px;
    margin-bottom: 15px;

    @include mq($bp-small) {
      width: 167px;
      height: 24px;
    }

    @include mq($bp-medium) {
      width: 160px;
      height: 23px;
    }
  }

  .exact-active-link {
    cursor: default;
  }
}
</style>
