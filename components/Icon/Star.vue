<template>
  <svg
    class="icon"
    :class="{ icon_active: active }"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.73223 20.833C7.22516 21.0977 6.61171 21.0511 6.15045 20.7129C5.68918 20.3746 5.46032 19.8035 5.56033 19.2404L6.36966 14.6014L2.96224 11.3361C2.54575 10.9389 2.39311 10.3385 2.56934 9.79059C2.74557 9.24271 3.21963 8.84388 3.78959 8.764L8.52056 8.08772L10.6564 3.82694C10.9097 3.31595 11.4307 2.99268 12.001 2.99268C12.5713 2.99268 13.0923 3.31595 13.3456 3.82694L15.4815 8.08772L20.2124 8.764C20.7824 8.84388 21.2564 9.24271 21.4327 9.79059C21.6089 10.3385 21.4563 10.9389 21.0398 11.3361L17.6324 14.6014L18.4417 19.2414C18.5417 19.8045 18.3128 20.3756 17.8516 20.7139C17.3903 21.0521 16.7769 21.0987 16.2698 20.834L12.001 18.6281L7.73223 20.833Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconStar',
  props: {
    active: {
      required: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: var(--grayMediumLight);

  &_active {
    fill: var(--gold);
  }
}
</style>
