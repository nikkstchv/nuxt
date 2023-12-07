import { useCityStore } from '~/store/city'
import { useHoldingStore } from '~/store/holding'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { siteCityCode } = useCityStore()
  const { isAvtodom } = useHoldingStore()
  const { city, noCity, ...restQuery } = to?.query
  const isNavigate = ((!city && !noCity) || (city && noCity)) && isAvtodom

  if (isNavigate) {
    if (noCity) {
      return navigateTo({
        path: to.path,
        query: {
          ...restQuery,
          noCity,
        },
      }, { replace: true })
    } else {
      return navigateTo({
        path: to.path,
        query: {
          ...to.query,
          city: siteCityCode || 'msk',
        },
      }, { replace: true })
    }
  }
})
