<template>
  <header class="auth-header">
    <IconLogoABTODOM class="auth-header__logo" />
  </header>
</template>

<style lang="scss" scoped>
.auth-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: $bp-medium + 1) {
    display: none;
  }

  &__logo {
    justify-self: flex-end;
    width: 109px;
    height: 15px;
    fill: black;

    @media (min-width: $bp-small-medium + 1) {
      width: 155px;
      height: 22px;
    }
  }
}
</style>
