<template>
  <span class="image">
    <nuxt-img
      v-if="image"
      class="image__tag"
      :src="image"
      alt="Изображение"
      loading="lazy"
      :sizes="sizes"
    />
  </span>
</template>

<script>
export default {
  name: 'CardImage',
  props: {
    image: {
      type: String,
      required: true,
      default: '',
    },
    sizes: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.image {
  position: relative;
  display: block;
  height: 0;
  padding-bottom: 56.3%;
  overflow: hidden;

  &__tag {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 100%;
    margin: 0;
    transform: translate(-50%, -50%);
  }
}
</style>
