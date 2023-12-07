<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    class="icon"
  >
    <path
      d="M3 12.2531C3 14.7381 7.029 16.7531 12 16.7531"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M20.9999 12.2531C20.9999 13.8131 19.4109 15.1871 16.9999 15.9941C19.4109 15.1871 20.9999 13.8131 20.9999 12.2531"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M13 16.7531H12C7.029 16.7531 3 14.7381 3 12.2531"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M10.754 18.9988L13 16.7538L10.754 14.5078"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M21 12.254C21 10.296 18.493 8.63597 15 8.01797"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      d="M9 8.01562C5.507 8.63363 3 10.2936 3 12.2516"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon__path"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.07307 8.99794L8.08193 8.99529C8.09105 8.99258 8.10627 8.98812 8.12742 8.98217C8.16973 8.97026 8.23572 8.95236 8.32397 8.93041C8.50052 8.88651 8.76588 8.82649 9.10878 8.76586C9.79498 8.64453 10.789 8.52125 12.0014 8.51895C13.7137 8.51569 15.7932 8.79691 17.2359 9.39511C17.6185 9.55376 18.0573 9.37219 18.2159 8.98956C18.3746 8.60694 18.193 8.16814 17.8104 8.00949C16.1189 7.30816 13.8226 7.01548 11.9986 7.01895C10.687 7.02144 9.60575 7.15473 8.84762 7.28877C8.46835 7.35583 8.1693 7.42319 7.96197 7.47475C7.85829 7.50053 7.77747 7.52238 7.72096 7.53829C7.6927 7.54625 7.67051 7.55272 7.65457 7.55745L7.63536 7.56323L7.62932 7.56509L7.62719 7.56574L7.62598 7.56612C7.62582 7.56617 7.62566 7.56622 7.84936 8.28208L7.62598 7.56612C7.23063 7.68967 7.00996 8.11043 7.1335 8.50579C7.25702 8.90105 7.6778 9.12129 8.07307 8.99794Z"
      class="icon__path icon__path_fill"
    />
  </svg>
</template>

<script>
export default {
  name: 'CardIconRotate',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: none;

  &__path {
    stroke: var(--grayDark);
    stroke-width: 1.5;

    &_fill {
      fill: var(--grayDark);
      stroke: none;
    }
  }
}
</style>
