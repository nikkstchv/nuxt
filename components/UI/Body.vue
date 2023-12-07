<template>
  <div class="body-page">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UIBody',
}
</script>
<style lang="scss" scoped>
.body-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: calc(100vh - 200px);
  padding: 15px;

  @include mq($bp-super-small) {
    padding: 15px 15px 30px;
  }

  @include mq($bp-small) {
    padding: 15px 31px 30px;
  }

  @include mq($bp-medium) {
    padding: 15px 50px 30px;
  }

  @include mq($bp-medium-big) {
    padding: 15px 81px 40px;
  }

  @include mq($bp-big) {
    padding: 15px 146px 40px;
  }
}
</style>
