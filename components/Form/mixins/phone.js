import { validationPhone } from '@/assets/scripts/validation'

export const phone = {
  watch: {
    'form.phone.value' () {
      this.clearErrorsInForm('phone')
    },
  },
  methods: {
    checkPhone () {
      const value = this.form.phone.value
      const hasValue = !!value
      const isValid = validationPhone(value)
      const isRequire = this.form.phone.isRequire

      this.clearErrorsInForm('phone')

      if (!hasValue && isRequire) {
        this.addRequiredError('phone')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('phone', 'Некорректный формат телефона.')
        return false
      }
      return true
    },
    focusPhone () {
      this.clearErrorsInForm('phone')
      if (!this.form.phone.value) {
        this.form.phone.value = '+7 '
      }
    },
  },
}
