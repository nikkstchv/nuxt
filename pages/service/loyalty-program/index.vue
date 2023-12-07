<template>
  <UIBody>
    <UISimplePageHeader :title="h1" has-back-button />
    <DetailMain class="detail">
      <template #aside>
        <DetailAsideLeftBig
          class="loyalty-program__aside"
          :title="h1"
          text="Будьте в курсе самых свежих выгодных предложений дилерских центров. Привилегии и специальные условия обслуживания."
          button-text="Узнать подробнее"
          @onButtonClick="goToDetailLoyalty"
        />
      </template>
      <template v-if="staticPageInfo" #body>
        <img
          class="loyalty-program__image"
          src="@/assets/images/loyalty-program/main.jpg"
          alt="автомобили на фоне гор"
        >
        <div class="detail__html" v-html="staticPageInfo.description" />
      </template>
    </DetailMain>

    <FormPanelLoyaltyProgram />
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'
import { getStaticPage } from '@/api/routes/brands'

const { $fetchClient, $hasErrorResponse } = useNuxtApp()
const router = useRouter()

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const h1 = 'Программа лояльности'
const title = 'Программа лояльности – АВТОДОМ'
const description = 'Участвуйте в программе лояльности АВТОDОМ Level Club и копите бонусные баллы и привилегии за каждое обращение в сервисные центры АВТОDОМ. Оформите заявку на участие'

useHeadDefault({ title, description })

const res = await $fetchClient(getStaticPage('11726'))
const staticPageInfo = !$hasErrorResponse(res) ? res : null
const goToDetailLoyalty = () => router.push('avtodom-level-club-info')

</script>
<style lang="scss" scoped>
.detail {
  grid-template-areas:
    'body'
    'footer'
    'aside';
  grid-gap: 40px;

  @include mq($bp-small) {
    grid-gap: 60px;
  }

  @include mq($bp-medium) {
    grid-template-areas:
      'aside body'
      'aside footer';
    grid-template-columns: max-content auto;
    grid-gap: 60px 27px;
  }

  @include mq($bp-medium) {
    grid-gap: 60px 35px;
  }

  @include mq($bp-big) {
    grid-gap: 60px 40px;
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';

    :deep(p span em) {
      @include text_small;

      display: block;
    }
  }
}
</style>
