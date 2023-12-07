<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="icon"
  >
    <path
      d="M15.5573 11.1106L11.9999 14.6681L8.44238 11.1106"
      class="icon__path"
    />
    <path d="M12.0002 3.9967V14.6681" class="icon__path" />
    <path
      d="M20.0037 16.4457C20.0037 18.4104 18.411 20.0032 16.4463 20.0032H7.55455C5.58981 20.0032 3.99707 18.4104 3.99707 16.4457"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconDownloadArrow',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--black);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
  }
}
</style>
