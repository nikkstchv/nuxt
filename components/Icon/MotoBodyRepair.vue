<template>
  <svg
    class="icon"
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      d="M29.9573 20.9402C15.1621 25.8284 7.54115 33.2084 4.63596 40.1417C3.15183 43.6835 6.32458 46.9009 10.1648 46.9009V46.9009M29.9573 20.9402V20.9402C29.22 18.0852 31.0146 15.1923 33.9 14.5847L37.6803 13.7887C40.6624 13.1608 43.5802 15.099 44.1574 18.0912V18.0912M29.9573 20.9402C34.8141 19.5282 39.6379 18.5267 44.1574 18.0912M44.1574 18.0912C53.6116 17.1803 56.0382 21.5905 56.661 32.6588C57.0932 40.3387 50.6703 46.6046 42.9785 46.6609L10.1648 46.9009M10.1648 46.9009C28.2121 28.834 51.3472 29.721 40.7792 46.677"
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
