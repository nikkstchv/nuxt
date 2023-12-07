<template>
  <svg class="icon" viewBox="0 0 17 22" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      d="M0.0627254 3.21013L0.0627244 18.042C0.0627243 20.5652 2.94298 22.0043 4.9598 20.4895L14.847 13.0735C16.4786 11.8487 16.4808 9.40126 14.847 8.17861L4.9598 0.762669C2.94298 -0.752114 0.0627255 0.686931 0.0627254 3.21013Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconPlay',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 29%;
  fill: none;

  &__path {
    fill: var(--blackLight);
    fill-rule: evenodd;
    clip-rule: evenodd;
  }
}
</style>
