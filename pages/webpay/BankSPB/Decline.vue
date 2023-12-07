<template>
  <main v-cloak class="webpay-spb">
    <UISimplePageHeader
      only-main-crumb
      title="Отказ банка в проведении операции"
    />

    <DetailText>Банк отказал вам в проведении этой операции.</DetailText>
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.webpay-spb {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
