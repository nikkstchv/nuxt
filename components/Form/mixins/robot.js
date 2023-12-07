export const robot = {
  // data: () => {
  //   return {
  //     form: {
  //       robot: {
  //         value: ''
  //       }
  //     }
  //   }
  // },
  methods: {
    checkRobot () {
      const value = this.form.robot.value

      return !value
    },
  },
}
