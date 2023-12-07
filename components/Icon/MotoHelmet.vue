<template>
  <svg
    class="icon"
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      d="M9.7636 20.9211H28.9138C30.5707 20.9211 31.9138 22.2643 31.9138 23.9211V28.0357C31.9138 32.4777 28.9837 36.3872 24.7203 37.6338L8.07785 42.5M52.4762 29.4823C54.0901 16.0374 45.4616 7.3577 31.9138 7.3577C18.3661 7.3577 7.77012 16.5694 7.38351 31.8721C7.13156 41.8386 9.54615 54.0762 14.0731 52.5341C18.9982 50.8564 39.8863 44.8321 50.6523 41.0409C51.357 38.7259 52.2458 31.4011 52.4762 29.4823Z"
    />
  </svg>
</template>

<script>

export default {
  name: 'IconMotoHelmet',
}
</script>

<style lang='scss' scoped>
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
