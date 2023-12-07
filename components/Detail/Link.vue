<template>
  <a class="link" :href="href" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'DetailLink',
  props: {
    href: {
      type: String,
      required: true,
      default: '#',
    },
    target: {
      type: String,
      required: false,
      default: '_blank',
    },
    rel: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.link {
  color: var(--neonBlue);
}
</style>
