<template>
  <div class="seo" itemscope itemtype="https://schema.org/AutoDealer">
    <meta itemprop="name" :content="name">
    <div itemprop="telephone" :content="phone" />
    <meta itemprop="address" :content="name + address">
    <time itemprop="openingHours" :datetime="time" />
    <meta itemprop="areaServed" :content="city">
    <a :href="`mailto:${email}`" itemprop="email" />
    <meta itemprop="currenciesAccepted" content="RUB">
    <meta
      itemprop="paymentAccepted"
      content="Наличные, Банковские карты, Банковский перевод"
    >
    <meta itemprop="priceRange" content="$$$">
    <a :href="url" itemprop="url" />
    <div itemprop="brand" :content="holding" />
    <meta itemprop="description" :content="description">
    <ul
      itemprop="hasOfferCatalog"
      itemscope
      itemtype="https://schema.org/OfferCatalog"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'

export default {
  name: 'SeoDealerDetail',
  props: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    holding: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useHoldingStore, ['isAsc']),
  },
}
</script>

<style scoped lang="scss">
.seo {
  display: none;
}
</style>
