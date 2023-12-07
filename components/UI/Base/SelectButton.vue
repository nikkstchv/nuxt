<template>
  <component
    :is="component"
    type="button"
    class="select-button"
    :class="{ 'select-button_disable': disable }"
    :to="path"
  >
    <span v-if="text" class="select-button__title">{{ text }}</span>
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UIBaseSelectButton',
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    path: {
      type: String,
      required: false,
      default: '',
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    component () {
      if (this.isSeoTitle) {
        return 'h3'
      } else if (this.path) {
        return 'router-link'
      }

      return 'button'
    },
  },
}
</script>

<style lang="scss" scoped>
.select-button {
  @include text_medium_small;

  display: flex;
  align-items: center;
  width: max-content;
  padding: 9.5px 20px;
  cursor: pointer;
  user-select: none;
  background-color: var(--grayLight);
  border-radius: 20px;

  @media (max-width: $bp-small-medium) {
    @include text_small_medium;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--grayMediumLight);
    }
  }

  &_disable {
    color: var(--grayDolphin);
    pointer-events: none;
    cursor: default;
    background: rgb(13 10 25 / 5%);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgb(13 10 25 / 5%);
      }
    }
  }
}
</style>
