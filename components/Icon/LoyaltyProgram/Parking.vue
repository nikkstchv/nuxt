<template>
  <svg
    class="icon"
    :class="{ icon_disable: disable }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__element"
      d="M8.60986 6.99789H12.3894"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M8.99881 12H5.99756V19.0029"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M5.99776 19.003H1.99609V7.56019C1.99609 6.87385 2.36834 6.2415 2.9685 5.90851L9.58225 2.23398C10.1531 1.9168 10.8472 1.9168 11.418 2.23398L18.0318 5.90851C18.6314 6.24192 19.0032 6.87412 19.0032 7.56019V8.99879"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M22.0045 17.8025C22.0045 16.6974 21.1087 15.8016 20.0037 15.8016H12.0003C10.8953 15.8016 9.99951 16.6974 9.99951 17.8025"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M9.99951 17.8024V21.0037C9.99951 21.5562 10.4474 22.0041 10.9999 22.0041H11.9903C12.5429 22.0041 12.9908 21.5562 12.9908 21.0037V20.3424H19.0133V21.0037C19.0133 21.5562 19.4612 22.0041 20.0137 22.0041H21.0041C21.5566 22.0041 22.0045 21.5562 22.0045 21.0037V17.8024"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M13.7378 18.1025H12.2422"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M19.7612 18.1025H18.2656"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M20.5088 15.7386L22.0044 14.9913"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M11.5001 15.7386L9.99951 14.9913"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M13.5689 12C12.8745 12.0018 12.272 12.4797 12.1123 13.1555L11.478 15.8666L12.1123 13.1555C12.272 12.4797 12.8745 12.0018 13.5689 12H18.4349C19.1293 12.0018 19.7318 12.4797 19.8915 13.1555L20.5258 15.8666"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconParking',
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
