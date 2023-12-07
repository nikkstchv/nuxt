import { useCityStore } from '~/store/city'
import { useHoldingStore } from '~/store/holding'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { siteCityCode } = useCityStore()
  const { isAvtodom } = useHoldingStore()
  const isHasCity = to?.query?.city
  const isNavigate = !isHasCity && siteCityCode && isAvtodom

  if (isNavigate) {
    return navigateTo({
      path: to.path,
      query: {
        ...to.query,
        city: siteCityCode,
      },
    }, { replace: true })
  }
})
