import { validationName } from '@/assets/scripts/validation'

export const firstname = {
  // data: () => {
  //   return {
  //     form: {
  //       firstname: {
  //         value: '',
  //         errors: [],
  //         isRequire: false
  //       }
  //     }
  //   }
  // },
  watch: {
    'form.firstname.value' () {
      this.clearErrorsInForm('firstname')
    },
  },
  methods: {
    checkFirstName () {
      const value = this.form.firstname.value
      const hasValue = !!value
      const isValid = validationName(value)
      const isRequire = this.form.firstname.isRequire

      this.clearErrorsInForm('firstname')

      if (!hasValue && isRequire) {
        this.addRequiredError('firstname')
        return false
      } else if (hasValue && !isValid) {
        this.addErrorInFormErrors('firstname', 'Только русские символы')
        return false
      }

      return true
    },
  },
}
