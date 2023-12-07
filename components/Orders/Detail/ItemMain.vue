<template>
  <li
    class="item"
    :class="{
      item_theme_warning: warning,
      item_theme_valid: valid,
    }"
  >
    <slot />
    <span v-if="keyName" class="item-key">{{ keyName }}</span>
  </li>
</template>

<script>
export default {
  name: 'OrdersDetailItemMain',
  props: {
    keyName: {
      type: String,
      required: false,
      default: '',
    },
    warning: {
      type: Boolean,
      required: false,
      default: false,
    },
    valid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @include text_medium_small;

  display: flex;
  flex-basis: 30%;
  flex-direction: row-reverse;
  grid-gap: 15px;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 8px;
  text-align: end;
  text-decoration: none;

  @include mq($bp-small-medium) {
    @include label_small;

    grid-gap: 50px;
  }

  &_theme {
    @include text_medium_small;

    &_warning {
      color: var(--orange);
    }

    &_valid {
      color: var(--valid);
    }
  }

  &-key {
    @include text_medium_regular;

    color: var(--black);
    text-align: start;
    white-space: nowrap;

    @include mq($bp-small-medium) {
      @include text_medium_small;
    }
  }
}
</style>
