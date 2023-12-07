import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior (to, _from, savedPosition) {
    // что бы при нажатии по кнопке "назад" страница не уезжала
    if (to.path.includes('price-tags')) {
      return {
        top: 0,
      }
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  },
}
