<template>
  <main v-if="dealer" class="contacts-detail">
    <section
      class="contacts-detail__section"
      itemscope
      itemtype="http://schema.org/LocalBusiness"
    >
      <UISimplePageHeader
        class="contacts-detail__header"
        :title="h1"
        :direct-crumbs="directCrumbs"
      >
        <template v-if="hasLogo" #before-title>
          <nuxt-img
            v-for="item in dealer.marks.length ? dealer.marks : [dealer.mark]"
            :key="item.code"
            class="contacts-detail__logo"
            :src="item.Logo"
            :alt="`Логотип ${item.nameEn}`"
          />
        </template>
      </UISimplePageHeader>
      <section class="contacts-detail__main-info">
        <ContactsMainSlider
          v-if="dealerPhoto"
          :images="dealerPhoto"
          class="contacts-detail__main-slider"
        />
        <div class="contacts-detail__contact-info">
          <ContactsDetail
            v-if="dealer"
            class="contacts-detail__name"
            :dealer="dealer"
          />
          <a
            class="contacts-detail__phone"
            itemprop="telephone"
            :href="`tel:${dealer.phone}`"
          >
            {{ dealer.phone }}</a>
          <ContactsDepartmentList class="contacts-detail__department-list">
            <ContactsDepartmentItem
              v-for="item in dealer.timeTable"
              :key="item.department"
              :title="item.department"
              :time="item.time"
            />
            <UIBaseButton
              v-if="hasService"
              class="contacts-detail__button contacts-detail__button_secondary"
              text="Запись на сервис"
              secondary
              large
              @click="openServicePanelHandler({ dealerCode, markCode: dealerMarkCode, dealerId })"
            />

            <UIBaseButton
              :to="`/feedback/${dealer.code}/`"
              class="contacts-detail__button"
              :class="{
                'contacts-detail__button_primary': hasService,
              }"
              text="Оставить отзыв"
              primary
              large
            />
          </ContactsDepartmentList>
        </div>
      </section>
      <section
        class="contacts-detail__about"
        :class="{'contacts-detail__about_empty_dealer_info': !dealer.description}"
      >
        <div
          v-if="dealer.description"
          class="contacts-detail__about-dealer-info"
        >
          <ContactsSubtitle>О дилерском центре</ContactsSubtitle>
          <div class="contacts-detail__text" v-html="dealer.description" />
        </div>
        <ContactsBlockList
          v-if="services && services.length"
          class="contacts-detail__about-services"
          title="Услуги"
          :items="services"
          block-name="services"
        />
        <ContactsBlockList
          v-if="service && service.length"
          class="contacts-detail__about-service"
          title="Сервис"
          :items="service"
          block-name="service"
        />
        <ContactsAwardBlock v-if="dealer.awards.length" :awards="dealer.awards" />
      </section>
    </section>
    <ContactsNavigationBlock
      class="contacts-detail__section"
      :h1="h1"
      :placemarks="placemarks"
      :google-card-url="dealer.googleCardUrl"
      :yandex-card-url="dealer.yandexCardUrl"
      :yanavi-card-url="dealer.yanaviCardUrl"
      :two-gis-card-url="dealer.twoGisCardUrl"
      @onGoToNavigation="onGoToNavigation"
    />
    <LazyContactsAdvisersBlock
      :dealer-address="dealer.address"
      :dealer-id="dealer.id"
      link-see-all="advisers"
    />
    <FeedbackBlock form-id="form_dealer_question" :dealer-id="dealer.id" />
    <LazyOnSaleBlock
      v-for="typeOfTransport in dealer.vehicleTypes"
      :key="typeOfTransport"
      :title="getOnSaleTitle(typeOfTransport)"
      :link-see-all="getLinkSeeAllOnSaleBlock(typeOfTransport, dealer.code)"
      :transport-type="typeOfTransport"
      in-stock
      :location="dealer.code"
    />
    <LazyDealersBlock
      class="catalog__dealers"
      :mark-code="dealer.mark.code"
      :mark-name-en="dealer.mark.nameEn"
      :dealer-id="dealer.id"
    />
    <!--    <LazyContactsReviewsBlock class="contacts-detail__section" />-->
    <LazyPressBlock
      title="Новости"
      :mark-id="dealer.mark.id"
      :mark-code="dealer.mark.code"
    />
  </main>
  <UILoader v-else class="contacts-detail__loader" />
  <LazyServicePanel />
  <LazyFormPanelFeedbackService />
  <LazyFormPanelTestDrive />
  <SeoDealerDetail
    :name="dealer.nameRu"
    :phone="dealer.phone"
    :address="dealer.address"
    :time="dealer.timeTable[0]?.time ?? ''"
    :city="dealer.city"
    :url="seoUrl"
    :email="isAsc ? 'info@ascgroup.ru' : 'info@avtodom.ru'"
    :description="description"
    :holding="holdingName"
  />
</template>

<script setup>
import { useFormStore } from '@/store/form'
import { useServiceStore } from '@/store/service'
import { useHoldingStore } from '@/store/holding'
import { getDealer as getDealerPath } from '@/api/routes/dealer'

