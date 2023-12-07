<template>
  <div class="authorization">
    <IconLogoABTODOM class="authorization__logo" />
    <form class="authorization__form" @submit.prevent>
      <UIBaseInput
        v-model.trim="form.email.value"
        :errors="form.email.errors"
        :error="form.email.errors.length !== 0"
        class="authorizationForm__input"
        label="E-mail"
        hide-clear
        type="email"
        autocomplete="on"
      />
      <UIBaseInput
        v-model.trim="form.pass.value"
        :errors="form.pass.errors"
        :error="form.pass.errors.length !== 0"
        label="Пароль"
        class="authorizationForm__input"
        type="password"
        hide-clear
        autocomplete="on"
      />
      <UIBaseButton
        primary
        text="LOGIN"
        large
        class="authorization__button"
        @click="loginReports"
      />
    </form>
  </div>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { validationEmail } from '@/assets/scripts/validation'

definePageMeta({
  layout: 'clear',
  validate: () => {
    const { isAvtodom } = useHoldingStore()
    return isAvtodom
  },
})

const form = ref({
  email: {
    value: '',
    errors: [],

  },
  pass: {
    value: '',
    errors: [],
  },
})
const isAuthenticatedReports = useCookie('isAuthenticatedReports', false)
const router = useRouter()

watch(() => form.value.email.value, (email) => {
  checkEmail(email)
})

watch(() => form.value.pass.value, () => {
  form.value.pass.errors = []
})

const loginReports = () => {
  if (
    form.value.email.value === 'reports@avtodom.ru' &&
      form.value.pass.value === 'SaFGL*6Fe7!a'
  ) {
    isAuthenticatedReports.value = true
    router.push('/reports/')
  } else {
    checkPass(form.value.email.pass)
  }
}

const checkEmail = (email) => {
  form.value.email.errors = []
  form.value.pass.errors = []

  if (email.length === 0) {
    form.value.email.errors = []
  } else if (!validationEmail(email)) {
    form.value.email.errors.push('Некорректный формат e-mail.')
  } else if (form.value.email.value !== 'reports@avtodom.ru') {
    form.value.email.errors.push('Пользователя с таким email не существует')
  } else if (form.value.email.value === 'reports@avtodom.ru') {
    return true
  }
  return false
}

const checkPass = () => {
  form.value.pass.errors = []
  const passValue = form.value.pass.value

  if (passValue === '') {
    form.value.pass.errors = []
  } else if (passValue === 'SaFGL*6Fe7!a') {
    form.value.pass.errors = []
    return true
  } else {
    form.value.pass.errors.push('Неверно введен пароль')
  }

  return false
}
</script>

<style lang="scss" scoped>
.authorization {
  display: grid;
  flex-direction: column;
  place-items: center;
  align-content: center;
  height: 100%;
  min-height: 100vh;
  padding: 0 20px;

  &__logo {
    width: 500px;
    height: 50px;
    margin-bottom: 50px;
  }

  &__form {
    display: grid;
    grid-gap: 40px;
    place-items: center;
    width: 100%;
    max-width: 400px;
    margin: auto;
  }
}

</style>
