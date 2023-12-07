<template>
  <button class="icon__button" type="button">
    <svg class="icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path
        class="icon__path"
        d="M6.66663 10.8333H33.3333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M6.66663 19.1667H33.3333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M6.66663 27.5H33.3333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconBurger',
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
    @media (min-width: $bp-medium-big + 1) {
      width: 35px;
      height: 35px;

      &:hover {
        background: var(--grayLight);
        border-radius: 100px;
      }
    }
  }

  &__path {
    stroke: var(--black);
    stroke-width: 2.5;
  }
}
</style>
