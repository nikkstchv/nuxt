<template>
  <svg class="icon" viewBox="0 0 61 60" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.1074 31.1748C14.5924 38.2025 19.5186 44.1321 26.3384 45.897V40.5733C26.3384 35.3826 22.1305 31.1748 16.9399 31.1748H14.1074Z"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.1445 24.1258C17.1284 18.916 21.6184 15.0674 27.0703 13.9038C32.5223 12.7401 38.1923 14.4201 42.1304 18.3659L42.1324 18.3679C43.7662 20.0028 45.0352 21.9651 45.8558 24.1258H15.1445Z"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M46.8928 31.1748C46.4068 38.2215 41.4557 44.1618 34.6118 45.9092V40.5733C34.6118 35.3826 38.8196 31.1748 44.0103 31.1748H46.8928Z"
    />
    <circle class="icon__path" cx="30.5" cy="30" r="23.4961" />
  </svg>
</template>

<script>
export default {
  name: 'IconCarWheel',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 60px;
  height: 60px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }
}
</style>
