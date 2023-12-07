<template>
  <div class="body">
    <AuthSideBlock title="Войдите в личный кабинет" />
    <AuthHeader />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.body {
  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: auto;
  grid-auto-flow: row;
  min-height: 100vh;
  margin: auto;

  @include mq($bp-small-medium) {
    grid-template-columns: auto;
    grid-auto-flow: row;
  }

  @include mq($bp-medium) {
    grid-template-columns: minmax(auto, 450px) 1fr;
  }

  @include mq($bp-medium-big) {
    grid-template-columns: minmax(auto, 600px) 1fr;
  }

  @include mq($bp-big) {
    grid-template-columns: minmax(auto, 800px) 1fr;
  }
}

.main {
  position: relative;
  display: grid;
  place-items: center;

  @include mq($bp-medium) {
    padding: 295px 19%;
  }

  @include mq($bp-medium-big) {
    padding: 295px 24%;
  }

  @include mq($bp-big) {
    padding: 385px 32%;
  }
}
</style>
