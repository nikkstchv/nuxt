// Преобразует сумму убирая копейки и разделяя на разряды

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toDateTime: (string) => {
        return string.replace('Ежедневно с ', '').replace(' до ', '-')
      },
    },
  }
})
