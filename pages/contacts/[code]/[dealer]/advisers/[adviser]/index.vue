<template>
  <main class="adviser-detail">
    <section class="adviser-detail__section">
      <UISimplePageHeader
        class="adviser-detail__header"
        :direct-crumbs="directCrumbs"
      />

      <div
        v-if="adviser"
        :class="[
          'adviser-detail__card',
          { 'adviser-detail__card_no-photo': !adviserPhoto },
        ]"
      >
        <nuxt-img
          v-if="adviserPhoto"
          :src="adviserPhoto"
          class="adviser-detail__photo"
          alt="фотография сотрудника"
          loading="lazy"
        />

        <div class="adviser-detail__info">
          <header class="adviser-detail__info-header">
            <h1 class="adviser-detail__name">
              {{ h1 }}
            </h1>

            <div v-if="hasLogo" class="adviser-detail__logo">
              <nuxt-img
                v-if="dealer.mark?.Logo"
                :src="dealer.mark.Logo"
                alt="логотип"
                loading="lazy"
              />
            </div>
          </header>
          <div class="adviser-detail__cols">
            <div class="adviser-detail__col">
              <div v-if="dealerName" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  Дилерский центр
                </p>
                <p class="adviser-detail__value">
                  {{ dealerName }}
                </p>
              </div>

              <div v-if="adviserDepartment" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  Отдел
                </p>
                <p class="adviser-detail__value">
                  {{ adviserDepartment }}
                </p>
              </div>

              <div v-if="adviserPosition" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  Должность
                </p>
                <p class="adviser-detail__value">
                  {{ adviserPosition }}
                </p>
              </div>

              <div class="adviser-detail__item adviser-detail__item_no-border">
                <a
                  v-if="adviserUserCode"
                  :href="getAdviserVcf(adviserUserCode)"
                  :download="`${adviserUserCode}.vcf`"
                  target="_blank"
                  class="adviser-detail__value adviser-detail__value_link"
                >
                  <span class="adviser-detail__download">
                    <IconDownloadArrow />
                  </span>
                  Сохранить карточку контакта
                </a>
              </div>
            </div>

            <div class="adviser-detail__col">
              <div v-if="adviserPhoneWork" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  Рабочий телефон
                </p>
                <a
                  :href="`tel:${adviserPhoneWork}`"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  class="adviser-detail__value"
                >
                  {{ adviserPhoneWork }}
                </a>
              </div>

              <div v-if="adviserPhoneMobile" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  Мобильный телефон
                </p>
                <a
                  :href="`tel:${adviserPhoneMobile}`"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  class="adviser-detail__value"
                >
                  {{ adviserPhoneMobile }}
                </a>
              </div>

              <div v-if="adviserEmail" class="adviser-detail__item">
                <p class="adviser-detail__label">
                  E-mail
                </p>
                <a
                  rel="nofollow noindex"
                  :href="`mailto:${adviserEmail}`"
                  target="_blank"
                  class="adviser-detail__value"
                >
                  {{ adviserEmail }}
                </a>
              </div>

              <div class="adviser-detail__col adviser-detail__col_qr">
                <div
                  v-if="adviserUserCode"
                  class="adviser-detail__item adviser-detail__item_no-border"
                >
                  <div class="adviser-detail__value">
                    <div class="adviser-detail__qr">
                      <img
                        ref="qr"
                        :src="endpointQr + getAdviserQr(adviserUserCode)"
                        width="200"
                        height="200"
                        alt="Сотрудник"
                      >
                    </div>
                    Сохранить контакт на телефон
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="adviser-detail__cols adviser-detail__cols_list">
            <nuxt-link
              v-for="link in links"
              :key="link.title"
              class="adviser-detail__link link"
              :to="link.href"
            >
              <component :is="link.iconComponent" class="link__icon" />
              <span class="link__name">{{ link.title }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>

      <p v-else class="adviser-detail__empty">
        Сотрудник не найден
      </p>
    </section>
  </main>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { getDealer } from '@/api/routes/dealer'
import { getAdviser, getAdviserQr, getAdviserVcf } from '@/api/routes/adviser'
import serviceRoutes from '@/api/routes/service'

import IconDownloadArrow from '@/components/Icon/DownloadArrow.vue'
import IconCarUsed from '@/components/Icon/CarUsed.vue'
import IconCarSteeringWheel from '@/components/Icon/CarSteeringWheel.vue'
import IconCarWheel from '@/components/Icon/CarWheel.vue'
import IconCars from '@/components/Icon/Cars.vue'
import IconCarTradeIn from '@/components/Icon/CarTradeIn.vue'
import IconCarTO from '@/components/Icon/CarTO.vue'
import IconCarBodyRepair from '@/components/Icon/CarBodyRepair.vue'
import IconMotoBodyRepair from '@/components/Icon/MotoBodyRepair.vue'
import IconLoyaltyProgram from '@/components/Icon/LoyaltyProgram.vue'
import IconMotorcycle from '@/components/Icon/Motorcycle.vue'
import IconMotoHelmet from '@/components/Icon/MotoHelmet.vue'
import IconMotoTO from '@/components/Icon/MotoTO.vue'

const { isAvtodom } = useHoldingStore()
const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const route = useRoute()
const { params, path } = route
const { adviser, mark, dealer: code } = params

const getDealerData = async () => {
  const res = await $fetchClient(getDealer(code, mark))

  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

const getAdviserData = async () => {
  const { user } = await $fetchClient(getAdviser(adviser))
  if ($hasErrorResponse(user)) {
    $errorResponseCatch(user)
  } else {
    return user
  }
}

const getServiceBrands = async () => {
  const brands = await $fetchClient(serviceRoutes.getAllBrands())
  if ($hasErrorResponse(brands)) {
    $errorResponseCatch(brands)
  } else {
    return brands?.refs?.mark
  }
}

const seo = await $getSeo(path)
const dealer = await getDealerData()
const adviserData = await getAdviserData()
const brandsData = await getServiceBrands()
const serviceIds = ['22', '23', '24', '25']
const isServiceDepartment = serviceIds.includes(adviserData.departmentId)
const dealerName = dealer?.nameRu ?? ''
const dealerMark = dealer?.mark?.nameEn ?? ''
const hasLogo = dealer?.mark?.Logo ?? null
const markCode = dealer?.mark?.code ?? ''
const foundBrandInService = brandsData
  ? brandsData.find(brand => markCode === brand.code)
  : null
const markType = dealer?.mark?.markType ?? ''
const adviserPhoto = adviserData?.userPhoto ?? ''
const adviserName = adviserData?.name ? adviserData.name.trim() : ''
const adviserDealer = adviserData?.dealer ?? ''
const adviserDepartment = adviserData?.department ?? ''
const adviserPhoneWork = adviserData?.phoneWork?.[0] ?? ''
const adviserPhoneMobile = adviserData?.phoneMobile?.[0] ?? ''
const adviserEmail = adviserData?.email?.[0] ?? ''
const adviserPosition = adviserData?.position ?? ''
const adviserUserCode = adviserData?.userCode ?? ''
const endpointQr = 'https://api.avtodom.ru'
const links = [
  ...(markType !== 'moto'
    ? [
        {
          iconComponent: IconCarUsed,
          title: 'Автомобили с пробегом',
          href: '/cars/used/',
        },
        {
          iconComponent: IconCarSteeringWheel,
          title: `Автомобили с пробегом ${dealerMark}`,
          href: `/cars/used/${markCode}/`,
        },

      ]
    : [
        {
          iconComponent: IconCarUsed,
          title: 'Мотоциклы с пробегом',
          href: '/moto/used/',
        },
        {
          iconComponent: IconMotoHelmet,
          title: `Мотоциклы с пробегом ${dealerMark}`,
          href: `/moto/used/${markCode}/`,
        },
      ]
  ),
  {
    iconComponent: markType !== 'moto' ? IconCars : IconMotorcycle,
    title: `Модельный ряд ${dealerMark}`,
    href: `/brands/${markCode}/`,
  },
  ...(markType !== 'moto'
    ? [
        {
          iconComponent: IconCarTradeIn,
          title: isAvtodom
            ? 'Срочный выкуп авто'
            : 'Выкуп автомобилей с пробегом в Москве',
          href: '/services/trade-in/',
        },
      ]
    : []
  ),
  ...(isServiceDepartment && foundBrandInService
    ? [
        {
          iconComponent: markType !== 'moto' ? IconCarTO : IconMotoTO,
          title: 'Техническое обслуживание',
          href: '/service/to/',
        },
        {
          iconComponent: markType !== 'moto' ? IconCarBodyRepair : IconMotoBodyRepair,
          title: 'Кузовной ремонт',
          href: '/service/body-repair/',
        },
        {
          iconComponent: IconCarWheel,
          title: 'Сезонный шиномонтаж',
          href: '/service/tire-service/',
        },
        ...(isAvtodom
          ? [
              {
                iconComponent: IconLoyaltyProgram,
                title: 'Программа лояльности',
                href: '/service/loyalty-program/',
              },
            ]
          : []),
      ]
    : []),
]

// seo
const directCrumbs = ['', dealerMark, dealerName, '', adviserName]
const defaultH1 = adviserName
const defaultTitle = `${adviserName ? adviserName + '.' : ''}${
    adviserDealer ? ` ${adviserDealer}.` : ''
  }${adviserPosition ? ` ${adviserPosition}` : ''}`
const defaultDescription = `${
    adviserName ? adviserName + '.' : ''
  }${adviserDealer ? ` ${adviserDealer}.` : ''}${
    adviserPosition ? ` ${adviserPosition}` : ''
  }`
const h1 = seo?.seoH1 || defaultH1
const title = seo?.seoTitle || defaultTitle
const description = seo?.seoDescription || defaultDescription
const meta = [
  {
    hid: 'og:image',
    name: 'og:image',
    property: 'og:image',
    content: adviserPhoto,
  },
]

useHeadDefault({
  title,
  description,
  meta,
})
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.adviser-detail {
  padding-bottom: 180px;

  &__section {
    @include indentsMainHorizontal;

    height: 100%;
  }

  &__header {
    padding-top: 15px;
  }

  &__info-header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 25px;
    }

    @include mq($bp-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 35px;
    }
  }

  &__logo {
    height: 30px;

    @include mq($bp-small-medium) {
      height: 40px;
    }

    @include mq($bp-medium-big) {
      height: 50px;
    }

    img {
      height: 100%;
    }
  }

  &__card {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    align-items: flex-start;
    padding-top: 30px;

    @include mq($bp-small-medium) {
      padding-top: 60px;
    }

    @include mq($bp-small) {
      padding-top: 100px;
    }

    @include mq($bp-medium) {
      grid-template-columns: 300px 1fr;
      grid-gap: 40px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: 370px 1fr;
      grid-gap: 60px;
      padding-top: 120px;
    }

    @include mq($bp-big) {
      grid-template-columns: 397px 1fr;
      grid-gap: 150px;
      padding-top: 140px;
    }

    &_no-photo {
      grid-template-columns: 1fr;
      max-width: 1080px;
    }
  }

  &__photo {
    width: 230px;
    margin: auto;
    overflow: hidden;
    border-radius: 8px;

    @include mq($bp-medium) {
      width: 100%;
      margin: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  }

  &__name {
    @include h4;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__cols {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 25px;
    align-items: flex-start;
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 0 51px;
      margin-bottom: 40px;
    }

    &_list {
      grid-gap: 28px 40px;

      @include mq($bp-small) {
        grid-gap: 32px 51px;
      }
    }
  }

  &__col {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 25px 0;

    @include mq($bp-small) {
      grid-gap: 20px 0;
    }

    @include mq($bp-medium) {
      grid-gap: 25px 0;
    }

    @include mq($bp-medium-big) {
      grid-gap: 30px 0;
    }

    &_qr {
      display: none;

      @include mq($bp-medium) {
        display: flex;
      }
    }
  }

  &__item {
    @include text_big_medium;

    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--grayMediumLight);

    &_no-border {
      border: none;
    }

    &_empty {
      display: none;

      @include mq($bp-small-medium) {
        display: flex;
      }
    }
  }

  &__label {
    margin-bottom: 10px;
    color: var(--grayDolphin);
  }

  &__value {
    display: flex;
    align-items: center;

    &_link {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__qr {
    min-width: 150px;
    margin-right: 20px;
  }

  &__download {
    margin-right: 8px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.link {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 16px;
  align-items: center;
  justify-content: flex-start;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.7;
    }
  }

  &__name {
    @include text_big_medium;
  }
}
</style>
