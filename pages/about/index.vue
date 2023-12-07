<template>
  <DetailMain class="about">
    <template #aside>
      <MediaContactsCard is-detail class="about__card" />
    </template>
    <template #body>
      <section
        v-if="staticPageInfo"
        class="about__html"
        v-html="staticPageInfo.description"
      />
    </template>
  </DetailMain>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getStaticPage } from '@/api/routes/brands'

definePageMeta({
  layout: 'about',
})

const { isAsc, domain } = useHoldingStore()
const { $fetchClient, $hasErrorResponse } = useNuxtApp()
const seo = {
  avtodom: {
    title: 'О компании АВТОDОМ: публичная информация о компании',
    description:
        'Компания «АВТОДОМ» основана 21 декабря 1992 года. Сегодня - это автомобильный холдинг, специализирующийся на продажах и техническом обслуживании автомобилей сегментов Люкс и Премиум',
  },
  asc: {
    title:
        'О группе компаний официальных автомобильных дилеров в Москве | ГК АвтоСпецЦентр',
    description:
        'Группа компаний «АвтоСпецЦентр» — один из крупнейших российских автодилеров, работает на рынке с 1998 года. Подробнее о группе компаний можно узнать на официальном сайте.',
  },
}
const title = seo[domain].title
const description = seo[domain].description
const idStaticPage = isAsc ? '12027' : '12028'
const res = await $fetchClient(getStaticPage(idStaticPage))
const staticPageInfo = !$hasErrorResponse(res) ? res : null

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
.about {
  &__card {
    @include mq($bp-medium-big) {
      max-width: 377px;
    }
  }

  &__html {
    @import 'assets/styles/components/Brands/html-style';
  }
}
</style>
