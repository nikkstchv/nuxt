<template>
  <AboutCareerBlock />
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const { domain } = useHoldingStore()

definePageMeta({
  layout: 'about',
})

const seo = {
  avtodom: {
    title: 'Актуальные вакансии компании АВТОDОМ',
    description: 'Вакансии, работа, АВТОDОМ, официальный дилер BMW, Lamborghini, Mercedes-Benz, MINI, Porsche, Smart, BMW Motorrad',
  },
  asc: {
    title: 'Вакансии - постройте карьеру в автомобильном бизнесе с командой профессионалов | ГК АвтоСпецЦентр',
    description: 'Работа в официальном дилерском центре в Москве. Найти работу в автомобильном бизнесе, продаже машин и сервисном обслуживании. Вакансии ГК АвтоСпецЦентра.',
  },
}

const title = seo[domain].title
const description = seo[domain].description

useHeadDefault({ title, description })
</script>
