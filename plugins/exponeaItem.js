export default defineNuxtPlugin(() => {
  return {
    provide: {
      exponeaItem: (action, data) => {
        try {
          if (typeof exponea !== 'undefined') {
            exponea.track('Item', { action, ...data })
          }
        } catch (error) {
          console.error(error)
        }
      },
    },
  }
})
