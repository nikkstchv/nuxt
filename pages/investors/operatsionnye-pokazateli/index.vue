<template>
  <div class="detail">
    <UISimplePageHeader title="Операционные показатели" has-back-button />
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
    title: 'Teaser 6 мес 2021 AVTODOM',
    link: `${cdnUrl}/investors/x961539rpordd60dav2xpdionnsl7ih1.pdf`,
  },
  {
    title: 'Teaser 1H2021 AVTODOM eng',
    link: `${cdnUrl}/investors/imcwpeknjo0ikyq1lcclwlksmo3g9t0c.pdf`,
  },
]

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Операционные показатели | АВТОDОМ'
const description = 'Операционные показатели | АО «АВТОДОМ» раскрывает информацию на странице в сети Интернет ООО «Интерфайс-ЦРКИ» — информационного агенства, аккредитованного ЦБ РФ на раскрытие информации'

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
