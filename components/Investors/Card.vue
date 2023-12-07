<template>
  <div class="card">
    <img
      class="card__icon"
      src="@/assets/icons/investors/document.svg"
      alt="иконка документа"
      width="70"
      height="70"
    >
    <div class="card__content">
      <h3 class="card__title">
        {{ title }}
      </h3>
      <a
        class="card__link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer nofollow noindex"
        download
      >
        Загрузить
        <img src="@/assets/icons/download.svg" alt="иконка загрузки">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestorsCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      size: null,
    }
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  grid-gap: 10px;

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    justify-content: space-between;
  }

  &__title {
    @include label;

    color: var(--blackLight);
  }

  &__icon {
    width: 70px;
    height: 70px;
  }

  &__link {
    @include text_medium_small;

    display: flex;
    grid-gap: 5px;
    align-items: center;
    justify-content: flex-start;
    color: var(--neonBlue);
  }

  &__size {
    @include text_small_regular;
  }
}
</style>
