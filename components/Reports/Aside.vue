<template>
  <aside class="aside">
    <header class="aside__header">
      <IconLogoABTODOM />
    </header>
    <div class="aside__list">
      <nuxt-link to="/reports/" class="aside__item">
        Обзор
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ReportsAside',
}
</script>

<style lang="scss" scoped>
.aside {
  display: flex;
  flex-direction: column;
  grid-gap: 80px;
  height: 100%;
  padding-right: 45px;
  border-right: 1px solid var(--grayMediumLight);

  &__header {
    padding-top: 30px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__item {
    padding: 18px 24px;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    color: #197bbd;
    background: #f0f7ff;
    border-radius: 4px;
  }
}
</style>
