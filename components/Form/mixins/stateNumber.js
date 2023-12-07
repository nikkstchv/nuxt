import { validationStateCarNumber } from '@/assets/scripts/validation'

export const stateNumber = {
  watch: {
    'form.stateNumber.value' () {
      this.clearErrorsInForm('stateNumber')
    },
  },
  methods: {
    checkStateNumber () {
      const value = this.form.stateNumber.value
      const hasValue = !!value
      const isValid = validationStateCarNumber(value)
      const isRequire = this.form.stateNumber.isRequire

      this.clearErrorsInForm('stateNumber')

      if (!hasValue && isRequire) {
        this.addRequiredError('stateNumber')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('stateNumber', 'Некорректный гос. номер авто')
        return false
      }
      return true
    },
  },
}
