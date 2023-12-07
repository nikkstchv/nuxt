<template>
  <button class="icon__button" type="button">
    <svg
      class="icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="icon__path"
        d="M7.41228 17.8313L7.41204 18.1962C7.41038 19.4621 8.43506 20.4893 9.70098 20.4909V20.4909C10.9669 20.4926 11.994 19.4679 11.9957 18.202L11.9959 17.837"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M13.2609 5.24533L13.2619 4.32727C13.2626 3.31497 12.4431 2.49316 11.4299 2.49208V2.49208C10.4176 2.49133 9.59579 3.31082 9.59409 4.32279L9.59312 5.24084"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.98413 9.67296V9.67296C5.98681 7.17052 8.01832 5.14401 10.5208 5.14668L12.3335 5.14901C14.8359 5.15168 16.8624 7.1832 16.8597 9.68563V9.68563L16.856 12.4818C16.8555 13.0128 17.0659 13.5215 17.44 13.8962L18.0806 14.5377C18.4553 14.9137 18.6657 15.4224 18.6646 15.9521V15.9521C18.6635 16.996 17.8157 17.8415 16.7718 17.8404L6.05276 17.8278C5.00884 17.8267 4.1634 16.979 4.1645 15.9351V15.9351C4.16499 15.4041 4.37648 14.8964 4.75158 14.5213L5.39305 13.8807C5.7691 13.506 5.97964 12.9979 5.98013 12.467L5.98413 9.67296Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconBell',
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
