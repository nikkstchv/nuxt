export const lastname = {
  // data: () => {
  //   return {
  //     form: {
  //       lastname: {
  //         value: '',
  //         errors: [],
  //         isRequire: false,
  //       }
  //     }
  //   }
  // },
  'form.lastname.value' () {
    this.clearErrorsInForm('lastname')
  },
  methods: {
    checkLastName () {
      if (this.form.lastname.isRequire) {
        this.clearErrorsInForm('lastname')
        if (!this.form.lastname.value) {
          this.addRequiredError('lastname')
          return false
        }
      }
      return true
    },
  },
}
