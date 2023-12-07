<template>
  <div class="services">
    <UISimplePageHeader :title="h1" />
    <main class="services__main">
      <div class="services__list">
        <CatalogCardSmall
          v-for="card in cards"
          :key="card.title"
          :title="card.title"
          :image="card.image"
          :href="card.href"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import UISimplePageHeader from '@/components/UI/SimplePageHeader.vue'
import CatalogCardSmall from '@/components/Catalog/CardSmall.vue'

const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl
const h1 = 'Услуги'
const title = 'Услуги – АВТОДОМ'
const description = 'Услуги и финансовые предложения на приобретение от дилерских центров АВТОDОМ. Будьте в курсе самых свежих выгодных предложений дилерских центров АВТОDОМ'
const path = '/services'
const cards = [
  {
    image: `${cdnUrl}/services/services_testdrive.jpg`,
    title: 'Тест-драйв',
    href: path + '/testdrive/',
  },
  {
    image: `${cdnUrl}/services/services_subscribe.png`,
    title: 'Автодом Подписка',
    href: path + '/subscription/',
  },
  {
    image: `${cdnUrl}/services/services_leasing.jpg`,
    title: 'Лизинг',
    href: path + '/leasing/',
  },
  {
    image: `${cdnUrl}/services/services_credit.jpg`,
    title: 'Кредитование',
    href: path + '/credit/',
  },
  {
    image: `${cdnUrl}/services/services_trade_in.jpg`,
    title: 'Trade-in',
    href: path + '/trade-in/',
  },
  {
    image: `${cdnUrl}/services/services_insurance.jpg`,
    title: 'Страхование',
    href: path + '/insurance/',
  },
  {
    image: `${cdnUrl}/services/services_corprorative.jpg`,
    title: 'Корпоративным клиентам',
    href: path + '/corporate/',
  },
  {
    image: `${cdnUrl}/services/services_yandex_split.jpg`,
    title: 'Яндекс Сплит',
    href: path + '/yandex_split/',
  },
]

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.services {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  display: grid;
  width: 100%;
  height: fit-content;

  &__main {
    position: relative;
    display: flex;
    flex-direction: column;

    @media (max-width: $bp-small-medium) {
      display: grid;
      grid-auto-flow: row;
      grid-gap: 13px;
      align-items: center;
    }

    @media (min-width: $bp-medium + 1) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    row-gap: 50px;
    width: 100%;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 30px;
      column-gap: 17px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 27px;
    }

    @include mq($bp-medium) {
      row-gap: 40px;
      column-gap: 35px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 50px;
      column-gap: 35px;
    }

    @include mq($bp-big) {
      row-gap: 70px;
    }
  }
}
</style>
