<template>
  <section class="documents">
    <section class="documents__count-section">
      <p class="documents__text">
        Выкуп автомобиля осуществляется по
      </p>
      <img
        class="documents__img"
        src="@/assets/images/trade-in/documents.jpg"
        alt="цифра четыре"
      >
      <p class="documents__text">
        документам
      </p>
    </section>
    <ul class="documents__list">
      <li v-for="item in list" :key="item.text" class="documents__item">
        <nuxt-img
          v-if="item.icon"
          class="documents__item-icon"
          :src="item.icon"
          alt="иконка документа"
        />
        {{ item.text }}
      </li>
    </ul>
  </section>
</template>

<script>
import document1 from '@/assets/icons/trade-in/documents/document-1.svg'
import document2 from '@/assets/icons/trade-in/documents/document-2.svg'
import document3 from '@/assets/icons/trade-in/documents/document-3.svg'
import document4 from '@/assets/icons/trade-in/documents/document-4.svg'

export default {
  name: 'TradeInBlockDocuments',
  data () {
    return {
      list: [
        {
          text: 'Паспорт транспортного стредства (ПТС)',
          icon: document1,
        },
        {
          text: 'Паспорт собственника транспортного средства',
          icon: document2,
        },
        {
          text: 'Свидетельство о регистрации транспортного средства (СТС)',
          icon: document3,
        },
        {
          text: 'Нотариальная доверенность на транспортное средство и паспорт продавца',
          icon: document4,
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.documents {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-medium) {
    grid-template-columns: 1fr 2fr;
    grid-gap: 40px;
  }

  &__count-section {
    display: grid;
    grid-gap: 10px;
    align-items: center;
    justify-items: center;

    @include mq($bp-big) {
      grid-gap: 20px;
    }
  }

  &__text {
    @include h4;

    text-align: center;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__img {
    width: 190px;
    height: 190px;

    @include mq($bp-big) {
      width: 255px;
      height: 255px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    padding: 30px 10px;
    background-color: var(--blackLight);
    border-radius: 30px;

    @include mq($bp-small-medium) {
      grid-gap: 15px;
      padding: 30px;
    }

    @include mq($bp-small) {
      padding: 40px;
    }

    @include mq($bp-big) {
      padding: 90px 50px;
    }
  }

  &__item {
    @include text_medium_bold;

    display: flex;
    grid-gap: 15px;
    align-items: center;
    color: white;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }

    &-icon {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
