<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 50"
    fill="none"
    class="icon"
  >
    <path d="M6.74237 13.5792H44.258" class="icon__path" />
    <path d="M19.2476 21.9161H13.9933" class="icon__path" />
    <path
      d="M21.3318 34.421H12.995C9.54176 34.421 6.74237 31.6216 6.74237 28.1684V11.4948C6.74237 8.04157 9.54176 5.24219 12.995 5.24219H38.0054C41.4586 5.24219 44.258 8.04157 44.258 11.4948V17.7474"
      class="icon__path"
    />
    <path
      d="M27.5844 25.2505V39.4231C27.5867 41.2643 31.3169 42.7578 35.9212 42.7578C40.5254 42.7578 44.2556 41.2643 44.258 39.4231V25.2505"
      class="icon__path"
    />
    <path
      d="M44.2556 25.2507C44.2556 27.092 40.5231 28.5855 35.9188 28.5855C31.3145 28.5855 27.5844 27.092 27.5844 25.2507C27.5844 23.4071 31.3192 21.916 35.9212 21.916C40.5231 21.916 44.2556 23.4095 44.258 25.2507"
      class="icon__path"
    />
    <path
      d="M27.5856 32.3369C27.5856 34.1782 31.3157 35.6716 35.92 35.6716C40.5243 35.6716 44.2568 34.1782 44.2568 32.3369"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCreditCardCoins',
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
