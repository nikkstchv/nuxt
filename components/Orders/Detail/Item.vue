<template>
  <li
    class="item"
    :class="{
      item_theme_gray: gray,
      item_bold: bold,
      item_label: label,
      'item_no-wrap': noWrap,
    }"
  >
    <slot />
    <span v-if="keyName" class="item-key">{{ keyName }}</span>
  </li>
</template>

<script>
export default {
  name: 'OrdersDetailItem',
  props: {
    keyName: {
      type: String,
      required: false,
      default: '',
    },
    gray: {
      type: Boolean,
      required: false,
      default: false,
    },
    bold: {
      type: Boolean,
      required: false,
      default: false,
    },
    noWrap: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @include text_medium_regular;

  display: flex;
  flex-direction: row-reverse;
  grid-gap: 30px;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 8px;
  text-align: end;
  text-decoration: none;
  border-bottom: 1px solid var(--grayMediumLight);

  @include mq($bp-small-medium) {
    display: grid;
    grid-auto-flow: column;
    padding-bottom: 0;
    margin-bottom: 0;
    color: var(--blackLight);
    text-align: start;
    border-bottom: none;

    &:last-child {
      justify-self: flex-end;
      text-align: end;
    }
  }

  &_bold {
    @include text_medium_small;
  }

  &_label {
    @include text_medium_small;

    @include mq($bp-small) {
      @include label_small;
    }
  }

  &_no-wrap {
    white-space: nowrap;
  }

  &_theme {
    @include text_medium_small;

    &_warning {
      color: var(--orange);
    }

    &_valid {
      color: var(--valid);
    }

    &_gray {
      color: var(--grayDark);
    }
  }

  &-key {
    @include text_medium_regular;

    color: var(--grayDark);

    @include mq($bp-small-medium) {
      display: none;
    }
  }
}
</style>
