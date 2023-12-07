<template>
  <svg class="icon" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      :class="{ icon__path_active: active }"
      d="M7.79169 13.7501H14.2084"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      :class="{ icon__path_active: active }"
      d="M7.79169 11.0001H14.2084"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      :class="{ icon__path_active: active }"
      d="M7.79169 8.25008H14.2084"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      :class="{ icon__path_active: active }"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.5 18.3334H5.50002C4.4871 18.3334 3.66669 17.513 3.66669 16.5001V5.50008C3.66669 4.48716 4.4871 3.66675 5.50002 3.66675H16.5C17.5129 3.66675 18.3334 4.48716 18.3334 5.50008V16.5001C18.3334 17.513 17.5129 18.3334 16.5 18.3334Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCatalog',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
  fill: none;

  @media screen and (max-width: $bp-super-small) {
    display: block;
  }

  &__path {
    //&_active {
    //  stroke: var(--black);
    //}
  }
}
</style>
