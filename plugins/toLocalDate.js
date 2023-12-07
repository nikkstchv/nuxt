// Преобразует дату

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toLocalDate: (date, local = 'ru') => {
        if (date) {
          return new Date(date.replace(/-/g, '/'))
            .toLocaleString(local, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timezone: 'UTC',
            })

            .replace(' г.', '')
        }
        return null
      },
    },
  }
})
