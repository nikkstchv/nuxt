<template>
  <div class="list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'InvestorsList',
}
</script>

<style scoped lang="scss">
.list {
  display: grid;
  grid-gap: 25px;
  width: 100%;
  height: fit-content;
  margin-bottom: 40px;

  @include mq($bp-small-medium) {
    grid-gap: 35px;
  }

  @include mq($bp-small) {
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    grid-gap: 50px;
  }
}
</style>
