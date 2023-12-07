<template>
  <div class="detail">
    <UISimplePageHeader title="Финансовая отчётность" has-back-button />
    <InvestorsList>
      <InvestorsCard
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :link="card.link"
      />
    </InvestorsList>
    <InvestorsLink />
  </div>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'

const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl
const cards = [
  {
    title: 'МСФО 2021 год',
    link: `${cdnUrl}/investors/mcfo2021.pdf`,
  },
  {
    title: 'МСФО за 6 месяцев 2022 год',
    link: `${cdnUrl}/investors/mcfo2022_6.pdf`,
  },
]

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Финансовая отчётность | АВТОDОМ'
const description = 'Финансовая отчётность | АО «АВТОДОМ» раскрывает информацию на странице в сети Интернет ООО «Интерфайс-ЦРКИ» — информационного агенства, аккредитованного ЦБ РФ на раскрытие информации'

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
