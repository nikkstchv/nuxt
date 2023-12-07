export const policy = {
  // data: () => {
  //   return {
  //     form: {
  //       policy: {
  //         value: false,
  //         error: false
  //       }
  //     }
  //   }
  // },
  watch: {
    'form.policy.value' () {
      this.form.policy.error = false
    },
  },
  methods: {
    checkPolicy () {
      if (this.form.policy.value) {
        this.form.policy.error = false
        return true
      }
      this.form.policy.error = true
      return false
    },
  },
}
