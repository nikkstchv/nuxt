<template>
  <main class="resetPass">
    <AuthFormResetPassword />
    <AuthLinkTo
      class="resetPass__link-to"
      text="Войти с помощью телефона"
      to="/authorization/phone"
    />
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})
</script>

<style lang="scss" scoped>
.resetPass {
  &__link-to {
    @include mq($bp-medium) {
      display: none;
    }
  }
}
</style>
