<template>
  <form class="authorizationForm" @submit.prevent>
    <h2 class="authorizationForm__title">
      Введите e-mail для продолжения
    </h2>
    <UIBaseInput
      v-model.trim="form.email.value"
      :errors="form.email.errors"
      :error="form.email.errors.length !== 0"
      class="authorizationForm__input"
      label="E-mail"
      hide-clear
      type="email"
    />
    <div v-if="isValidEmail" class="authorizationForm__pass">
      <UIBaseInput
        v-model.trim="form.pass.value"
        :errors="form.pass.errors"
        :error="form.pass.errors.length !== 0"
        label="Пароль"
        class="authorizationForm__input"
        type="password"
        hide-clear
      />
      <UIBaseButton
        to="/reset-password/"
        class="authorizationForm__pass-forget-button"
        underline
        text="Забыли пароль?"
      />
    </div>
  </form>
</template>

<script>
import { validationEmail } from '@/assets/scripts/validation'

export default {
  name: 'AuthAuthorizationFormEmail',
  data: () => ({
    form: {
      email: {
        value: '',
        errors: [],
        isRequire: true,
      },
      pass: {
        value: '',
        errors: [],
        isRequire: true,
      },
    },
    accesses: [
      { email: 'ecommerce@avtodom.ru', pass: 'tCqro1B66QaY' },
      { email: 'qr_generator@avtodom.ru', pass: 'e2sEP9W7' },
    ],
  }),
  computed: {
    isValidEmail () {
      return this.form.email.value !== '' && this.form.email.errors.length === 0
    },
  },
  watch: {
    'form.email.value' (email) {
      this.checkEmail(email)
    },
    'form.pass.value' (pass) {
      this.checkPass(pass)
    },
  },
  methods: {
    login () {
      const isAuthenticated = useCookie('isAuthenticated')
      isAuthenticated.value = true
      this.$router.push('/lk/functional-services/')
    },
    checkEmail (email) {
      this.form.email.errors = []

      if (email.length === 0) {
        this.form.email.errors = []
      } else if (!validationEmail(email)) {
        this.form.email.errors.push('Некорректный формат e-mail.')
      } else if (!this.accesses.find(item => item.email === email)) {
        this.form.email.errors.push('Пользователя с таким e-mail нет.')
      }
    },
    checkPass (pass) {
      this.form.pass.errors = []

      if (this.accesses.find(item => item.pass === pass)) {
        this.login()
      } else if (pass === '') {
        this.form.pass.errors = []
      } else {
        this.form.pass.errors.push('Неверно введен пароль')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.authorizationForm {
  @import './authFormStyles';

  @include formStyles;
  @include title;

  &__pass {
    position: relative;

    &-forget-button {
      position: absolute;
      top: 75px;
      right: 15px;
    }

    & :deep(.button) {
      @include text_small_regular;
    }

    & :deep(.input) {
      position: absolute;
    }
  }
}
</style>
