<template>
  <main v-cloak class="webpay-spb">
    <UISimplePageHeader only-main-crumb title="Операция одобрена" />

    <DetailText>Операция была успешно одобрена.</DetailText>
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.webpay-spb {
  @include indentsMainHorizontal;
  @include indentsMainVertical;
}
</style>
