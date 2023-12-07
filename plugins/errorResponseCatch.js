export default defineNuxtPlugin(() => {
  return {
    provide: {
      errorResponseCatch: (response) => {
        const hasMessage = response?.message
        const hasCode = response?.code
        const hasDetails = response?.details

        if (hasMessage && hasCode && hasDetails) {
          const { message, code } = response
          if (code === 5 || code === 3) {
            throw createError({ statusCode: 404, message, fatal: true })
          } else if (code === 12 || code === 13) {
            throw createError({ statusCode: 500, message, fatal: true })
          }
        }
      },
    },
  }
})
