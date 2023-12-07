<template>
  <div
    v-if="catCountAll > 0"
    itemtype="http://schema.org/AggregateOffer"
    itemscope
    itemprop="offers"
    class="micro-marking"
  >
    <meta :content="catCountAll" itemprop="offerCount">
    <meta :content="schemaMinPrice" itemprop="lowPrice">
    <meta content="RUB" itemprop="priceCurrency">
  </div>
</template>

<script>
export default {
  name: 'BrandsMicroMarkingAggregateOffer',
  props: {
    catCountAll: {
      type: String,
      required: true,
    },
    schemaMinPrice: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.micro-marking {
  display: none;
  visibility: hidden;
  opacity: 0;
}
</style>