const { $fetchClient, $hasErrorResponse, $errorResponseCatch, $getSeo } = useNuxtApp()
const { isAsc, holdingName, domain } = useHoldingStore()
const { setInitData } = useFormStore()
const { onOpen: onOpenServicePanel } = useServiceStore()
const route = useRoute()

// methods

const onGoToNavigation = (url) => {
  process.client && window.open(url, '_blank')
}
const getLinkSeeAllOnSaleBlock = (typeOfTransport, location) => {
  const queryLocation = `?location=${location}`
  const commercials = ['commercial', 'trucks', 'fleet']
  const hasFreightTransport = commercials.includes(typeOfTransport)
  if (hasFreightTransport) {
    return `/commercial/${queryLocation}`
  }
  return `/${typeOfTransport}/${queryLocation}`
}
const getOnSaleTitle = (typeOfTransport) => {
  const inStockText = ` в наличии в ${dealerName}`
  let typeOfTransportText = ''
  switch (typeOfTransport) {
    case 'cars':
      typeOfTransportText = 'Легковые автомобили'
      break
    case 'moto':
      typeOfTransportText = 'Мотоциклы'
      break
    case 'commercial':
      typeOfTransportText = 'Легкий коммерческий транспорт'
      break
    case 'atv':
      typeOfTransportText = 'Квадроциклы'
      break
    case 'trucks':
      typeOfTransportText = 'Грузовой коммерческий транспорт'
      break
    case 'jet-ski':
      typeOfTransportText = 'Гидроциклы'
      break
    case 'buses':
      typeOfTransportText = 'Автобусы'
      break
    default:
      return `В наличии в ${dealerName}`
  }
  return typeOfTransportText + inStockText
}
const wordDeclension = (word) => {
  const last = word.slice(-1)
  const vowelLetter = ['а', 'о', 'и', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я']
  const isLastVowelLetter = vowelLetter.includes(last)
  if (isLastVowelLetter) {
    return word.slice(0, -1) + 'e'
  } else {
    return word + 'e'
  }
}
const setServiceData = ({ dealerCode, markCode, dealerId }) => {
  const hasSomeInfo = markCode || dealerCode
  if (hasSomeInfo) {
    setInitData({
      ...(markCode && { markCode }),
      ...(dealerCode && { dealerCode }),
      ...(dealerId && { dealerId }),
    })
  }
}

const openServicePanelHandler = (...rest) => {
  setServiceData(...rest)
  onOpenServicePanel()
}

const getDealer = async () => {
  const { mark, dealer: code } = route.params
  const res = await $fetchClient(getDealerPath(code, mark))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

// vars

const seo = await $getSeo(route.path)
const seoUrl = `https://${domain}${route.path}`
const dealer = await getDealer()
const dealerName = dealer?.nameRu ?? ''
const dealerCode = dealer?.code ?? ''
const dealerId = dealer?.id ?? ''
const dealerMarkCode = dealer?.mark?.code ?? ''
const dealerMark = dealer?.mark?.nameEn ?? ''
const dealerCity = wordDeclension(dealer?.city ?? '')
const dealerAddress = dealer?.address ?? ''
const vehicleTypes = dealer?.vehicleTypes ?? []
const dealerPhoto = dealer?.photo?.length ? dealer.photo : null
const services = dealer.serviceTypes.filter(item => item.parentId === '13')
const service = dealer.serviceTypes.filter(item => item.parentId === '14')
const hasLogo = dealer?.mark?.Logo ?? null
const currentMark = dealer?.marks?.find(item => item.code === route.params.mark)
const mark = currentMark?.nameEn ?? dealerMark
const directCrumbs = ['', mark, dealerName]
const dealerTypeOfTransportTitle = (() => {
  const vehicleTypes = dealer?.vehicleTypes ?? []
  const isMoto = vehicleTypes.includes('moto') && vehicleTypes.length === 1

  return isMoto ? 'мотосалон' : 'центр'
})()
const dealerTypeOfTransport = (() => {
  return (
    vehicleTypes
      ?.map((item) => {
        switch (item) {
          case 'cars':
            return 'автомобилей'
          case 'moto':
            return 'мотоциклов'
          case 'commercial':
            return 'легкового коммерческого транспорта'
          case 'atv':
            return 'квадроциклов'
          case 'trucks':
            return 'грузового коммерческого транспорта'
          case 'jet-ski':
            return 'гидроциклов'
          case 'buses':
            return 'автобусов'
          case 'snowmobiles':
            return 'снегоходов'
          default:
            return 'автомобилей'
        }
      })
      .join(', ') ?? ''
  )
})()
const hasService = (() => {
  const includesIds = ['1', '2', '3', '4', '5', '18']

  return dealer.serviceTypes.some((serviceType) => {
    return includesIds.includes(serviceType.id)
  })
})()
const placemarks = [
  {
    coords: Object.values(dealer.coordinates),
    balloon: {
      name: dealer.nameRu,
      address: dealer.address,
      time: dealer.timeTable[0]?.time,
      phone: dealer.phone,
    },
    markerId: dealer.id,
    clusterName: '1',
  },
]

// seo
const defaultTitle = `Дилерский ${dealerTypeOfTransportTitle} ${dealerName} | ${holdingName}`
const defaultDescription = `Продажа ${dealerTypeOfTransport} ${dealerMark} с гарантией у проверенного дилера в ${dealerCity} компании ${holdingName} на ${dealerAddress}. Ремонт и техобслуживание ${dealerTypeOfTransport} ${dealerMark}.`
const h1 = seo?.seoH1 || dealerName
const title = seo?.seoTitle || defaultTitle
const description = seo?.seoDescription || defaultDescription

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.contacts-detail {
  display: grid;
  grid-gap: 40px;
  height: fit-content;
  margin-bottom: 40px;
  overflow: hidden;

  @include mq($bp-small-medium) {
    grid-gap: 60px;
    margin-bottom: 60px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 80px;
    margin-bottom: 80px;
  }

  &__section {
    @include indentsMainHorizontal;
  }

  &__text {
    @import 'assets/styles/components/Detail/html-style';
  }

  &__main-slider {
    position: relative;
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium) {
      margin-bottom: 0;
    }
  }

  &__logo {
    grid-area: logo;
    align-self: center;
    width: auto;
    max-width: 50px;
    height: auto;
    max-height: 50px;

    @include mq($bp-small-medium) {
      max-width: 80px;
      max-height: 80px;
    }

    &:nth-last-child(2) {
      margin-right: 10px;
    }
  }

  &__phone {
    @include text_medium_regular;

    display: block;
    width: fit-content;
    margin-bottom: 20px;
  }

  &__button {
    grid-row: 3 / 4;
    align-self: flex-end;
    height: fit-content;

    @include mq($bp-small-medium) {
      margin-top: 30px;
    }

    &_primary {
      grid-area: primary;
    }

    &_secondary {
      grid-area: secondary;
    }
  }

  &__department {
    &-list {
      grid-template-areas:
        'text'
        'text'
        'text'
        'text'
        'secondary '
        'primary';

      @include mq(450px) {
        grid-template-areas:
          'text text'
          'text text'
          'secondary primary';
      }

      @include mq($bp-medium, 1000px) {
        column-gap: 20px;
      }
    }

    &-title {
      @include text_medium_regular;

      margin-bottom: 6px;
      color: var(--blackLight);
    }

    &-time {
      @include text_medium_small;
    }
  }

  &__main-info {
    display: grid;

    @include mq($bp-medium, $bp-medium-big) {
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: column;
      grid-gap: 60px;
    }

    @include mq($bp-medium, 1000px) {
      grid-gap: 30px;
    }

    @include mq($bp-medium) {
      max-height: 500px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: minmax(auto, 500px) 1fr;
      grid-auto-flow: column;
      grid-gap: 50px;
    }

    @include mq(1199px) {
      grid-template-columns: minmax(auto, 500px) 1fr;
      grid-gap: 60px;
    }

    @include mq(1600px) {
      grid-template-columns: 770px 1fr;
      grid-gap: 80px;
    }
  }

  &__header {
    padding-top: 15px;
  }

  &__contact-info {
    @include mq(1600px) {
      display: grid;
      grid-template-areas:
        '. logo'
        '. logo'
        '. logo';
      grid-auto-flow: column;
      column-gap: 20px;
      height: fit-content;
    }
  }

  &__about {
    display: grid;
    grid-template-areas:
      'dealer-info'
      'services'
      'service';
    grid-gap: 30px;
    width: fit-content;
    height: fit-content;
    padding-top: 30px;

    @include mq($bp-small-medium) {
      grid-template-areas:
        'dealer-info dealer-info'
        'services service';
      grid-template-columns: min-content;
      row-gap: 50px;
      column-gap: 10px;
    }

    @include mq(431px) {
      grid-template-columns: min-content;
      row-gap: 50px;
      column-gap: 40px;
    }

    @include mq($bp-small) {
      grid-template-columns: minmax(200px, min-content) auto;
      row-gap: 50px;
      column-gap: 60px;
    }

    @include mq($bp-medium) {
      grid-template-areas: 'dealer-info dealer-info services service';
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns:
        minmax(auto, 250px) minmax(auto, 250px) minmax(min-content, 10%)
        minmax(100px, 23%);
      grid-gap: 60px;
    }

    @include mq($bp-big) {
      grid-gap: 80px;
      padding-top: 60px;
    }

    @include mq(1700px) {
      grid-template-areas: 'dealer-info services service .';
      grid-template-columns: 500px 1fr 1fr 1fr;
    }

    &_empty_dealer_info {
      display: flex;
    }

    &-services {
      grid-area: services;
      width: max-content;
    }

    &-service {
      grid-area: service;
      width: max-content;
    }

    &-dealer-info {
      grid-area: dealer-info;
    }
  }

  &__loader {
    margin-top: 50px;
  }
}

:deep(.button) {
  white-space: nowrap;
}
</style>
