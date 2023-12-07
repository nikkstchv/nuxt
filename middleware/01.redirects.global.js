import { redirects } from '@/api/routes/redirects'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const options = {
    query: { url: to.path },
  }
  const res = await $fetchClient(redirects(), options)

  if (!$hasErrorResponse(res) && res?.items?.length) {
    clearError()
    const itemRedirect = res.items[0]
    const status = itemRedirect?.status
    const urlTo = itemRedirect?.urlTo
    const urlFrom = itemRedirect?.urlFrom
    const options = { redirectCode: status }

    if (itemRedirect && urlTo !== urlFrom) {
      return navigateTo(urlTo, options)
    }
  }
})
