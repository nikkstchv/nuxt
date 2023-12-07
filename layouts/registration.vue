<template>
  <div class="body">
    <AuthSideBlock
      title="Зарегистрируйтесь в личном кабинете"
      text="Добавить текст, либо онбординг с крутыми фишками личного кабинета"
    />
    <AuthHeader />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.body {
  display: grid;
  grid-auto-flow: column;
  margin: auto;

  @media (min-width: $bp-big + 1) {
    grid-template-columns: minmax(auto, 800px) 1fr;
  }

  @media (min-width: $bp-medium-big + 1) and (max-width: $bp-big) {
    grid-template-columns: minmax(auto, 600px) 1fr;
  }

  @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
    grid-template-columns: minmax(auto, 450px) 1fr;
  }

  @media (min-width: $bp-small-medium + 1) and (max-width: $bp-medium) {
    grid-template-columns: auto;
    grid-auto-flow: row;
    padding: 50px;
  }

  @media (max-width: $bp-small-medium) {
    grid-template-columns: auto;
    grid-auto-flow: row;
    padding: 30px 15px;
  }
}

.main {
  position: relative;

  @media (min-width: $bp-big + 1) {
    padding: 120px 32%;
  }

  @media (min-width: $bp-medium-big + 1) and (max-width: $bp-big) {
    padding: 120px 24%;
  }

  @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
    padding: 120px 19%;
  }

  @media (max-width: $bp-medium) {
    display: grid;
    place-items: center;
  }
}

.body :deep(.sideBlock__header) {
  height: 30px;

  @media (min-width: $bp-big + 1) {
    margin-bottom: 255px;
  }

  @media (min-width: $bp-medium-big + 1) and (max-width: $bp-big) {
    margin-bottom: 170px;
  }

  @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
    margin-bottom: 190px;
  }

  @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
    margin-bottom: 150px;
  }
}
</style>
