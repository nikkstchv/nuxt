<template>
  <main class="feedback">
    <UIBreadcrumbs class="feedback__breadcrumbs" />
    <FeedbackDealerQuestion
      v-if="!phase"
      :image="`${cdnUrl}/images/Avtodom.jpg`"
      h1="Оставьте отзыв о нашей работе"
      @handlePhaseChange="handlePhaseChange"
    />
    <LazyFeedbackDealerForm
      v-show="phase === 'bad'"
      class="feedback__form"
      @handlePhaseChange="handlePhaseChange"
    />
    <LazyFeedbackDealerThanks
      v-show="phase === 'good'"
      link-yandex="https://yandex.ru/maps/org/219091408402/reviews/"
    />
    <LazyFormFinallyBlock
      v-show="phase === 'finally'"
      class="feedback__block-finally"
      title="Отзыв успешно отправлен"
      :text="null"
      button-text="Вернуться в каталог"
      @handleClose="onGoToCatalog"
    />
  </main>
</template>

<script setup>
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const cdnUrl = runtimeConfig.public.cdnUrl
const phase = ref('')
const handlePhaseChange = (value) => {
  phase.value = value
}
const onGoToCatalog = () => {
  router.push('/cars/')
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.feedback {
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
