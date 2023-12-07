<template>
  <a
    :href="pageNumber !== 1 ? `${$route.path}?page=${pageNumber}` : $route.path"
    class="pagination-trigger"
    @click.prevent="onClick"
  >
    {{ pageNumber }}
  </a>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClick () {
      this.$emit('loadPage', this.pageNumber)
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-trigger {
  cursor: pointer;
  transition: all 200ms ease-out;

  &:hover {
    color: white;
    background-color: var(--blackLight);
  }
}
</style>
