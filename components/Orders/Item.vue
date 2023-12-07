<template>
  <li
    class="item"
    :class="{
      item_theme_warning: warning,
      item_theme_valid: valid,
      item_theme_gray: gray,
      item_bold: bold,
      item_label: label,
      'item_no-wrap': noWrap,
    }"
  >
    <slot /> <span v-if="keyName" class="item-key">{{ keyName }}</span>
  </li>
</template>

<script>
export default {
  name: 'OrdersItem',
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
    label: {
      type: Boolean,
      required: false,
      default: false,
    },
    noWrap: {
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
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  color: var(--blackLight);
  border-bottom: 1px solid var(--grayMediumLight);

  @include mq($bp-small) {
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
    margin-bottom: 0;
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
    @include label_small;
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

    @include mq($bp-small) {
      display: none;
    }
  }
}
</style>
