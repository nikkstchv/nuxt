import { validationName } from '@/assets/scripts/validation'

export const name = {
  watch: {
    'form.name.value' () {
      this.clearErrorsInForm('name')
    },
  },
  methods: {
    checkName () {
      const value = this.form.name.value
      const hasValue = !!value
      const isValid = validationName(value)
      const isRequire = this.form.name.isRequire

      this.clearErrorsInForm('name')

      if (!hasValue && isRequire) {
        this.addRequiredError('name')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('name', 'Только русские символы')
        return false
      }

      return true
    },
  },
}
