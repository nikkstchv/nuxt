<template>
  <div class="navBarAccordion">
    <label class="navBarAccordion__label" @click="toggleList">
      {{ label }}
    </label>
    <div
      class="navBarAccordion__list"
      :class="{ navBarAccordion__list_open: expanded.active }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBarAccordion',
  props: {
    label: {
      type: String,
      required: true,
    },
    expanded: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleList () {
      this.$emit('expandAccordion', this.expanded.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.navBarAccordion {
  width: 100%;
  height: max-content;

  &__label {
    @include h2;

    display: flex;
    justify-content: space-between;
    color: var(--blackLight);
    cursor: pointer;

    @media (max-width: $bp-small) {
      @include h3;
    }

    &:hover {
      color: var(--black);
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-gap: 10px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s linear;

    &_open {
      max-height: fit-content;
      overflow: visible;
    }
  }
}
</style>
