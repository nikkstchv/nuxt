export default defineNuxtRouteMiddleware((to) => {
  const cyrillicCityNames = ['Краснодар', 'Москва', 'Санкт-Петербург']
  const cities = {
    // eslint-disable-next-line quote-props
    'Краснодар': 'krasnodar',
    // eslint-disable-next-line quote-props
    'Москва': 'msk',
    'Санкт-Петербург': 'spb',
  }

  const isCyrillicCityName = cyrillicCityNames.includes(to?.query?.city)
  const city = to.query.city

  if (isCyrillicCityName) {
    return navigateTo({
      query: {
        ...to.query,
        city: cities[city],
      },
    })
  }
})
