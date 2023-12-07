<template>
  <section v-show="isActive" class="tab">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'UIBaseTab',
  props: {
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      isActive: false,
    }
  },

  mounted () {
    this.isActive = this.selected
  },
}
</script>

<style scoped lang="scss">
.tab {
  position: relative;
  width: 100%;

  @include mq($bp-medium) {
    position: inherit;
  }
}
</style>
