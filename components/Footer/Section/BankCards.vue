<template>
  <div class="bank-cards">
    <img
      src="@/assets/icons/mastercard.svg"
      alt="логотип карты mastercard"
      class="bank-cards__logo"
    >
    <img
      src="@/assets/icons/visa.svg"
      alt="логотип карты visa"
      class="bank-cards__logo"
    >
    <img
      src="@/assets/icons/mir.svg"
      alt="логотип карты мир"
      class="bank-cards__logo"
    >
  </div>
</template>

<style lang="scss" scoped>
.bank-cards {
  position: relative;
  display: flex;
  grid-row: 1;
  grid-column: 1;
  grid-gap: 5px;

  &__logo {
    width: 80px;
    height: 56px;

    @include mq($bp-medium) {
      width: 86px;
      height: 60px;
    }
  }

}
</style>
