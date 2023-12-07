export default defineNuxtPlugin(() => {
  return {
    provide: {
      hasErrorResponse: (response) => {
        const hasMessage = response?.message
        const hasCode = response?.code
        const hasDetails = response?.details

        return hasMessage && hasCode && hasDetails
      },
    },
  }
})
