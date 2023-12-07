export const middlename = {
  // data: () => {
  //   return {
  //     form: {
  //       middlename: {
  //         value: '',
  //         errors: [],
  //         isRequire: false,
  //       },
  //     },
  //   }
  // },
  'form.middlename.value' () {
    this.clearErrorsInForm('middlename')
  },
  methods: {
    checkMiddleName () {
      if (this.form.middlename.isRequire) {
        this.clearErrorsInForm('middlename')
        if (!this.form.middlename.value) {
          this.addRequiredError('middlename')
          return false
        }
      }
      return true
    },
  },
}
