<template>
  <nuxt-link to="/lk/profile/" class="icon__button">
    <svg
      class="icon"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="icon__path"
        d="M5.20801 20.8328C5.20801 18.2287 7.29134 16.2495 9.79134 16.2495H15.1038C17.708 16.2495 19.6872 18.3328 19.6872 20.8328"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M15.6243 5.4165C17.3952 7.18734 17.3952 9.99984 15.6243 11.6665C13.8535 13.3332 11.041 13.4373 9.37432 11.6665C7.70765 9.89567 7.60349 7.08317 9.37432 5.4165C11.1452 3.74984 13.8535 3.74984 15.6243 5.4165"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </nuxt-link>
</template>

<script>
export default {
  name: 'IconUser',
}
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
}

.icon {
  fill: none;

  &__button {
    width: 24px;
    height: 24px;

    @media (min-width: $bp-medium + 1) {
      width: 35px;
      height: 35px;
      padding: 5px;

      &:hover {
        background: var(--grayLight);
        border-radius: 100px;
      }
    }
  }

  &__path {
    stroke: var(--black);
    stroke-width: 1.5;
  }
}
</style>
