<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.5 3H16.504C18.987 3 21 5.013 21 7.496V16.505C21 18.987 18.987 21 16.504 21H7.496C5.013 21 3 18.987 3 16.504V7.5C3 5.015 5.015 3 7.5 3V3Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0938 15.4911L9.28182 12.8171C9.28082 12.8161 6.95582 12.0911 6.95582 12.0911C6.68982 12.0081 6.67682 11.6351 6.93782 11.5351L15.7888 8.12106C16.1158 7.99506 16.4528 8.28206 16.3808 8.62506L14.8938 15.6331C14.8068 16.0441 14.3238 16.2271 13.9868 15.9771L11.8748 14.4171L10.6298 15.6291C10.4548 15.7971 10.1648 15.7221 10.0938 15.4911V15.4911Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconShareTelegram',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--grayMediumLight);
    stroke-width: 1.5;
  }
}
</style>
