<template>
  <UIBody class="sitemap">
    <UISimplePageHeader class="catalog__header" :title="h1" />
    <main class="sitemap__box">
      <div v-for="(row, r) in sitemap" :key="r" class="sitemap__row">
        <div v-for="(item, i) in row" :key="i" class="sitemap__col">
          <nuxt-link
            v-if="item.label"
            :to="item.label.link"
            class="sitemap__title"
          >
            {{ item.label.title }}
          </nuxt-link>
          <ul v-if="item.childs && item.childs.length" class="sitemap__list">
            <li v-for="(child, c) in item.childs" :key="c">
              <nuxt-link
                v-if="child.label"
                :to="child.label.link"
                class="sitemap__subtitle"
              >
                {{ child.label.title }}
              </nuxt-link>
              <ul
                v-if="child.childs && child.childs.length"
                class="sitemap__list sitemap__list_links"
              >
                <li v-for="(child2, c2) in child.childs" :key="c2">
                  <nuxt-link
                    v-if="child.label"
                    :to="child2.label.link"
                    class="sitemap__link"
                  >
                    {{ child2.label.title }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { useBrandsStore } from '../../store/brands'
import { getDealers as getDealersPath } from '@/api/routes/dealer'

const { getBrands } = useBrandsStore()
const { $fetchClient } = useNuxtApp()
const { isAvtodom, isAsc, holdingName, fullDomain } = useHoldingStore()
const sitemap = ref([
  {
    cars: {
      label: { title: 'Автомобили', link: '/cars/' },
      childs: [
        {
          label: {
            title:
                isAvtodom
                  ? 'Новые модели'
                  : 'Новые автомобили',
            link: '/cars/new/',
          },
          childs: [],
        },
        {
          label: { title: 'Автомобили с пробегом', link: '/cars/used/' },
          childs: [],
        },
        {
          label: {
            title: 'C НДС для юр. лиц',
            link: '/cars/vat/',
          },
          childs: [],
        },
        {
          label: {
            title: 'Эксклюзивно на сайте',
            link: '/cars/on-sale-soon/',
          },
          childs: [],
        },
        {
          label: {
            title: 'Распродажа',
            link: '/cars/sale/',
          },
          childs: [],
        },
      ],
    },
    ...(isAvtodom && {
      moto: {
        label: { title: 'Мотоциклы', link: '/moto/' },
        childs: [
          {
            label: { title: 'Новые мотоциклы', link: '/moto/new/' },
            childs: [],
          },
          {
            label: { title: 'Мотоциклы с пробегом', link: '/moto/used/' },
            childs: [],
          },
        ],
      },
      electro: {
        label: { title: 'Электромобили', link: '/electro/' },
        childs: [
          {
            label: { title: 'Новые модели электромобилей', link: '/electro/new/' },
            childs: [],
          },
          {
            label: { title: 'Электромобили с пробегом', link: '/electro/used/' },
            childs: [],
          },
        ],
      },
    }),
    atv: {
      label: { title: 'Квадроциклы', link: '/atv/' },
      childs: [
        {
          label: { title: 'Новые квадроциклы', link: '/atv/new/' },
          childs: [],
        },
        {
          label: { title: 'Квадроциклы  с пробегом', link: '/atv/used/' },
          childs: [],
        },
      ],
    },
    commercial: {
      label: { title: 'Коммерческий транспорт', link: '/commercial/' },
      childs: [
        {
          label: { title: 'Легкий коммерческий транспорт', link: '/commercial/fleet/' },
          childs: [],
        },
        {
          label: { title: 'Грузовой коммерческий транспорт', link: '/commercial/trucks/' },
          childs: [],
        },
      ],
    },
  },
  {
    brands: {
      label: { title: 'Бренды', link: '/brands/' },
      childs: [],
    },
    services: {
      label: { title: 'Услуги', link: '/services/' },
      childs: [
        { label: { title: 'Кредитование', link: '/services/credit/' } },
        { label: { title: 'Страхование', link: '/services/insurance/' } },
        { label: { title: isAvtodom ? 'Выкуп автомобилей' : 'Trade-in', link: '/services/trade-in/' } },
        { label: { title: 'Лизинг', link: '/services/leasing/' } },
        {
          label: {
            title: 'Корпоративным клиентам',
            link: '/services/corporate/',
          },
        },
        {
          label: {
            title: 'Автодом Подписка',
            link: isAvtodom ? '/services/subscription/' : '/cars/on-sale-soon/',
          },
        },
        {
          label: {
            title: 'Яндекс Сплит',
            link: '/services/yandex_split/',
          },
        },
      ],
    },
    service: {
      label: { title: 'Сервис', link: '/service/' },
      childs: [
        {
          label: {
            title: 'Онлайн запись на сервис',
            link: '/service/online/',
          },
        },
        {
          label: {
            title: 'Кузовной ремонт',
            link: '/service/body-repair/',
          },
        },
        {
          label: {
            title: 'Программа лояльности',
            link: '/service/loyalty-program/',
          },
        },
        {
          label: {
            title: 'Сезонный шиномонтаж',
            link: '/service/tire-service/',
          },
        },
      ],
    },
    actions: {
      label: { title: 'Акции', link: '/actions/' },
      childs: [],
    },
  },
  {
    dealers: {
      label: { title: 'Дилерские центры', link: '/contacts/' },
      childs: [],
    },
    about: {
      label: { title: 'О компании', link: '/about/' },
      childs: [
        {
          label: {
            title: 'История',
            link: '/about/history/',
          },
          childs: [],
        },
        {
          label: { title: 'Комплаенс', link: isAvtodom ? '/about/compliance/' : '/about/' },
          childs: [
            {
              label: {
                title: 'Комплаенс-программа',
                link: isAvtodom ? '/about/compliance/' : '/about/',
              },
            },
            {
              label: {
                title: 'Комплаенс-политика',
                link: isAvtodom ? '/about/compliance/' : '/about/',
              },
            },
            {
              label: {
                title: 'Кодекс корпоративной этики',
                link: isAvtodom ? '/about/compliance/' : '/about/',
              },
            },
          ],
        },
        ...(isAvtodom
          ? [{
              label: { title: 'Инвесторам', link: '/investors/' },
              childs: [
                {
                  label: {
                    title: 'Корпоративные документы',
                    link: '/investors/korporativnye-dokumenty/',
                  },
                },
                {
                  label: {
                    title: 'Операционные показатели',
                    link: '/investors/operatsionnye-pokazateli/',
                  },
                },
                {
                  label: {
                    title: 'Рейтинги',
                    link: '/investors/reytingi/',
                  },
                },
                {
                  label: {
                    title: 'Финансовая отчетность',
                    link: '/investors/financial_reports/',
                  },
                },
              ],
            }]
          : []),
        {
          label: {
            title: 'СМИ о нас',
            link: '/media/',
          },
        },
        {
          label: {
            title: 'Карьера',
            link: '/about/career/',
          },
        },
        ...(isAsc
          ? [{
              label: {
                title: 'Благотворительность',
                link: '/tekhnologii-detskogo-schastya/',
              },
            },
            {
              label: {
                title: 'Статьи',
                link: '/blog/',
              },
            }]
          : []),
      ],
    },
    news: {
      label: { title: 'Новости', link: '/news/' },
    },
  },
])

// seo
const title = `Карта сайта – ГК ${holdingName}`
const description = `На данной странице находится карта сайта ${fullDomain}`
const h1 = 'Карта сайта'
useHeadDefault({ title, description })

// methods

const setToSitemap = (keyName, arr) => {
  sitemap.value.forEach((row, index) => {
    if (row[keyName]) {
      sitemap.value[index][keyName].childs = arr
    }
  })
}

const fetchDealers = async () => {
  try {
    const dealers = await $fetchClient(getDealersPath())
    const dealersRaw = dealers?.data ?? []

    if (dealersRaw.length > 0) {
      const arr = []

      dealersRaw.forEach((dealer) => {
        let issetKey = null

        arr.find((item, index) => {
          const labelTitle = item.label.title.toLowerCase()
          const dealerMarkNameEn = dealer.mark.nameEn.toLowerCase()
          if (labelTitle === dealerMarkNameEn) {
            issetKey = index
            return true
          }
          return false
        })

        const dealerItem = {
          label: {
            title: dealer.nameRu,
            link: `/contacts/${dealer.mark.code}/${dealer.code}/`,
          },
        }

        if (issetKey === null) {
          arr.push({
            label: {
              title: dealer.mark.nameEn,
              link: `/contacts/${dealer.mark.code}/`,
            },
            childs: [dealerItem],
          })
        } else {
          arr[issetKey]?.childs.push(dealerItem)
        }
      })

      setToSitemap('dealers', arr)
    }
  } catch (e) {
  }
}

const fetchBrands = async () => {
  try {
    const brands = await getBrands()

    const brandsRaw = brands?.data ?? []

    if (brandsRaw.length > 0) {
      brandsRaw.sort((a, b) => a.nameEn.localeCompare(b.nameEn))

      const arr = brandsRaw.map((item) => {
        return {
          label: {
            title: item.mark.nameEn,
            link: `/brands/${item.code}/`,
          },
          childs: [],
        }
      })

      setToSitemap('brands', arr)
    }
  } catch (e) {
  }
}

// fetch

await fetchDealers()
await fetchBrands()
</script>

<style lang="scss" scoped>
.sitemap {
  padding-bottom: 40px;

  @include mq($bp-medium) {
    padding-bottom: 90px;
  }

  &__box {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-small-medium) {
      grid-gap: 40px;
    }

    @include mq($bp-medium) {
      grid-gap: 50px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 30px;
    column-gap: 0;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 40px;
      column-gap: 20px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mq($bp-medium) {
      row-gap: 50px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 30px;
      column-gap: 30px;
    }
  }

  &__title {
    @include h4;

    color: var(--blackLight);

    @include mq($bp-medium) {
      @include h3;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    li {
      margin-top: 15px;
    }

    &_links {
      li {
        margin-top: 10px;
      }
    }
  }

  &__subtitle {
    @include h5;

    color: var(--grayDolphin);

    @include mq($bp-medium) {
      @include h4;
    }
  }

  &__link {
    @include text_medium_bold;

    color: var(--grayDolphin);

    @include mq($bp-medium) {
      @include text_big_bold;
    }
  }
}
</style>
