<template>
  <div class="detail">
    <UISimplePageHeader title="Корпоративные документы" has-back-button />
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
    title: 'Кодекс корпоративного управления',
    link: `${cdnUrl}/investors/kodeks_2.pdf`,
  },
  {
    title: 'Положение о генеральном директоре АВТОДОМ (редакция 2)',
    link: `${cdnUrl}/investors/6niz7z0en1vibu2c2pmea96pw6llj0ck.pdf`,
  },
  {
    title: 'Положение о ревизионной комиссии Автодом',
    link: `${cdnUrl}/investors/y00gcw79i9dru2j52gnpjukvwm3sxnil.pdf`,
  },
  {
    title: 'Положение о совете директоров АВТОДОМ (новая редакция №3)',
    link: `${cdnUrl}/investors/7k9swywll39f5pu3gysmejhm3hokjqnj.pdf`,
  },
  {
    title: 'Положение Риски и внутренний контроль Автодом',
    link: `${cdnUrl}/investors/c85i6mntmotin0qfu3e01ed9bf6qoxk3.pdf`,
  },
  {
    title: 'Перечень инсайдерской информации',
    link: `${cdnUrl}/investors/71faiwx04xv0j3vujntuto2f6elvs4k2.pdf`,
  },
]

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Корпоративные документы | АВТОDОМ'
const description = 'Корпоративные документы | АО «АВТОДОМ» раскрывает информацию на странице в сети Интернет ООО «Интерфайс-ЦРКИ» — информационного агенства, аккредитованного ЦБ РФ на раскрытие информации'

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
