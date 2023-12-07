export default defineNuxtRouteMiddleware((_from, to) => {
  const isAuthenticated = useCookie('isAuthenticated')
  if (to.path.includes('/lk/') && !isAuthenticated.value) {
    return navigateTo('/authorization/email/')
  }
})
