<template>
  <main class="detail">
    <UIBreadcrumbs
      class="detail__section detail__section_breadcrumbs"
      :direct-crumbs="directCrumbs"
    />
    <h1 class="detail__title detail__section">
      Транспортное средство не найдено
    </h1>
    <QRFeedbackBlock class="detail__section detail__section_feedback" />
    <OnSaleBlock title="Новинки" link-see-all="/cars/" />
  </main>
</template>

<script setup>
import { getCard } from '@/api/routes/catalog'

const { $fetchClient } = useNuxtApp()
const { params, query } = useRoute()

try {
  const method = 'POST'
  const vin = params?.vin?.toUpperCase() ?? query.car ?? ''
  const body = {
    vin,
  }
  const options = {
    method,
    body,
  }
  const res = await $fetchClient(getCard(), options)
  const car = res?.data ?? null
  if (car) {
    const { dealerCode, carType, city } = car.codes
    const utmMedium = dealerCode ? `&utm_medium=${dealerCode}` : ''
    const queryString = '?utm_source=qr-price' + utmMedium
    if (car.isActive) {
      navigateTo(`/catalog/${car.id}/${queryString}`)
    } else {
      navigateTo(`/${carType}/${queryString}&location=${dealerCode}&city=${city}`)
    }
  }
} catch (e) {
  navigateTo('/brands/')
}

const directCrumbs = ['', params?.vin?.toUpperCase() ?? '']
const title = 'Запрос по VIN'

useHeadDefault({ title })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainVertical;

  &__section {
    @include indentsMainHorizontal;

    &_feedback {
      margin-bottom: 40px;

      @include mq($bp-super-small) {
        margin-bottom: 50px;
      }

      @include mq($bp-small) {
        margin-bottom: 60px;
      }

      @include mq($bp-medium) {
        margin-bottom: 70px;
      }
    }
  }

  &__title {
    margin: 40px 0;
    font-size: 25px;
    font-weight: 800;
    line-height: 35px;
    text-align: center;

    @include mq($bp-super-small) {
      margin: 50px 0;
      font-size: 30px;
      line-height: 40px;
    }

    @include mq($bp-small) {
      margin: 60px 0;
      font-size: 40px;
      line-height: 50px;
    }

    @include mq($bp-medium) {
      margin: 70px 0;
    }

    @include mq($bp-medium-big) {
      margin: 100px 0;
      font-size: 50px;
      line-height: 60px;
    }
  }
}
</style>
