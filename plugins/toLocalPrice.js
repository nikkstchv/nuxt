// Преобразует сумму убирая копейки и разделяя на разряды

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toLocalPrice: (price) => {
        if (price && price !== '0') {
          return parseInt(price.toString().slice(0, -2))
            .toLocaleString()
            .split(',')
            .join(' ')
        }
        return '0'
      },
    },
  }
})
