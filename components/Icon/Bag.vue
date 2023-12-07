<template>
  <button class="icon__button" type="button">
    <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        class="icon__path"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 21H6C4.895 21 4 20.105 4 19V9C4 7.895 4.895 7 6 7H18C19.105 7 20 7.895 20 9V19C20 20.105 19.105 21 18 21Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M9 6C9 4.343 10.343 3 12 3C13.657 3 15 4.343 15 6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M15 7V6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M9 7V6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconBag',
}
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__button {
    @media (min-width: $bp-medium + 1) {
      width: 35px;
      height: 35px;

      &:hover {
        background: var(--grayLight);
        border-radius: 100px;

        .icon__path {
          stroke: var(--black);
        }
      }
    }
  }

  &__path {
    stroke: var(--grayDolphin);
    stroke-width: 1.5;
  }
}
</style>
