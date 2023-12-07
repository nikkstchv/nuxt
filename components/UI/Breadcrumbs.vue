<template>
  <div class="breadcrumbs">
    <div ref="breadcrumbs" class="breadcrumbs__wrap">
      <ul
        class="breadcrumbs__content"
        itemscope
        itemtype="http://schema.org/BreadcrumbList"
      >
        <li
          class="breadcrumbs__item"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
        >
          <nuxt-link
            class="breadcrumbs__link"
            to="/"
            title="Главная"
            itemprop="item"
          >
            <span itemprop="name">Главная</span>
          </nuxt-link>
          <IconArrow v-if="!onlyMainCrumb" class="breadcrumbs__icon" />
          <meta itemprop="position" content="0">
        </li>
        <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          class="breadcrumbs__item"
          :class="{breadcrumbs__item_current: isLastCrumb(crumbs.length, index)}"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
          :aria-current="isLastCrumb(crumbs.length, index) ? 'page' : null"
        >
          <IconArrow v-if="index !== 0" class="breadcrumbs__icon" />
          <nuxt-link
            v-if="crumb.title !== 'catalog' && !isLastCrumb(crumbs.length, index)"
            class="breadcrumbs__link"
            :to="crumb.path"
            :title="decodeString(getName(crumb.title))"
            itemprop="item"
          >
            <span
              itemprop="name"
              v-html="decodeString(getName(crumb.title), true)"
            />
          </nuxt-link>
          <span
            v-else
            class="breadcrumbs__link"
            :title="decodeString(getName(crumb.title))"
            itemprop="item"
          >
            <span
              itemprop="name"
              v-html="decodeString(getName(crumb.title), true)"
            />
          </span>
          <meta itemprop="position" :content="index + 1">
          <meta
            v-if="isLastCrumb(crumbs.length, index)"
            itemprop="item"
            :content="`${host}${$route.path}`"
          >
        </li>
        <li
          v-if="contentRange"
          class="breadcrumbs__item breadcrumbs__item_count"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
        >
          <IconArrow class="breadcrumbs__icon" />
          <span itemprop="name">{{ contentRange }}</span>
          <meta itemprop="position" :content="crumbs.length + 1">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'

import { useFilterStore } from '../../store/filter'
import { useHoldingStore } from '../../store/holding'

