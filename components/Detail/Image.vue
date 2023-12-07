<template>
  <img :src="src" class="image" :alt="alt">
</template>

<script>
export default {
  name: 'DetailImage',
  props: {
    src: {
      type: String,
      required: false,
      default: '',
    },
    alt: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  position: relative;
  margin-bottom: 30px;
}
</style>
