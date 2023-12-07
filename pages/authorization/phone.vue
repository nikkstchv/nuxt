<template>
  <main class="authorization">
    <!--    <AuthFormSmsCode-->
    <!--      v-if="false"-->
    <!--      :phone="phone"-->
    <!--      @setCode="setCode"-->
    <!--      @setPhone="setPhone"-->
    <!--    />-->
    <AuthFormAuthorizationPhone
      :loading="loading"
      :error-phone="errorPhone"
      @setPhone="setPhone"
    />
    <UILoader v-if="loading" class="authorization__loading" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})
const phone = ref(null)
// const code = ref(null)
const errorPhone = ref(null)
const loading = ref(false)

watch(phone, (value) => {
  if (value) {
    errorPhone.value = ''
    // const formatedPhone = value
    //   .replace('+', '')
    //   .replace(' ', '')
    //   .replaceAll('-', '')
    errorPhone.value = 'Пользователя с таким телефоном не существует'
    loading.value = false
    // try {
    //   this.loading = true
    //   const loginPhoneInfo = await this.loginPhone(formatedPhone)
    //   if (loginPhoneInfo.Msg) {
    //     this.errorPhone = loginPhoneInfo.Msg
    //   }
    // } catch (e) {
    // } finally {
    //   this.loading = false
    // }
  }
})

const setPhone = (_phone) => {
  // phone.value = phone
}

// const setCode = (code) => {
//   code.value = code
// }
</script>
<style lang="scss" scoped>
.authorization {
  &__link-to {
    position: fixed;
    right: calc(-50vw + 50%);
    bottom: 40px;
    left: calc(-50vw + 50%);
    margin-right: auto;
    margin-left: auto;
  }

  .authorization &__loading {
    margin: 50px auto;
  }
}
</style>
