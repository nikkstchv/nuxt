<template>
  <main class="faq">
    <UISimplePageHeader :title="seo.h1" />
    <section v-for="itemList in faqData.faqGroups" :key="itemList.id" class="faq__section">
      <h2 class="faq__subtitle">
        {{ itemList.name }}
      </h2>
      <UIBaseAccordion v-for="item in questionList(itemList.id, faqData?.faqs)" :key="item.id" class="faq__accordion" :label="item.question">
        <DetailList class="faq__list">
          <div class="faq__list-item faq__html" v-html="item.answer" />
        </DetailList>
      </UIBaseAccordion>
    </section>
  </main>
</template>

<script setup>
import { getFaq as getFaqPath } from '../../api/routes/faq'
import { useHoldingStore } from '../../store/holding'

const { $fetchClient, $errorResponseCatch, $hasErrorResponse } = useNuxtApp()
const { domain } = useHoldingStore()

const questionList = (id, faqs) => faqs?.filter(item => item.groupId === id)
const getFaq = async () => {
  const res = await $fetchClient(getFaqPath())
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  }
  return res
}

const faqData = await getFaq()

const seo = {
  h1: 'FAQ',
  avtodom: {
    title: 'FAQ – АВТОDОМ: публичная информация о компании',
    description: 'Часто задаваемые вопросы при покупке авто - Компания «АВТОДОМ» основана 21 декабря 1992 года. Сегодня - это автомобильный холдинг, специализирующийся на продажах и техническом обслуживании автомобилей сегментов Люкс и Премиум',
  },
  asc: {
    title: 'FAQ - АвтоСпецЦентр: публичная информация о компании',
    description: 'Часто задаваемые вопросы при покупке авто - Группа компаний «АвтоСпецЦентр» — один из крупнейших российских автодилеров, работает на рынке с 1998 года. Подробнее о группе компаний можно узнать на официальном сайте.',
  },
}

const title = seo[domain].title
const description = seo[domain].description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import '../../components/Faq/faq';
</style>
