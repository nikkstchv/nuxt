<template>
  <section class="reviews-block">
    <header class="reviews-block__header">
      <h2 class="reviews-block__title">
        Отзывы
      </h2>
      <UIArrowLink class="reviews-block__button">
        Смотреть все
      </UIArrowLink>
    </header>
    <div class="reviews-block__list">
      <ContactsReviewsItem
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        class="reviews-block__item"
      />
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    avatar: 'https://cdn-icons-png.flaticon.com/512/145/145843.png',
    name: 'Александр',
    rank: 'Знаток города 11 уровня',
    rating: 4,
    date: '10 ноября 2021',
    text: 'В целом всё неплохо, внутри комфортно, есть кафе, ожидать можно за столиком с вкусным кофе) удобных диванов не увидел, если ожидание долгое, на стуле явно устанешь… При большом скоплении машин и клиентов сервиса авто поставить негде, даже если ты записан на ТО места может не быть - это минус. Приятный сервис: четкая организация работы, адекватные цены, вежливые сотрудники, ни разу лишнего не насчитали. Мастера толковые, всегда ответят на любой технический вопрос.',
  },
  {
    id: 2,
    name: 'Наталья Левицкая-Филиппова',
    avatar: '',
    rank: 'Знаток города 3 уровня',
    rating: 5,
    date: '3 ноября 2021',
    text: 'Прекрасный сервис!!! Рекомендую всем владельцам БМВ и Мини. Очень приветливый и высокопрофессиональный персонал!!! Быстро приняли машину,учли все мои пожелания и исправили всё,что было необходимо. Приятный сервис: четкая организация работы, адекватные цены, вежливые сотрудники, ни разу лишнего не насчитали. Настоящие мастера своего дела!!! Отдельно хотела бы поблагодарить и сказать слова благодарности за уделённое внимание и решение.',
  },
  {
    id: 3,
    name: 'Владимир Махнев',
    avatar: '',
    rank: 'Знаток города 4 уровня',
    rating: 4,
    date: '22 февраля 2021',
    text: 'Приятный сервис: четкая организация работы, адекватные цены, вежливые сотрудники, ни разу лишнего не насчитали. Приятный сервис: четкая организация работы, адекватные цены, вежливые сотрудники, ни разу лишнего не насчитали. Есть кафе, можно посмотреть на раритетные модели, большой магазин аксессуаров (одежда, чехлы на телефон и т. д.). Есть несколько субъективных небольших минусов: парковка хоть и большая, но бывает трудно найти.',
  },
]
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.reviews-block {
  display: grid;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-gap: 50px;
    max-width: 940px;
  }
}
</style>
