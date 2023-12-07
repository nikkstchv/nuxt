<template>
  <svg
    class="icon"
    viewBox="0 0 61 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path class="icon__path" d="M32.7227 33.4676H37.1671" />
    <path class="icon__path" d="M10.5 26.7806H49.8697" />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.4366 49.0716H14.9445C12.4898 49.0716 10.5 47.0756 10.5 44.6134V15.635C10.5 13.1728 12.4898 11.1768 14.9445 11.1768H36.3363C40.968 11.1767 45.1138 14.0587 46.7401 18.4088L50.2171 27.7098C50.5335 28.556 50.586 29.4787 50.3676 30.3555L49.0502 35.6458C48.7017 36.9398 47.6351 37.9124 46.3178 38.1374C42.0326 38.994 38.6439 42.2874 37.6552 46.5568C37.2944 48.0429 35.9614 49.0844 34.4366 49.0716V49.0716Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCarBodyRepair',
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
