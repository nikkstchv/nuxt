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
      d="M7 6H17"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 21H18C17.4484 20.9984 17.0016 20.5516 17 20V16C17.0016 15.4484 17.4484 15.0016 18 15H20C20.5516 15.0016 20.9984 15.4484 21 16V20C20.9984 20.5516 20.5516 20.9984 20 21Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M7 18H17"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 21H4C3.44839 20.9984 3.00161 20.5516 3 20V16C3.00161 15.4484 3.44839 15.0016 4 15H6C6.55161 15.0016 6.99839 15.4484 7 16V20C6.99839 20.5516 6.55161 20.9984 6 21Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 9H18C17.4484 8.99839 17.0016 8.55161 17 8V4C17.0016 3.44839 17.4484 3.00161 18 3H20C20.5516 3.00161 20.9984 3.44839 21 4V8C20.9984 8.55161 20.5516 8.99839 20 9Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 9H4C3.44839 8.99839 3.00161 8.55161 3 8V4C3.00161 3.44839 3.44839 3.00161 4 3H6C6.55161 3.00161 6.99839 3.44839 7 4V8C6.99839 8.55161 6.55161 8.99839 6 9Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M12 18V15.9866"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M12 6V8.75"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M11.875 13L10.75 11.875"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__element"
      d="M13.75 11.125L11.875 13"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconTransmission',
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
