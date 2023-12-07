<template>
  <form class="authorizationForm" @submit.prevent="">
    <h2 class="authorizationForm__title">
      Введите телефон для продолжения
    </h2>
    <FormInputPhone
      v-model="form.phone.value"
      class="feedback__input"
      :errors="form.phone.errors"
      :required="form.phone.isRequire"
      @focusPhone="onHideLink"
      @blurPhone="onBlurInput"
    />
    <AuthLinkTo text="Войти с помощью e-mail" to="/authorization/email/" />
  </form>
</template>

<script>
import { phone, errors, handlers } from '@/components/Form/mixins'
export default {
  name: 'AuthAuthorizationFormPhone',
  mixins: [phone, errors, handlers],
  props: {
    errorPhone: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isFinish: false,
    isLoading: false,
    isShowLink: true,
    form: {
      phone: {
        value: '',
        errors: [],
        isRequire: true,
      },
    },
  }),
  methods: {
    onBlurInput () {
      this.handleCheckPhone()
      this.onShowLink()
    },
    onHideLink () {
      this.isShowLink = false
    },
    onShowLink () {
      this.isShowLink = true
    },
    handleCheckPhone () {
      this.clearErrorsInForm('phone')
      const isValidPhone = this.checkPhone()
      if (isValidPhone) {
        this.$emit('setPhone', this.form.phone.value)
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
}
</style>
