<template>
  <section v-show="name === selectedTitle" class="tab">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'UIBaseTab',
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup () {
    const selectedTitle = inject('selectedTitle')

    return {
      selectedTitle,
    }
  },
}
</script>
