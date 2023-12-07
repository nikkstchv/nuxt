<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.163 21L18.607 20.012C19.421 19.832 20 19.11 20 18.277V5.76601C20 4.93301 19.421 4.21101 18.608 4.03101L14.164 3.04301C13.053 2.79601 12 3.64101 12 4.77901V19.265C12 20.402 13.053 21.247 14.163 21V21Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M4 16V18.042C4 19.147 4.895 20.042 6 20.042H9"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M4 8V6C4 4.895 4.895 4 6 4H9"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M4 12H9"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M7 14L9 12L7 10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconDoor',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-width: 1.5;
  }
}
</style>
