<template>
  <div class="investors">
    <UISimplePageHeader title="Информация для инвесторов АВТОDОМ" />
    <div class="investors__list">
      <div class="investors__card">
        <img
          class="investors__card-image"
          src="@/assets/images/investors/corporate-documents.jpg"
          alt="фото документа"
        >
        <div class="investors__card-container">
          <h3 class="investors__card-title">
            Корпоративные документы
          </h3>
          <UIBaseButton
            to="korporativnye-dokumenty/"
            secondary
          >
            К документам
          </UIBaseButton>
        </div>
      </div>
      <div class="investors__card">
        <img
          class="investors__card-image"
          src="@/assets/images/investors/operating-performance.jpg"
          alt="фото показателей"
        >
        <div class="investors__card-container">
          <h3 class="investors__card-title">
            Операционные показатели
          </h3>
          <UIBaseButton
            to="operatsionnye-pokazateli/"
            secondary
          >
            К документам
          </UIBaseButton>
        </div>
      </div>
      <div class="investors__card">
        <img
          class="investors__card-image"
          src="@/assets/images/investors/ratings.jpg"
          alt="фото рейтингов"
        >
        <div class="investors__card-container">
          <h3 class="investors__card-title">
            Рейтинги
          </h3>
          <UIBaseButton to="reytingi/" secondary>
            К документам
          </UIBaseButton>
        </div>
      </div>
      <div class="investors__card">
        <img
          class="investors__card-image"
          src="@/assets/images/investors/financial-statements.jpg"
          alt="фото финансовых отчетов"
        >
        <div class="investors__card-container">
          <h3 class="investors__card-title">
            Финансовая отчетность
          </h3>
          <UIBaseButton
            to="financial_reports/"
            secondary
          >
            К документам
          </UIBaseButton>
        </div>
      </div>
    </div>
    <InvestorsLink />
  </div>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'

definePageMeta({
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const title = 'Информация для инвесторов АВТОDОМ'
const description = 'Информация для инвесторов | АО «АВТОДОМ» раскрывает информацию на странице в сети Интернет ООО «Интерфайс-ЦРКИ» — информационного агенства, аккредитованного ЦБ РФ на раскрытие информации'

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.investors {
  @include indentsMainHorizontal;
  @include indentsMainVertical;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    width: 100%;
    height: fit-content;
    margin-bottom: 40px;

    @include mq($bp-small-medium) {
      grid-gap: 25px;
    }

    @include mq($bp-small) {
      grid-gap: 35px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(377px, 1fr));
      grid-gap: 40px;
    }
  }

  &__card {
    position: relative;
    background-color: var(--grayLight);

    &-image {
      width: 100%;
    }

    &-title {
      @include text_big_bold;

      padding-right: 60px;

      @include mq($bp-small-medium) {
        @include h4;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;
      grid-gap: 30px;
      padding: 20px;

      @include mq($bp-small-medium) {
        padding: 30px;
      }
    }
  }
}
</style>
