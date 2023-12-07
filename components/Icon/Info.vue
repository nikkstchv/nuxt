<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle
      class="icon__circle"
      cx="12"
      cy="12"
      r="11.0824"
      stroke-width="1.83529"
    />
    <path
      class="icon__path"
      d="M10.9053 18.4584V9.21779H13.0831V18.4584H10.9053ZM12.0002 7.9063C11.6553 7.9063 11.3585 7.79199 11.1098 7.56338C10.8611 7.33076 10.7368 7.05202 10.7368 6.72715C10.7368 6.39828 10.8611 6.11953 11.1098 5.89092C11.3585 5.6583 11.6553 5.54199 12.0002 5.54199C12.3491 5.54199 12.6459 5.6583 12.8906 5.89092C13.1392 6.11953 13.2636 6.39828 13.2636 6.72715C13.2636 7.05202 13.1392 7.33076 12.8906 7.56338C12.6459 7.79199 12.3491 7.9063 12.0002 7.9063Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconInfo',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__circle {
    stroke: var(--grayDark);
  }

  &__path {
    fill: var(--grayDark);
  }
}
</style>
