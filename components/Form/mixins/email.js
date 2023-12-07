import { validationEmail } from '@/assets/scripts/validation'

export const email = {
  // data: () => {
  //   return {
  //     form: {
  //       email: {
  //         value: '',
  //         errors: [],
  //         isRequire: false,
  //       },
  //     },
  //   }
  // },
  watch: {
    'form.email.value' () {
      this.clearErrorsInForm('email')
    },
  },
  methods: {
    checkEmail () {
      const value = this.form.email.value
      const hasValue = !!value
      const isValid = validationEmail(value)
      const isRequire = this.form.email.isRequire

      this.clearErrorsInForm('email')

      if (!hasValue && isRequire) {
        this.addRequiredError('email')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('email', 'Некорректный формат e-mail.')
        return false
      }
      return true
    },
  },
}
