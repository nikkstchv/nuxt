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
    <div class="authorizationForm__pass">
      <UIBaseInput
        v-model.trim="form.pass.value"
        :errors="form.pass.errors"
        :error="form.pass.errors.length !== 0"
        label="Пароль"
        class="authorizationForm__input"
        type="password"
        hide-clear
      />
    </div>
  </form>
</template>

<script>
import { validationEmail } from '@/assets/scripts/validation'

import UIBaseInput from '@/components/UI/Base/Input.vue'

export default {
  name: 'AuthAuthorizationFormDev',
  components: {
    UIBaseInput,
  },
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
    accesses: [{ email: 'ecommerce@avtodom.ru', pass: 'tCqro1B66QaY' }],
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
      const counter = useCookie('isAuthenticatedDevelop', {
        maxAge: 60 * 60,
      })
      counter.value = true
      this.$router.push('/')
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
      const foundAccess = this.accesses.find(item => item.pass === pass)

      if (foundAccess) {
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

    & :deep(.button) {
      @include text_small_regular;
    }

    & :deep(.input) {
      position: absolute;
    }
  }
}
</style>
