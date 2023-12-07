<template>
  <component :is="tag" class="list" :style="listStyle">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'ul',
    },
  },
  computed: {
    listStyle () {
      switch (this.tag) {
        case 'ul':
          return { listStyle: 'disc' }
        case 'ol':
          return { listStyle: 'decimal' }
        default: {
          return { listStyle: 'disc' }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  @include text_big_regular;

  padding-left: 20px;
  margin-bottom: 40px;
  line-height: 27px;
}
</style>
