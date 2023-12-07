<template>
  <main v-cloak class="webpay-spb">
    <UISimplePageHeader
      only-main-crumb
      title="Отмена выполнения операции"
    />

    <DetailText>Вы отказались от выполнения операции.</DetailText>
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.webpay-spb {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
