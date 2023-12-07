// Преобразует дату

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getCurrentYear: () => {
        return new Date().getUTCFullYear()
      },
    },
  }
})
