<template>
  <svg
    class="icon"
    :class="{ icon_disable: disable }"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__element"
      d="M5.06974 20.0032H3.84055C3.09989 20.0032 2.47 19.4629 2.35733 18.7308L2.0211 16.5449C1.85835 15.5214 2.50548 14.5435 3.51116 14.2931C4.99846 13.941 6.52509 13.7831 8.05297 13.8231V13.821C8.95252 13.0366 9.94745 12.3688 11.0142 11.8334C13.2378 10.7217 15.855 10.7217 18.0786 11.8334L20.3367 12.9624C20.6549 13.1196 20.9852 13.2511 21.3244 13.3555C21.7327 13.4882 22.0078 13.8702 22.0044 14.2995V18.5027C22.0044 19.3315 21.3325 20.0034 20.5037 20.0034H18.9542"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M12.0002 6.99785V5.99744"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M8.49885 5.4973L7.99864 5.9975"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M16.0018 5.9975L15.5016 5.4973"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M18.0026 2.9963H5.99756"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      class="icon__element"
      cx="6.65112"
      cy="19.253"
      r="1.75073"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      class="icon__element"
      cx="17.3723"
      cy="19.253"
      r="1.75073"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M15.7259 20.0034H8.2334"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCarWashing',
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
