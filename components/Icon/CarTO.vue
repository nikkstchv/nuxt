<template>
  <svg class="icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.6611 27.6312V21.2085C15.6611 19.1714 17.2653 17.5215 19.2458 17.5215H40.7536C42.7341 17.5215 44.3382 19.1714 44.3382 21.2085V27.6312V30.2822C44.3382 31.2998 43.5353 32.1257 42.5459 32.1257H38.9613C37.9719 32.1257 37.1689 31.2998 37.1689 30.2822V28.4387H22.8304V30.2822C22.8304 31.2998 22.0274 32.1257 21.0381 32.1257H17.4535C16.4641 32.1257 15.6611 31.2998 15.6611 30.2822V27.6312Z"
      class="icon__path"
    />
    <path
      d="M19.2461 17.5214L20.7265 11.0065C21.1065 9.34 22.5529 8.16016 24.218 8.16016H35.9379C37.6353 8.16016 39.0996 9.38424 39.4473 11.0913L40.7539 17.5214"
      class="icon__path"
    />
    <path d="M38.8532 22.9081H35.2686" class="icon__path" />
    <path d="M24.6227 22.9081H21.0381" class="icon__path" />
    <path d="M40.7529 17.3777L44.3376 15.5342" class="icon__path" />
    <path d="M19.2458 17.3777L15.6611 15.5342" class="icon__path" />
    <path d="M36.4178 38.9285H51.9941" class="icon__path" />
    <path d="M51.9941 27.2698V50.4409" class="icon__path" />
    <path d="M47.9896 50.4412H56" class="icon__path" />
    <path d="M23.5934 38.9285H8.00586" class="icon__path" />
    <path d="M8.00492 27.2698L8.00492 50.4409" class="icon__path" />
    <path d="M12.0104 50.4407H4" class="icon__path" />
  </svg>
</template>

<script>
export default {
  name: 'IconCarTO',
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
