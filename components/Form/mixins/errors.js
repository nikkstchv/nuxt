import message from '~/components/Form/messages'

export const errors = {
  methods: {
    addRequiredError (formName) {
      this.addErrorInFormErrors(formName, message.required)
    },
    addErrorInFormErrors (formName, message) {
      this.form[formName].errors.push(message)
    },
    clearErrorsInForm (formName) {
      this.form[formName].errors = []
    },
    checkForm () {
      const checkFunctions = [
        'checkName',
        'checkFirstName',
        'checkLastName',
        'checkMiddleName',
        'checkPhone',
        'checkEmail',
        'checkStateNumber',
        'checkDealer',
        'checkPolicy',
        'checkVin',
        'checkRobot',
      ]

      return checkFunctions
        .map((func) => {
          if (this[func]) {
            return this[func]()
          }
          return true
        })
        .every(Boolean)
    },
  },
}
