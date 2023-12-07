<template>
  <div class="detail">
    <UISimplePageHeader title="Рейтинги" has-back-button />
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
    title: 'Рейтинги рус',
    link: `${cdnUrl}/investors/ofwar6xtpuuvzw3fl90u9hv7x2obqump.pdf`,
  },
]

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Рейтинги | АВТОDОМ'
const description = 'Рейтинги | АО «АВТОДОМ» раскрывает информацию на странице в сети Интернет ООО «Интерфайс-ЦРКИ» — информационного агенства, аккредитованного ЦБ РФ на раскрытие информации'

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
