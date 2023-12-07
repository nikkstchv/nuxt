<template>
  <div
    v-if="isAsc"
    class="seo"
    itemScope
    itemType="https://schema.org/Organization"
  >
    <meta itemProp="name" content="АвтоСпецЦентр">
    <link itemProp="url" href="https://www.ascgroup.ru/">
    <link itemProp="logo" href="icons/asc-logo.svg">
    <meta
      itemProp="description"
      content=" АвтоСпецЦентр - группа компаний по продаже новых и бу автомобилей, один из крупнейших российских автодилеров, на рынке с 1998 года."
    >
    <meta itemProp="email" content="info@ascgroup.ru">
    <div
      itemProp="address"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <meta itemProp="addressLocality" content="Москва, Россия">
      <meta itemProp="postalCode" content="119421">
      <meta itemProp="streetAddress" content="Ленинский проспект, д.107">
    </div>
    <meta itemProp="telephone" :content="holdingPhone">
    <link itemProp="sameAs" href="http://www.youtube.com/autospeccenter/">
    <link itemProp="sameAs" href="https://www.messenger.com/t/ascgroupbot">
    <link itemProp="sameAs" href="https://t.me/ascgroupbot?start=666">
  </div>
  <div v-else class="seo" itemScope itemType="https://schema.org/Organization">
    <meta itemProp="name" content="Автодом">
    <link itemProp="url" href="https://avtodom.ru/">
    <link itemProp="logo" :href="logoHref">
    <meta
      itemProp="description"
      content="Автодом - один из крупнейших в России автомобильных холдингов, который специализируется на продажах и сервисном обслуживании автомобилей классов премиум и люкс. На рынке с 1992 года."
    >
    <meta itemProp="email" content="info@avtodom.ru">
    <div
      itemProp="address"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <meta itemProp="addressLocality" content="Москва, Россия">
      <meta itemProp="postalCode" content="125252">
      <meta itemProp="streetAddress" content="ул. Зорге, д. 17, стр. 1">
    </div>
    <meta itemProp="telephone" :content="holdingPhone">
    <link
      itemProp="sameAs"
      href="https://www.youtube.com/channel/UCtjZGj-ycNB_he1S186K8dA"
    >
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'

export default {
  name: 'SEOMainAndAbout',
  computed: {
    logoHref () {
      const runtimeConfig = useRuntimeConfig()
      const cdnUrl = runtimeConfig.public.cdnUrl
      return this.isAsc
        ? `${cdnUrl}/logo_image_asc.png`
        : `${cdnUrl}/logo_image_avt.png`
    },
    ...mapState(useHoldingStore, {
      isAsc: 'isAsc',
      holdingPhone: 'holdingPhone',
    }),
  },
}
</script>

<style scoped lang="scss">
.seo {
  display: none;
}
</style>
