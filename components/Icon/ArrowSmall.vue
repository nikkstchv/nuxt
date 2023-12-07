<template>
  <svg
    :viewBox="`0 0 ${width} 6`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="arrow"
    :class="{
      arrow_direction_right: right,
      arrow_direction_top: top,
      arrow_direction_bottom: bottom,
    }"
  >
    <path
      d="M0.767067 2.76694C0.638351 2.89565 0.638351 3.10435 0.767067 3.23306L2.86462 5.33061C2.99334 5.45933 3.20203 5.45933 3.33074 5.33061C3.45946 5.2019 3.45946 4.99321 3.33074 4.86449L1.46626 3L3.33074 1.13551C3.45946 1.00679 3.45946 0.798103 3.33074 0.669387C3.20203 0.54067 2.99334 0.54067 2.86462 0.669387L0.767067 2.76694ZM112.123 2.6704L1.00013 2.6704V3.3296L112.123 3.3296V2.6704Z"
      fill="#474450"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconArrowSmall',
  props: {
    width: {
      required: true,
      type: String,
    },
    right: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.arrow {
  &_direction {
    &_right {
      transform: rotate(180deg);
    }

    &_bottom {
      transform: rotate(-90deg);
    }

    &_top {
      transform: rotate(90deg);
    }
  }
}
</style>
