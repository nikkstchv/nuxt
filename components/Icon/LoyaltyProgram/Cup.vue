<template>
  <svg
    class="icon"
    :class="{ icon_disable: disable }"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__element"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.997 10.4994H16.002C16.5545 10.4994 17.0024 10.9473 17.0024 11.4998V14.5011C17.0024 17.8161 14.315 20.5036 10.9999 20.5036H8.99908C5.68399 20.5036 2.99658 17.8161 2.99658 14.5011V11.4998C2.99658 10.9473 3.44448 10.4994 3.997 10.4994Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M13.5007 7.49818C12.8338 6.79788 12.8338 5.69743 13.5007 4.99714C14.1676 4.29685 14.1676 3.19638 13.5007 2.49609"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M9.99923 7.49818C9.33229 6.79788 9.33229 5.69743 9.99923 4.99714C10.6662 4.29684 10.6662 3.19639 9.99923 2.49609"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M6.49777 7.49818C5.83082 6.79789 5.83082 5.69743 6.49777 4.99714C7.16471 4.29684 7.16471 3.19639 6.49777 2.49609"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M16.1295 17.6173L17.9761 17.1947C19.7476 16.7893 21.0038 15.2133 21.0038 13.396V13.396C21.0038 12.6277 20.6986 11.891 20.1554 11.3478C19.6122 10.8046 18.8754 10.4994 18.1072 10.4994H15.5015"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCup',
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &_disable {
    .icon__element {
      stroke: var(--grayDark);
    }
  }

  &__element {
    stroke: var(--royalBlue);
  }
}
</style>
