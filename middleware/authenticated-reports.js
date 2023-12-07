export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const route = useRoute()
  const isAuthenticated = useCookie('isAuthenticatedReports')
  if (route.path.match(/^\/reports(?!\/login\/)/)) {
    if (!isAuthenticated.value) {
      return router.replace('/reports/login/')
    }
  }
})
