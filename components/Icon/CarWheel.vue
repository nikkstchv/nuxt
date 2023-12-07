<template>
  <svg class="icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M34.8002 30.0002C34.8002 32.6512 32.6512 34.8002 30.0002 34.8002C27.3492 34.8002 25.2002 32.6512 25.2002 30.0002C25.2002 27.3492 27.3492 25.2002 30.0002 25.2002C32.6512 25.2002 34.8002 27.3492 34.8002 30.0002"
      class="icon__path"
    />
    <path d="M29.9998 13.2002V25.2002" class="icon__path" />
    <path d="M45.9841 24.8159L34.5361 28.5359" class="icon__path" />
    <path d="M39.8646 43.5838L32.8086 33.8638" class="icon__path" />
    <circle cx="30.0002" cy="30.0002" r="16.8" class="icon__path" />
    <path d="M14.0156 24.8159L25.4636 28.5359" class="icon__path" />
    <path d="M20.1357 43.5838L27.1917 33.8638" class="icon__path" />
    <circle cx="30" cy="30" r="24" class="icon__path" />
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
