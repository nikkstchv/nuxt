<template>
  <section class="sold-block">
    <header class="sold-block__header">
      <h2 class="sold-block__title">
        Продан
      </h2>
      <p v-if="label" class="sold-block__label">
        #{{ label }}
      </p>
    </header>
    <ul class="sold-block__list">
      <li class="sold-block__item">
        Данный {{ transportType === 'moto' ? 'мотоцикл' : 'автомобиль' }} нашел
        своего счастливого владельца
      </li>
      <!--      <li class="sold-block__item">Срок продажи: 14 дней</li>-->
      <li class="sold-block__item">
        Владелец воспользовался дополнительными выгодами при покупке
      </li>
    </ul>
    <UIBaseButton class="sold-block__button" secondary-light large :to="transportType === 'moto' ? '/moto/' : '/cars/'">
      В каталог
    </UIBaseButton>
  </section>
</template>

<script>
export default {
  name: 'DetailSoldBlock',
  props: {
    label: {
      type: String,
      default: '',
      required: '',
    },
    transportType: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.sold-block {
  padding: 20px 20px 25px;
  background: var(--black);
  border-radius: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    @include mq($bp-medium-big) {
      margin-bottom: 20px;
    }
  }

  &__title {
    @include label_small;

    color: white;

    @include mq($bp-medium-big) {
      @include label;
    }
  }

  &__label {
    @include text_medium_small;

    padding: 5px;
    background: white;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    margin-bottom: 20px;

    @include mq($bp-medium-big) {
      margin-bottom: 30px;
    }
  }

  &__item {
    @include text_medium_regular;

    margin-left: 20px;
    color: white;
    list-style-type: disc;
  }

  &__button {
    @include text_medium_small;
  }
}
</style>
