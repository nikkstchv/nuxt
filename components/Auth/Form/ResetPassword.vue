<template>
  <form class="resetPasswordForm" @submit.prevent>
    <h2 class="resetPasswordForm__title">
      Восстановление пароля
    </h2>
    <UIBaseInput
      v-if="!form.emailOrPhone.valid"
      v-model.trim="form.emailOrPhone.value"
      :errors="form.emailOrPhone.errors"
      :error="form.emailOrPhone.errors.length !== 0"
      class="resetPasswordForm__input"
      label="Телефон или e-mail"
      hide-clear
    />

    <template v-if="form.emailOrPhone.valid">
      <UIBaseInput
        v-model.trim="form.pass.value"
        :error="form.repeatPass.errors.length !== 0"
        label="Новый пароль"
        type="password"
        hide-clear
      />
      <UIBaseInput
        v-model.trim="form.repeatPass.value"
        :errors="form.repeatPass.errors"
        :error="form.repeatPass.errors.length !== 0"
        label="Повторите новый пароль"
        type="password"
        hide-clear
        :on-blur="validPass"
        :on-focus="() => clearErrorsInForm('repeatPass')"
      />
      <UIBaseButton
        :disable="!isValidPass"
        primary
        text="Изменить пароль"
        large
      />
    </template>
  </form>
</template>

<script>
import { validationPhone, validationEmail } from '@/assets/scripts/validation'

import UIBaseInput from '@/components/UI/Base/Input.vue'
import UIBaseButton from '@/components/UI/Base/Button.vue'

export default {
  name: 'AuthResetPassword',
  components: {
    UIBaseInput,
    UIBaseButton,
  },
  data: () => ({
    form: {
      emailOrPhone: {
        value: '',
        type: null,
        errors: [],
        valid: false,
      },
      pass: {
        value: '',
        errors: [],
      },
      repeatPass: {
        value: '',
        errors: [],
      },
    },
  }),
  computed: {
    isValidPass () {
      return this.validPass()
    },
  },
  watch: {
    'form.emailOrPhone.value' (value) {
      this.checkEmailOrPhone(value)
    },
  },
  methods: {
    clearErrorsInForm (name) {
      this.form[name].errors = []
    },
    validPass () {
      this.clearErrorsInForm('repeatPass')
      if (this.form.pass.value !== this.form.repeatPass.value) {
        this.form.repeatPass.errors.push('Введенные пароли не совпадают')
        return false
      }
      return true
    },
    isNumber (n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    },
    checkEmailOrPhone (value) {
      this.clearErrorsInForm('emailOrPhone')

      if (this.checkIsEmail(value)) {
        this.form.emailOrPhone.type = 'email'
        this.checkEmail(value)
      } else if (this.isNumber(value)) {
        this.form.emailOrPhone.type = 'phone'
        this.checkPhone(value)
      } else {
        this.form.emailOrPhone.type = ''
        this.form.emailOrPhone.errors.push(
          'Введите корректный email или номер телефона.',
        )
      }
    },
    checkPhone (phone) {
      this.clearErrorsInForm('emailOrPhone')
      if (phone === '89818380415') {
        this.form.emailOrPhone.valid = true
      } else if (!validationPhone(phone)) {
        this.form.emailOrPhone.errors.push('Некорректный формат телефона.')
      } else {
        this.form.emailOrPhone.errors.push(
          'Пользователя с таким телефоном не существует.',
        )
      }
    },
    checkEmail (email) {
      this.clearErrorsInForm('emailOrPhone')
      if (!validationEmail(email)) {
        this.form.emailOrPhone.errors.push('Некорректный формат e-mail.')
      } else if (email !== 'ABTODOM@inbox.ru') {
        this.form.emailOrPhone.errors.push(
          'Пользователя с таким E-mail не существует.',
        )
      }
    },
    checkIsEmail (email) {
      return email.includes('@') && email.includes('.')
    },
  },
}
</script>

<style lang="scss" scoped>
.resetPasswordForm {
  @import './authFormStyles';

  @include formStyles;
  @include title;
}
</style>
