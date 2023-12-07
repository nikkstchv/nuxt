<template>
  <svg
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ icon_hover: hoverEffect }"
    class="icon"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.62695 10.545V10.373C5.62695 6.577 8.70395 3.5 12.5 3.5V3.5C16.296 3.5 19.373 6.577 19.373 10.373V10.545C19.373 14.006 14.991 19.216 13.225 21.176C12.836 21.608 12.164 21.608 11.775 21.176C10.009 19.216 5.62695 14.006 5.62695 10.545Z"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M10.5 10.455C10.5 11.56 11.395 12.455 12.5 12.455V12.455C13.605 12.455 14.5 11.56 14.5 10.455V10.418C14.5 9.313 13.605 8.418 12.5 8.418V8.418C11.395 8.418 10.5 9.313 10.5 10.418"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconPoint',
  props: {
    hoverEffect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  @media (min-width: $bp-medium + 1) {
    width: 35px;
    height: 35px;
    padding: 5px;

    &_hover {
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
