<template>
  <section class="categories">
    <div class="categories__list">
      <MainCategoriesCard title="Легковые автомобили" link="/cars/">
        <IconMainCategoryCar />
      </MainCategoriesCard>
      <MainCategoriesCard title="Коммерческий транспорт" link="/commercial/">
        <IconMainCategoryComm />
      </MainCategoriesCard>
      <MainCategoriesCard v-if="isAvtodom" title="Мотоциклы" link="/moto/">
        <IconMainCategoryMoto />
      </MainCategoriesCard>
      <MainCategoriesCard v-if="isAsc" title="Квадроциклы" link="/atv/">
        <IconMainCategoryAtv />
      </MainCategoriesCard>
    </div>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'

export default {
  name: 'MainCategoriesBlock',
  computed: {
    ...mapState(useHoldingStore, ['isAsc', 'isAvtodom']),
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.categories {
  @include indentsMainHorizontal;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__list {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-medium) {
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      grid-gap: 25px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 35px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
    }
  }
}
</style>
