<template>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 50"
    fill="none"
  >
    <path
      d="M6.75209 18.75C6.75209 21.0521 11.4146 22.9167 17.1688 22.9167"
      class="icon__path"
    />
    <path
      d="M17.1667 31.2502C11.4146 31.2502 6.75209 29.3856 6.75209 27.0835"
      class="icon__path"
    />
    <path d="M27.5812 10.4165H27.5833V16.6665" class="icon__path" />
    <path
      d="M23.4187 33.3335C23.4187 35.6356 28.0812 37.5002 33.8354 37.5002C39.5896 37.5002 44.2521 35.6356 44.2521 33.3335"
      class="icon__path"
    />
    <path
      d="M23.4187 25C23.4187 27.3021 28.0812 29.1667 33.8354 29.1667C39.5896 29.1667 44.2521 27.3021 44.2521 25"
      class="icon__path"
    />
    <path
      d="M33.8333 20.8335C28.0833 20.8335 23.4167 22.6981 23.4208 25.0002"
      class="icon__path"
    />
    <path
      d="M23.4187 25V41.6667C23.4187 43.9688 28.0812 45.8333 33.8354 45.8333"
      class="icon__path"
    />
    <path
      d="M33.8333 20.8335C39.5833 20.8335 44.25 22.6981 44.2458 25.0002"
      class="icon__path"
    />
    <path
      d="M44.25 25V41.6667C44.25 43.9688 39.5875 45.8333 33.8333 45.8333"
      class="icon__path"
    />
    <path
      d="M17.1667 39.5832C11.4146 39.5832 6.75 37.7186 6.75 35.4165"
      class="icon__path"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1667 14.5833C22.9196 14.5833 27.5833 12.7179 27.5833 10.4167C27.5833 8.11548 22.9196 6.25 17.1667 6.25C11.4137 6.25 6.75 8.11548 6.75 10.4167C6.75 12.7179 11.4137 14.5833 17.1667 14.5833Z"
      class="icon__path"
    />
    <path d="M6.74999 10.4165V35.4165" class="icon__path" />
  </svg>
</template>

<script>
export default {
  name: 'IconMoneyCoins',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }
}
</style>
