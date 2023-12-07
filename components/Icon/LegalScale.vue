<template>
  <svg class="icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M44.6202 27.4537C44.9059 27.9169 45.0415 28.4572 45.0083 29.0004C44.7644 33.4678 41.1502 37.0098 36.6788 37.1638C32.2047 37.0138 28.5866 33.4704 28.3434 29.0004C28.307 28.4523 28.4412 27.9064 28.7275 27.4377L36.6708 13.9941C36.6708 13.9941 42.9274 24.5986 44.6202 27.4537Z"
    />
    <path class="icon__path" d="M44.9283 28.1664H28.4154" />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.2765 34.2916C21.5604 34.7575 21.6932 35.2999 21.6566 35.8443C21.4155 40.3122 17.801 43.8555 13.3292 44.0077C8.85572 43.8589 5.23702 40.3175 4.99169 35.8483C4.95911 35.2978 5.09899 34.7509 5.39186 34.2836L13.3352 20.832L21.2765 34.2916Z"
    />
    <path class="icon__path" d="M21.5845 35.0043H5.07166" />
    <path class="icon__path" d="M36.6708 13.9941L13.3291 20.831" />
    <path class="icon__path" d="M23.3333 9.99219V17.9015" />
  </svg>
</template>

<script>
export default {
  name: 'IconLegalScale',
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
