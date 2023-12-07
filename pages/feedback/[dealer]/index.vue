<template>
  <main v-if="dealer" class="feedback-detail">
    <UIBreadcrumbs
      :direct-crumbs="directCrumbs"
      class="feedback-detail__breadcrumbs"
    />
    <FeedbackDealerQuestion
      v-if="!phase"
      :image="dealer.photo[0]"
      :h1="`Оставьте отзыв об ${dealer.nameRu}`"
      @handlePhaseChange="handlePhaseChange"
    />
    <LazyFeedbackDealerForm
      v-show="phase === 'bad'"
      class="feedback-detail__form"
      :dealer-name="dealer.nameRu"
      @handlePhaseChange="handlePhaseChange"
    />
    <LazyFeedbackDealerThanks
      v-show="phase === 'good'"
      :link-google="dealer.map.googleUrl"
      :link-yandex="dealer.map.yandexUrl"
    />
    <LazyFormFinallyBlock
      v-show="phase === 'finally'"
      class="feedback-detail__block-finally"
      title="Отзыв успешно отправлен"
      :text="null"
      button-text="Вернуться в каталог"
      @handleClose="onGoToCatalog"
    />
  </main>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'
import { getDealer as getDealerApiPath } from '@/api/routes/dealer'
const { fullDomain } = useHoldingStore()
const router = useRouter()
const route = useRoute()
const phase = ref('')
const handlePhaseChange = (value) => {
  phase.value = value
}
const onGoToCatalog = () => {
  router.push('/cars/')
}

const getDealer = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const { dealer } = route.params
  const res = await $fetchClient(getDealerApiPath(dealer))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

const dealer = await getDealer()
const dealerName = dealer?.nameRu ?? ''

// seo

const title = `Оставить отзыв о ${dealerName}`
const description = `Оцените качество обслуживания в ${dealerName} на ${fullDomain}`
const directCrumbs = ['', dealerName]

useHeadDefault({ title, description })
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.feedback-detail {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  display: grid;
  grid-template-rows: max-content 65%;
  grid-gap: 15px;
  min-height: calc(100vh - var(--header-height));
  overflow: hidden;

  &__block-finally {
    max-width: 400px;

    & :deep(.finally-block__title) {
      margin-bottom: 50px;

      @include mq($bp-small-medium) {
        @include h2;
      }
    }
  }
}
</style>
