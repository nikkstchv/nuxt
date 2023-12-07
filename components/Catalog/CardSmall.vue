<template>
  <nuxt-link class="card" :to="href">
    <div v-if="image" class="card__image-container">
      <nuxt-img
        class="card__image"
        :src="image"
        sizes="sm:100vw s:50vw mb:30vw sb:20vw"
        alt="Изображение услуги"
      />
    </div>
    <h2 class="card__title">
      {{ title }}
    </h2>
  </nuxt-link>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100%;

  &__image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    padding-bottom: 60%;
    overflow: hidden;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    margin: 0;
    transform: translate(-50%, -50%);
  }

  &__title {
    @include h2;

    padding: 20px 0;

    @include mq($bp-super-small) {
      @include h3;

      padding: 20px 0 30px;
    }

    @include mq($bp-big) {
      @include h2;

      padding: 30px 0 40px;
    }
  }
}
</style>
