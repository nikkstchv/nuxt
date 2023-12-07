import { validationVin } from '@/assets/scripts/validation'

export const vin = {
  watch: {
    'form.VIN.value' () {
      this.clearErrorsInForm('VIN')
    },
  },
  methods: {
    checkVin () {
      const value = this.form.VIN.value
      const hasValue = !!value
      const isValid = validationVin(value)
      const isRequire = this.form.VIN.isRequire

      if (!hasValue && isRequire) {
        this.addRequiredError('VIN')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('VIN', 'Некорректный формат VIN')
        return false
      }
      return true
    },
  },
}