export default defineNuxtComponent({
  name: 'UIBreadcrumbs',
  props: {
    contentRange: {
      type: String,
      required: false,
      default: '',
    },
    directCrumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
    directPath: {
      type: String,
      required: false,
      default: '',
    },
    onlyMainCrumb: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      crumbs: null,
    }
  },
  computed: {
    translate () {
      return {
        catalog: 'Каталог',
        accessories: 'Запасные части и аксессуары',
        'car-accessories': 'Аксессуары для автомобиля',
        lifestyle: 'Образ жизни',
        wheels: 'Колеса и диски',
        moto: 'Мотоциклы',
        car: 'Автомобиль',
        atv: 'Квадроциклы',
        cars: 'Автомобили',
        'jet-ski': 'Гидроциклы',
        commercial: 'Коммерческий транспорт',
        new: this.domain === 'avtodom' ? 'Новые модели' : 'Новые',
        used: 'С пробегом',
        brands: 'Бренды',
        contacts: 'Дилерские центры',
        news: 'Новости',
        about: 'О компании',
        faq: 'FAQ',
        history: 'История',
        compliance: 'Комплаенс',
        services: 'Услуги',
        favorites: 'Избранное',
        service: 'Сервисные услуги',
        blog: 'Блог',
        leasing: 'Лизинг',
        sale: 'Распродажа',
        feedback:
            this.domain === 'avtodom'
              ? 'Оставьте отзыв об Автодом'
              : 'Обратная связь',
        investors: 'Инвесторам',
        media: 'СМИ о нас',
        'korporativnye-dokumenty': 'Корпоративные документы',
        'operatsionnye-pokazateli': 'Операционные показатели',
        reytingi: 'Рейтинги',
        financial_reports: 'Финансовая отчётность',
        subscription: 'Автодом Подписка',
        credit: 'Кредит',
        actions: 'Акции',
        qr: 'Запрос по VIN-коду',
        'qr-generator': 'Запрос по VIN-коду',
        'functional-services': 'Функциональные сервисы',
        guaranty: 'Гарантия',
        insurance: 'Страхование',
        compare: 'Сравнение',
        'test-drive': 'Тест-драйв',
        'loyalty-program': 'Программа лояльности',
        corporate: 'Корпоративным клиентам',
        'terms-of-use': 'Пользовательское соглашение',
        'consent-to-processing': 'Согласие на обработку персональных данных',
        reservation: 'Условия резервирования ТС',
        cookie: 'Политика использования файлов cookie',
        lk: 'Личный кабинет',
        'trade-in': 'Выкуп автомобилей',
        pay: 'Правила оплаты в интернет-магазине АСЦ',
        privacy: 'Политика конфиденциальности',
        'tekhnologii-detskogo-schastya': '«Технологии детского счастья»',
        remote_settlement_losses: 'Удаленное урегулирование убытков',
        prolongatsiya: 'Продление полисов ОСАГО и КАСКО',
        insurance_and_credit: 'Страхование и автокредиты',
        sell_car: 'Продать авто',
        carcost: 'Продать авто',
        commission: 'Комиссионная продажа автомобиля',
        ransom: 'Продать авто',
        career: 'Карьера',
        fleet: 'Легковой',
        trucks: 'Грузовой',
        snowmobiles: 'Снегоходы',
        vat: 'Для юридических лиц',
        'on-sale-soon': 'эксклюзивно на сайте',
        'avtodom-level-club-info': 'АВТОDОМ Level Club',
        sitemap: 'Карта сайта',
        advisers: 'Сотрудники',
        online: 'Онлайн запись на сервис',
        testdrive: 'Запись на тест-драйв',
        black: 'Черный',
        blue: 'Синий',
        white: 'Белый',
        promo: 'акции и спецпредложения',
        'bodytype-furgon': 'Фургон',
        'bodytype-microbus': 'Микроавтобус',
        'bodytype-off-road': 'Внедорожник',
        'bodytype-cabriolet': 'Кабриолет',
        'bodytype-coupe': 'Купе',
        'bodytype-minivan': 'Минивэн',
        'gear-type-is-automatic': 'Автомат',
        'engine-type-is-diesel': 'Дизельный',
        'bodytype-sedan': 'Седан',
        'bodytype-station-wagon': 'Универсал',
        'bodytype-hatchback': 'Хетчбэк',
        'bodytype-liftback': 'Лифтбек',
        'bodytype-fastback': 'Фастбэк',
        'bodytype-crossover': 'Кроссовер',
        'bodytype-pick-up': 'Пикап',
        'bodytype-poadster': 'Родстер',
        'bodytype-targa': 'Тарга',
        'bodytype-compactvan': 'Компактвэн',
        'price-do-3000000': 'до 3 000 000 рублей',
        'price-do-2000000': 'до 2 000 000 рублей',
        'price-do-1500000': 'до 1 500 000 рублей',
        'price-do-1000000': 'до 1 000 000 рублей',
        'price-do-500000': 'до 500 000 рублей',
        '125-kubov': '125 кубов',
        '150-kubov': '150 кубов',
        '200-kubov': '200 кубов',
        '250-kubov': '250 кубов',
        chernye: 'черные',
        dorozhnye: 'дорожные',
        vnedorozhnye: 'внедорожные',
        enduro: 'эндуро',
        klassicheskie: 'классические',
        krossovye: 'кроссовые',
        'sport-bike': 'спортбайки',
        tricycle: 'трициклы',
        turenduro: 'турэндуро',
        electro: 'Электромобили',
        exhaust: 'Ремонт выхлопной системы',
      }
    },
    host () {
      return this.$config.public.host
    },
    ...mapState(useHoldingStore, ['domain']),
    ...mapState(useFilterStore, ['allData']),
  },
  created () {
    this.crumbs = this.getCrumbs()
  },
  mounted () {
    const breadcrumbs = this.$refs.breadcrumbs
    breadcrumbs.scrollLeft = breadcrumbs.scrollWidth

    this.setTranslateForCatalogFilter()
  },
  methods: {
    getCrumbs () {
      const crumbs = []

      if (!this.onlyMainCrumb) {
        const fullPath = this.directPath
          ? this.directPath
          : this.$route.fullPath
        const withoutLastSlash = fullPath.replace(/\/$/, '')
        const params = withoutLastSlash.startsWith('/')
          ? withoutLastSlash.substring(1).split('/')
          : withoutLastSlash.split('/')

        let path = ''
        params.forEach((param, index) => {
          // const isLast = index === params.length - 1
          let paramLocal = param
          if (param.includes('?')) {
            return
          } else {
            path = `${path}/${param}`
          }

          if (this.directCrumbs.length && this.directCrumbs[index]) {
            paramLocal = this.directCrumbs[index]
          }

          crumbs.push({
            title: paramLocal,
            path: path + '/',
          })
        })
      }

      return crumbs
    },
    decodeString,
    getName (name) {
      return this.translate[name] ?? name
    },
    setTranslateForCatalogFilter () {
      const path = this.$route.fullPath
      const catalogRoutes = ['/cars', '/moto', '/atv', '/commercial']
      const filterParamsToTranslate = [
        'bodyType',
        'gearType',
        'driveType',
        'engineType',
      ]
      const obj = {}

      const isCatalog = catalogRoutes.find(item => path.startsWith(item))
      if (isCatalog && this.allData) {
        filterParamsToTranslate.forEach((key) => {
          const keyInKebab = this.toKebabCase(key)

          const params = this.allData[key]
          if (params) {
            params.forEach((param) => {
              obj[`${keyInKebab}-is-${param.code}`] = param.name
            })
          }
        })

        this.translate = Object.assign({}, this.translate, obj)
      }
    },
    toKebabCase (str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    },
    isLastCrumb (crumbsLength, index) {
      return crumbsLength - 1 === index
    },
  },
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: grid;

  &__wrap {
    overflow: auto;

    @include mq($bp-medium) {
      width: 100% !important;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__content {
    @include text_small_regular;

    display: flex;
    flex-wrap: nowrap;
    grid-gap: 4px;
    align-items: center;
    width: fit-content;
  }

  &__item {
    @include text_small_regular;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 4px;
    place-items: center;
    overflow: hidden;
    color: var(--grayDolphin);
    text-overflow: ellipsis;
    white-space: nowrap;
    animation-duration: 200ms;
    animation-timing-function: ease-out;

    &_current {
      @include text_small_medium;

      color: var(--black);
    }

    &:not(.breadcrumbs__item_count):hover {
      color: var(--black);
    }

    &_count {
      color: var(--grayDark);
    }
  }

  &__link {
    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__icon {
    width: 12px;
    height: 12px;
    transform: rotate(-90deg);

    & :deep(.icon__path) {
      stroke: var(--grayDolphin);
    }
  }
}
</style>
