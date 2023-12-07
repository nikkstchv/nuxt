<template>
  <div class="review-item">
    <img
      v-if="review.avatar"
      class="review-item__avatar"
      :src="review.avatar"
      alt="аватар пользователя"
    >
    <div v-else class="review-item__avatar review-item__avatar_empty">
      {{ getFirstLetter(review.name) }}
    </div>
    <h3 class="review-item__title">
      {{ review.name }}
    </h3>
    <span class="review-item__rank">{{ review.rank }}</span>
    <div class="review-item__rating">
      <IconStar v-for="star in 5" :key="star" :active="star <= review.rating" />
      <span class="review-item__date">{{ review.date }}</span>
    </div>
    <div class="review-item__text-container">
      <p
        class="review-item__text"
        :class="{ 'review-item__text_show': isShowFullText }"
      >
        {{ review.text }}
      </p>
      <UIBaseButton
        v-if="!isShowFullText"
        class="review-item__button"
        underline
        text="Ещё"
        @click="onShowFullText"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  review: {
    type: Object,
    required: true,
  },
})

const isShowFullText = ref(false)

const getFirstLetter = (name) => {
  return name[0]?.toUpperCase() ?? ''
}
const onShowFullText = () => {
  isShowFullText.value = true
}
</script>

<style lang="scss" scoped>
.review-item {
  display: grid;
  grid-template-areas:
    'avatar title'
    'avatar rank'
    'rating rating'
    'text text';
  grid-template-columns: 50px auto;
  grid-gap: 0 18px;
  justify-items: flex-start;

  @include mq($bp-small-medium) {
    grid-template-areas:
      'avatar title'
      'avatar rank'
      'avatar rating'
      'avatar text';
  }

  &__avatar {
    position: relative;
    grid-area: avatar;
    width: 50px;
    height: 50px;

    &_empty {
      display: grid;
      place-items: center;
      font-size: 20px;
      line-height: 24px;
      color: white;
      background-color: #f29d61;
      border-radius: 50%;
    }
  }

  &__title {
    @include h5;

    grid-area: title;
    margin-bottom: 5px;

    @include mq($bp-medium) {
      @include h4;
    }
  }

  &__rank {
    @include label_small;

    grid-area: rank;
    margin-bottom: 20px;
    color: var(--grayDark);

    @include mq($bp-small) {
      margin-bottom: 30px;
    }
  }

  &__rating {
    display: flex;
    grid-area: rating;
    grid-gap: 2px;
    align-items: center;
    margin-bottom: 15px;
  }

  &__date {
    @include text_medium_small;

    padding-left: 15px;
    color: var(--grayDark);
  }

  &__text-container {
    grid-area: text;
  }

  &__text {
    @include label_small;

    max-height: 100px;
    margin-bottom: 15px;
    overflow: hidden;
    color: var(--blackLight);

    @include mq($bp-small-medium) {
      @include label;
    }

    &_show {
      max-height: 100%;
    }
  }

  &__button {
    @include text_medium_small;

    color: var(--blackLight);
  }
}
</style>
