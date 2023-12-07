<template>
  <div class="wrapper">
    <div class="body">
      <ReportsAside />
      <slot />
    </div>
  </div>
</template>

<script setup>
useHeadDefault()
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  min-height: 100vh;
  padding: 2%;
  background: #f0f0f0;

  @include mq($bp-big) {
    padding: 20px 50px;
  }
}

.body {
  position: relative;
  display: grid;
  grid-template-columns: 250px 1fr;
  padding: 30px 60px 30px 40px;
  background: linear-gradient(121.32deg, #fff 10.96%, #fff 72%, #fff 99.98%);
  border-radius: 59px;
  box-shadow: 0 24px 32px rgb(0 0 0 / 4%), 0 16px 24px rgb(0 0 0 / 4%),
    0 4px 8px rgb(0 0 0 / 4%), 0 0 1px rgb(0 0 0 / 4%);
}
</style>

<style>
body {
  min-height: initial;
}
</style>
