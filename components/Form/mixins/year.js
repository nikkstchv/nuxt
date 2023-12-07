export const year = {
  data: () => {
    return {
      form: {
        year: {
          value: '',
          errors: [],
          isRequire: false,
        },
      },
    }
  },
  watch: {
    'form.year.value' () {
      this.clearErrorsInForm('year')
    },
  },
}
