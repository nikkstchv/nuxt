<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 50"
    fill="none"
    class="icon"
  >
    <path
      d="M6.74219 18.7474V12.4948C6.74219 9.04157 9.54157 6.24219 12.9948 6.24219H23.4158"
      class="icon__path"
    />
    <path
      d="M44.2578 25V37.5052C44.2578 40.9584 41.4584 43.7578 38.0052 43.7578H35.921"
      class="icon__path"
    />
    <circle cx="38.0052" cy="12.495" r="8.33681" class="icon__path" />
    <path
      d="M40.7841 11.1055L37.3122 14.5791L35.2262 12.4949"
      class="icon__path"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.6684 35.0043V41.6738C29.6684 42.8249 28.7352 43.758 27.5842 43.758H25.5208C24.3697 43.758 23.4366 42.8249 23.4366 41.6738V40.2961H10.8897V41.6738C10.8897 42.8249 9.95659 43.758 8.80552 43.758H6.74216C5.59109 43.758 4.65796 42.8249 4.65796 41.6738V35.0043C4.65796 32.7022 6.52422 30.8359 8.82636 30.8359H25.5C27.8021 30.8359 29.6684 32.7022 29.6684 35.0043Z"
      class="icon__path"
    />
    <path d="M12.9948 35.421H9.86847" class="icon__path" />
    <path d="M24.4579 35.421H21.3316" class="icon__path" />
    <path d="M26.5525 30.7048L29.6684 29.1479" class="icon__path" />
    <path d="M7.78426 30.7048L4.65796 29.1479" class="icon__path" />
    <path
      d="M12.0944 22.916C10.6477 22.9197 9.39252 23.9154 9.05979 25.3233L7.7384 30.9715L9.05979 25.3233C9.39252 23.9154 10.6477 22.9197 12.0944 22.916H22.2319C23.6786 22.9197 24.9338 23.9154 25.2665 25.3233L26.5879 30.9715"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCarCheckmark',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }
}
</style>
