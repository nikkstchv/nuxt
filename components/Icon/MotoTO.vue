<template>
  <svg class="icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5396 17.8031V46.9938C10.5396 49.6808 12.7177 51.859 15.4047 51.859H44.5954C47.2823 51.859 49.4605 49.6808 49.4605 46.9938V29.1312C49.4605 26.5506 48.4354 24.0756 46.6106 22.2509L40.1476 15.7879C38.3229 13.9631 35.8479 12.938 33.2673 12.938H15.4047C12.7177 12.938 10.5396 15.1162 10.5396 17.8031Z"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.8371 5.64014H27.5673C28.9108 5.64014 29.9999 6.72923 29.9999 8.0727V12.9378H15.4045V8.0727C15.4045 6.72923 16.4936 5.64014 17.8371 5.64014Z"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.6225 24.1798C29.1319 23.6892 29.1319 22.8938 29.6225 22.4032L32.1677 19.8579C32.6583 19.3673 33.4538 19.3673 33.9444 19.8579L42.5403 28.4538C43.0309 28.9444 43.0309 29.7399 42.5403 30.2305L39.9951 32.7757C39.5045 33.2663 38.709 33.2663 38.2184 32.7757L29.6225 24.1798Z"
    />
    <path
      class="icon__path"
      d="M20.2698 34.831H25.1349"
    />
    <path
      class="icon__path"
      d="M20.2698 42.1284H30"
    />
  </svg>
</template>

<script>

export default {
  name: 'IconMotoTO',
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
