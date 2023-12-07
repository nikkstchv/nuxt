import { seo as seoPath } from '~/api/routes/redirects'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getSeo: async (routePath) => {
        const { $fetchClient, $hasErrorResponse } = nuxtApp
        try {
          const query = {
            url: btoa(routePath),
          }
          const options = { query }
          const seo = await $fetchClient(seoPath(routePath), options)
          if (!$hasErrorResponse(seo)) {
            return seo
          }
          return true
        } catch (e) {
          return true
        }
      },
    },
  }
})
